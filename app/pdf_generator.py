import yaml
import json
from datetime import date
from pathlib import Path
from flask import current_app
from weasyprint import HTML

CHECKLIST_DIR = Path(__file__).parent.parent / "checklists"

OS_LABELS = {
    "windows": "Windows",
    "macos":   "macOS",
    "linux":   "Linux",
    "remote":  "Remote Employee",
}


def resolve_os_label(os_type: str, os_name: str = "") -> str:
    """Single source of truth for the OS badge shown in preview and the PDF."""
    if os_type == "custom":
        return os_name.strip() or "Custom OS"
    return OS_LABELS.get(os_type, os_type)


def resolve_role_label(role: str, role_name: str = "") -> str:
    """Single source of truth for the role badge shown in preview and the PDF."""
    if role == "custom":
        return role_name.strip() or "Custom"
    if role == "general":
        return ""
    return role.capitalize()

def _filter_items(items: list, software: list, company_size: str) -> list:
    """Normalize a YAML `items` list into plain step-text strings, honoring the
    optional conditional-item schema (`{text:, requires_software:, requires_size:}`).
    Shared by both OS and role checklist loaders so they support the same schema."""
    filtered = []
    for item in items:
        if isinstance(item, str):
            filtered.append(item)
        elif isinstance(item, dict):
            required_sw   = item.get("requires_software", [])
            required_size = item.get("requires_size", [])
            sw_match   = not required_sw   or any(s in software     for s in required_sw)
            size_match = not required_size or company_size in required_size
            if sw_match and size_match:
                text = item.get("text", "")
                if text:
                    filtered.append(text)
    return filtered

def _load_os_sections(os_type: str, software: list, company_size: str) -> list:
    path = CHECKLIST_DIR / f"{os_type}.yaml"
    with open(path, "r") as f:
        data = yaml.safe_load(f)

    sections = []
    for section in data.get("sections", []):
        items = _filter_items(section.get("items", []), software, company_size)
        if items:
            sections.append({"title": section.get("title", "Untitled"), "steps": items})
    return sections

def _load_role_sections(role: str, software: list, company_size: str) -> list:
    path = CHECKLIST_DIR / "roles" / f"{role}.yaml"
    if not path.exists():
        return []
    with open(path, "r") as f:
        data = yaml.safe_load(f)
    sections = []
    for section in (data or {}).get("sections", []):
        items = _filter_items(section.get("items", []), software, company_size)
        if items:
            sections.append({"title": section.get("title", "Untitled"), "steps": items})
    return sections

def load_checklist(os_type: str, software: list, company_size: str, role: str = "general") -> list:
    os_sections   = _load_os_sections(os_type, software, company_size)
    role_sections = _load_role_sections(role, software, company_size)

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
    os_name: str = "",
    display_role: str = None,
    role_name: str = "",
) -> bytes:
    """
    `role` is the (already-normalized) role used to load checklist content.
    `display_role`/`role_name`/`os_name` are only used for the label shown on
    the PDF and may differ from `role` (e.g. "custom" isn't a real content role).

    `submitted_items` is `None` when no submission occurred at all (e.g. called
    programmatically), and a (possibly empty) list when the caller explicitly
    submitted an edited item set — including deliberately clearing every item.
    These two cases must be distinguished: `None` falls back to the default
    checklist, `[]` means "render zero items", NOT "regenerate the default".
    """
    if submitted_items is not None:
        sections = sections_from_submitted(submitted_items)
    else:
        sections = load_checklist(os_type, software, company_size, role)

    template = current_app.jinja_env.get_template("pdf_checklist.html")

    label_role = display_role if display_role is not None else role

    html_str = template.render(
        company_name=company_name,
        os_label=resolve_os_label(os_type, os_name),
        role_label=resolve_role_label(label_role, role_name),
        company_size=company_size,
        software=software,
        preparer=preparer,
        employee=employee,
        sections=sections,
        logo_data=logo_data,
        generated_date=date.today().strftime("%B %d, %Y"),
    )

    return HTML(string=html_str).write_pdf()
