from flask import Blueprint, render_template, request, send_file, abort, jsonify, redirect, url_for, flash, current_app
from . import limiter
from .pdf_generator import (
    build_pdf, load_checklist, sections_from_submitted,
    resolve_os_label, resolve_role_label,
)
from datetime import date
import io, base64, json, time, os, threading, re, logging

logger = logging.getLogger(__name__)

MAX_LOGO_BYTES = 3 * 1024 * 1024  # 3 MB

_IMAGE_SIGNATURES = (
    (b"\x89PNG\r\n\x1a\n", "image/png"),
    (b"\xff\xd8\xff",       "image/jpeg"),
    (b"GIF87a",             "image/gif"),
    (b"GIF89a",             "image/gif"),
)

def _sniff_image_mime(data: bytes):
    for signature, mime in _IMAGE_SIGNATURES:
        if data.startswith(signature):
            return mime
    if data[:4] == b"RIFF" and data[8:12] == b"WEBP":
        return "image/webp"
    return None

def _logo_data_url(file_storage):
    """Only accept real raster images, sniffed by content — never trust the
    client-supplied filename/Content-Type, and never accept SVG (WeasyPrint
    can be made to fetch remote/local resources referenced inside it)."""
    if not file_storage or not file_storage.filename:
        return None
    data = file_storage.read(MAX_LOGO_BYTES + 1)
    if not data or len(data) > MAX_LOGO_BYTES:
        return None
    mime = _sniff_image_mime(data)
    if not mime:
        return None
    return f"data:{mime};base64,{base64.b64encode(data).decode()}"

_EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")

def _valid_email(addr: str) -> bool:
    return bool(addr) and len(addr) <= 254 and bool(_EMAIL_RE.match(addr))

main = Blueprint("main", __name__)

SOFTWARE_OPTIONS = [
    ("microsoft_office", "Microsoft Office"),
    ("google_workspace", "Google Workspace"),
    ("slack", "Slack"),
    ("zoom", "Zoom"),
    ("teams", "Microsoft Teams"),
    ("antivirus", "Antivirus"),
    ("vpn", "VPN Client"),
    ("password_manager", "Password Manager"),
    ("1password", "1Password"),
    ("lastpass", "LastPass"),
]

COMPANY_SIZES = [
    ("micro",      "Micro · 1–5 employees"),
    ("small",      "Small · 6–15 employees"),
    ("medium",     "Medium · 16–50 employees"),
    ("large",      "Large · 51–200 employees"),
    ("enterprise", "Enterprise · 200+ employees"),
]

def _normalize_size(size: str) -> str:
    try:
        n = int(str(size).strip().replace(",", ""))
        if n <= 15:  return "small"
        if n <= 50:  return "medium"
        return "large"
    except (ValueError, TypeError):
        pass
    return {"micro": "small", "small": "small", "medium": "medium",
            "large": "large", "enterprise": "large"}.get(size, "small")

OS_OPTIONS = [
    ("windows", "Windows"),
    ("macos",   "macOS"),
    ("linux",   "Linux"),
    ("remote",  "Remote Employee"),
    ("custom",  "Custom OS"),
]

VALID_OS = {"windows", "macos", "linux", "remote", "custom"}

ROLE_OPTIONS = [
    ("general",    "General"),
    ("developer",  "Developer"),
    ("designer",   "Designer"),
    ("sales",      "Sales"),
    ("hr",         "HR"),
    ("finance",    "Finance"),
    ("marketing",  "Marketing"),
    ("operations", "Operations"),
    ("custom",     "Custom"),
]

VALID_ROLES = {r[0] for r in ROLE_OPTIONS}

def _decode_share(token):
    try:
        padded = token + '=' * (-len(token) % 4)
        data = json.loads(base64.urlsafe_b64decode(padded).decode('utf-8'))
        exp = data.get('exp', 0)
        if exp and time.time() > exp:
            return None, 'expired'
        return data, None
    except Exception:
        return None, 'invalid'

@main.route("/healthz", methods=["GET"])
def healthz():
    return {"status": "ok"}, 200

@main.route("/healthz/db", methods=["GET"])
@limiter.limit("30 per minute")
def healthz_db():
    if "sqlalchemy" not in current_app.extensions:
        return {"status": "error", "detail": "DATABASE_URL no configurada"}, 503
    from .extensions import db
    from sqlalchemy import text
    try:
        version = db.session.execute(text("SHOW server_version")).scalar()
    except Exception:
        # Never echo the exception: it can contain the connection string.
        logger.exception("Database health check failed")
        return {"status": "error", "detail": "no se pudo conectar a la base de datos"}, 503
    return {"status": "ok", "database": "postgresql", "server_version": version}, 200

@main.route("/", methods=["GET"])
def home():
    return render_template("home.html")

@main.route("/about", methods=["GET"])
def about():
    return render_template("about.html")


@main.route("/suggest", methods=["GET", "POST"])
@limiter.limit("5 per minute", methods=["POST"])
def suggest():
    if request.method == "POST":
        name    = request.form.get("name", "").strip()
        email   = request.form.get("email", "").strip()
        message = request.form.get("message", "").strip()

        if not name or not email or not message:
            return render_template("suggest.html", error="All fields are required.", name=name, email=email, message=message)

        if os.getenv("RESEND_API_KEY"):
            try:
                from .email import send_suggestion
                send_suggestion(name, email, message)
            except Exception:
                logger.exception("Failed to send suggestion email")

        return render_template("suggest.html", success=True)

    return render_template("suggest.html")

@main.route("/generator", methods=["GET"])
def index():
    share_state = None
    share_error = None
    token = request.args.get('s')
    if token:
        share_state, share_error = _decode_share(token)

    return render_template(
        "index.html",
        os_options=OS_OPTIONS,
        role_options=ROLE_OPTIONS,
        software_options=SOFTWARE_OPTIONS,
        company_sizes=COMPANY_SIZES,
        share_state=share_state,
        share_error=share_error,
    )

@main.route("/items", methods=["GET"])
@limiter.limit("60 per minute")
def items():
    os_type      = request.args.get("os_type", "windows")
    role         = request.args.get("role", "general")
    company_size = _normalize_size(request.args.get("company_size", "small"))
    software     = request.args.getlist("software")

    if os_type not in VALID_OS:
        return jsonify([]), 400
    if role not in VALID_ROLES:
        role = "general"
    checklist_role = "general" if role == "custom" else role

    sections = load_checklist(os_type, software, company_size, checklist_role)
    return jsonify(sections)

@main.route("/preview", methods=["POST"])
@limiter.limit("30 per minute")
def preview():
    os_type      = request.form.get("os_type")
    role         = request.form.get("role", "general")
    company_name = request.form.get("company_name", "").strip() or "Your Company"
    company_size = _normalize_size(request.form.get("company_size", "small"))
    software     = request.form.getlist("software")
    preparer     = request.form.get("preparer", "").strip()
    employee     = request.form.get("employee", "").strip()
    submitted    = request.form.getlist("checklist_item")
    logo_data    = _logo_data_url(request.files.get("logo"))

    if os_type not in VALID_OS:
        abort(400, "Invalid OS type.")
    if role not in VALID_ROLES:
        role = "general"

    role_name     = request.form.get("role_name", "").strip()
    checklist_role = "general" if role == "custom" else role

    # "items_submitted" is present whenever the live editor populated the
    # hidden checklist_item inputs (even to zero of them, e.g. the user
    # deliberately removed every item) — that's distinct from no submission
    # having occurred at all, which should fall back to the default checklist.
    items_were_submitted = "items_submitted" in request.form

    os_name = request.form.get("os_name", "").strip()

    try:
        if items_were_submitted:
            sections = sections_from_submitted(submitted)
        else:
            sections = load_checklist(os_type, software, company_size, checklist_role)

        html = render_template(
            "pdf_checklist.html",
            company_name=company_name,
            os_label=resolve_os_label(os_type, os_name),
            role_label=resolve_role_label(role, role_name),
            company_size=company_size,
            software=software,
            preparer=preparer,
            employee=employee,
            sections=sections,
            logo_data=logo_data,
            generated_date=date.today().strftime("%B %d, %Y"),
            preview_mode=True,
        )
    except Exception:
        logger.exception("Preview rendering failed (os_type=%s, role=%s)", os_type, role)
        return render_template("error.html"), 500

    return html


@main.route("/generate", methods=["POST"])
@limiter.limit("10 per minute")
def generate():
    os_type      = request.form.get("os_type")
    role         = request.form.get("role", "general")
    company_name = request.form.get("company_name", "").strip() or "Your Company"
    company_size = _normalize_size(request.form.get("company_size", "small"))
    software     = request.form.getlist("software")
    preparer     = request.form.get("preparer", "").strip()
    employee     = request.form.get("employee", "").strip()
    submitted    = request.form.getlist("checklist_item")
    logo_data    = _logo_data_url(request.files.get("logo"))
    user_email   = request.form.get("user_email", "").strip()
    os_name      = request.form.get("os_name", "").strip()

    if not _valid_email(user_email):
        user_email = ""

    if os_type not in VALID_OS:
        abort(400, "Invalid OS type.")
    if role not in VALID_ROLES:
        role = "general"

    role_name      = request.form.get("role_name", "").strip()
    checklist_role = "general" if role == "custom" else role

    # See the matching comment in /preview: presence of "items_submitted"
    # (not truthiness of the resulting list) is what distinguishes "no
    # submission occurred" from "the user submitted zero items on purpose".
    items_were_submitted = "items_submitted" in request.form

    try:
        pdf_bytes = build_pdf(
            os_type=os_type,
            company_name=company_name,
            company_size=company_size,
            software=software,
            preparer=preparer,
            employee=employee,
            role=checklist_role,
            submitted_items=submitted if items_were_submitted else None,
            logo_data=logo_data,
            os_name=os_name,
            display_role=role,
            role_name=role_name,
        )
    except Exception:
        logger.exception("PDF generation failed (os_type=%s, role=%s)", os_type, role)
        return render_template("error.html"), 500

    if role == "custom":
        role_suffix = f"-{role_name.replace(' ', '-')}" if role_name else "-Custom"
    elif role != "general":
        role_suffix = f"-{role.capitalize()}"
    else:
        role_suffix = ""
    filename = f"IT-Onboarding-{os_type.capitalize()}{role_suffix}-Checklist.pdf"

    if os.getenv("RESEND_API_KEY"):
        from .email import send_pdf_to_user, notify_owner
        def _send_emails():
            if user_email:
                try:
                    send_pdf_to_user(user_email, pdf_bytes, filename, company_name, employee)
                except Exception:
                    logger.exception("Failed to email PDF to user")
            try:
                notify_owner(os_type, role, company_name, employee, user_email or None)
            except Exception:
                logger.exception("Failed to notify owner")
        threading.Thread(target=_send_emails, daemon=True).start()

    return send_file(
        io.BytesIO(pdf_bytes),
        mimetype="application/pdf",
        as_attachment=True,
        download_name=filename,
    )
