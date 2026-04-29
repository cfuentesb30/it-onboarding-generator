import yaml
import json
from datetime import date
from pathlib import Path
from jinja2 import Environment, FileSystemLoader, select_autoescape
from weasyprint import HTML

CHECKLIST_DIR = Path(__file__).parent.parent / "checklists"
TEMPLATE_DIR  = Path(__file__).parent / "templates"

def _load_os_sections(os_type: str, software: list, company_size: str) -> list:
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

def _load_role_sections(role: str) -> list:
    path = CHECKLIST_DIR / "roles" / f"{role}.yaml"
    if not path.exists():
        return []
    with open(path, "r") as f:
        data = yaml.safe_load(f)
    sections = []
    for section in (data or {}).get("sections", []):
        items = [item for item in section.get("items", []) if isinstance(item, str)]
        if items:
            sections.append({"title": section["title"], "steps": items})
    return sections

def load_checklist(os_type: str, software: list, company_size: str, role: str = "general") -> list:
    os_sections   = _load_os_sections(os_type, software, company_size)
    role_sections = _load_role_sections(role)

    if not role_sections:
        return os_sections

    # Insert role sections before the last OS section (Final Verification)
    if len(os_sections) > 1:
        return os_sections[:-1] + role_sections + [os_sections[-1]]
    return os_sections + role_sections

def sections_from_submitted(items_json: list) -> list:
    """Build sections from form-submitted item JSON strings."""
    buckets: dict = {}
    order: list   = []
    for raw in items_json:
        try:
            obj = json.loads(raw)
        except (ValueError, TypeError):
            continue
        title = obj.get("section", "Custom")
        text  = obj.get("text", "").strip()
        if not text:
            continue
        if title not in buckets:
            buckets[title] = []
            order.append(title)
        buckets[title].append(text)
    return [{"title": t, "steps": buckets[t]} for t in order if buckets[t]]

def build_pdf(
    os_type: str,
    company_name: str,
    company_size: str,
    software: list,
    preparer: str,
    employee: str,
    role: str = "general",
    submitted_items: list = None,
    logo_data: str = None,
) -> bytes:
    if submitted_items:
        sections = sections_from_submitted(submitted_items)
    else:
        sections = load_checklist(os_type, software, company_size, role)

    env = Environment(
        loader=FileSystemLoader(str(TEMPLATE_DIR)),
        autoescape=select_autoescape(["html"]),
    )
    template = env.get_template("pdf_checklist.html")

    os_labels = {"windows": "Windows", "macos": "macOS", "remote": "Remote Employee"}

    html_str = template.render(
        company_name=company_name,
        os_label=os_labels.get(os_type, os_type),
        role_label=role.capitalize() if role != "general" else "",
        company_size=company_size,
        software=software,
        preparer=preparer,
        employee=employee,
        sections=sections,
        logo_data=logo_data,
        generated_date=date.today().strftime("%B %d, %Y"),
    )

    return HTML(string=html_str).write_pdf()
