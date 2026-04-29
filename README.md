# IT Onboarding Generator

A Flask web app that generates custom IT onboarding checklist PDFs — tailored to OS, role, software stack, and company size. Fill in the form, preview, edit, and download a print-ready PDF in under a minute.

**Live:** [it-onboarding-generator.onrender.com](https://it-onboarding-generator.onrender.com)

---

## What it does

- Generates a step-by-step IT onboarding checklist as a PDF
- Tailored to **Windows, macOS, or remote** employee setup
- **Role-specific sections** for Developer, Designer, Sales, and HR
- Includes only the software you actually use (Office, Slack, Zoom, VPN, etc.)
- **Editable checklist** — remove items or add your own before generating
- **Live preview** — see the checklist before downloading the PDF
- Security steps (MFA, antivirus, password policy) built into every checklist
- Branded with your company name, employee name, and date
- **English / Spanish** language toggle — persists across pages
- Mobile-friendly — works on phones and tablets
- No account, no signup — instant download

---

## Pages

| Route | Description |
|---|---|
| `/` | Landing page |
| `/generator` | Checklist form — OS, role, software, edit, generate |
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

### Editable checklist
Before generating, a live checklist appears in the form. You can:
- Remove any item with the × button
- Add custom items via the text field
- Reload the list if you change OS, role, or software

### Checklist preview
Click **Preview Checklist** to see a formatted HTML view of all items before committing to a PDF download.

### EN / ES language toggle
Header button switches all UI text between English and Spanish. Saved in `localStorage`.

---

## Tech stack

| Layer | Tech |
|---|---|
| Backend | Python 3 · Flask |
| PDF generation | WeasyPrint 60.0 |
| Templates | Jinja2 |
| Styling | Vanilla CSS (Inter font, Slate + Indigo palette) |
| i18n | Vanilla JS (`i18n.js`) |
| Checklists | YAML files per OS + role |
| Deployment | Render (Docker) |

---

## Local setup

**Requirements:** Python 3.11+, WeasyPrint system dependencies

```bash
git clone https://github.com/cfuentesb30/it-onboarding-generator.git
cd it-onboarding-generator

pip install -r requirements.txt

cp .env.example .env

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
│   ├── routes.py              # URL routes, form options, /items and /preview endpoints
│   ├── pdf_generator.py       # YAML loading, role merging, PDF build
│   ├── templates/
│   │   ├── base.html          # Shared layout, header, language toggle
│   │   ├── home.html          # Landing page
│   │   ├── index.html         # Generator form
│   │   └── pdf_checklist.html # PDF output template
│   └── static/
│       ├── css/style.css
│       └── js/i18n.js         # EN/ES translations and toggle logic
├── checklists/
│   ├── windows.yaml
│   ├── macos.yaml
│   ├── remote.yaml
│   └── roles/
│       ├── general.yaml
│       ├── developer.yaml
│       ├── sales.yaml
│       ├── designer.yaml
│       └── hr.yaml
├── Dockerfile
├── render.yaml
├── requirements.txt
└── run.py
```

---

## How checklist generation works

1. User selects OS, role, company size, and software
2. `/items` loads the OS YAML + role YAML and merges them (role sections inserted before Final Verification)
3. User can edit items in the browser — removals and additions tracked in JS
4. On submit, the final item list is encoded as hidden form inputs
5. `pdf_generator.py` uses submitted items if present, otherwise falls back to YAML defaults
6. WeasyPrint renders the Jinja2 PDF template to bytes; Flask sends it as a download

---

## Deployment

Deployed on [Render](https://render.com) via Docker. Config in `render.yaml`.

To deploy your own: fork the repo, connect it to Render, and it auto-deploys on push to `main`.

---

## Roadmap

- [x] Role-specific checklist templates (Developer, Designer, Sales, HR)
- [x] Editable checklist items before generating
- [x] Live checklist preview before PDF download
- [x] EN/ES language toggle
- [x] Mobile-responsive layout
- [ ] Email delivery option
- [ ] More roles (Finance, Marketing, Operations)
- [ ] Saved templates / shareable checklist URLs
- [ ] Company logo upload on the PDF
- [ ] More languages (Portuguese, French)
