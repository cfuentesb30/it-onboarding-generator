# IT Onboarding Generator

A free, donation-supported Flask web app that generates custom IT onboarding checklist PDFs — tailored to OS, role, software stack, and company size. Fill in the form, preview, edit, share, and download a print-ready PDF in under a minute.

**Live:** [it-onboarding-generator.onrender.com](https://it-onboarding-generator.onrender.com)  
**Support:** [ko-fi.com/cfuentesb30](https://ko-fi.com/cfuentesb30)  
**About:** [/about](https://it-onboarding-generator.onrender.com/about)

---

## What it does

- Generates a step-by-step IT onboarding checklist as a PDF
- Tailored to **Windows, macOS, or remote** employee setup
- **8 role-specific templates** — General, Developer, Designer, Sales, HR, Finance, Marketing, Operations
- Includes only the software you actually use (Office, Slack, Zoom, VPN, etc.)
- **Editable checklist** — remove items or add your own before generating
- **Live preview** — see the checklist before downloading the PDF
- **Shareable links** — share a pre-filled checklist with configurable expiry
- **Company logo upload** — logo appears on the PDF header
- **Pre-download donation prompt** — "Download my PDF" opens Ko-fi in a new tab then downloads; "No thanks" skips straight to download
- Security steps (MFA, antivirus, password policy) built into every checklist
- Branded with your company name, employee name, and date
- **English / Spanish / Portuguese / French** language toggle — persists across pages; all UI strings translated including dynamic checklist content
- First-visit language picker — asks users to choose their language on arrival
- **Email delivery** — optional field to receive the PDF directly in your inbox (powered by Resend)
- Mobile-friendly — works on phones and tablets
- No account, no signup — instant download

---

## Pages

| Route | Description |
|---|---|
| `/` | Landing page |
| `/about` | About the project and the person behind it |
| `/generator` | Checklist form — OS, role, software, edit, preview, generate, share |
| `/generator?s=<token>` | Pre-filled form loaded from a share link |
| `/items` | JSON endpoint — returns checklist items for OS + role + software |
| `/preview` | POST endpoint — renders HTML checklist preview |
| `/generate` | POST endpoint — builds and returns the PDF |

---

## Features

### Role-specific templates

| Role | Extra sections |
|---|---|
| General | None — standard IT setup only |
| Developer | Dev environment, Git/SSH, CI/CD, cloud access |
| Designer | Figma/Adobe setup, brand assets, design workflow |
| Sales | CRM, sales tools, territory and pipeline setup |
| HR | HRIS, compliance training, people ops access |
| Finance | ERP access, reporting tools, compliance controls |
| Marketing | Marketing stack, brand assets, analytics setup |
| Operations | Ops tools, vendor management, process docs |

### Editable checklist
Before generating, a live checklist appears in the form. You can:
- Remove any item with the × button
- Add custom items via the text field
- Reload the list if you change OS, role, or software

### Checklist preview
Click **Preview Checklist** to see a formatted HTML view of all items before downloading.

### Shareable links
Click **Share checklist** to open a modal. Choose how long the link stays active:

| Expiry option | Duration |
|---|---|
| 1 hour | Short-lived, single handoff |
| 24 hours | Day-long sharing window |
| 48 hours | Two-day window |
| 1 week | Extended access |
| No expiry | Permanent link |

The full form state — OS, role, software, names, and any custom or removed items — is encoded directly in the URL. No database needed. Opening an expired link shows a clear message instead of a broken form.

### Company logo upload
Upload a PNG, JPG, or SVG in Step 1 of the form. The logo is embedded in the PDF header next to the company name — no server storage, converted to base64 at generation time.

### Pre-download donation prompt
When the user clicks **Generate PDF**, a Ko-fi support card appears before the download:
- **Download my PDF** — opens Ko-fi in a new tab, then downloads the PDF
- **No thanks, just download** — skips Ko-fi and downloads immediately

Fully translated in all 4 languages.

### First-visit language picker
On first visit (no language saved), a full-screen modal asks users to choose between English, Spanish, Portuguese, or French. The choice is saved to `localStorage` and never shown again.

### EN / ES / PT / FR language toggle
Header button cycles between English, Spanish, Portuguese (PT-BR), and French. Saved in `localStorage`. Full coverage includes all static labels, form placeholders, dropdown options, OS/role card descriptions, dynamic checklist states (loading, error, empty, item count), and section titles generated in JavaScript.

### Email delivery
An optional email field in Step 1 lets users receive the PDF directly in their inbox. Powered by [Resend](https://resend.com). Three email types are sent:

| Email | Recipient | Trigger |
|---|---|---|
| Checklist delivery | User (if email provided) | Every PDF generation |
| Owner notification | `OWNER_EMAIL` env var | Every PDF generation |
| Suggestion | Owner | Suggest a feature form submission |

All emails use a branded HTML template with the app header, summary table, and CTA button. To enable, set the `RESEND_API_KEY` and optionally `RESEND_FROM` environment variables.

---

## Business model

This tool is **free and donation-supported**. It's built and maintained by a solo developer. Every donation goes directly toward keeping the infrastructure running and expanding what the tool can do.

Support the project: [ko-fi.com/cfuentesb30](https://ko-fi.com/cfuentesb30)

---

## Tech stack

| Layer | Tech |
|---|---|
| Backend | Python 3 · Flask |
| PDF generation | WeasyPrint 60.0 |
| Templates | Jinja2 |
| Styling | Vanilla CSS (Inter font) |
| i18n | Vanilla JS (`i18n.js`) — EN, ES, PT, FR |
| Checklists | YAML files per OS + role |
| Share links | Base64-encoded JSON with embedded expiry timestamp |
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
# Optional: add RESEND_API_KEY to .env to enable email delivery

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

## Docker

```bash
docker build -t it-onboarding-generator .
docker run -p 5000:5000 it-onboarding-generator
```

---

## Project structure

```
it-onboarding-generator/
├── app/
│   ├── __init__.py
│   ├── routes.py              # URL routes, share token decode, /items, /preview, /about
│   ├── pdf_generator.py       # YAML loading, role merging, PDF build
│   ├── email.py               # Branded HTML email templates (Resend)
│   ├── templates/
│   │   ├── base.html          # Shared layout, header nav, language toggle, first-visit picker
│   │   ├── home.html          # Landing page + donation support section
│   │   ├── about.html         # About the project and author
│   │   ├── index.html         # Generator form + pre-download overlay + share modal
│   │   └── pdf_checklist.html # PDF output template (logo, sections, sign-off)
│   └── static/
│       ├── css/style.css
│       └── js/i18n.js         # EN/ES/PT/FR translations and toggle logic
├── checklists/
│   ├── windows.yaml
│   ├── macos.yaml
│   ├── remote.yaml
│   └── roles/
│       ├── general.yaml
│       ├── developer.yaml
│       ├── designer.yaml
│       ├── sales.yaml
│       ├── hr.yaml
│       ├── finance.yaml
│       ├── marketing.yaml
│       └── operations.yaml
├── Dockerfile
├── render.yaml
├── requirements.txt
└── run.py
```

---

## How checklist generation works

1. User fills in company info, selects OS, role, software, and optionally uploads a logo
2. `/items` loads the OS YAML + role YAML and merges them into a live checklist
3. User can edit items in the browser — removals and additions tracked in JS state
4. On submit, a pre-download Ko-fi card appears
5. **Download my PDF** opens Ko-fi in a new tab then submits the form; **No thanks** submits directly
6. `pdf_generator.py` uses submitted items if present, otherwise falls back to YAML defaults
7. WeasyPrint renders the Jinja2 PDF template to bytes; Flask sends it as a download
8. If `RESEND_API_KEY` is set: owner is notified via email; user receives the PDF if they provided an email address

## How share links work

1. User clicks **Share checklist** and picks an expiry duration
2. JS encodes the full form state + expiry Unix timestamp as base64 JSON
3. The resulting URL is `/generator?s=<token>` — no server storage required
4. When the link is opened, Flask decodes the token and checks the timestamp
5. If valid: the form pre-fills and the checklist loads with all customizations intact
6. If expired: a banner informs the user the link is no longer active

---

## Deployment

Deployed on [Render](https://render.com) via Docker. Config in `render.yaml`.

To deploy your own: fork the repo, connect it to Render, and it auto-deploys on push to `main`.

---

## Roadmap

- [x] Role-specific checklist templates (Developer, Designer, Sales, HR)
- [x] Editable checklist items before generating
- [x] Live checklist preview before PDF download
- [x] EN / ES / PT / FR language toggle
- [x] First-visit language picker
- [x] Mobile-responsive layout
- [x] Shareable links with configurable expiry (1h / 24h / 48h / 1wk / no expiry)
- [x] More roles — Finance, Marketing, Operations (8 total)
- [x] Company logo upload on the PDF
- [x] Pre-download Ko-fi donation prompt
- [x] About page
- [x] Donation-based model — Ko-fi integration
- [x] Email delivery — PDF sent to user's inbox + owner notification on every generate (Resend)
- [x] Branded HTML email templates — consistent styling across all three email types
- [x] Full i18n coverage — all UI strings translated including JS-generated content
- [ ] V2 — Flask generator with custom software stacks and more advanced PDF layouts
