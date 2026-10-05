#!/usr/bin/env bash
# =============================================================================
# Setup completo na VPS — Nature Página de Vendas
# Domínio: https://lp.residencialnature.com.br
# API PM2: 127.0.0.1:3103  |  Nginx: 80/443 + proxy /api
#
# Uso (Ubuntu/Debian, como usuário com sudo):
#   cd /var/www/lp-nature && bash deploy/setup-vps.sh
#
# Flags:
#   --skip-certbot   não emite certificado SSL
#   --skip-apt       não instala pacotes do sistema
# =============================================================================
set -euo pipefail

DOMAIN="lp.residencialnature.com.br"
APP_DIR="/var/www/lp-nature"
REPO_URL="https://github.com/genesisempreendimentos-tech/LP-Nature.git"
BRANCH="master"
API_PORT="3103"
PM2_NAME="nature-api"
NODE_MAJOR="22"
PNPM_VERSION="10.34.3"
NGINX_SITE="lp.residencialnature.com.br"
HEALTH_PATH="/api/health"

SKIP_CERTBOT=0
SKIP_APT=0

for arg in "$@"; do
  case "$arg" in
    --skip-certbot) SKIP_CERTBOT=1 ;;
    --skip-apt) SKIP_APT=1 ;;
    -h|--help)
      sed -n '2,13p' "$0"
      exit 0
      ;;
  esac
done

log()  { echo -e "\n==> $*"; }
ok()   { echo "    ✓ $*"; }
warn() { echo "    ! $*"; }
die()  { echo "ERRO: $*" >&2; exit 1; }

need_sudo() {
  if [[ "${EUID}" -eq 0 ]]; then
    SUDO=""
  else
    command -v sudo >/dev/null || die "precisa de sudo ou rodar como root"
    SUDO="sudo"
  fi
}

need_sudo

# -----------------------------------------------------------------------------
# 1. Pacotes do sistema
# -----------------------------------------------------------------------------
if [[ "$SKIP_APT" -eq 0 ]]; then
  log "Atualizando apt e instalando dependências (git, nginx, certbot)..."
  $SUDO apt-get update -y
  $SUDO DEBIAN_FRONTEND=noninteractive apt-get install -y \
    ca-certificates curl gnupg git nginx
  if [[ "$SKIP_CERTBOT" -eq 0 ]]; then
    $SUDO DEBIAN_FRONTEND=noninteractive apt-get install -y \
      certbot python3-certbot-nginx
  fi
  ok "pacotes base ok"
fi

# -----------------------------------------------------------------------------
# 2. Node.js 22+
# -----------------------------------------------------------------------------
install_node() {
  log "Instalando Node.js ${NODE_MAJOR}.x..."
  curl -fsSL "https://deb.nodesource.com/setup_${NODE_MAJOR}.x" | $SUDO -E bash -
  $SUDO DEBIAN_FRONTEND=noninteractive apt-get install -y nodejs
}

if ! command -v node >/dev/null 2>&1; then
  install_node
else
  MAJOR="$(node -v | sed 's/^v//' | cut -d. -f1)"
  if [[ "$MAJOR" -lt "$NODE_MAJOR" ]]; then
    warn "Node $(node -v) < v${NODE_MAJOR}; atualizando..."
    install_node
  else
    ok "Node $(node -v)"
  fi
fi

# -----------------------------------------------------------------------------
# 3. PM2
# -----------------------------------------------------------------------------
if ! command -v pm2 >/dev/null 2>&1; then
  log "Instalando PM2 global..."
  $SUDO npm install -g pm2
fi
ok "PM2 $(pm2 -v)"
# pnpm (versão fixada no package.json / .mise.toml)
if ! command -v pnpm >/dev/null 2>&1 || [[ "$(pnpm -v)" != "${PNPM_VERSION}" ]]; then
  log "Instalando pnpm@${PNPM_VERSION}..."
  $SUDO npm install -g "pnpm@${PNPM_VERSION}"
fi
ok "pnpm $(pnpm -v)"

# -----------------------------------------------------------------------------
# 4. Código
# -----------------------------------------------------------------------------
log "Preparando diretório ${APP_DIR}..."
$SUDO mkdir -p "$(dirname "$APP_DIR")"
if [[ ! -d "$APP_DIR/.git" ]]; then
  if [[ -d "$APP_DIR" ]] && [[ -n "$(ls -A "$APP_DIR" 2>/dev/null || true)" ]]; then
    die "${APP_DIR} existe e não é um clone git. Remova ou use outro caminho."
  fi
  $SUDO mkdir -p "$APP_DIR"
  $SUDO chown -R "$(id -u):$(id -g)" "$APP_DIR"
  git clone --branch "$BRANCH" "$REPO_URL" "$APP_DIR"
else
  $SUDO chown -R "$(id -u):$(id -g)" "$APP_DIR" 2>/dev/null || true
  cd "$APP_DIR"
  git pull origin "$BRANCH" || warn "git pull falhou — continue com o código local"
fi

cd "$APP_DIR"
ok "código em ${APP_DIR}"

# -----------------------------------------------------------------------------
# 5. Env
# -----------------------------------------------------------------------------
log "Configurando variáveis de ambiente..."

if [[ ! -f .env ]]; then
  cat > .env <<EOF
API_PORT=${API_PORT}
ALLOWED_ORIGIN=https://${DOMAIN}
PAGINA_ORIGEM=Página de Vendas

DATABASE_URL=postgresql://USER:PASSWORD@HOST/neondb?sslmode=require
SUPABASE_URL=https://YOUR_PROJECT.supabase.co
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY
EOF
  warn ".env criado — PREENCHA DATABASE_URL e Supabase antes do PM2 subir a API"
  warn "Abrindo editor em 3s (Ctrl+C para abortar)..."
  sleep 3
  "${EDITOR:-nano}" .env
else
  ok ".env já existe"
  # Alinha porta/CORS sem sobrescrever secrets
  if grep -q "^API_PORT=" .env; then
    sed -i "s|^API_PORT=.*|API_PORT=${API_PORT}|" .env
  else
    echo "API_PORT=${API_PORT}" >> .env
  fi
  if grep -q "^ALLOWED_ORIGIN=" .env; then
    sed -i "s|^ALLOWED_ORIGIN=.*|ALLOWED_ORIGIN=https://${DOMAIN}|" .env
  else
    echo "ALLOWED_ORIGIN=https://${DOMAIN}" >> .env
  fi
fi

# -----------------------------------------------------------------------------
# 6. Build
# -----------------------------------------------------------------------------
log "Instalando dependências e fazendo build..."
pnpm install --frozen-lockfile
pnpm run build
ok "build apps/web/dist (API roda TypeScript direto no Node, sem build)"

# -----------------------------------------------------------------------------
# 7. PM2
# -----------------------------------------------------------------------------
log "Subindo API no PM2 (${PM2_NAME} → :${API_PORT})..."
if pm2 describe "$PM2_NAME" >/dev/null 2>&1; then
  pm2 delete "$PM2_NAME" >/dev/null
fi
pm2 start deploy/ecosystem.config.cjs
pm2 save

# Startup no boot (best-effort)
STARTUP_CMD="$(pm2 startup systemd -u "$(whoami)" --hp "$HOME" 2>/dev/null | tail -n 1 || true)"
if [[ "$STARTUP_CMD" == sudo* ]]; then
  warn "Execute no terminal para PM2 iniciar no boot:"
  echo "    $STARTUP_CMD"
fi

sleep 2
if curl -sf "http://127.0.0.1:${API_PORT}${HEALTH_PATH}" >/dev/null; then
  ok "API health ok em :${API_PORT}"
else
  warn "API ainda não respondeu em ${HEALTH_PATH} — confira: pm2 logs ${PM2_NAME}"
  warn "Costuma ser DATABASE_URL inválida em .env"
fi

# -----------------------------------------------------------------------------
# 8. Nginx
# -----------------------------------------------------------------------------
log "Configurando Nginx para ${DOMAIN}..."
NGINX_SRC="${APP_DIR}/deploy/nginx-${DOMAIN}.conf"
NGINX_DST="/etc/nginx/sites-available/${NGINX_SITE}"
CERT_FILE="/etc/letsencrypt/live/${DOMAIN}/fullchain.pem"

if $SUDO test -f "$CERT_FILE"; then
  $SUDO cp "$NGINX_SRC" "$NGINX_DST"
  ok "certificado já existe — usando config HTTPS do repo"
else
  # Sem certificado ainda: config HTTP provisória (o arquivo do repo exige SSL).
  $SUDO tee "$NGINX_DST" >/dev/null <<EOF
server {
    listen 80;
    listen [::]:80;
    server_name ${DOMAIN};

    root ${APP_DIR}/apps/web/dist;
    index index.html;

    location /api/ {
        proxy_pass http://127.0.0.1:3103;
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }

    location / {
        try_files \$uri \$uri/ \$uri.html =404;
    }
}
EOF
  warn "config HTTP provisória (sem SSL) até o certbot rodar"
fi
$SUDO ln -sf "$NGINX_DST" "/etc/nginx/sites-enabled/${NGINX_SITE}"

$SUDO nginx -t
$SUDO systemctl enable nginx
$SUDO systemctl reload nginx
ok "Nginx ativo → root ${APP_DIR}/apps/web/dist | proxy /api → :${API_PORT}"

# -----------------------------------------------------------------------------
# 9. DNS check + Certbot
# -----------------------------------------------------------------------------
log "Verificando DNS de ${DOMAIN}..."
SERVER_IP="$(curl -4 -fsS ifconfig.me 2>/dev/null || curl -4 -fsS icanhazip.com 2>/dev/null || true)"
DNS_IP="$(getent ahostsv4 "$DOMAIN" 2>/dev/null | awk '{print $1; exit}' || true)"
if [[ -n "$SERVER_IP" && -n "$DNS_IP" ]]; then
  if [[ "$SERVER_IP" == "$DNS_IP" ]]; then
    ok "DNS ${DOMAIN} → ${DNS_IP} (bate com este servidor)"
  else
    warn "DNS ${DOMAIN} → ${DNS_IP} | este servidor → ${SERVER_IP}"
    warn "Aponte o registro A de ${DOMAIN} para ${SERVER_IP} antes do SSL"
  fi
else
  warn "Não foi possível validar DNS automaticamente"
fi

if [[ "$SKIP_CERTBOT" -eq 0 ]] && ! $SUDO test -f "$CERT_FILE"; then
  log "Emitindo certificado Let's Encrypt..."
  if [[ -n "$SERVER_IP" && -n "$DNS_IP" && "$SERVER_IP" != "$DNS_IP" ]]; then
    warn "DNS ainda não aponta para este IP — pulando certbot"
    warn "Depois: sudo certbot --nginx -d ${DOMAIN} e rode este setup de novo"
  elif $SUDO certbot --nginx -d "$DOMAIN" --non-interactive --agree-tos \
      --register-unsafely-without-email --redirect; then
    # Troca a config gerada pelo certbot pela versão HTTPS do repo
    $SUDO cp "$NGINX_SRC" "$NGINX_DST"
    $SUDO nginx -t && $SUDO systemctl reload nginx
    ok "HTTPS ativo com a config do repo"
  else
    warn "certbot falhou — rode manualmente:"
    echo "    sudo certbot --nginx -d ${DOMAIN}"
  fi
elif [[ "$SKIP_CERTBOT" -eq 1 ]]; then
  warn "SSL pulado (--skip-certbot). Depois: sudo certbot --nginx -d ${DOMAIN}"
fi

# -----------------------------------------------------------------------------
# 10. Firewall (best-effort)
# -----------------------------------------------------------------------------
if command -v ufw >/dev/null 2>&1; then
  log "Liberando portas no ufw (22, 80, 443)..."
  $SUDO ufw allow OpenSSH >/dev/null 2>&1 || true
  $SUDO ufw allow 80/tcp >/dev/null 2>&1 || true
  $SUDO ufw allow 443/tcp >/dev/null 2>&1 || true
  ok "ufw rules aplicadas (habilite com: sudo ufw enable — se ainda não estiver)"
fi

# -----------------------------------------------------------------------------
echo ""
echo "=============================================="
echo "  Setup concluído — ${DOMAIN}"
echo "=============================================="
echo "  App:      ${APP_DIR}"
echo "  Frontend: ${APP_DIR}/apps/web/dist"
echo "  API PM2:  ${PM2_NAME} → 127.0.0.1:${API_PORT}"
echo "  Site:     https://${DOMAIN}"
echo ""
echo "  Checagens:"
echo "    pm2 status"
echo "    pm2 logs ${PM2_NAME} --lines 40"
echo "    curl -s http://127.0.0.1:${API_PORT}${HEALTH_PATH}"
echo "    curl -I https://${DOMAIN}/"
echo ""
echo "  Próximos deploys:"
echo "    cd ${APP_DIR} && bash deploy/deploy.sh"
echo "=============================================="
