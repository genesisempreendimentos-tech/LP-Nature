# Nature API — process manager (Prioridade #0)

## Objetivo

A API Express (`apps/api/server.ts`) deve ficar **sempre de pé** (reboot, queda de sessão, crash). Não depender de `node` solto no terminal.

## Como o PM2 executa hoje

- **Sem** `tsx` / `ts-node`
- **Sem** build para `dist/`
- `node` nativo com:
  - `--experimental-strip-types`
  - `--experimental-transform-types`
- Script: `apps/api/server.ts`
- `cwd`: raiz do monorepo
- `.env`: carregado em `server.ts` via `dotenv` apontando para **`<raiz>/.env`** (`DATABASE_URL` não vai no ecosystem)

Arquivo: `apps/api/ecosystem.config.cjs`  
Processo: `nature-api`

### Nesta máquina / após deploy

```bash
pnpm api:pm2:start
pnpm api:pm2:save
```

### VPS Linux (sobreviver a reboot)

```bash
pm2 startup
# executar exatamente o comando `sudo env PATH=...` que o pm2 imprimir
pm2 save
```

Se outros serviços da VPS já usam **systemd** em vez de pm2, espelho equivalente:

```ini
# /etc/systemd/system/nature-api.service
[Unit]
Description=Nature leads API
After=network.target

[Service]
Type=simple
WorkingDirectory=/caminho/do/monorepo
EnvironmentFile=/caminho/do/monorepo/.env
ExecStart=/usr/bin/node --experimental-strip-types --experimental-transform-types apps/api/server.ts
Restart=always
RestartSec=3

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now nature-api
```

## Checklist .env na raiz do monorepo

- `DATABASE_URL` = URL (senha rotacionada se a antiga vazou)
- `LEADS_TABLE_NAME=site_nature`
- `PAGINA_ORIGEM=Página de Vendas`
- `ALLOWED_ORIGIN` = origem HTTPS real do front
- `API_PORT=8787` (ou a porta atrás do reverse proxy)

Nunca commitar `.env`. Nunca colocar a connection string no ecosystem/pm2 env versionado.
