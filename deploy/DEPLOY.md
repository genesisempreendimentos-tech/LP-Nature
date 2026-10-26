# Deploy VPS — LP Nature

A LP já está configurada e no ar na VPS (Nginx, PM2, `.env` e SSL).
Para publicar uma atualização:

```bash
cd /var/www/lp-nature && bash deploy/deploy.sh
```

O script:

1. `git pull --ff-only` no branch atual
2. Instala dependências
3. Faz o build — API roda `apps/api/server.ts` direto no Node (sem build); o build gera `apps/web/dist`.
4. `pm2 reload` só nos processos PM2 cujo diretório fica dentro de `/var/www/lp-nature`
5. `pm2 save`

Não altera Nginx, portas nem `.env`.

## Variáveis de tracking (`.env` na raiz / `apps/api`)

Obrigatórias para gravar acessos em `public.acessos_user`:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SITE_ID` (Nature = `11`; também default no `ecosystem.config.cjs`)
- `TRUST_PROXY=true` em produção (atrás do Nginx)

Opcional: `MAXMIND_DB_PATH` (GeoLite2).

Removidas (não usar mais): `PAGINA_ORIGEM` (substituída por `SITE_ID`).

Segredos Supabase **não** vão no `ecosystem.config.cjs` — só no `.env`.

## Verificar

```bash
pm2 list
pm2 logs <id> --lines 40
```
