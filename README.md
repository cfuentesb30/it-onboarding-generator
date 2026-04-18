# IT Onboarding Generator

A Flask web app that generates custom IT onboarding checklist PDFs — tailored to OS, role, software stack, and company size. Fill in the form, edit the checklist, download a print-ready PDF instantly.

**Live:** [it-onboarding-generator.onrender.com](https://it-onboarding-generator.onrender.com)

---

## What it does

- Generates a step-by-step IT onboarding checklist as a PDF
- Tailored to **Windows, macOS, or remote** employee setup
- **Role-specific sections** for Developer, Designer, Sales, and HR
- Includes only the software you actually use (Office, Slack, Zoom, VPN, etc.)
- **Editable checklist** — remove items you don't need or add your own before generating
- Security steps (MFA, antivirus, password policy) built in to every checklist
- Branded with your company name, employee name, and date
- **English / Spanish** language toggle — persists across pages
- No account, no signup — instant download

---

## Pages

| Route | Description |
|---|---|
| `/` | Landing page explaining the service |
| `/generator` | Checklist form — OS, role, software, edit, generate |
| `/items` | JSON endpoint — returns checklist items for given OS + role + software |
| `/generate` | POST endpoint — builds and returns the PDF |

---

## Features

### Role-specific templates
Select the employee's role and the checklist gains additional role-specific sections on top of the OS base:

| Role | Extra sections |
|---|---|
| General | None — standard IT setup only |
| Developer | Dev environment, Git/SSH, CI/CD, cloud access |
| Designer | Figma/Adobe setup, brand assets, design workflow |
| Sales | CRM, sales tools, territory and pipeline setup |
| HR | HRIS, compliance training, people ops access |

### Editable checklist
Before generating, the form shows a live preview of all checklist items. You can:
- Remove any item with the × button
- Add custom items via the text field
- Reload the preview if you change OS, role, or software

### EN / ES language toggle
A button in the header switches between English and Spanish across all pages. The choice is saved in `localStorage`.

---

## Tech stack

| Layer | Tech |
|---|---|
| Backend | Python 3 · Flask |
| PDF generation | WeasyPrint 60.0 |
| Templates | Jinja2 |
| Styling | Vanilla CSS (Inter font) |
| i18n | Vanilla JS (`i18n.js`) |
| Checklists | YAML files per OS + role |
| Deployment | Render (Docker) |

---

## Local setup

**Requirements:** Python 3.11+, WeasyPrint system dependencies

```bash
# Clone
git clone https://github.com/cfuentesb30/it-onboarding-generator.git
cd it-onboarding-generator

# Install Python deps
pip install -r requirements.txt

# Copy env file
cp .env.example .env

# Run
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
│   ├── routes.py              # URL routes, form options, /items endpoint
│   ├── pdf_generator.py       # YAML loading, role merging, PDF build
│   ├── templates/
│   │   ├── base.html          # Shared layout, header, language toggle
│   │   ├── home.html          # Landing page
│   │   ├── index.html         # Generator form (5-step UI)
│   │   └── pdf_checklist.html # PDF output template
│   └── static/
│       ├── css/style.css
│       └── js/i18n.js         # EN/ES translations and toggle logic
├── checklists/
│   ├── windows.yaml           # Base OS checklist
│   ├── macos.yaml
│   ├── remote.yaml
│   └── roles/
│       ├── general.yaml       # No extra sections
│       ├── developer.yaml     # Dev environment, Git, CI/CD, cloud
│       ├── designer.yaml      # Figma, brand assets, design workflow
│       ├── sales.yaml         # CRM, sales tools, territory setup
│       └── hr.yaml            # HRIS, compliance, people ops
├── Dockerfile
├── render.yaml                # Render deployment config
├── requirements.txt
└── run.py
```

---

## How checklist generation works

1. User selects OS, role, company size, and software
2. `/items` endpoint loads the OS YAML + role YAML and merges them (role sections inserted before Final Verification)
3. User can edit items in the browser — removals and custom additions are tracked in JS
4. On submit, the final item list is encoded as hidden form inputs
5. `pdf_generator.py` uses the submitted items if present, otherwise falls back to the YAML defaults
6. WeasyPrint renders the Jinja2 PDF template to bytes and Flask sends it as a download

---

## Deployment

Deployed on [Render](https://render.com) via Docker. Config is in `render.yaml`.

To deploy your own instance: fork the repo, connect it to Render, and it will build and deploy automatically on push to `main`.

---

## Roadmap

- [x] Role-specific checklist templates (Developer, Designer, Sales, HR)
- [x] Editable checklist items before generating
- [x] EN/ES language toggle
- [ ] Preview before PDF download
- [ ] Email delivery option
- [ ] More roles (Finance, Marketing, Operations)
- [ ] Saved templates / shareable checklist URLs
