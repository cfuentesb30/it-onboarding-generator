from flask import Blueprint, render_template, request, send_file, abort, jsonify
from .pdf_generator import build_pdf, load_checklist, sections_from_submitted
from datetime import date
import io, base64, json, time

def _logo_data_url(file_storage):
    if not file_storage or not file_storage.filename:
        return None
    data = file_storage.read()
    if not data:
        return None
    mime = file_storage.content_type or "image/png"
    return f"data:{mime};base64,{base64.b64encode(data).decode()}"

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
    ("small",  "1–10 employees"),
    ("medium", "11–50 employees"),
    ("large",  "50+ employees"),
]

OS_OPTIONS = [
    ("windows", "Windows"),
    ("macos",   "macOS"),
    ("remote",  "Remote Employee"),
]

ROLE_OPTIONS = [
    ("general",    "General"),
    ("developer",  "Developer"),
    ("designer",   "Designer"),
    ("sales",      "Sales"),
    ("hr",         "HR"),
    ("finance",    "Finance"),
    ("marketing",  "Marketing"),
    ("operations", "Operations"),
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

@main.route("/", methods=["GET"])
def home():
    return render_template("home.html")

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
def items():
    os_type      = request.args.get("os_type", "windows")
    role         = request.args.get("role", "general")
    company_size = request.args.get("company_size", "small")
    software     = request.args.getlist("software")

    if os_type not in ("windows", "macos", "remote"):
        return jsonify([]), 400

    sections = load_checklist(os_type, software, company_size, role)
    return jsonify(sections)

@main.route("/preview", methods=["POST"])
def preview():
    os_type      = request.form.get("os_type")
    role         = request.form.get("role", "general")
    company_name = request.form.get("company_name", "").strip() or "Your Company"
    company_size = request.form.get("company_size", "small")
    software     = request.form.getlist("software")
    preparer     = request.form.get("preparer", "").strip()
    employee     = request.form.get("employee", "").strip()
    submitted    = request.form.getlist("checklist_item")
    logo_data    = _logo_data_url(request.files.get("logo"))

    if os_type not in ("windows", "macos", "remote"):
        abort(400, "Invalid OS type.")
    if role not in VALID_ROLES:
        role = "general"

    if submitted:
        sections = sections_from_submitted(submitted)
    else:
        sections = load_checklist(os_type, software, company_size, role)

    os_labels = {"windows": "Windows", "macos": "macOS", "remote": "Remote Employee"}

    return render_template(
        "pdf_checklist.html",
        company_name=company_name,
        os_label=os_labels.get(os_type, os_type),
        role_label=role.capitalize() if role != "general" else "",
        company_size=company_size,
        software=software,
        preparer=preparer,
        employee=employee,
        sections=sections,
        logo_data=logo_data,
        generated_date=date.today().strftime("%B %d, %Y"),
        preview_mode=True,
    )


@main.route("/generate", methods=["POST"])
def generate():
    os_type      = request.form.get("os_type")
    role         = request.form.get("role", "general")
    company_name = request.form.get("company_name", "").strip() or "Your Company"
    company_size = request.form.get("company_size", "small")
    software     = request.form.getlist("software")
    preparer     = request.form.get("preparer", "").strip()
    employee     = request.form.get("employee", "").strip()
    submitted    = request.form.getlist("checklist_item")
    logo_data    = _logo_data_url(request.files.get("logo"))

    if os_type not in ("windows", "macos", "remote"):
        abort(400, "Invalid OS type.")
    if role not in VALID_ROLES:
        role = "general"

    try:
        pdf_bytes = build_pdf(
            os_type=os_type,
            company_name=company_name,
            company_size=company_size,
            software=software,
            preparer=preparer,
            employee=employee,
            role=role,
            submitted_items=submitted if submitted else None,
            logo_data=logo_data,
        )
    except Exception as e:
        import traceback
        traceback.print_exc()
        return f"<pre>PDF generation failed:\n{e}</pre>", 500

    role_suffix = f"-{role.capitalize()}" if role != "general" else ""
    filename = f"IT-Onboarding-{os_type.capitalize()}{role_suffix}-Checklist.pdf"
    return send_file(
        io.BytesIO(pdf_bytes),
        mimetype="application/pdf",
        as_attachment=True,
        download_name=filename,
    )
