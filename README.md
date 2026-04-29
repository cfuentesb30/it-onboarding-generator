# IT Onboarding Generator

> Stop setting up new employees from memory. Fill in the form, download a print-ready IT checklist PDF — tailored to your OS, role, and software stack. Free. No account. No friction.

**Live:** [it-onboarding-generator.onrender.com](https://it-onboarding-generator.onrender.com)  
**Built by:** [Carlos Fuentes](https://www.linkedin.com/in/cfuentes30) · Honduras  
**Support:** [ko-fi.com/cfuentesb30](https://ko-fi.com/cfuentesb30)

---

## What it does

A free, open-source Flask web app that generates custom IT onboarding checklist PDFs in under a minute.

- Tailored to **Windows, macOS, Linux, or remote** employee setup
- **8 role-specific templates** — General, Developer, Designer, Sales, HR, Finance, Marketing, Operations
- Includes only the software you actually use — Office, Slack, Zoom, VPN, and more
- **Editable checklist** — remove items or add your own before generating
- **Live preview** — see the checklist before downloading the PDF
- **Shareable links** — share a pre-filled checklist with configurable expiry
- **Company logo upload** — embedded in the PDF header at generation time
- Security steps (MFA, antivirus, password policy) built into every checklist
- **EN / ES / PT / FR** — full UI translation including all dynamic content
- **Email delivery** — optional field to receive the PDF directly in your inbox (Resend)
- Mobile-friendly, no account, no signup

---

## Pages

| Route | Description |
|---|---|
| `/` | Landing page |
| `/generator` | Checklist form — OS, role, software, edit, preview, generate, share |
| `/generator?s=<token>` | Pre-filled form loaded from a share link |
| `/about` | About the project |
| `/suggest` | Suggest a feature |
| `/items` | JSON endpoint — checklist items for a given OS + role + software |
| `/preview` | POST — HTML checklist preview |
| `/generate` | POST — builds and returns the PDF |

---

## Features

### Role-specific templates

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
Before generating, a live checklist loads in the form. You can remove any item, add custom items, or reload if you change OS, role, or software.

### Live preview
Click **Preview Checklist** to open a formatted HTML view of all items before downloading.

### Shareable links
Encodes the full form state — OS, role, software, names, custom/removed items — as base64 JSON in the URL. No database required. Configurable expiry: 1h / 24h / 48h / 1 week / no expiry.

### Company logo upload
PNG, JPG, or SVG. Converted to base64 at generation time — never stored on the server.

### Email delivery
Optional email field sends the PDF to the user's inbox. Powered by [Resend](https://resend.com).

| Email | Recipient | Trigger |
|---|---|---|
| Checklist delivery | User (if email provided) | Every PDF generation |
| Owner notification | `OWNER_EMAIL` env var | Every PDF generation |
| Suggestion | Owner | Suggest a feature form submission |

### i18n — EN / ES / PT / FR
Full translation coverage: static labels, placeholders, dropdown options, OS/role card descriptions, dynamic checklist states (loading, error, empty, item count), and JS-generated section titles. Language saved to `localStorage`, with a first-visit picker on arrival.

---

## Tech stack

| Layer | Tech |
|---|---|
| Backend | Python 3 · Flask |
| PDF generation | WeasyPrint |
| Templates | Jinja2 |
| Styling | Vanilla CSS (Inter font) |
| i18n | Vanilla JS (`i18n.js`) |
| Checklists | YAML files per OS + role |
| Share links | Base64-encoded JSON with embedded expiry |
| Email | Resend API |
| Deployment | Render (Docker) |

---

## Local setup

**Requirements:** Python 3.11+, WeasyPrint system dependencies

```bash
git clone https://github.com/cfuentesb30/it-onboarding-generator.git
cd it-onboarding-generator

pip install -r requirements.txt

cp .env.example .env
# Edit .env — add RESEND_API_KEY and OWNER_EMAIL to enable email

python run.py
```

App runs at `http://localhost:5000`.

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
| `SECRET_KEY` | Yes | Flask secret key |
| `RESEND_API_KEY` | No | Enables email delivery (Resend) |
| `RESEND_FROM` | No | Sender address after domain verification |
| `OWNER_EMAIL` | No | Email that receives owner notifications |
| `APP_URL` | No | Base URL for email CTA links (default: Render URL) |

---

## Docker

```bash
docker build -t it-onboarding-generator .
docker run -p 5000:5000 --env-file .env it-onboarding-generator
```

---

## Deploy your own

Fork the repo, connect it to [Render](https://render.com), set your environment variables, and it auto-deploys on push to `main`. Config is in `render.yaml`.

---

## Project structure

```
it-onboarding-generator/
├── app/
│   ├── __init__.py
│   ├── routes.py              # URL routes, share token decode
│   ├── pdf_generator.py       # YAML loading, role merging, PDF build
│   ├── email.py               # Branded HTML email templates (Resend)
│   ├── templates/
│   │   ├── base.html          # Shared layout, nav, lang toggle, OG tags
│   │   ├── home.html          # Landing page
│   │   ├── about.html         # About page
│   │   ├── index.html         # Generator form, preview, share modal
│   │   ├── suggest.html       # Feature suggestion form
│   │   └── pdf_checklist.html # PDF output template
│   └── static/
│       ├── css/style.css
│       └── js/i18n.js         # EN/ES/PT/FR translations + t() helper
├── checklists/
│   ├── windows.yaml
│   ├── macos.yaml
│   ├── linux.yaml
│   ├── remote.yaml
│   ├── custom.yaml
│   └── roles/
│       ├── general.yaml
│       ├── developer.yaml
│       ├── designer.yaml
│       ├── sales.yaml
│       ├── hr.yaml
│       ├── finance.yaml
│       ├── marketing.yaml
│       └── operations.yaml
├── .env.example
├── Dockerfile
├── render.yaml
├── requirements.txt
└── run.py
```

---

## How it works

**PDF generation**
1. User fills in company info, selects OS, role, software, optional logo
2. `/items` fetches and merges the OS + role YAML checklists
3. User edits items in the browser — changes tracked in JS state
4. On submit, a Ko-fi donation card appears before the download
5. **Download my PDF** opens Ko-fi in a new tab then downloads; **No thanks** skips directly
6. `pdf_generator.py` renders the checklist to PDF via WeasyPrint
7. Flask sends the file as a download; Resend emails are dispatched in a background thread

**Share links**
1. JS encodes the full form state + expiry timestamp as base64 JSON
2. URL becomes `/generator?s=<token>` — no server storage needed
3. On load, Flask decodes the token, checks expiry, and pre-fills the form

---

## Contributing

Issues and pull requests are welcome. If you want to add a new role, checklist section, or language — open an issue first so we can align on scope.

To add a new role: create `checklists/roles/<role>.yaml` following the existing format, then add the role to `ROLE_OPTIONS` in `routes.py`.

To add a new language: add a translation block to `app/static/js/i18n.js` and a button to the language picker in `base.html`.

---

## Roadmap

- [x] Role-specific checklist templates
- [x] Editable checklist before generating
- [x] Live preview before download
- [x] EN / ES / PT / FR full i18n
- [x] First-visit language picker
- [x] Mobile-responsive layout
- [x] Shareable links with configurable expiry
- [x] Company logo upload
- [x] Pre-download Ko-fi donation prompt
- [x] Email delivery via Resend
- [x] Branded HTML email templates
- [x] Open Graph / Twitter card meta tags
- [x] Open source
- [ ] OG image for social link previews
- [ ] V2 — dynamic generator with custom software stacks

---

## License

MIT — free to use, fork, and self-host. If this saves you time, a [Ko-fi donation](https://ko-fi.com/cfuentesb30) is always appreciated.
