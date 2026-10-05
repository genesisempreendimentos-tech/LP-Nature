#!/usr/bin/env bash
# Atualização rápida após o setup inicial.
# Uso: cd /var/www/lp-nature && bash deploy/deploy.sh
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

echo "==> Atualizando código..."
git pull origin master

echo "==> Instalando dependências..."
pnpm install --frozen-lockfile

echo "==> Build..."
pnpm run build

echo "==> Reiniciando API (PM2)..."
if pm2 describe nature-api >/dev/null 2>&1; then
  pm2 reload deploy/ecosystem.config.cjs --update-env
else
  pm2 start deploy/ecosystem.config.cjs
fi

pm2 save

echo "==> Deploy concluído."
echo "    Frontend: $ROOT/apps/web/dist"
echo "    API:      pm2 logs nature-api"
echo "    Health:   curl -s http://127.0.0.1:3103/api/health"
