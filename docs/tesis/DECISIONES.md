# Registro de decisiones

Decisiones de diseño y alcance del prototipo, en orden cronológico. Relación con los requisitos: ver [ALINEACION.md](ALINEACION.md). Modelo de datos: ver [modelo-datos.md](modelo-datos.md).

## Alcance y organización

| # | Fecha | Decisión | Alternativa descartada | Justificación |
|---|---|---|---|---|
| 1 | 2026-10-22 | El trabajo de tesis se hace en la rama `ver.proyecto`. Cada cambio sale en una rama desde ella y vuelve a ella. `main` queda solo para la versión pública. | Trabajar directamente en `main`, o en un repositorio aparte. | Cada cambio en `main` se publica automáticamente en producción (Render). Una rama separada aísla el prototipo sin perder el historial ni duplicar el código. |
| 2 | 2026-10-22 | El generador público se mantiene tal cual. El panel de gestión es una sección aparte con inicio de sesión. | Reemplazar el generador por el panel. | El generador ya está en uso. El panel agrega la gestión sin romper lo que funciona. |
| 3 | 2026-10-22 | El prototipo es para una sola empresa. | Multiempresa (varias empresas en la misma instalación). | Multiempresa obliga a separar los datos de cada empresa en todas las tablas y pantallas. Para demostrar la prefactibilidad basta con una. Queda como trabajo futuro. |
| 4 | 2026-10-22 | La aplicación registra el otorgamiento y la revocación de accesos, pero no se conecta a los sistemas externos. | Integrarse con Microsoft 365, Google Workspace o el ERP para crear y desactivar cuentas automáticamente. | Cada PYME usa sistemas distintos, y cada integración necesita credenciales y licencias del proveedor. El registro basta para demostrar el mínimo privilegio y la detección de cuentas huérfanas. Las integraciones quedan como trabajo futuro. |
| 5 | 2026-10-22 | El panel va solo en español. Las plantillas YAML que use el panel (onboarding y offboarding) serán versiones en español, separadas de las del generador público. | Reutilizar las plantillas en inglés, o traducir el panel a varios idiomas. | Los usuarios objetivo son PYMES de San Pedro Sula. Tener copias separadas evita romper el generador público, que sigue en inglés con traducción en el navegador. |
| 6 | 2026-10-22 | Orden de fases: 0, 1, 2, 4, 5 y 7 primero. Las fases 3, 6 y 8 empiezan como listados simples. | Seguir las fases en orden numérico. | Así se llega antes a un flujo completo demostrable (onboarding → offboarding → cuenta huérfana detectada). Los catálogos, el inventario y la bitácora pueden empezar sencillos. |

## Datos y seguridad

| # | Fecha | Decisión | Alternativa descartada | Justificación |
|---|---|---|---|---|
| 7 | 2026-10-22 | PostgreSQL como base de datos. | Seguir sin base de datos, o usar SQLite. | Lo exige el Capítulo II. Además, PostgreSQL ofrece restricciones de integridad (llaves foráneas, CHECK, índices únicos parciales), el tipo JSONB para la bitácora y buen manejo de varios usuarios a la vez. |
| 8 | 2026-10-22 | Modelo de 12 tablas (ver `modelo-datos.md`). | El modelo inicial de 7 entidades. | Se agregaron DEPARTAMENTO, PUESTO y PERFIL_ACCESO porque el mínimo privilegio necesita un perfil de accesos por puesto contra el cual comparar los accesos reales. ASIGNACION_ACTIVO se separó de ACTIVO para conservar el historial de cada equipo. |
| 9 | 2026-10-22 | Las cuentas huérfanas se calculan con una consulta, no se guardan en una tabla. | Una tabla de cuentas huérfanas. | Se obtienen del estado del empleado y del estado del acceso. Una tabla aparte podría quedar desactualizada. |
| 10 | 2026-10-22 | Flask-WTF para proteger los formularios contra CSRF. Las contraseñas se guardan con hash (`werkzeug.security`). | Tokens CSRF hechos a mano; contraseñas sin hash. | Son mecanismos probados y mantenidos. Con hash, ni siquiera quien tenga acceso a la base puede leer las contraseñas. |
| 11 | 2026-10-22 | La protección CSRF se activa en la Fase 2, solo para el panel. | Activarla para toda la aplicación desde la Fase 0. | Los formularios del generador público (`/generate`, `/preview`, `/suggest`) no envían token CSRF. Activarla para todo los rompería. |
| 12 | 2026-10-22 | El técnico no ve la bitácora ni administra usuarios. Solo el administrador puede. | Dar al técnico acceso completo. | Aplica el mínimo privilegio a la propia aplicación y separa funciones: quien ejecuta los procesos no es quien los audita. |
| 13 | 2026-10-22 | psycopg 3 (`psycopg[binary]`) como conector a PostgreSQL. | psycopg2. | Es la versión actual y mantenida, y tiene paquetes precompilados para amd64 y arm64. |
| 14 | 2026-10-22 | La aplicación arranca aunque no exista `DATABASE_URL`. En ese caso solo se desactivan las funciones que usan la base. | Exigir la base de datos para arrancar. | El generador público no usa la base, y debe seguir funcionando con `python run.py` sin Docker. |

## Configuración de Docker

| # | Fecha | Decisión | Alternativa descartada | Justificación |
|---|---|---|---|---|
| 15 | 2026-10-22 | Docker Compose con dos servicios: la aplicación y PostgreSQL 17 (`postgres:17-bookworm`). Los datos van en un volumen (`pgdata`). | Instalar PostgreSQL directamente en cada máquina, o usar un servicio administrado. | El entorno es el mismo en la laptop y en el servidor. El volumen conserva los datos aunque se borren o recreen los contenedores. |
| 16 | 2026-10-22 | La versión de Debian de la imagen de PostgreSQL queda fija (`bookworm`). | Usar `postgres:17` sin indicar la versión de Debian. | Si la imagen cambiara de versión de Debian por su cuenta, podría cambiar el orden de los textos en los índices y dañarlos. |
| 17 | 2026-10-22 | Se usan imágenes base multiarquitectura (`python:3.11-slim` y `postgres:17-bookworm`), y la imagen de la aplicación se construye en cada máquina. | Publicar una imagen ya construida en un registro. | La laptop es amd64 y el servidor Hetzner es arm64. Construir en cada máquina evita mantener un registro de imágenes. Se comprobó que todas las dependencias tienen paquetes para arm64. |
| 18 | 2026-10-22 | PostgreSQL no publica ningún puerto. Solo la aplicación lo alcanza, por la red interna de Docker. | Publicar el puerto 5432. | Reduce la superficie de ataque: la base no es accesible desde fuera de Docker. |
| 19 | 2026-10-22 | El puerto de la aplicación se publica solo en `127.0.0.1`. | Publicarlo en `0.0.0.0`. | Docker crea sus propias reglas de firewall y se salta ufw. Con `0.0.0.0` la aplicación quedaría expuesta a internet aunque ufw la bloquee. En el servidor se accede mediante un proxy inverso. |
| 20 | 2026-10-22 | Tres archivos: `docker-compose.yml` (común), `docker-compose.override.yml` (desarrollo, se carga solo) y `docker-compose.prod.yml` (producción, se activa con `COMPOSE_FILE` en el `.env` del servidor). | Dos archivos: uno base con la configuración de desarrollo y uno de producción. | Con dos archivos, lo propio de desarrollo (código montado desde la carpeta, modo depuración de Flask) quedaría en la base, y producción no podría quitarlo de forma confiable. El modo depuración permite ejecutar código desde el navegador y nunca debe llegar al servidor. |
| 21 | 2026-10-22 | Las contraseñas y la `SECRET_KEY` solo van en `.env`, que no se versiona. Docker Compose se niega a arrancar si faltan. | Poner valores por defecto en los archivos de Compose. | Ningún secreto queda en el repositorio, y un valor faltante se detecta al arrancar en vez de usar una contraseña conocida. |
| 22 | 2026-10-22 | Respaldo con `pg_dump` en formato comprimido mediante `scripts/backup-db.sh`. Los archivos van a `backups/` con permisos solo para el usuario, y esa carpeta está excluida de git y de la imagen Docker. | Copiar el volumen de Docker directamente, o respaldar en SQL plano. | `pg_dump` hace una copia consistente sin detener la base. El formato comprimido ocupa menos y se restaura con `pg_restore`. Los respaldos contienen datos personales, así que no deben subirse ni quedar dentro de la imagen. |
