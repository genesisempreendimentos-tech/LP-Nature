# Ilhas lead + mapa (apps/web)

Harness em `apps/web/src/pages/index.astro` (sem shell/marketing).

## Features

```
apps/web/src/features/
  lead/
    store.ts              # nanostores (substitui LeadModalContext)
    leadsClient.ts        # POST /api/leads via @nature/shared
    LeadModalIsland.tsx
    LeadFabIsland.tsx
    OpenLeadButton.tsx
  location/
    mapData.ts            # POIs + pin Nature (fonte única)
    LocationMapIsland.tsx
    LocationMapLazy.tsx
```

## Rodar

1. API no ar: `pnpm api:pm2:start` (porta 8787)
2. `npm run dev --workspace=@nature/web` → http://localhost:4321
3. Proxy Vite do Astro: `/api` → `127.0.0.1:8787`

## Escopo desta etapa

- Modal + FAB + mapa Leaflet com gate
- POST real (nome/email/telefone); `pagina_origem` só no servidor
- `interessePlanta` no store/UI stub — **não** enviado no POST (API estável sem essa coluna)

## Fora

- Shell (header/footer/preloader), marketing literal, PATCH/LGPD
