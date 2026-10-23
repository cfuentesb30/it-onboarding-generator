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

Además, el prototipo debe **demostrar en funcionamiento** dos conceptos del Capítulo II, no solo mencionarlos:

- **Mínimo privilegio:**
  - Los usuarios de la aplicación tienen roles (administrador, técnico) con permisos distintos.
  - Los accesos de cada empleado se definen según su puesto.
- **Cuentas huérfanas:**
  - Se registran los accesos de cada empleado a cada sistema.
  - Si un empleado está dado de baja y conserva accesos activos, la aplicación lo detecta y lo muestra.

---

## 2. Tabla de brechas

Estados: **Sí** = existe y cubre el requisito. **Parcial** = existe algo relacionado, pero no cubre el requisito completo. **No** = no existe.

### Capítulo II: Marco teórico

| # | Requisito | ¿Existe hoy? | Archivos que lo cubren | Detalle |
|---|---|---|---|---|
| 1 | Gestión de identidades y accesos | Parcial | `checklists/*.yaml` (sección "Accounts & Access"), `checklists/roles/developer.yaml` ("Cloud & Infrastructure Access"), `app/templates/index.html:540` | Solo aparece como texto dentro del checklist (crear cuentas, activar 2FA, configurar SSO). El sistema no registra identidades ni los accesos otorgados. |
| 2 | Principio de mínimo privilegio | Parcial | `checklists/windows.yaml:16`, `checklists/windows.yaml:42`, `checklists/roles/developer.yaml:29`, `app/templates/index.html:571` | Aparece como ítems de texto ("cuenta estándar sin permisos de administrador", "permisos según el rol"). La demostración práctica está en las filas 11 y 12. |
| 3 | Cuentas huérfanas | No | (solo `checklists/roles/hr.yaml:29` menciona "offboarding") | El concepto no aparece. La demostración práctica está en las filas 13 y 14. |
| 4 | Flask | Sí | `app/__init__.py`, `app/routes.py`, `requirements.txt` (Flask 3.0.3) | La aplicación completa está hecha en Flask. |
| 5 | PostgreSQL | Parcial | `docker-compose.yml`, `app/extensions.py`, `app/__init__.py`, ruta `/healthz/db` en `app/routes.py` | Fase 0 lista: PostgreSQL 18 corre en Docker Compose y la aplicación se conecta. Faltan las tablas (Fase 1). |
| 6 | Docker | Sí | `Dockerfile`, `docker-compose.yml`, `docker-compose.override.yml`, `docker-compose.prod.yml` | La imagen se basa en `python:3.11-slim`. Docker Compose levanta la aplicación y PostgreSQL, con configuración separada para desarrollo y producción. |

### Capítulo VI: Prototipo

| # | Requisito | ¿Existe hoy? | Archivos que lo cubren | Detalle |
|---|---|---|---|---|
| 7 | Flujo de onboarding | Parcial | `app/routes.py` (`/generator`, `/items`, `/generate`), `app/pdf_generator.py`, `checklists/*.yaml`, `checklists/roles/*.yaml`, `app/templates/index.html`, `app/templates/pdf_checklist.html` | Genera un checklist de onboarding editable en PDF según sistema operativo, rol y software. No registra al empleado, no guarda el proceso y no da seguimiento al avance. |
| 8 | Flujo de offboarding | No | — | No hay plantillas, rutas ni pantallas de offboarding. |
| 9 | Inventario de activos | No | (solo texto en `checklists/windows.yaml:9`, `macos.yaml:9`, `linux.yaml:9`, `remote.yaml:8`, `custom.yaml:9`, `app/templates/index.html:508` y `:547`) | El checklist dice "registrar número de serie / etiqueta de activo en el inventario", pero el sistema no tiene un inventario. |
| 10 | Bitácora de auditoría | No | (solo logs técnicos en `app/__init__.py:13` y `app/routes.py`) | Los logs actuales son mensajes de error que van a la consola del servidor. No guardan quién hizo qué ni cuándo, y no se conservan. |
| 11 | Mínimo privilegio: usuarios de la aplicación con roles (administrador, técnico) | No | — | La aplicación no tiene inicio de sesión ni usuarios. Cualquier visitante usa todas las funciones. |
| 12 | Mínimo privilegio: accesos del empleado definidos por su puesto | Parcial | `checklists/roles/*.yaml` | Las plantillas por rol listan, como texto, los sistemas a los que debe tener acceso cada tipo de puesto (por ejemplo, ERP en `finance.yaml`). No existe un perfil de accesos que se pueda comparar contra los accesos reales. |
| 13 | Cuentas huérfanas: registro de accesos por empleado a sistemas | No | — | No hay empleados, sistemas ni accesos guardados. |
| 14 | Cuentas huérfanas: detección y visualización de empleados de baja con accesos activos | No | — | Depende de la fila 13 y del flujo de offboarding (fila 8). |

**Resumen (14 requisitos):** 2 cubiertos (Flask, Docker), 5 parciales (IAM, mínimo privilegio en teoría, PostgreSQL, onboarding, accesos por puesto) y 7 sin cubrir (cuentas huérfanas en teoría, offboarding, inventario de activos, bitácora, roles de usuarios, registro de accesos, detección de cuentas huérfanas).

**Observación principal:** todos los requisitos de las filas 7 a 14 necesitan guardar datos. Por eso PostgreSQL (fila 5) es la brecha de la que dependen las demás: alinear el prototipo implica pasar del diseño actual sin estado a uno con base de datos y con inicio de sesión. El diseño propuesto está en [modelo-datos.md](modelo-datos.md).

---

## 3. Fuera de alcance

Estos temas no forman parte del trabajo de tesis y no se trabajarán en la rama `ver.proyecto`:

- Compra de dominio propio
- Configuración del correo con Resend (remitente verificado)
- Migración de Render a un VPS
- Ampliación a una "multi-herramienta" de TI

---

## 4. Delimitaciones

- **Una sola empresa.** El prototipo gestiona los empleados, sistemas y activos de una sola empresa. El soporte para varias empresas en la misma instalación (multiempresa) queda como trabajo futuro.
- **Registro, no integración.** La aplicación *registra* el otorgamiento y la revocación de accesos, pero no los ejecuta en los sistemas externos (Microsoft 365, Google Workspace, ERP). El técnico hace el cambio en el sistema externo y lo deja registrado en la aplicación. Las integraciones automáticas quedan como trabajo futuro.

---

## 5. Forma de trabajo con las ramas

- `ver.proyecto` es la rama principal del proyecto de graduación.
- Cada cambio nuevo se hace en una rama creada desde `ver.proyecto` y se fusiona de vuelta a `ver.proyecto`.
- `main` sigue siendo la rama de producción (https://it-onboarding-generator.onrender.com) y no recibe cambios de la tesis.
