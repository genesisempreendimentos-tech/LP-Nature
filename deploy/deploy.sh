#!/usr/bin/env bash
# Atualiza a LP Nature que já está no ar na VPS.
# Uso: cd /var/www/lp-nature && bash deploy/deploy.sh
#
# Não mexe em Nginx, portas nem .env: só código, dependências, build e PM2.
# Reinicia apenas os processos PM2 cujo cwd fica dentro desta pasta.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

echo "==> Atualizando código ($(git branch --show-current))..."
git pull --ff-only

echo "==> Instalando dependências..."
if command -v pnpm >/dev/null 2>&1; then
  PNPM="pnpm"
else
  PNPM="npx -y pnpm@10.34.3"
fi
$PNPM install --frozen-lockfile

echo "==> Build..."
$PNPM run build

echo "==> Reiniciando processos PM2 desta pasta..."
IDS="$(pm2 jlist | node -e '
  const root = process.argv[1];
  const list = JSON.parse(require("fs").readFileSync(0, "utf8"));
  const ids = list
    .filter((p) => {
      const cwd = (p.pm2_env && p.pm2_env.pm_cwd) || "";
      return cwd === root || cwd.startsWith(root + "/");
    })
    .map((p) => p.pm_id);
  console.log(ids.join(" "));
' "$ROOT")"

if [[ -z "$IDS" ]]; then
  echo "ERRO: nenhum processo PM2 rodando em $ROOT. Confira: pm2 list" >&2
  exit 1
fi

for id in $IDS; do
  echo "    reload $id ($(pm2 jlist | node -e 'const l=JSON.parse(require("fs").readFileSync(0,"utf8"));const p=l.find(x=>String(x.pm_id)===process.argv[1]);console.log(p?p.name:"?")' "$id"))"
  pm2 reload "$id"
done
pm2 save

echo "==> Deploy concluído. Logs: pm2 logs $IDS --lines 40"
