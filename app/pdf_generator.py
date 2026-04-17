import yaml
import os
from datetime import date
from pathlib import Path
from jinja2 import Environment, FileSystemLoader, select_autoescape
from weasyprint import HTML

CHECKLIST_DIR = Path(__file__).parent.parent / "checklists"
TEMPLATE_DIR  = Path(__file__).parent / "templates"

def load_checklist(os_type: str, software: list[str], company_size: str) -> list[dict]:
    path = CHECKLIST_DIR / f"{os_type}.yaml"
    with open(path, "r") as f:
        data = yaml.safe_load(f)

    sections = []
    for section in data.get("sections", []):
        items = []
        for item in section.get("items", []):
            if isinstance(item, str):
                items.append(item)
            elif isinstance(item, dict):
                required_sw   = item.get("requires_software", [])
                required_size = item.get("requires_size", [])
                sw_match   = not required_sw   or any(s in software     for s in required_sw)
                size_match = not required_size or company_size in required_size
                if sw_match and size_match:
                    text = item.get("text", "")
                    if text:
                        items.append(text)
        if items:
            sections.append({"title": section["title"], "steps": items})

    return sections

def build_pdf(
    os_type: str,
    company_name: str,
    company_size: str,
    software: list[str],
    preparer: str,
    employee: str,
) -> bytes:
    sections = load_checklist(os_type, software, company_size)

    env = Environment(
        loader=FileSystemLoader(str(TEMPLATE_DIR)),
        autoescape=select_autoescape(["html"]),
    )
    template = env.get_template("pdf_checklist.html")

    os_labels = {"windows": "Windows", "macos": "macOS", "remote": "Remote Employee"}

    html_str = template.render(
        company_name=company_name,
        os_label=os_labels[os_type],
        company_size=company_size,
        software=software,
        preparer=preparer,
        employee=employee,
        sections=sections,
        generated_date=date.today().strftime("%B %d, %Y"),
    )

    return HTML(string=html_str).write_pdf()
