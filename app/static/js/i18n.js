const TRANSLATIONS = {
  en: {
    // Badge & hero
    badge:       "Free &nbsp;·&nbsp; Donation-supported &nbsp;·&nbsp; Instant PDF",
    hero_h1:     "Stop onboarding<br>new hires from<br>memory.",
    hero_p:      "Fill in the form, click generate, download a print-ready IT checklist PDF — tailored to your OS, software, and company size. Done in under a minute.",
    hero_note:   "No signup required",
    cta:         "Generate your checklist &rarr;",
    cta_final:   "Generate your checklist &rarr;",

    // Trust bar
    trust_1:     "Windows, macOS &amp; Remote",
    trust_2:     "Instant PDF download",
    trust_3:     "Print-ready format",
    trust_4:     "Security steps included",
    trust_5:     "Donation-supported",

    // PDF mockup
    pdf_account:  "Account Setup",
    pdf_software: "Software Install",
    pdf_security: "Security",
    pdf_employee: "Employee:",
    pdf_date:     "Generated &middot; Apr 18, 2026",

    // How it works
    how_eyebrow:  "How it works",
    how_h2:       "Three steps. Under a minute.",
    step1_strong: "Describe your setup",
    step1_p:      "Enter the company name, new employee, OS, and which software they need. Nothing else required.",
    step2_strong: "Click generate",
    step2_p:      "We build a checklist for your exact configuration — not a generic template, not a blank form.",
    step3_strong: "Download &amp; hand it off",
    step3_p:      "Get a clean PDF ready to print or share. Use it yourself or give it to the person doing the setup.",

    // Features
    feat_eyebrow: "What's included",
    feat_h2:      "Everything you need. Nothing you don't.",
    feat1_strong: "OS-specific steps",
    feat1_p:      "Separate checklists for Windows, macOS, and remote employees. No copy-paste jobs.",
    feat2_strong: "Software install tasks",
    feat2_p:      "Select what you use — Office, Slack, Zoom, VPN, password managers — only those appear.",
    feat3_strong: "Security built in",
    feat3_p:      "Account creation, MFA, password policy, antivirus — security steps in every checklist.",
    feat4_strong: "Professional PDF",
    feat4_p:      "Company name, employee info, generation date. Looks intentional, not improvised.",
    feat5_strong: "Instant — no waiting",
    feat5_p:      "Fill the form and download in seconds. No account, no email, no friction.",
    feat6_strong: "Scales with your team",
    feat6_p:      "Different output for small, mid-size, and large companies. Adapts to your context.",

    // Who it's for
    who_eyebrow:   "Who it's for",
    who_h2:        "Built for the people doing the work.",
    persona1_strong: "Small business IT teams",
    persona1_p:      "You're onboarding people without a dedicated system. This gives you consistent, repeatable setup without the overhead.",
    persona2_strong: "Office managers handling IT",
    persona2_p:      "You didn't sign up to be IT. This makes the technical part easy to follow — or to hand off.",
    persona3_strong: "MSPs and IT consultants",
    persona3_p:      "Onboarding a client's new hire? Generate in their name, for their tools, in their format. Done.",
    persona4_strong: "Growing startups",
    persona4_p:      "Hiring fast and can't afford to reinvent onboarding every time. This gives you a repeatable process now.",

    // Final CTA
    final_h2: "Your next new hire deserves a proper setup.",
    final_p:  "Generate a custom IT onboarding checklist in under a minute.<br>Free. No account. No friction.",

    // Generator page
    gen_h1:       "Generate your IT onboarding checklist",
    gen_p:        "Fill in the four sections below. Your PDF downloads instantly.",
    gen_how:      "A checklist is generated automatically from your choices — every item can be removed, edited, or added to before you create the PDF.",
    gen_section_company: "Company Info",
    gen_label_company_name: "Company Name",
    gen_label_company_size: "Company Size",
    gen_label_employee:     "New Employee Name",
    gen_label_preparer:     "IT Preparer Name",
    gen_section_os:         "Operating System",
    gen_section_software:   "Software to Install",
    gen_hint:               "Select all that apply",
    gen_section_role:       "Employee Role",
    gen_section_checklist:  "Checklist Preview",
    gen_hint_checklist:     "Remove or add items",
    gen_btn:                "&#11015; Generate PDF Checklist",
    gen_btn_loading:        "Generating\u2026",

    // Placeholders
    ph_company:   "Acme Corp",
    ph_employee:  "Jane Smith",
    ph_preparer:  "Your name",

    // Pre-download overlay
    predown_p:        "This stays free thanks to folks buying a coffee — no pressure.",
    predown_download: "&#11015; Download my PDF",
    predown_skip:     "No thanks, just download",

    // Support / donation section
    support_eyebrow:   "Free &amp; donation-supported",
    support_h2:        "This tool will always be free.",
    support_p:         "It\u2019s kept alive by people who found it useful. If it saved you time, a small donation goes a long way. Suggestions to make it better are always welcome too.",
    support_kofi_btn:  "&#9749; Support on Ko-fi",
    support_suggest:   "&#128172; Send a suggestion &rarr;",

    // Nav
    nav_brand: "⬛ IT Onboarding Generator",
    nav_about: "About",
    nav_cta:   "Generate PDF &rarr;",

    // Footer
    footer_tagline:  "Free forever &middot; Donation-supported &middot; Built for small business IT teams.",
    footer_suggest:  "Suggest a feature",
    footer_support:  "Support this project",

    // Suggest page
    sug_back:          "&larr; Back to home",
    sug_title:         "Send a suggestion",
    sug_subtitle:      "Have an idea to make this better? I read every message.",
    sug_label_name:    "Your name",
    sug_ph_name:       "Jane Smith",
    sug_label_email:   "Your email",
    sug_ph_email:      "jane@example.com",
    sug_label_message: "Your suggestion",
    sug_ph_message:    "What would make this tool better for you?",
    sug_notice:        "Replies are sent via <strong>Resend</strong> and may come from a <em>resend.dev</em> address. Check your spam if you don\u2019t hear back.",
    sug_btn:           "&#128172; Send suggestion",
    sug_success:       "\u2713 Thanks \u2014 your suggestion was sent!",
    sug_back_home:     "Back to home",

    // Logo upload
    gen_label_logo:  "Company Logo",
    gen_optional:    "optional",
    gen_logo_hint:   "&#128247; Upload PNG, JPG, GIF or WEBP",

    // Share
    share_btn:          "↗ Share checklist",
    share_title:        "Share this checklist",
    share_sub:          "Anyone with this link can view and use this checklist.",
    share_expiry_label: "Link expires in:",
    share_1h:           "1 hour",
    share_24h:          "24 hours",
    share_48h:          "48 hours",
    share_1w:           "1 week",
    share_never:        "No expiry",
    share_copy:         "Copy",
    share_copied:       "Copied!",
    share_expired_msg:  "This shared link has expired. Generate a new one from the form.",
    share_invalid_msg:  "This shared link looks broken or incomplete. Try copying it again, or start a new checklist below.",
    share_privacy_note: "This link isn't encrypted — anyone who has it can view what's in it, so only share it the same way you'd share the data itself.",

    // Generator — additional UI
    gen_back:            "&larr; Back to home",
    step1_desc:          "Who is this checklist for?",
    step2_desc:          "What device is the employee receiving?",
    step3_desc:          "Adds role-specific setup tasks to the checklist.",
    email_label:         "Email checklist to",
    email_hint:          "We\u2019ll send the PDF to this address after it downloads. Email is sent via <strong>Resend</strong> \u2014 you may receive it from a <em>resend.dev</em> address.",
    ph_email:            "jane@example.com",

    // Company size options
    size_micro:          "Micro \u00b7 1\u20135 employees",
    size_small:          "Small \u00b7 6\u201315 employees",
    size_medium:         "Medium \u00b7 16\u201350 employees",
    size_large:          "Large \u00b7 51\u2013200 employees",
    size_enterprise:     "Enterprise \u00b7 200+ employees",
    size_custom:         "Custom\u2026",
    ph_size_custom:      "Number of employees",

    // OS card descriptions
    os_win_desc:         "Windows 10 / 11",
    os_mac_desc:         "MacBook / iMac",
    os_remote_desc:      "BYOD / work from home",
    os_linux_desc:       "Ubuntu, Debian, Fedora\u2026",
    os_custom_desc:      "Other / specify below",

    // Role card descriptions
    role_general_desc:   "Standard IT setup",
    role_dev_desc:       "Git, IDE, cloud access",
    role_designer_desc:  "Figma, brand assets",
    role_sales_desc:     "CRM, sales tools",
    role_hr_desc:        "HRIS, compliance",
    role_finance_desc:   "ERP, reporting",
    role_marketing_desc: "CRM, analytics",
    role_ops_desc:       "Process, vendors",
    role_custom_desc:    "Define your own role",

    // Software groups
    sw_group_productivity:  "Productivity",
    sw_group_communication: "Communication",
    sw_group_security:      "Security",
    sw_suggestions:         "\uff0b Suggestions",
    ph_sw_productivity:     "Add other productivity software\u2026",
    ph_sw_communication:    "Add other communication software\u2026",
    ph_sw_security:         "Add other security software\u2026",

    // Checklist dynamic
    cl_refresh:          "\u21bb Refresh",
    cl_loading:          "Loading\u2026",
    cl_error:            "Failed to load \u2014 click \u21bb to retry.",
    cl_empty:            "No items for this configuration.",
    cl_custom_section:   "Custom",
    cl_additional_sw:    "Additional Software",
    cl_install_prefix:   "Install and configure ",
    ph_custom_item:      "Add a custom item\u2026",
    cl_item_one:         "item",
    cl_items_many:       "items",

    // Submit area
    gen_submit_note:     "Your PDF isn't stored on our servers — but a summary (company, role, OS) is emailed to us to help support this free tool. <a href=\"/about#privacy\">Details</a>.",

    // Checklist section titles (from YAML)
    sec_people_orientation:      "People & Orientation",
    sec_hardware_check:          "1. Hardware Check",
    sec_equipment_confirm:       "1. Equipment Confirmation",
    sec_os_setup:                "2. OS Setup",
    sec_software_install:        "3. Software Installation",
    sec_network_security:        "4. Network & Security",
    sec_remote_access_security:  "4. Remote Access & Security",
    sec_accounts_access:         "5. Accounts & Access",
    sec_final_verify:            "6. Final Verification",
    sec_dev_environment:         "Developer Environment",
    sec_source_control:          "Source Control & CI/CD",
    sec_cloud_infra:             "Cloud & Infrastructure Access",
    sec_design_tools:            "Design Tools Setup",
    sec_brand_asset:             "Brand & Asset Access",
    sec_design_workflow:         "Design Workflow",
    sec_crm_sales:               "CRM & Sales Tools",
    sec_sales_resources:         "Sales Resources",
    sec_territory_pipeline:      "Territory & Pipeline Setup",
    sec_hr_systems:              "HR Systems Access",
    sec_compliance_docs:         "Compliance & Documentation",
    sec_people_ops:              "People Ops Setup",
    sec_financial_systems:       "Financial Systems Access",
    sec_reporting_analytics:     "Reporting & Analytics",
    sec_compliance_controls:     "Compliance & Controls",
    sec_marketing_tools:         "Marketing Tools Setup",
    sec_brand_content:           "Brand & Content Access",
    sec_analytics_reporting:     "Analytics & Reporting",
    sec_ops_tools:               "Operations Tools Access",
    sec_vendor_procurement:      "Vendor & Procurement",
    sec_process_docs:            "Process & Documentation",

    // Error page
    error_h1:     "We couldn't generate your PDF",
    error_p:      "Something went wrong on our end. Your form data wasn't lost — go back and try again, and if it keeps happening, let us know.",
    error_back:   "&larr; Go back and try again",
    error_report: "Report this issue",
  },

  es: {
    // Badge & hero
    badge:       "Gratis &nbsp;·&nbsp; Financiado por donaciones &nbsp;·&nbsp; PDF instantáneo",
    hero_h1:     "Deja de incorporar<br>nuevos empleados<br>de memoria.",
    hero_p:      "Completa el formulario, haz clic en generar y descarga un checklist de IT listo para imprimir — adaptado a tu sistema operativo, software y tamaño de empresa. En menos de un minuto.",
    hero_note:   "Sin registro requerido",
    cta:         "Generar mi checklist &rarr;",
    cta_final:   "Generar mi checklist &rarr;",

    // Trust bar
    trust_1:     "Windows, macOS y Remoto",
    trust_2:     "Descarga PDF instantánea",
    trust_3:     "Formato listo para imprimir",
    trust_4:     "Pasos de seguridad incluidos",
    trust_5:     "Financiado por donaciones",

    // PDF mockup
    pdf_account:  "Configuración de Cuenta",
    pdf_software: "Instalación de Software",
    pdf_security: "Seguridad",
    pdf_employee: "Empleado:",
    pdf_date:     "Generado &middot; 18 abr 2026",

    // How it works
    how_eyebrow:  "Cómo funciona",
    how_h2:       "Tres pasos. En menos de un minuto.",
    step1_strong: "Describe tu configuración",
    step1_p:      "Ingresa el nombre de la empresa, el nuevo empleado, el sistema operativo y el software que necesitan. Nada más.",
    step2_strong: "Haz clic en generar",
    step2_p:      "Creamos un checklist para tu configuración exacta — no una plantilla genérica, no un formulario en blanco.",
    step3_strong: "Descarga y entrega",
    step3_p:      "Obtén un PDF limpio listo para imprimir o compartir. Úsalo tú mismo o entregalo a quien hará la configuración.",

    // Features
    feat_eyebrow: "Qué incluye",
    feat_h2:      "Todo lo que necesitas. Nada que no.",
    feat1_strong: "Pasos específicos por sistema",
    feat1_p:      "Checklists separados para Windows, macOS y empleados remotos. Sin copiar y pegar.",
    feat2_strong: "Tareas de instalación de software",
    feat2_p:      "Selecciona lo que usas — Office, Slack, Zoom, VPN, gestores de contraseñas — solo esos aparecen.",
    feat3_strong: "Seguridad incluida",
    feat3_p:      "Creación de cuenta, MFA, política de contraseñas, antivirus — pasos de seguridad en cada checklist.",
    feat4_strong: "PDF profesional",
    feat4_p:      "Nombre de empresa, datos del empleado, fecha. Se ve intencional, no improvisado.",
    feat5_strong: "Instantáneo — sin esperas",
    feat5_p:      "Completa el formulario y descarga en segundos. Sin cuenta, sin correo, sin fricción.",
    feat6_strong: "Escala con tu equipo",
    feat6_p:      "Resultados distintos para empresas pequeñas, medianas y grandes. Se adapta a tu contexto.",

    // Who it's for
    who_eyebrow:   "Para quién es",
    who_h2:        "Creado para las personas que hacen el trabajo.",
    persona1_strong: "Equipos de IT de pequeñas empresas",
    persona1_p:      "Estás incorporando personas sin un sistema dedicado. Esto te da un proceso consistente y repetible sin el trabajo adicional.",
    persona2_strong: "Gerentes de oficina a cargo del IT",
    persona2_p:      "No te contrataron para ser IT. Esto hace que la parte técnica sea fácil de seguir — o de delegar.",
    persona3_strong: "MSPs y consultores de IT",
    persona3_p:      "¿Incorporando al nuevo empleado de un cliente? Genera con su nombre, para sus herramientas, en su formato. Listo.",
    persona4_strong: "Startups en crecimiento",
    persona4_p:      "Contratas rápido y no puedes reinventar la incorporación cada vez. Esto te da un proceso repetible ahora.",

    // Final CTA
    final_h2: "Tu próximo empleado merece una configuración correcta.",
    final_p:  "Genera un checklist personalizado de incorporación IT en menos de un minuto.<br>Gratis. Sin cuenta. Sin fricción.",

    // Generator page
    gen_h1:       "Genera tu checklist de incorporación IT",
    gen_p:        "Completa las cuatro secciones a continuación. Tu PDF se descarga al instante.",
    gen_how:      "El checklist se genera automáticamente a partir de tus elecciones: puedes eliminar, editar o añadir cualquier elemento antes de crear el PDF.",
    gen_section_company: "Información de la Empresa",
    gen_label_company_name: "Nombre de la Empresa",
    gen_label_company_size: "Tamaño de la Empresa",
    gen_label_employee:     "Nombre del Nuevo Empleado",
    gen_label_preparer:     "Nombre del Preparador IT",
    gen_section_os:         "Sistema Operativo",
    gen_section_software:   "Software a Instalar",
    gen_hint:               "Selecciona todos los que apliquen",
    gen_section_role:       "Rol del Empleado",
    gen_section_checklist:  "Vista Previa del Checklist",
    gen_hint_checklist:     "Elimina o agrega elementos",
    gen_btn:                "&#11015; Generar Checklist PDF",
    gen_btn_loading:        "Generando\u2026",

    // Placeholders
    ph_company:   "Acme Corp",
    ph_employee:  "Jane Smith",
    ph_preparer:  "Tu nombre",

    // Pre-download overlay
    predown_p:        "Esto sigue siendo gratis gracias a quienes invitan un café — sin presión.",
    predown_download: "&#11015; Descargar mi PDF",
    predown_skip:     "No gracias, solo descargar",

    // Support / donation section
    support_eyebrow:   "Gratis y financiado por donaciones",
    support_h2:        "Esta herramienta siempre será gratis.",
    support_p:         "Se mantiene gracias a personas que la encontraron útil. Si te ahorró tiempo, una pequeña donación ayuda mucho. Las sugerencias para mejorarla también son siempre bienvenidas.",
    support_kofi_btn:  "&#9749; Apoyar en Ko-fi",
    support_suggest:   "&#128172; Enviar una sugerencia &rarr;",

    // Nav
    nav_brand: "⬛ Generador de Incorporación IT",
    nav_about: "Acerca de",
    nav_cta:   "Generar PDF &rarr;",

    // Footer
    footer_tagline:  "Gratis para siempre &middot; Financiado por donaciones &middot; Para equipos de IT de pequeñas empresas.",
    footer_suggest:  "Sugerir una función",
    footer_support:  "Apoyar este proyecto",

    // Suggest page
    sug_back:          "&larr; Volver al inicio",
    sug_title:         "Enviar una sugerencia",
    sug_subtitle:      "¿Tienes una idea para mejorar esto? Leo cada mensaje.",
    sug_label_name:    "Tu nombre",
    sug_ph_name:       "Juan García",
    sug_label_email:   "Tu correo electrónico",
    sug_ph_email:      "juan@ejemplo.com",
    sug_label_message: "Tu sugerencia",
    sug_ph_message:    "¿Qué haría esta herramienta más útil para ti?",
    sug_notice:        "Las respuestas se envían a través de <strong>Resend</strong> y pueden llegar desde una dirección <em>resend.dev</em>. Revisa tu spam si no recibes respuesta.",
    sug_btn:           "&#128172; Enviar sugerencia",
    sug_success:       "\u2713 ¡Gracias, tu sugerencia fue enviada!",
    sug_back_home:     "Volver al inicio",

    // Logo upload
    gen_label_logo:  "Logo de la Empresa",
    gen_optional:    "opcional",
    gen_logo_hint:   "&#128247; Subir PNG, JPG, GIF o WEBP",

    // Share
    share_btn:          "↗ Compartir checklist",
    share_title:        "Compartir este checklist",
    share_sub:          "Cualquiera con este enlace podrá ver y usar este checklist.",
    share_expiry_label: "El enlace expira en:",
    share_1h:           "1 hora",
    share_24h:          "24 horas",
    share_48h:          "48 horas",
    share_1w:           "1 semana",
    share_never:        "Sin expiración",
    share_copy:         "Copiar",
    share_copied:       "¡Copiado!",
    share_expired_msg:  "Este enlace ha expirado. Genera uno nuevo desde el formulario.",
    share_invalid_msg:  "Este enlace parece estar roto o incompleto. Intenta copiarlo de nuevo, o empieza un checklist nuevo abajo.",
    share_privacy_note: "Este enlace no está cifrado — cualquiera que lo tenga puede ver su contenido, así que compártelo solo como compartirías los datos mismos.",

    // Generator — additional UI
    gen_back:            "&larr; Volver al inicio",
    step1_desc:          "\u00bfPara qui\u00e9n es este checklist?",
    step2_desc:          "\u00bfQu\u00e9 dispositivo recibir\u00e1 el empleado?",
    step3_desc:          "Agrega tareas de configuraci\u00f3n espec\u00edficas del rol al checklist.",
    email_label:         "Enviar checklist por correo a",
    email_hint:          "Te enviaremos el PDF a esta direcci\u00f3n despu\u00e9s de descargarlo. El correo se env\u00eda v\u00eda <strong>Resend</strong> \u2014 puede que lo recibas desde una direcci\u00f3n <em>resend.dev</em>.",
    ph_email:            "jane@ejemplo.com",

    // Company size options
    size_micro:          "Micro \u00b7 1\u20135 empleados",
    size_small:          "Peque\u00f1a \u00b7 6\u201315 empleados",
    size_medium:         "Mediana \u00b7 16\u201350 empleados",
    size_large:          "Grande \u00b7 51\u2013200 empleados",
    size_enterprise:     "Empresa \u00b7 200+ empleados",
    size_custom:         "Personalizado\u2026",
    ph_size_custom:      "N\u00famero de empleados",

    // OS card descriptions
    os_win_desc:         "Windows 10 / 11",
    os_mac_desc:         "MacBook / iMac",
    os_remote_desc:      "BYOD / trabajo desde casa",
    os_linux_desc:       "Ubuntu, Debian, Fedora\u2026",
    os_custom_desc:      "Otro / especificar",

    // Role card descriptions
    role_general_desc:   "Configuraci\u00f3n IT est\u00e1ndar",
    role_dev_desc:       "Git, IDE, acceso cloud",
    role_designer_desc:  "Figma, recursos de marca",
    role_sales_desc:     "CRM, herramientas de ventas",
    role_hr_desc:        "HRIS, cumplimiento",
    role_finance_desc:   "ERP, reportes",
    role_marketing_desc: "CRM, an\u00e1litica",
    role_ops_desc:       "Procesos, proveedores",
    role_custom_desc:    "Define tu propio rol",

    // Software groups
    sw_group_productivity:  "Productividad",
    sw_group_communication: "Comunicaci\u00f3n",
    sw_group_security:      "Seguridad",
    sw_suggestions:         "\uff0b Sugerencias",
    ph_sw_productivity:     "Agregar otro software de productividad\u2026",
    ph_sw_communication:    "Agregar otro software de comunicaci\u00f3n\u2026",
    ph_sw_security:         "Agregar otro software de seguridad\u2026",

    // Checklist dynamic
    cl_refresh:          "\u21bb Actualizar",
    cl_loading:          "Cargando\u2026",
    cl_error:            "Error al cargar \u2014 haz clic en \u21bb para reintentar.",
    cl_empty:            "Sin elementos para esta configuraci\u00f3n.",
    cl_custom_section:   "Personalizado",
    cl_additional_sw:    "Software Adicional",
    cl_install_prefix:   "Instalar y configurar ",
    ph_custom_item:      "Agregar un elemento personalizado\u2026",
    cl_item_one:         "elemento",
    cl_items_many:       "elementos",

    // Submit area
    gen_submit_note:     "Tu PDF no se guarda en nuestros servidores \u2014 pero enviamos un resumen (empresa, rol, sistema operativo) por correo para ayudar a mantener esta herramienta gratuita. <a href=\"/about#privacy\">M\u00e1s informaci\u00f3n</a>.",

    // Checklist section titles (from YAML)
    sec_people_orientation:      "Personas y Orientaci\u00f3n",
    sec_hardware_check:          "1. Verificaci\u00f3n de Hardware",
    sec_equipment_confirm:       "1. Confirmaci\u00f3n de Equipos",
    sec_os_setup:                "2. Configuraci\u00f3n del Sistema Operativo",
    sec_software_install:        "3. Instalaci\u00f3n de Software",
    sec_network_security:        "4. Red y Seguridad",
    sec_remote_access_security:  "4. Acceso Remoto y Seguridad",
    sec_accounts_access:         "5. Cuentas y Accesos",
    sec_final_verify:            "6. Verificaci\u00f3n Final",
    sec_dev_environment:         "Entorno de Desarrollo",
    sec_source_control:          "Control de Versiones y CI/CD",
    sec_cloud_infra:             "Acceso a Cloud e Infraestructura",
    sec_design_tools:            "Configuraci\u00f3n de Herramientas de Dise\u00f1o",
    sec_brand_asset:             "Acceso a Marca y Recursos",
    sec_design_workflow:         "Flujo de Trabajo de Dise\u00f1o",
    sec_crm_sales:               "CRM y Herramientas de Ventas",
    sec_sales_resources:         "Recursos de Ventas",
    sec_territory_pipeline:      "Territorio y Pipeline",
    sec_hr_systems:              "Acceso a Sistemas de RR.HH.",
    sec_compliance_docs:         "Cumplimiento y Documentaci\u00f3n",
    sec_people_ops:              "Configuraci\u00f3n de People Ops",
    sec_financial_systems:       "Acceso a Sistemas Financieros",
    sec_reporting_analytics:     "Informes y An\u00e1lisis",
    sec_compliance_controls:     "Cumplimiento y Controles",
    sec_marketing_tools:         "Configuraci\u00f3n de Herramientas de Marketing",
    sec_brand_content:           "Acceso a Marca y Contenido",
    sec_analytics_reporting:     "An\u00e1lisis e Informes",
    sec_ops_tools:               "Acceso a Herramientas de Operaciones",
    sec_vendor_procurement:      "Proveedores y Compras",
    sec_process_docs:            "Procesos y Documentaci\u00f3n",

    // Error page
    error_h1:     "No pudimos generar tu PDF",
    error_p:      "Algo sali\u00f3 mal de nuestro lado. Los datos de tu formulario no se perdieron \u2014 vuelve atr\u00e1s e int\u00e9ntalo de nuevo, y si sigue ocurriendo, av\u00edsanos.",
    error_back:   "&larr; Volver e intentar de nuevo",
    error_report: "Reportar este problema",
  },

  pt: {
    // Badge & hero
    badge:       "Grátis &nbsp;·&nbsp; Financiado por doações &nbsp;·&nbsp; PDF instantâneo",
    hero_h1:     "Pare de integrar<br>novos funcionários<br>de cabeça.",
    hero_p:      "Preencha o formulário, clique em gerar e baixe um checklist de TI pronto para imprimir — adaptado ao seu SO, software e tamanho da empresa. Em menos de um minuto.",
    hero_note:   "Sem cadastro necessário",
    cta:         "Gerar meu checklist &rarr;",
    cta_final:   "Gerar meu checklist &rarr;",

    // Trust bar
    trust_1:     "Windows, macOS e Remoto",
    trust_2:     "Download de PDF instantâneo",
    trust_3:     "Formato pronto para imprimir",
    trust_4:     "Etapas de segurança inclusas",
    trust_5:     "Financiado por doações",

    // PDF mockup
    pdf_account:  "Configuração de Conta",
    pdf_software: "Instalação de Software",
    pdf_security: "Segurança",
    pdf_employee: "Funcionário:",
    pdf_date:     "Gerado &middot; 18 abr 2026",

    // How it works
    how_eyebrow:  "Como funciona",
    how_h2:       "Três passos. Em menos de um minuto.",
    step1_strong: "Descreva sua configuração",
    step1_p:      "Informe o nome da empresa, o novo funcionário, o sistema operacional e os softwares necessários. Nada mais.",
    step2_strong: "Clique em gerar",
    step2_p:      "Criamos um checklist para sua configuração exata — não um modelo genérico, não um formulário em branco.",
    step3_strong: "Baixe e entregue",
    step3_p:      "Obtenha um PDF limpo pronto para imprimir ou compartilhar. Use você mesmo ou repasse a quem fará a configuração.",

    // Features
    feat_eyebrow: "O que está incluído",
    feat_h2:      "Tudo que você precisa. Nada além disso.",
    feat1_strong: "Passos específicos por SO",
    feat1_p:      "Checklists separados para Windows, macOS e funcionários remotos. Sem copiar e colar.",
    feat2_strong: "Tarefas de instalação de software",
    feat2_p:      "Selecione o que você usa — Office, Slack, Zoom, VPN, gerenciadores de senhas — apenas esses aparecem.",
    feat3_strong: "Segurança inclusa",
    feat3_p:      "Criação de conta, MFA, política de senhas, antivírus — etapas de segurança em cada checklist.",
    feat4_strong: "PDF profissional",
    feat4_p:      "Nome da empresa, dados do funcionário, data. Parece intencional, não improvisado.",
    feat5_strong: "Instantâneo — sem espera",
    feat5_p:      "Preencha o formulário e baixe em segundos. Sem conta, sem e-mail, sem fricção.",
    feat6_strong: "Escala com seu time",
    feat6_p:      "Resultados diferentes para empresas pequenas, médias e grandes. Adapta-se ao seu contexto.",

    // Who it's for
    who_eyebrow:   "Para quem é",
    who_h2:        "Feito para quem faz o trabalho.",
    persona1_strong: "Times de TI de pequenas empresas",
    persona1_p:      "Você está integrando pessoas sem um sistema dedicado. Isso dá um processo consistente e repetível sem sobrecarga.",
    persona2_strong: "Gerentes de escritório responsáveis pelo TI",
    persona2_p:      "Você não foi contratado para ser TI. Isso torna a parte técnica fácil de seguir — ou de delegar.",
    persona3_strong: "MSPs e consultores de TI",
    persona3_p:      "Integrando um novo funcionário de um cliente? Gere com o nome dele, para as ferramentas dele, no formato dele. Pronto.",
    persona4_strong: "Startups em crescimento",
    persona4_p:      "Contratando rápido e sem poder reinventar a integração toda vez. Isso dá um processo repetível agora.",

    // Final CTA
    final_h2: "Seu próximo funcionário merece uma configuração adequada.",
    final_p:  "Gere um checklist personalizado de integração de TI em menos de um minuto.<br>Grátis. Sem conta. Sem fricção.",

    // Generator page
    gen_h1:       "Gere seu checklist de integração de TI",
    gen_p:        "Preencha as quatro seções abaixo. Seu PDF é baixado instantaneamente.",
    gen_how:      "O checklist é gerado automaticamente a partir das suas escolhas: você pode remover, editar ou adicionar qualquer item antes de criar o PDF.",
    gen_section_company: "Informações da Empresa",
    gen_label_company_name: "Nome da Empresa",
    gen_label_company_size: "Tamanho da Empresa",
    gen_label_employee:     "Nome do Novo Funcionário",
    gen_label_preparer:     "Nome do Responsável de TI",
    gen_section_os:         "Sistema Operacional",
    gen_section_software:   "Software a Instalar",
    gen_hint:               "Selecione todos que se aplicam",
    gen_section_role:       "Função do Funcionário",
    gen_section_checklist:  "Pré-visualização do Checklist",
    gen_hint_checklist:     "Remova ou adicione itens",
    gen_btn:                "&#11015; Gerar Checklist PDF",
    gen_btn_loading:        "Gerando\u2026",

    // Placeholders
    ph_company:   "Acme Corp",
    ph_employee:  "Jane Smith",
    ph_preparer:  "Seu nome",

    // Pre-download overlay
    predown_p:        "Isso continua gratuito graças a quem paga um café — sem pressão.",
    predown_download: "&#11015; Baixar meu PDF",
    predown_skip:     "Não obrigado, só baixar",

    // Support / donation section
    support_eyebrow:   "Gratuito e financiado por doações",
    support_h2:        "Esta ferramenta sempre será gratuita.",
    support_p:         "É mantida por pessoas que a acharam útil. Se economizou seu tempo, uma pequena doação faz grande diferença. Sugestões para melhorá-la também são sempre bem-vindas.",
    support_kofi_btn:  "&#9749; Apoiar no Ko-fi",
    support_suggest:   "&#128172; Enviar uma sugestão &rarr;",

    // Nav
    nav_brand: "⬛ Gerador de Integração de TI",
    nav_about: "Sobre",
    nav_cta:   "Gerar PDF &rarr;",

    // Footer
    footer_tagline:  "Gratuito para sempre &middot; Financiado por doações &middot; Para equipes de TI de pequenas empresas.",
    footer_suggest:  "Sugerir uma funcionalidade",
    footer_support:  "Apoiar este projeto",

    // Suggest page
    sug_back:          "&larr; Voltar ao início",
    sug_title:         "Enviar uma sugestão",
    sug_subtitle:      "Tem uma ideia para melhorar isso? Leio cada mensagem.",
    sug_label_name:    "Seu nome",
    sug_ph_name:       "João Silva",
    sug_label_email:   "Seu e-mail",
    sug_ph_email:      "joao@exemplo.com",
    sug_label_message: "Sua sugestão",
    sug_ph_message:    "O que tornaria esta ferramenta mais útil para você?",
    sug_notice:        "As respostas são enviadas via <strong>Resend</strong> e podem vir de um endereço <em>resend.dev</em>. Verifique o spam se não receber resposta.",
    sug_btn:           "&#128172; Enviar sugestão",
    sug_success:       "\u2713 Obrigado \u2014 sua sugestão foi enviada!",
    sug_back_home:     "Voltar ao início",

    // Logo upload
    gen_label_logo:  "Logo da Empresa",
    gen_optional:    "opcional",
    gen_logo_hint:   "&#128247; Enviar PNG, JPG, GIF ou WEBP",

    // Share
    share_btn:          "↗ Compartilhar checklist",
    share_title:        "Compartilhar este checklist",
    share_sub:          "Qualquer pessoa com este link poderá visualizar e usar este checklist.",
    share_expiry_label: "O link expira em:",
    share_1h:           "1 hora",
    share_24h:          "24 horas",
    share_48h:          "48 horas",
    share_1w:           "1 semana",
    share_never:        "Sem expiração",
    share_copy:         "Copiar",
    share_copied:       "Copiado!",
    share_expired_msg:  "Este link expirou. Gere um novo pelo formul\u00e1rio.",
    share_invalid_msg:  "Este link parece estar quebrado ou incompleto. Tente copi\u00e1-lo novamente, ou comece um novo checklist abaixo.",
    share_privacy_note: "Este link n\u00e3o \u00e9 criptografado \u2014 qualquer pessoa que o tenha pode ver seu conte\u00fado, ent\u00e3o compartilhe-o apenas como compartilharia os pr\u00f3prios dados.",

    // Generator — additional UI
    gen_back:            "&larr; Voltar ao in\u00edcio",
    step1_desc:          "Para quem \u00e9 este checklist?",
    step2_desc:          "Qual dispositivo o funcion\u00e1rio receber\u00e1?",
    step3_desc:          "Adiciona tarefas de configura\u00e7\u00e3o espec\u00edficas da fun\u00e7\u00e3o ao checklist.",
    email_label:         "Enviar checklist por e-mail para",
    email_hint:          "Enviaremos o PDF para este endere\u00e7o ap\u00f3s o download. O e-mail \u00e9 enviado via <strong>Resend</strong> \u2014 voc\u00ea pode receb\u00ea-lo de um endere\u00e7o <em>resend.dev</em>.",
    ph_email:            "jane@exemplo.com",

    // Company size options
    size_micro:          "Micro \u00b7 1\u20135 funcion\u00e1rios",
    size_small:          "Pequena \u00b7 6\u201315 funcion\u00e1rios",
    size_medium:         "M\u00e9dia \u00b7 16\u201350 funcion\u00e1rios",
    size_large:          "Grande \u00b7 51\u2013200 funcion\u00e1rios",
    size_enterprise:     "Empresa \u00b7 200+ funcion\u00e1rios",
    size_custom:         "Personalizado\u2026",
    ph_size_custom:      "N\u00famero de funcion\u00e1rios",

    // OS card descriptions
    os_win_desc:         "Windows 10 / 11",
    os_mac_desc:         "MacBook / iMac",
    os_remote_desc:      "BYOD / trabalho remoto",
    os_linux_desc:       "Ubuntu, Debian, Fedora\u2026",
    os_custom_desc:      "Outro / especificar",

    // Role card descriptions
    role_general_desc:   "Configura\u00e7\u00e3o de TI padr\u00e3o",
    role_dev_desc:       "Git, IDE, acesso cloud",
    role_designer_desc:  "Figma, ativos de marca",
    role_sales_desc:     "CRM, ferramentas de vendas",
    role_hr_desc:        "HRIS, conformidade",
    role_finance_desc:   "ERP, relat\u00f3rios",
    role_marketing_desc: "CRM, an\u00e1lise",
    role_ops_desc:       "Processos, fornecedores",
    role_custom_desc:    "Defina sua pr\u00f3pria fun\u00e7\u00e3o",

    // Software groups
    sw_group_productivity:  "Produtividade",
    sw_group_communication: "Comunica\u00e7\u00e3o",
    sw_group_security:      "Seguran\u00e7a",
    sw_suggestions:         "\uff0b Sugest\u00f5es",
    ph_sw_productivity:     "Adicionar outro software de produtividade\u2026",
    ph_sw_communication:    "Adicionar outro software de comunica\u00e7\u00e3o\u2026",
    ph_sw_security:         "Adicionar outro software de seguran\u00e7a\u2026",

    // Checklist dynamic
    cl_refresh:          "\u21bb Atualizar",
    cl_loading:          "Carregando\u2026",
    cl_error:            "Falha ao carregar \u2014 clique em \u21bb para tentar novamente.",
    cl_empty:            "Nenhum item para esta configura\u00e7\u00e3o.",
    cl_custom_section:   "Personalizado",
    cl_additional_sw:    "Software Adicional",
    cl_install_prefix:   "Instalar e configurar ",
    ph_custom_item:      "Adicionar um item personalizado\u2026",
    cl_item_one:         "item",
    cl_items_many:       "itens",

    // Submit area
    gen_submit_note:     "Seu PDF n\u00e3o \u00e9 armazenado em nossos servidores \u2014 mas enviamos um resumo (empresa, cargo, sistema operacional) por email para ajudar a manter esta ferramenta gratuita. <a href=\"/about#privacy\">Saiba mais</a>.",

    // Checklist section titles (from YAML)
    sec_people_orientation:      "Pessoas e Orienta\u00e7\u00e3o",
    sec_hardware_check:          "1. Verifica\u00e7\u00e3o de Hardware",
    sec_equipment_confirm:       "1. Confirma\u00e7\u00e3o de Equipamentos",
    sec_os_setup:                "2. Configura\u00e7\u00e3o do Sistema Operacional",
    sec_software_install:        "3. Instala\u00e7\u00e3o de Software",
    sec_network_security:        "4. Rede e Seguran\u00e7a",
    sec_remote_access_security:  "4. Acesso Remoto e Seguran\u00e7a",
    sec_accounts_access:         "5. Contas e Acessos",
    sec_final_verify:            "6. Verifica\u00e7\u00e3o Final",
    sec_dev_environment:         "Ambiente de Desenvolvimento",
    sec_source_control:          "Controle de Vers\u00e3o e CI/CD",
    sec_cloud_infra:             "Acesso \u00e0 Cloud e Infraestrutura",
    sec_design_tools:            "Configura\u00e7\u00e3o de Ferramentas de Design",
    sec_brand_asset:             "Acesso a Marca e Recursos",
    sec_design_workflow:         "Fluxo de Trabalho de Design",
    sec_crm_sales:               "CRM e Ferramentas de Vendas",
    sec_sales_resources:         "Recursos de Vendas",
    sec_territory_pipeline:      "Territ\u00f3rio e Pipeline",
    sec_hr_systems:              "Acesso a Sistemas de RH",
    sec_compliance_docs:         "Conformidade e Documenta\u00e7\u00e3o",
    sec_people_ops:              "Configura\u00e7\u00e3o de People Ops",
    sec_financial_systems:       "Acesso a Sistemas Financeiros",
    sec_reporting_analytics:     "Relat\u00f3rios e An\u00e1lises",
    sec_compliance_controls:     "Conformidade e Controles",
    sec_marketing_tools:         "Configura\u00e7\u00e3o de Ferramentas de Marketing",
    sec_brand_content:           "Acesso a Marca e Conte\u00fado",
    sec_analytics_reporting:     "An\u00e1lises e Relat\u00f3rios",
    sec_ops_tools:               "Acesso a Ferramentas de Opera\u00e7\u00f5es",
    sec_vendor_procurement:      "Fornecedores e Compras",
    sec_process_docs:            "Processos e Documenta\u00e7\u00e3o",

    // Error page
    error_h1:     "N\u00e3o conseguimos gerar seu PDF",
    error_p:      "Algo deu errado do nosso lado. Os dados do seu formul\u00e1rio n\u00e3o foram perdidos \u2014 volte e tente novamente, e se continuar acontecendo, nos avise.",
    error_back:   "&larr; Voltar e tentar novamente",
    error_report: "Reportar este problema",
  },

  fr: {
    // Badge & hero
    badge:       "Gratuit &nbsp;·&nbsp; Financé par des dons &nbsp;·&nbsp; PDF instantané",
    hero_h1:     "Arrêtez d'intégrer<br>vos recrues<br>de mémoire.",
    hero_p:      "Remplissez le formulaire, cliquez sur générer et téléchargez un checklist IT prêt à imprimer — adapté à votre OS, vos logiciels et la taille de votre entreprise. En moins d'une minute.",
    hero_note:   "Sans inscription",
    cta:         "Générer mon checklist &rarr;",
    cta_final:   "Générer mon checklist &rarr;",

    // Trust bar
    trust_1:     "Windows, macOS et Télétravail",
    trust_2:     "Téléchargement PDF instantané",
    trust_3:     "Format prêt à imprimer",
    trust_4:     "Étapes de sécurité incluses",
    trust_5:     "Financé par des dons",

    // PDF mockup
    pdf_account:  "Configuration du Compte",
    pdf_software: "Installation des Logiciels",
    pdf_security: "Sécurité",
    pdf_employee: "Employé\u00a0:",
    pdf_date:     "Généré &middot; 18 avr 2026",

    // How it works
    how_eyebrow:  "Comment ça marche",
    how_h2:       "Trois étapes. En moins d'une minute.",
    step1_strong: "Décrivez votre configuration",
    step1_p:      "Indiquez le nom de l'entreprise, le nouvel employé, le système d'exploitation et les logiciels nécessaires. Rien de plus.",
    step2_strong: "Cliquez sur générer",
    step2_p:      "Nous créons un checklist pour votre configuration exacte — pas un modèle générique, pas un formulaire vierge.",
    step3_strong: "Téléchargez et transmettez",
    step3_p:      "Obtenez un PDF propre prêt à imprimer ou à partager. Utilisez-le vous-même ou transmettez-le à la personne chargée de la configuration.",

    // Features
    feat_eyebrow: "Ce qui est inclus",
    feat_h2:      "Tout ce qu'il vous faut. Rien de superflu.",
    feat1_strong: "Étapes spécifiques à chaque OS",
    feat1_p:      "Des checklists distincts pour Windows, macOS et les employés en télétravail. Sans copier-coller.",
    feat2_strong: "Tâches d'installation logicielle",
    feat2_p:      "Sélectionnez ce que vous utilisez — Office, Slack, Zoom, VPN, gestionnaires de mots de passe — seuls ceux-là apparaissent.",
    feat3_strong: "Sécurité intégrée",
    feat3_p:      "Création de compte, MFA, politique de mots de passe, antivirus — des étapes de sécurité dans chaque checklist.",
    feat4_strong: "PDF professionnel",
    feat4_p:      "Nom de l'entreprise, informations sur l'employé, date. L'air intentionnel, pas improvisé.",
    feat5_strong: "Instantané — sans attente",
    feat5_p:      "Remplissez le formulaire et téléchargez en quelques secondes. Sans compte, sans e-mail, sans friction.",
    feat6_strong: "S'adapte à votre équipe",
    feat6_p:      "Des résultats différents pour les petites, moyennes et grandes entreprises. S'adapte à votre contexte.",

    // Who it's for
    who_eyebrow:   "Pour qui c'est",
    who_h2:        "Conçu pour ceux qui font le travail.",
    persona1_strong: "Équipes IT des petites entreprises",
    persona1_p:      "Vous intégrez des personnes sans système dédié. Cela vous donne un processus cohérent et reproductible sans surcharge.",
    persona2_strong: "Office managers en charge de l'IT",
    persona2_p:      "Vous n'avez pas été embauché pour faire de l'IT. Cela rend la partie technique facile à suivre — ou à déléguer.",
    persona3_strong: "MSPs et consultants IT",
    persona3_p:      "Vous intégrez un nouveau salarié pour un client\u00a0? Générez à son nom, pour ses outils, dans son format. Terminé.",
    persona4_strong: "Startups en pleine croissance",
    persona4_p:      "Vous recrutez vite et ne pouvez pas réinventer l'intégration à chaque fois. Cela vous donne un processus reproductible dès maintenant.",

    // Final CTA
    final_h2: "Votre prochaine recrue mérite une configuration soignée.",
    final_p:  "Générez un checklist d'intégration IT personnalisé en moins d'une minute.<br>Gratuit. Sans compte. Sans friction.",

    // Generator page
    gen_h1:       "Générez votre checklist d'intégration IT",
    gen_p:        "Remplissez les quatre sections ci-dessous. Votre PDF se télécharge instantanément.",
    gen_how:      "La checklist est générée automatiquement à partir de vos choix : vous pouvez supprimer, modifier ou ajouter n'importe quel élément avant de créer le PDF.",
    gen_section_company: "Informations sur l'Entreprise",
    gen_label_company_name: "Nom de l'Entreprise",
    gen_label_company_size: "Taille de l'Entreprise",
    gen_label_employee:     "Nom du Nouvel Employé",
    gen_label_preparer:     "Nom du Responsable IT",
    gen_section_os:         "Système d'Exploitation",
    gen_section_software:   "Logiciels à Installer",
    gen_hint:               "Sélectionnez tout ce qui s'applique",
    gen_section_role:       "Rôle de l'Employé",
    gen_section_checklist:  "Aperçu du Checklist",
    gen_hint_checklist:     "Supprimez ou ajoutez des éléments",
    gen_btn:                "&#11015; Générer le Checklist PDF",
    gen_btn_loading:        "Génération en cours\u2026",

    // Placeholders
    ph_company:   "Acme Corp",
    ph_employee:  "Jane Smith",
    ph_preparer:  "Votre nom",

    // Pre-download overlay
    predown_p:        "Cet outil reste gratuit grâce à celles et ceux qui offrent un café — sans pression.",
    predown_download: "&#11015; Télécharger mon PDF",
    predown_skip:     "Non merci, juste télécharger",

    // Support / donation section
    support_eyebrow:   "Gratuit et financé par des dons",
    support_h2:        "Cet outil sera toujours gratuit.",
    support_p:         "Il est maintenu grâce aux personnes qui l'ont trouvé utile. Si cela vous a fait gagner du temps, un petit don va loin. Les suggestions pour l\u2019améliorer sont aussi toujours les bienvenues.",
    support_kofi_btn:  "&#9749; Soutenir sur Ko-fi",
    support_suggest:   "&#128172; Envoyer une suggestion &rarr;",

    // Nav
    nav_brand: "⬛ Générateur d'Intégration IT",
    nav_about: "À propos",
    nav_cta:   "Générer PDF &rarr;",

    // Footer
    footer_tagline:  "Gratuit pour toujours &middot; Financé par des dons &middot; Pour les équipes IT des petites entreprises.",
    footer_suggest:  "Suggérer une fonctionnalité",
    footer_support:  "Soutenir ce projet",

    // Suggest page
    sug_back:          "&larr; Retour à l\u2019accueil",
    sug_title:         "Envoyer une suggestion",
    sug_subtitle:      "Vous avez une idée pour améliorer cet outil ? Je lis chaque message.",
    sug_label_name:    "Votre nom",
    sug_ph_name:       "Jean Dupont",
    sug_label_email:   "Votre e-mail",
    sug_ph_email:      "jean@exemple.com",
    sug_label_message: "Votre suggestion",
    sug_ph_message:    "Qu\u2019est-ce qui rendrait cet outil plus utile pour vous ?",
    sug_notice:        "Les réponses sont envoyées via <strong>Resend</strong> et peuvent provenir d\u2019une adresse <em>resend.dev</em>. Vérifiez vos spams si vous n\u2019avez pas de nouvelles.",
    sug_btn:           "&#128172; Envoyer la suggestion",
    sug_success:       "\u2713 Merci \u2014 votre suggestion a été envoyée\u00a0!",
    sug_back_home:     "Retour à l\u2019accueil",

    // Logo upload
    gen_label_logo:  "Logo de l'Entreprise",
    gen_optional:    "facultatif",
    gen_logo_hint:   "&#128247; Importer PNG, JPG, GIF ou WEBP",

    // Share
    share_btn:          "↗ Partager le checklist",
    share_title:        "Partager ce checklist",
    share_sub:          "Toute personne ayant ce lien pourra voir et utiliser ce checklist.",
    share_expiry_label: "Le lien expire dans\u00a0:",
    share_1h:           "1 heure",
    share_24h:          "24 heures",
    share_48h:          "48 heures",
    share_1w:           "1 semaine",
    share_never:        "Sans expiration",
    share_copy:         "Copier",
    share_copied:       "Copié\u00a0!",
    share_expired_msg:  "Ce lien a expir\u00e9. G\u00e9n\u00e9rez-en un nouveau depuis le formulaire.",
    share_invalid_msg:  "Ce lien semble incorrect ou incomplet. Essayez de le copier \u00e0 nouveau, ou d\u00e9marrez un nouveau checklist ci-dessous.",
    share_privacy_note: "Ce lien n'est pas chiffr\u00e9 \u2014 toute personne qui le poss\u00e8de peut voir son contenu, alors ne le partagez que comme vous partageriez les donn\u00e9es elles-m\u00eames.",

    // Generator — additional UI
    gen_back:            "&larr; Retour \u00e0 l\u2019accueil",
    step1_desc:          "Pour qui est ce checklist\u00a0?",
    step2_desc:          "Quel appareil l\u2019employ\u00e9 re\u00e7oit-il\u00a0?",
    step3_desc:          "Ajoute des t\u00e2ches de configuration sp\u00e9cifiques au r\u00f4le dans le checklist.",
    email_label:         "Envoyer le checklist par e-mail \u00e0",
    email_hint:          "Nous enverrons le PDF \u00e0 cette adresse apr\u00e8s le t\u00e9l\u00e9chargement. L\u2019e-mail est envoy\u00e9 via <strong>Resend</strong> \u2014 vous pourriez le recevoir depuis une adresse <em>resend.dev</em>.",
    ph_email:            "jane@exemple.com",

    // Company size options
    size_micro:          "Micro \u00b7 1\u20135 employ\u00e9s",
    size_small:          "Petite \u00b7 6\u201315 employ\u00e9s",
    size_medium:         "Moyenne \u00b7 16\u201350 employ\u00e9s",
    size_large:          "Grande \u00b7 51\u2013200 employ\u00e9s",
    size_enterprise:     "Entreprise \u00b7 200+ employ\u00e9s",
    size_custom:         "Personnalis\u00e9\u2026",
    ph_size_custom:      "Nombre d\u2019employ\u00e9s",

    // OS card descriptions
    os_win_desc:         "Windows 10 / 11",
    os_mac_desc:         "MacBook / iMac",
    os_remote_desc:      "BYOD / t\u00e9l\u00e9travail",
    os_linux_desc:       "Ubuntu, Debian, Fedora\u2026",
    os_custom_desc:      "Autre / pr\u00e9ciser",

    // Role card descriptions
    role_general_desc:   "Configuration IT standard",
    role_dev_desc:       "Git, IDE, acc\u00e8s cloud",
    role_designer_desc:  "Figma, ressources de marque",
    role_sales_desc:     "CRM, outils de vente",
    role_hr_desc:        "HRIS, conformit\u00e9",
    role_finance_desc:   "ERP, reporting",
    role_marketing_desc: "CRM, analytique",
    role_ops_desc:       "Processus, fournisseurs",
    role_custom_desc:    "D\u00e9finissez votre propre r\u00f4le",

    // Software groups
    sw_group_productivity:  "Productivit\u00e9",
    sw_group_communication: "Communication",
    sw_group_security:      "S\u00e9curit\u00e9",
    sw_suggestions:         "\uff0b Suggestions",
    ph_sw_productivity:     "Ajouter un autre logiciel de productivit\u00e9\u2026",
    ph_sw_communication:    "Ajouter un autre logiciel de communication\u2026",
    ph_sw_security:         "Ajouter un autre logiciel de s\u00e9curit\u00e9\u2026",

    // Checklist dynamic
    cl_refresh:          "\u21bb Actualiser",
    cl_loading:          "Chargement\u2026",
    cl_error:            "\u00c9chec du chargement \u2014 cliquez sur \u21bb pour r\u00e9essayer.",
    cl_empty:            "Aucun \u00e9l\u00e9ment pour cette configuration.",
    cl_custom_section:   "Personnalis\u00e9",
    cl_additional_sw:    "Logiciels Suppl\u00e9mentaires",
    cl_install_prefix:   "Installer et configurer ",
    ph_custom_item:      "Ajouter un \u00e9l\u00e9ment personnalis\u00e9\u2026",
    cl_item_one:         "\u00e9l\u00e9ment",
    cl_items_many:       "\u00e9l\u00e9ments",

    // Submit area
    gen_submit_note:     "Votre PDF n'est pas stock\u00e9 sur nos serveurs \u2014 mais un r\u00e9sum\u00e9 (entreprise, r\u00f4le, syst\u00e8me) nous est envoy\u00e9 par email pour soutenir cet outil gratuit. <a href=\"/about#privacy\">En savoir plus</a>.",

    // Checklist section titles (from YAML)
    sec_people_orientation:      "Personnes et Int\u00e9gration",
    sec_hardware_check:          "1. V\u00e9rification du Mat\u00e9riel",
    sec_equipment_confirm:       "1. Confirmation du Mat\u00e9riel",
    sec_os_setup:                "2. Configuration du Syst\u00e8me d\u2019Exploitation",
    sec_software_install:        "3. Installation des Logiciels",
    sec_network_security:        "4. R\u00e9seau et S\u00e9curit\u00e9",
    sec_remote_access_security:  "4. Acc\u00e8s \u00e0 Distance et S\u00e9curit\u00e9",
    sec_accounts_access:         "5. Comptes et Acc\u00e8s",
    sec_final_verify:            "6. V\u00e9rification Finale",
    sec_dev_environment:         "Environnement de D\u00e9veloppement",
    sec_source_control:          "Contr\u00f4le de Version et CI/CD",
    sec_cloud_infra:             "Acc\u00e8s au Cloud et \u00e0 l\u2019Infrastructure",
    sec_design_tools:            "Configuration des Outils de Design",
    sec_brand_asset:             "Acc\u00e8s \u00e0 la Marque et aux Ressources",
    sec_design_workflow:         "Flux de Travail Design",
    sec_crm_sales:               "CRM et Outils de Vente",
    sec_sales_resources:         "Ressources de Vente",
    sec_territory_pipeline:      "Territoire et Pipeline",
    sec_hr_systems:              "Acc\u00e8s aux Syst\u00e8mes RH",
    sec_compliance_docs:         "Conformit\u00e9 et Documentation",
    sec_people_ops:              "Configuration des People Ops",
    sec_financial_systems:       "Acc\u00e8s aux Syst\u00e8mes Financiers",
    sec_reporting_analytics:     "Rapports et Analyses",
    sec_compliance_controls:     "Conformit\u00e9 et Contr\u00f4les",
    sec_marketing_tools:         "Configuration des Outils Marketing",
    sec_brand_content:           "Acc\u00e8s \u00e0 la Marque et au Contenu",
    sec_analytics_reporting:     "Analyses et Rapports",
    sec_ops_tools:               "Acc\u00e8s aux Outils Op\u00e9rationnels",
    sec_vendor_procurement:      "Fournisseurs et Achats",
    sec_process_docs:            "Processus et Documentation",

    // Error page
    error_h1:     "Nous n'avons pas pu générer votre PDF",
    error_p:      "Une erreur s'est produite de notre côté. Les données de votre formulaire n'ont pas été perdues — revenez en arrière et réessayez, et si le problème persiste, signalez-le-nous.",
    error_back:   "&larr; Revenir en arrière et réessayer",
    error_report: "Signaler ce problème",
  }
};

// Helper: get a translation key for the current language
function t(key) {
  const lang = window.currentLang || 'en';
  const map = TRANSLATIONS[lang] || TRANSLATIONS.en;
  return map[key] !== undefined ? map[key] : (TRANSLATIONS.en[key] || '');
}

// Current language — exposed so inline scripts can reference it
window.currentLang = localStorage.getItem("lang") || "en";

function applyLang(lang) {
  const t = TRANSLATIONS[lang];
  if (!t) return;

  // Translate innerHTML elements
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (t[key] !== undefined) el.innerHTML = t[key];
  });

  // Translate placeholders
  document.querySelectorAll("[data-i18n-ph]").forEach(el => {
    const key = el.getAttribute("data-i18n-ph");
    if (t[key] !== undefined) el.setAttribute("placeholder", t[key]);
  });

  // Update toggle button to show current language with flag
  const flagCodes = { en: "us", es: "es", pt: "br", fr: "fr" };
  const codes = { en: "EN", es: "ES", pt: "PT", fr: "FR" };
  const btn = document.getElementById("lang-toggle");
  if (btn) {
    const code = flagCodes[lang] || "us";
    const label = codes[lang] || lang.toUpperCase();
    btn.innerHTML = `<img src="https://flagcdn.com/16x12/${code}.png" width="16" height="12" alt="${label} flag" class="lang-flag-img"/> ${label}`;
  }

  // Update html lang attribute
  document.documentElement.lang = lang;

  window.currentLang = lang;
}

function toggleLangDropdown() {
  const dropdown = document.getElementById("lang-dropdown");
  if (dropdown) dropdown.classList.toggle("open");
}

function selectLang(lang) {
  localStorage.setItem("lang", lang);
  window.currentLang = lang;
  applyLang(lang);
  const dropdown = document.getElementById("lang-dropdown");
  if (dropdown) dropdown.classList.remove("open");
  // Re-render checklist dynamic content if on generator page
  if (typeof renderChecklist === 'function') renderChecklist();
  if (typeof updateCount === 'function') {
    const clCount = document.getElementById('cl-count');
    if (clCount) {
      const n = parseInt(clCount.textContent, 10);
      if (!isNaN(n)) updateCount(n);
    }
  }
}

// Close dropdown when clicking outside
document.addEventListener("click", function (e) {
  const switcher = document.getElementById("lang-switcher");
  if (switcher && !switcher.contains(e.target)) {
    const dropdown = document.getElementById("lang-dropdown");
    if (dropdown) dropdown.classList.remove("open");
  }
});

// Apply on load
document.addEventListener("DOMContentLoaded", function () {
  applyLang(window.currentLang);
});

// ── Dark / light mode toggle ─────────────────────────────
// data-theme is already set pre-paint by the inline script in base.html;
// this just keeps the button state and localStorage in sync.
function applyThemeButtonState(theme) {
  const btn = document.getElementById("theme-toggle");
  if (!btn) return;
  const isDark = theme === "dark";
  btn.setAttribute("aria-pressed", isDark ? "true" : "false");
  btn.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
}

function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
  const next = current === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
  applyThemeButtonState(next);
}

document.addEventListener("DOMContentLoaded", function () {
  applyThemeButtonState(document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light");
});
