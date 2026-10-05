# Deploy VPS — LP Nature Página de Vendas

| Item | Valor |
|------|--------|
| Domínio | https://lp.residencialnature.com.br |
| Pasta | `/var/www/lp-nature` |
| API (PM2) | `127.0.0.1:3103` (`nature-api`) |
| Repo | https://github.com/genesisempreendimentos-tech/LP-Nature.git (branch `master`) |
| Stack | Nginx (estático + proxy `/api`) + PM2 + Certbot |

## Pré-requisito DNS

Crie um registro **A** (ou CNAME) apontando:

```text
lp.residencialnature.com.br  →  IP da VPS
```

## Setup completo (primeira vez)

Na VPS (Ubuntu/Debian), como usuário com `sudo`:

```bash
sudo mkdir -p /var/www/lp-nature
sudo chown -R $USER:$USER /var/www/lp-nature
git clone --branch master https://github.com/genesisempreendimentos-tech/LP-Nature.git /var/www/lp-nature

cd /var/www/lp-nature
bash deploy/setup-vps.sh
```

O script faz:

1. Instala Git, Nginx, Certbot, Node.js 22, PM2, pnpm
2. Clona/atualiza o repositório
3. Cria `.env` (abre o editor — preencha Neon/Supabase)
4. Instala dependências e faz o build do frontend
5. Sobe a API no PM2 na porta **3103**
6. Configura Nginx para o domínio (HTTP provisório até ter certificado)
7. Emite certificado HTTPS (Let's Encrypt) e aplica `deploy/nginx-lp.residencialnature.com.br.conf`

Flags úteis:

```bash
bash deploy/setup-vps.sh --skip-certbot   # SSL depois
bash deploy/setup-vps.sh --skip-apt       # já tem nginx/node
```

### `.env` (produção)

`.env` fica na **raiz** do monorepo (não em `apps/api/`):

```env
API_PORT=3103
ALLOWED_ORIGIN=https://lp.residencialnature.com.br
PAGINA_ORIGEM=Página de Vendas
DATABASE_URL=postgresql://...
SUPABASE_URL=https://...
SUPABASE_SERVICE_ROLE_KEY=...
```

O frontend chama `/api/...` no mesmo domínio e o Nginx encaminha para `:3103`. `API_PORT`, `ALLOWED_ORIGIN` e `PAGINA_ORIGEM` também são fixados em `deploy/ecosystem.config.cjs`.

## Atualizações

```bash
cd /var/www/lp-nature
bash deploy/deploy.sh
```

## Verificar

```bash
pm2 status
pm2 logs nature-api --lines 40
curl -s http://127.0.0.1:3103/api/health
curl -I https://lp.residencialnature.com.br/
```

## Arquivos

| Arquivo | Função |
|---------|--------|
| `deploy/setup-vps.sh` | Processo completo na VPS (primeira vez) |
| `deploy/deploy.sh` | Pull + build + reload PM2 |
| `deploy/ecosystem.config.cjs` | Processo PM2 |
| `deploy/nginx-lp.residencialnature.com.br.conf` | Site Nginx (HTTPS) |

## Nginx + HTTPS

Após o certbot, **sempre** use o arquivo do repo (já com SSL + porta **3103**):

```bash
sudo cp /var/www/lp-nature/deploy/nginx-lp.residencialnature.com.br.conf /etc/nginx/sites-available/lp.residencialnature.com.br
sudo nginx -t && sudo systemctl reload nginx
```

Portas já usadas na VPS: 3100 (Solar do Bosque LP), 3051 (Solar do Bosque institucional), 3111 (Feirão DEZCONTO).

## SSL manual (se o setup pulou)

```bash
sudo certbot --nginx -d lp.residencialnature.com.br
sudo cp /var/www/lp-nature/deploy/nginx-lp.residencialnature.com.br.conf /etc/nginx/sites-available/lp.residencialnature.com.br
sudo nginx -t && sudo systemctl reload nginx
```
