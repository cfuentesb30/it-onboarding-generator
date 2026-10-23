#!/usr/bin/env bash
# Back up the PostgreSQL database with pg_dump (custom format, compressed).
#
# Usage, from anywhere, with the containers running:
#   ./scripts/backup-db.sh
# Creates backups/db-YYYYMMDD-HHMMSS.dump (readable only by your user).
#
# Restore a backup (overwrites the current data):
#   docker compose exec -T db sh -c 'pg_restore -U "$POSTGRES_USER" -d "$POSTGRES_DB" --clean --if-exists' < backups/<file>.dump
set -euo pipefail

cd "$(dirname "$0")/.."
umask 077
mkdir -p backups

file="backups/db-$(date +%Y%m%d-%H%M%S).dump"
trap 'rm -f "$file"; echo "Error: no se pudo crear el respaldo." >&2' ERR

docker compose exec -T db sh -c 'pg_dump -U "$POSTGRES_USER" -d "$POSTGRES_DB" --format=custom' > "$file"

echo "Respaldo creado: $file ($(du -h "$file" | cut -f1))"
