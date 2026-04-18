from flask import Blueprint, render_template, request, send_file, abort
from .pdf_generator import build_pdf
import io

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

@main.route("/", methods=["GET"])
def home():
    return render_template("home.html")

@main.route("/generator", methods=["GET"])
def index():
    return render_template(
        "index.html",
        os_options=OS_OPTIONS,
        software_options=SOFTWARE_OPTIONS,
        company_sizes=COMPANY_SIZES,
    )

@main.route("/generate", methods=["POST"])
def generate():
    os_type      = request.form.get("os_type")
    company_name = request.form.get("company_name", "").strip() or "Your Company"
    company_size = request.form.get("company_size", "small")
    software     = request.form.getlist("software")
    preparer     = request.form.get("preparer", "").strip()
    employee     = request.form.get("employee", "").strip()

    if os_type not in ("windows", "macos", "remote"):
        abort(400, "Invalid OS type.")

    try:
        pdf_bytes = build_pdf(
            os_type=os_type,
            company_name=company_name,
            company_size=company_size,
            software=software,
            preparer=preparer,
            employee=employee,
        )
    except Exception as e:
        import traceback
        traceback.print_exc()
        return f"<pre>PDF generation failed:\n{e}</pre>", 500

    filename = f"IT-Onboarding-{os_type.capitalize()}-Checklist.pdf"
    return send_file(
        io.BytesIO(pdf_bytes),
        mimetype="application/pdf",
        as_attachment=True,
        download_name=filename,
    )
