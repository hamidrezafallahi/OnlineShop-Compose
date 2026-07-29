#!/usr/bin/env bash
# Apply sample SQL seeds to PostgreSQL with one command.
#
# Usage:
#   ./database/seed.sh              # insert sample data
#   ./database/seed.sh --clean      # truncate sample tables, then insert
#
# Optional env:
#   COMPOSE_FILE=docker-compose.dev.yml
#   POSTGRES_SERVICE=postgres
#   POSTGRES_DB=OnlineShopDb
#   POSTGRES_USER=postgres

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SEEDS_DIR="$ROOT_DIR/database/seeds"
COMPOSE_FILE="${COMPOSE_FILE:-docker-compose.dev.yml}"
POSTGRES_SERVICE="${POSTGRES_SERVICE:-postgres}"
POSTGRES_DB="${POSTGRES_DB:-OnlineShopDb}"
POSTGRES_USER="${POSTGRES_USER:-postgres}"
CLEAN=0

for arg in "$@"; do
  case "$arg" in
    --clean|-c) CLEAN=1 ;;
    -h|--help)
      sed -n '2,14p' "$0"
      exit 0
      ;;
    *)
      echo "Unknown argument: $arg" >&2
      exit 1
      ;;
  esac
done

run_sql_file() {
  local file="$1"
  echo "==> Applying $(basename "$file")"
  docker compose -f "$ROOT_DIR/$COMPOSE_FILE" exec -T "$POSTGRES_SERVICE" \
    psql -v ON_ERROR_STOP=1 -U "$POSTGRES_USER" -d "$POSTGRES_DB" < "$file"
}

if [[ "$CLEAN" -eq 1 ]]; then
  run_sql_file "$SEEDS_DIR/00_truncate_sample_data.sql"
fi

shopt -s nullglob
files=("$SEEDS_DIR"/[0-9][0-9]_*.sql)
if [[ ${#files[@]} -eq 0 ]]; then
  echo "No seed files found in $SEEDS_DIR" >&2
  exit 1
fi

for file in "${files[@]}"; do
  base="$(basename "$file")"
  if [[ "$base" == "00_truncate_sample_data.sql" ]]; then
    continue
  fi
  run_sql_file "$file"
done

echo "Sample data seeded successfully."
