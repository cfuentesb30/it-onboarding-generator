import os
import base64
import resend

_FROM = os.getenv("RESEND_FROM", "onboarding@resend.dev")
_OWNER = "cfuentesbarraza30@gmail.com"


def _init():
    resend.api_key = os.environ["RESEND_API_KEY"]


def send_pdf_to_user(to_email: str, pdf_bytes: bytes, filename: str, company_name: str, employee: str):
    _init()
    resend.Emails.send({
        "from": _FROM,
        "to": to_email,
        "subject": f"IT Onboarding Checklist — {company_name}",
        "html": (
            f"<h2>Your IT Onboarding Checklist is ready</h2>"
            f"<p>Attached is the checklist for <strong>{employee}</strong> at <strong>{company_name}</strong>.</p>"
            f"<p>— IT Onboarding Generator</p>"
        ),
        "attachments": [{"filename": filename, "content": base64.b64encode(pdf_bytes).decode()}],
    })


def notify_owner(os_type: str, role: str, company_name: str, employee: str, user_email: str | None = None):
    _init()
    email_line = f"<p><strong>User email:</strong> {user_email}</p>" if user_email else ""
    resend.Emails.send({
        "from": _FROM,
        "to": _OWNER,
        "subject": f"New checklist generated — {company_name}",
        "html": (
            f"<h3>New checklist generated</h3>"
            f"<p><strong>Company:</strong> {company_name}</p>"
            f"<p><strong>Employee:</strong> {employee}</p>"
            f"<p><strong>OS:</strong> {os_type}</p>"
            f"<p><strong>Role:</strong> {role}</p>"
            f"{email_line}"
        ),
    })


def send_suggestion(name: str, sender_email: str, message: str):
    _init()
    resend.Emails.send({
        "from": _FROM,
        "to": _OWNER,
        "reply_to": sender_email,
        "subject": f"Suggestion from {name}",
        "html": (
            f"<h3>New suggestion</h3>"
            f"<p><strong>From:</strong> {name} ({sender_email})</p>"
            f"<p><strong>Message:</strong></p>"
            f"<blockquote>{message}</blockquote>"
        ),
    })
