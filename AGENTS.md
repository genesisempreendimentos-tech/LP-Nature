# Nature Residencial — agentes / monorepo

Landing Astro (`apps/web`) + API Express (`apps/api`) + tipos compartilhados (`packages/shared`).

## Desenvolvimento

- Workspace: **pnpm** (`pnpm-workspace.yaml`, `.mise.toml` pin pnpm@10.34.3)
- Front: `pnpm run dev:web` → Astro (porta padrão **4321**)
- API: `pnpm run dev:api` → Express (porta **8787**, proxy `/api` no Astro)
- Ambos: `pnpm run dev`

Tracking unificado: `POST /api/tracking`, `POST /api/tracking/saida`, `PATCH /api/tracking/consentimento` → Supabase `acessos_user` (service_role via REST). Envs: `SUPABASE_*`, `SITE_ID`, `TRUST_PROXY` (ver `.env.example`). Meta Pixel só com consentimento `aceito`.

O Vite React legado (`src/`, `vite.config.ts` na raiz) foi removido em 2026-09-11.

## Reversa

@AGENTS.md legado Figma Make foi substituído por este guia. Regras do framework:

Quando o usuário digitar `reversa` sozinho:

1. Ative o skill `reversa` em `.agents/skills/reversa/SKILL.md`
2. Siga o SKILL.md na íntegra

Escrita fora das pastas Reversa obedece `.reversa/reversa-config.json` (`allowLegacyEdits` / `allowedPaths`).
