# Alineación del prototipo con la tesis

**Título aprobado:** "Prefactibilidad para el desarrollo de una plataforma web de gestión de onboarding y offboarding de TI para PYMES en la ciudad de San Pedro Sula, 2026"

**Fecha del análisis:** 2026-10-22
**Rama:** `ver.proyecto`, creada desde `main` en el commit `d89bd88`

---

## 1. Qué exige la tesis

### Capítulo II: Marco teórico

El prototipo debe reflejar o usar estos conceptos y tecnologías:

- Gestión de identidades y accesos (IAM)
- Principio de mínimo privilegio
- Cuentas huérfanas
- Flask
- PostgreSQL
- Docker

### Capítulo VI: Prototipo

El prototipo debe incluir:

- Flujo de onboarding
- Flujo de offboarding
- Inventario de activos
- Bitácora de auditoría

---

## 2. Tabla de brechas

Estados: **Sí** = existe y cubre el requisito. **Parcial** = existe algo relacionado, pero no cubre el requisito completo. **No** = no existe.

| # | Capítulo | Requisito | ¿Existe hoy? | Archivos que lo cubren | Detalle |
|---|---|---|---|---|---|
| 1 | II | Gestión de identidades y accesos | Parcial | `checklists/*.yaml` (sección "Accounts & Access"), `checklists/roles/developer.yaml` ("Cloud & Infrastructure Access"), `app/templates/index.html:540` | Solo aparece como texto dentro del checklist (crear cuentas, activar 2FA, configurar SSO). El sistema no registra identidades ni los accesos otorgados. |
| 2 | II | Principio de mínimo privilegio | Parcial | `checklists/windows.yaml:16`, `checklists/windows.yaml:42`, `checklists/roles/developer.yaml:29`, `app/templates/index.html:571` | Aparece como ítems de texto ("cuenta estándar sin permisos de administrador", "permisos según el rol"). El sistema no modela ni controla permisos. |
| 3 | II | Cuentas huérfanas | No | (solo `checklists/roles/hr.yaml:29` menciona "offboarding") | No hay offboarding ni registro de cuentas, así que no se pueden detectar ni prevenir cuentas huérfanas. |
| 4 | II | Flask | Sí | `app/__init__.py`, `app/routes.py`, `requirements.txt` (Flask 3.0.3) | La aplicación completa está hecha en Flask. |
| 5 | II | PostgreSQL | No | — | La aplicación no tiene base de datos. Hoy es un diseño sin estado: el estado de los links compartibles viaja dentro de la URL. |
| 6 | II | Docker | Sí | `Dockerfile`, `render.yaml` (`env: docker`) | La imagen se basa en `python:3.11-slim` y se despliega en Render. |
| 7 | VI | Flujo de onboarding | Parcial | `app/routes.py` (`/generator`, `/items`, `/generate`), `app/pdf_generator.py`, `checklists/*.yaml`, `checklists/roles/*.yaml`, `app/templates/index.html`, `app/templates/pdf_checklist.html` | Genera un checklist de onboarding editable en PDF según sistema operativo, rol y software. No registra al empleado, no guarda el proceso y no da seguimiento al avance. |
| 8 | VI | Flujo de offboarding | No | — | No hay plantillas, rutas ni pantallas de offboarding. |
| 9 | VI | Inventario de activos | No | (solo texto en `checklists/windows.yaml:9`, `macos.yaml:9`, `linux.yaml:9`, `remote.yaml:8`, `custom.yaml:9`, `app/templates/index.html:508` y `:547`) | El checklist dice "registrar número de serie / etiqueta de activo en el inventario", pero el sistema no tiene un inventario. |
| 10 | VI | Bitácora de auditoría | No | (solo logs técnicos en `app/__init__.py:13` y `app/routes.py`) | Los logs actuales son mensajes de error que van a la consola del servidor. No guardan quién hizo qué ni cuándo, y no se conservan. |

**Resumen:** 2 requisitos cubiertos (Flask, Docker), 3 parciales (IAM, mínimo privilegio, onboarding) y 5 sin cubrir (cuentas huérfanas, PostgreSQL, offboarding, inventario de activos, bitácora de auditoría).

**Observación principal:** cinco de los requisitos (offboarding, cuentas huérfanas, inventario, bitácora y el seguimiento del onboarding) necesitan guardar datos. Por eso PostgreSQL es la brecha de la que dependen las demás: alinear el prototipo implica pasar del diseño actual sin estado a uno con base de datos.

---

## 3. Fuera de alcance

Estos temas no forman parte del trabajo de tesis y no se trabajarán en la rama `ver.proyecto`:

- Compra de dominio propio
- Configuración del correo con Resend (remitente verificado)
- Migración de Render a un VPS
- Ampliación a una "multi-herramienta" de TI

---

## 4. Forma de trabajo con las ramas

- `ver.proyecto` es la rama principal del proyecto de graduación.
- Cada cambio nuevo se hace en una rama creada desde `ver.proyecto` y se fusiona de vuelta a `ver.proyecto`.
- `main` sigue siendo la rama de producción (https://it-onboarding-generator.onrender.com) y no recibe cambios de la tesis.
