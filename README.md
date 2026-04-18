# IT Onboarding Generator

A Flask web app that generates custom IT onboarding checklist PDFs — tailored to your OS, software stack, and company size. Fill in the form, click generate, download a print-ready PDF.

**Live:** [it-onboarding-generator.onrender.com](https://it-onboarding-generator.onrender.com)

---

## What it does

- Generates a step-by-step IT onboarding checklist as a PDF
- Tailored to Windows, macOS, or remote employee setup
- Includes only the software you actually use (Office, Slack, Zoom, VPN, etc.)
- Security steps (MFA, antivirus, password policy) built in
- Branded with your company name, employee name, and date
- No account, no signup — instant download

---

## Pages

| Route | Description |
|---|---|
| `/` | Landing page explaining the service |
| `/generator` | Checklist form — fill in and generate |
| `/generate` | POST endpoint — returns the PDF |

---

## Tech stack

| Layer | Tech |
|---|---|
| Backend | Python 3 · Flask |
| PDF generation | WeasyPrint 60.0 |
| Templates | Jinja2 |
| Styling | Vanilla CSS (Inter font) |
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
│   ├── routes.py          # URL routes and form options
│   ├── pdf_generator.py   # PDF build logic
│   ├── templates/
│   │   ├── base.html      # Shared layout + header
│   │   ├── home.html      # Landing page
│   │   ├── index.html     # Generator form
│   │   └── pdf_checklist.html  # PDF template
│   └── static/css/
│       └── style.css
├── checklists/            # YAML checklist definitions per OS
├── Dockerfile
├── render.yaml            # Render deployment config
├── requirements.txt
└── run.py
```

---

## Deployment

Deployed on [Render](https://render.com) via Docker. Config is in `render.yaml`.

To deploy your own instance: fork the repo, connect it to Render, and it will build and deploy automatically on push to `main`.

---

## Roadmap

- [ ] Additional checklist templates (role-specific: developer, designer, sales)
- [ ] User-customizable checklist items before generating
- [ ] Preview before PDF download
- [ ] Email delivery option
