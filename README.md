# IT Onboarding Generator

> Stop setting up new employees from memory. Fill in the form, download a print-ready IT checklist PDF tailored to your OS, role, and software stack. Free. No account. No friction.

**Live:** [it-onboarding-generator.onrender.com](https://it-onboarding-generator.onrender.com)  
**Built by:** [Carlos Fuentes](https://www.linkedin.com/in/cfuentes30) · Honduras  
**Support:** [ko-fi.com/cfuentesb30](https://ko-fi.com/cfuentesb30)

---

## What it does

A free, open-source Flask web app that generates custom IT onboarding checklist PDFs in under a minute.

- Tailored to **Windows, macOS, Linux, or remote/BYOD** setups, plus a free-text **Custom** OS
- **8 role templates** (General, Developer, Designer, Sales, HR, Finance, Marketing, Operations) plus a free-text **Custom** role
- Includes only the software you actually use, with suggestions per group and free-text entries for anything missing
- **Editable checklist**: remove items, edit them inline, or add your own before generating
- **Shareable links** that pre-fill the whole form, with configurable expiry
- **Company logo** embedded in the PDF header, never stored on the server
- Security steps (MFA, antivirus, password policy) built into every checklist
- **Email delivery**: optionally receive the PDF in your inbox
- **EN / ES / PT / FR** UI, light/dark theme, mobile-friendly
- No account, no signup, no database

---

## Pages and endpoints

| Route | Method | Description |
|---|---|---|
| `/` | GET | Landing page |
| `/generator` | GET | Checklist form: OS, role, software, edit, generate, share |
| `/generator?s=<token>` | GET | Form pre-filled from a share link |
| `/about` | GET | About the project and privacy details |
| `/suggest` | GET/POST | Suggest a feature |
| `/items` | GET | JSON: merged checklist items for an OS + role + software selection |
| `/preview` | POST | HTML render of the checklist |
| `/generate` | POST | Builds and returns the PDF |
| `/healthz` | GET | Health check |

---

## Features

### Role templates

| Role | Extra sections |
|---|---|
| General | Standard IT setup only |
| Developer | Dev environment, Git/SSH, CI/CD, cloud access |
| Designer | Figma/Adobe setup, brand assets, design workflow |
| Sales | CRM, sales tools, territory and pipeline setup |
| HR | HRIS, compliance training, people ops access |
| Finance | ERP access, reporting tools, compliance controls |
| Marketing | Marketing stack, brand assets, analytics setup |
| Operations | Ops tools, vendor management, process docs |

### Editable checklist
As soon as you pick an OS, role, and software, the checklist loads in the form and updates live as you change your selections. Remove any item, edit its text, or add custom items. What you see is exactly what ends up in the PDF.

### Shareable links
The full form state (OS, role, software, names, custom and removed items) is encoded as base64 JSON in the URL, so no server storage is needed. Expiry options: 1h / 24h / 48h / 1 week / never.

### Company logo
PNG, JPG, GIF, or WebP, checked by file signature rather than extension. The logo is converted to base64 in memory at generation time and never written to disk.

### Email delivery
An optional email field sends the PDF to your inbox, powered by [Resend](https://resend.com). Right before the download, a short popup gives you a last chance to add or change that address (or clear it to skip the email), alongside a small Ko-fi link. It can be dismissed with × or Escape.

| Email | Recipient | Trigger |
|---|---|---|
| Checklist delivery | User (if an email was provided) | Every PDF generation |
| Owner notification | `OWNER_EMAIL` | Every PDF generation |
| Suggestion | `OWNER_EMAIL` | Suggest-a-feature form |

### Languages
Full EN / ES / PT / FR coverage: labels, placeholders, dropdowns, OS/role descriptions, dynamic checklist states, and JS-generated section titles. A language picker appears on the first visit and the choice is saved in `localStorage`.

### Abuse protection
Per-IP rate limits on `/generate`, `/preview`, `/items`, and `/suggest` (Flask-Limiter), with user input escaped before it reaches the PDF or email templates.

---

## Tech stack

| Layer | Tech |
|---|---|
| Backend | Python 3.11 · Flask · Flask-Limiter |
| PDF generation | WeasyPrint |
| Templates | Jinja2 |
| Styling | Vanilla CSS (custom-property light/dark theming, Inter font) |
| i18n | Vanilla JS (`i18n.js`) |
| Checklists | YAML files per OS and per role |
| Share links | Base64-encoded JSON with embedded expiry |
| Email | Resend API |
| Deployment | Render (Docker, gunicorn) |

---

## Local setup

**Requirements:** Python 3.11+ and the WeasyPrint system libraries.

```bash
git clone https://github.com/cfuentesb30/it-onboarding-generator.git
cd it-onboarding-generator

python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

cp .env.example .env
# Edit .env and add RESEND_API_KEY and OWNER_EMAIL to enable email

python run.py
```

The app runs at `http://localhost:5000`.

### WeasyPrint system deps (Ubuntu/Debian)

```bash
sudo apt-get install libpango-1.0-0 libpangoft2-1.0-0 libfontconfig1 libfreetype6
```

### WeasyPrint system deps (macOS)

```bash
brew install pango fontconfig freetype
```

---

## Environment variables

| Variable | Required | Description |
|---|---|---|
| `SECRET_KEY` | Yes | Flask secret key. If unset, a random per-process key is used and a warning is logged. |
| `RESEND_API_KEY` | No | Enables email delivery. Without it, no emails are sent. |
| `RESEND_FROM` | No | Sender address on a domain verified in Resend. Defaults to Resend's sandbox sender, which only delivers to the Resend account owner. |
| `OWNER_EMAIL` | No | Receives owner notifications and feature suggestions |
| `APP_URL` | No | Base URL used in email links (defaults to the Render URL) |

---

## Docker

```bash
docker build -t it-onboarding-generator .
docker run -p 5000:10000 --env-file .env it-onboarding-generator
```

The container listens on port 10000 (Render's default), so the command above serves it at `http://localhost:5000`.

---

## Deploy your own

Fork the repo, connect it to [Render](https://render.com), and set your environment variables. Render auto-deploys on every push to `main`. The service config is in `render.yaml`.

---

## Project structure

```
it-onboarding-generator/
├── app/
│   ├── __init__.py            # App factory, rate limiter, proxy config
│   ├── routes.py              # Routes, share token decode, upload checks
│   ├── pdf_generator.py       # YAML loading, OS + role merging, PDF build
│   ├── email.py               # HTML email templates (Resend)
│   ├── templates/
│   │   ├── base.html          # Shared layout, nav, language + theme toggles, OG tags
│   │   ├── home.html          # Landing page
│   │   ├── about.html         # About / privacy page
│   │   ├── index.html         # Generator form, checklist editor, share + download popups
│   │   ├── suggest.html       # Feature suggestion form
│   │   ├── error.html         # Friendly error page
│   │   └── pdf_checklist.html # PDF output template
│   └── static/
│       ├── css/style.css
│       ├── js/i18n.js         # EN/ES/PT/FR translations + t() helper
│       └── og-image.png       # Social preview image
├── checklists/
│   ├── windows.yaml · macos.yaml · linux.yaml · remote.yaml · custom.yaml
│   └── roles/
│       ├── general.yaml · developer.yaml · designer.yaml · sales.yaml
│       └── hr.yaml · finance.yaml · marketing.yaml · operations.yaml
├── .env.example
├── Dockerfile
├── render.yaml
├── requirements.txt
└── run.py
```

---

## How it works

**PDF generation**
1. The user fills in company info and picks an OS, role, software, and an optional logo.
2. `/items` loads and merges the OS and role YAML checklists, filtered by the selected software.
3. The user edits the checklist in the browser.
4. On submit, the download popup appears (email confirmation + optional Ko-fi link).
5. `pdf_generator.py` renders the checklist to PDF with WeasyPrint.
6. Flask returns the file as a download; Resend emails go out in a background thread.

**Share links**
1. The browser encodes the full form state plus an expiry timestamp as base64 JSON.
2. The URL becomes `/generator?s=<token>`, with nothing stored on the server.
3. On load, Flask decodes the token, checks the expiry, and pre-fills the form.

---

## Contributing

Issues and pull requests are welcome. If you want to add a role, checklist section, or language, please open an issue first so we can agree on scope.

- **New role:** create `checklists/roles/<role>.yaml` following the existing format, then add it to `ROLE_OPTIONS` in `app/routes.py`.
- **New OS:** create `checklists/<os>.yaml`, then add it to `OS_OPTIONS` and `VALID_OS` in `app/routes.py`.
- **New language:** add a translation block to `app/static/js/i18n.js` and a button to the language picker in `base.html`.

---

## Roadmap

- [x] Role-specific checklist templates
- [x] Editable checklist before generating
- [x] Linux and custom OS / custom role options
- [x] EN / ES / PT / FR translations with first-visit language picker
- [x] Shareable links with configurable expiry
- [x] Company logo upload
- [x] Email delivery with branded HTML templates
- [x] Open Graph / Twitter card previews
- [x] Light / dark theme
- [ ] Custom domain with a verified email sender
- [ ] More checklist templates and software integrations

---

## License

MIT. Free to use, fork, and self-host. If this saves you time, a [Ko-fi donation](https://ko-fi.com/cfuentesb30) is always appreciated.
