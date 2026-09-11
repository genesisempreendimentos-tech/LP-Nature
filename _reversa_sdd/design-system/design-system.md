---
schemaVersion: 1
generatedAt: 2026-09-10T18:58:32.088Z
reversa:
  version: "1.3.3"
kind: design-system
producedBy: design-system
---

# Design System — Nature Residencial (legado)

Documento consolidado para checagem de **fidelidade visual** na migração Astro. Artefatos irmãos: `color-palette.md`, `typography.md`, `spacing.md`, `tokens.md`.

## Resumo executivo

- Brand: verde-floresta + sage + cream; tipografia Cormorant (display) + Manrope (body) + Montserrat (nav/CTA).
- UI quase sem border-radius (0), círculos só em FAB/ícones.
- **Dois accents formais (decisão humana):** `contentAccent` #788262 (tipografia/labels) + `interactiveAccent` #5c6450 (CTA/FAB/header). Manter ambos; não unificar.
- Motion: `ease-out` 0.23,1,0.32,1 (CSS + GSAP CustomEase).

## Componentes de interface (catálogo leve)

| Componente | Classes / origem | Variantes |
|---|---|---|
| NatureLogo | `nature-logo*` | light, mark-only, header color reveal |
| Header pill | `header-pill` | scrolled true/false; mobile menu |
| Button primary | `button-primary` | hero invertido (cream on forest) |
| Section CTA | `section-cta` | usa `--color-accent` :root |
| Story CTA | `story-cta` | wipe hover |
| Plan option | `plan-option` | active |
| Amenity card / rail | `amenity-card`, `amenities-nav` | — |
| Lead FAB | `lead-fab*` | bubble |
| Lead modal | `lead-modal*` | form / success / error |
| Map | `leaflet-nature-*`, gate, legend | — |
| Preloader | `nature-preloader` | — |
| Footer | `site-footer` | dark |

Sem Storybook / lib de componentes isolada — catálogo inferido do CSS/TSX. 🟡

## Como usar na migração

1. Screen Translator Fase 2 referencia IDs de `tokens.md` (nunca hex soltos nas specs novas).
2. Hex sem token → append em `tokens-derived.md` + DEV-XXX.
3. Screenshots do Visor validam contraste e hierarquia; tokens validam valores.

## Lacunas

| ID | Lacuna | Impacto |
|---|---|---|
| DS-01 | DM Sans importado sem uso tokenizado | possível residual |
| DS-02 | ~~Dual accent ambíguo~~ → **RESOLVIDO**: content vs interactive (ver color-palette / tokens) | Screen Translator deve usar IDs distintos |
| DS-03 | Muted text drift entre seções | fidelity |
| DS-04 | Sem tokens de sucesso dedicados | modal success improvisado |
| DS-05 | spacing.section pouco usado vs paddings literais | parity de ritmo vertical |
