import os
import base64
import resend
from html import escape

_FROM = os.getenv("RESEND_FROM", "onboarding@resend.dev")
_OWNER = "cfuentesbarraza30@gmail.com"
_APP_URL = os.getenv("APP_URL", "https://it-onboarding-generator.onrender.com")

_BASE = """
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:40px 16px;">
    <tr><td align="center">
      <table width="100%" style="max-width:560px;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,.08);">

        <!-- Header -->
        <tr>
          <td style="background:#111111;padding:24px 32px;">
            <p style="margin:0;font-size:15px;font-weight:600;color:#ffffff;letter-spacing:-0.2px;">
              ⬛ IT Onboarding Generator
            </p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:32px;">
            {body}
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:20px 32px;border-top:1px solid #f0f0f0;">
            <p style="margin:0;font-size:12px;color:#999999;">
              Free &middot; Donation-supported &middot;
              <a href="{app_url}" style="color:#999999;">{app_url}</a>
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>
"""

_BTN = (
    '<a href="{url}" style="display:inline-block;margin-top:24px;padding:12px 24px;'
    'background:#111111;color:#ffffff;text-decoration:none;border-radius:8px;'
    'font-size:14px;font-weight:600;">{label}</a>'
)

_ROW = (
    '<tr>'
    '<td style="padding:6px 0;font-size:13px;color:#666666;white-space:nowrap;width:120px;">{label}</td>'
    '<td style="padding:6px 0;font-size:13px;color:#111111;font-weight:500;">{value}</td>'
    '</tr>'
)


def _render(body: str) -> str:
    return _BASE.format(body=body, app_url=_APP_URL)


def _init():
    resend.api_key = os.environ["RESEND_API_KEY"]


def send_pdf_to_user(
    to_email: str,
    pdf_bytes: bytes,
    filename: str,
    company_name: str,
    employee: str,
):
    _init()
    body = f"""
      <h2 style="margin:0 0 8px;font-size:22px;font-weight:700;color:#111111;letter-spacing:-0.5px;">
        Your checklist is ready ✓
      </h2>
      <p style="margin:0 0 24px;font-size:15px;color:#555555;line-height:1.6;">
        The IT onboarding checklist for <strong style="color:#111111;">{escape(employee)}</strong>
        at <strong style="color:#111111;">{escape(company_name)}</strong> is attached to this email.
      </p>

      <table cellpadding="0" cellspacing="0" style="width:100%;background:#f8f8f8;border-radius:8px;padding:16px 20px;margin-bottom:24px;">
        <tbody>
          {_ROW.format(label="Company", value=escape(company_name))}
          {_ROW.format(label="Employee", value=escape(employee))}
          {_ROW.format(label="File", value=escape(filename))}
        </tbody>
      </table>

      <p style="margin:0;font-size:13px;color:#888888;line-height:1.6;">
        Print it, share it, or use it as-is. If this tool saved you time today, a small
        <a href="https://ko-fi.com/cfuentesb30" style="color:#111111;">Ko-fi donation</a>
        helps keep it free for everyone.
      </p>
      {_BTN.format(url=_APP_URL + '/generator', label='Generate another checklist &rarr;')}
    """
    resend.Emails.send({
        "from": _FROM,
        "to": to_email,
        "subject": f"Your IT Onboarding Checklist — {company_name}",
        "html": _render(body),
        "attachments": [{"filename": filename, "content": base64.b64encode(pdf_bytes).decode()}],
    })


def notify_owner(
    os_type: str,
    role: str,
    company_name: str,
    employee: str,
    user_email: str | None = None,
):
    _init()
    user_row = _ROW.format(label="User email", value=escape(user_email)) if user_email else ""
    body = f"""
      <h2 style="margin:0 0 8px;font-size:20px;font-weight:700;color:#111111;letter-spacing:-0.4px;">
        New checklist generated
      </h2>
      <p style="margin:0 0 20px;font-size:14px;color:#777777;">Someone just used the IT Onboarding Generator.</p>

      <table cellpadding="0" cellspacing="0" style="width:100%;background:#f8f8f8;border-radius:8px;padding:16px 20px;">
        <tbody>
          {_ROW.format(label="Company", value=escape(company_name))}
          {_ROW.format(label="Employee", value=escape(employee))}
          {_ROW.format(label="OS", value=escape(os_type.capitalize()))}
          {_ROW.format(label="Role", value=escape(role.capitalize()))}
          {user_row}
        </tbody>
      </table>
    """
    resend.Emails.send({
        "from": _FROM,
        "to": _OWNER,
        "subject": f"⬛ New checklist — {company_name}",
        "html": _render(body),
    })


def send_suggestion(name: str, sender_email: str, message: str):
    _init()
    body = f"""
      <h2 style="margin:0 0 8px;font-size:20px;font-weight:700;color:#111111;letter-spacing:-0.4px;">
        New suggestion
      </h2>
      <p style="margin:0 0 20px;font-size:14px;color:#777777;">
        Someone sent feedback via the Suggest a feature form.
      </p>

      <table cellpadding="0" cellspacing="0" style="width:100%;background:#f8f8f8;border-radius:8px;padding:16px 20px;margin-bottom:20px;">
        <tbody>
          {_ROW.format(label="From", value=escape(name))}
          {_ROW.format(label="Email", value=escape(sender_email))}
        </tbody>
      </table>

      <p style="margin:0 0 8px;font-size:13px;font-weight:600;color:#111111;">Message</p>
      <div style="background:#f8f8f8;border-left:3px solid #111111;border-radius:0 8px 8px 0;padding:14px 18px;">
        <p style="margin:0;font-size:14px;color:#333333;line-height:1.7;white-space:pre-wrap;">{escape(message)}</p>
      </div>

      {_BTN.format(url=f'mailto:{sender_email}', label='Reply to {name} &rarr;'.format(name=escape(name)))}
    """
    resend.Emails.send({
        "from": _FROM,
        "to": _OWNER,
        "reply_to": sender_email,
        "subject": f"💬 Suggestion from {name}",
        "html": _render(body),
    })
