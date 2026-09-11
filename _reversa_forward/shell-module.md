# Shell (casca-aplicacao) — apps/web

## Store de lead (reaproveitada)

- Arquivo: `apps/web/src/features/lead/store.ts`
- Action: `openLeadModal(opts?)`
- Header CTA + flyout CTA importam essa action — **sem** segunda store.

## `$appReady`

- `apps/web/src/features/shell/appReady.ts` → `$appReady` / `markAppReady` / `bindAppReadyFromDom`
- Preloader inline seta `document.documentElement.dataset.appReady = "1"` + evento `nature:app-ready`

## Arquivos

```
features/shell/
  Preloader.astro      # inline script, sem island
  HeaderIsland.tsx     # island React
  Footer.astro         # estático; wa.me intacto (DEV-009)
  NatureLogo.tsx
  appReady.ts
data/shell.ts
styles/shell.css
```

## Divergências conscientes vs Header.tsx legado

| Item | Legado (código real) | Shell Astro agora |
|------|----------------------|-------------------|
| Histerese | **80 / 40** (`Header.tsx`) | **80 / 40** (alinhado) |
| Duração cor | **240ms** (`theme.css`) | **240ms** (alinhado) |
| Duração layout | **700ms** (`theme.css`) | **700ms** (alinhado) |
| Colapso Jitter 320px | não no Header atual | sim (modernizado — estrutura) |
| Flyout desktop | âncoras flat | painel com crossfade (modernizado) |
| Mobile | hamburger | mantido |

> Spec de design prévia 72/56/520ms **não** vira comportamento sem DEV-XXX.
> Fonte da verdade: código React em produção + BR-MIGRAR-014.
