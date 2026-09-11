# Monorepo Nature — estrutura base (shared + api)

Criado na promoção da Prioridade #0 → migração.

```
apps/
  api/                 # BFF Express (fonte única da API)
    server.ts          # PM2: node --experimental-strip-types …
    db.mjs
    ecosystem.config.cjs
    migrations/
  web/                 # Astro scaffold (ilhas na próxima etapa)
    src/pages/index.astro
packages/
  shared/
    src/
      lead.ts          # LeadCreatePayload, LeadCreateResponse, PATCH allowlist
      index.ts
pnpm-workspace.yaml
tsconfig.base.json
```

A pasta raiz `api/` foi **removida** (só tinha shims). Não há scripts/imports apontando para ela.

API PM2: `pnpm api:pm2:start` → `apps/api/ecosystem.config.cjs` (nome `nature-api`, porta 8787).
Proxy Vite legado: `/api` → `127.0.0.1:8787` (HTTP path; não é a pasta).
.env: raiz do monorepo, lido por `apps/api/server.ts` via dotenv.
