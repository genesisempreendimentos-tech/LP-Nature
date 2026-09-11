---
schemaVersion: 1
generatedAt: 2026-09-10T18:39:12.657Z
reversa:
  version: "1.3.3"
kind: design-system-spacing
producedBy: design-system
---

# Spacing, Grid & Breakpoints — Nature Residencial

## Token de seção

| Token | Valor | Confiança |
|---|---|---|
| `spacing.section` | `clamp(4rem, 7vw, 7rem)` (`--spacing-section` em @theme) | 🟢 |

Na prática, paddings de seção são **literais** (ex.: 108px/84px, 95px, 112px) — o token clamp existe mas nem sempre é aplicado. 🟡

## Shell / container

| Token | Valor | Confiança |
|---|---|---|
| `layout.shell.max` | 1320px | 🟡 |
| `layout.shell.width` | `min(1320px, calc(100% - 112px))` | 🟡 |
| `layout.shell.width.md` | `calc(100% - 64px)` ≤1050px | 🟡 |
| `layout.shell.width.sm` | `calc(100% - 40px)` ≤760px | 🟡 |
| `layout.header.pill.max` | 1192px | 🟡 |
| `layout.scrollPaddingTop` | 96px | 🟡 |

## Escala observada (espaçamento)

Valores recorrentes em gap/padding: **8, 10, 12, 14, 16, 18, 20, 22, 24, 25, 28, 30, 32, 34, 35, 36, 40, 42, 45, 48, 52, 56, 58, 65, 70, 80, 88, 90, 95, 100, 108, 112** (px). Sem scale numérica nomeada tipo Tailwind spacing map — escala **ad-hoc**. 🟡

## Grid padrões

| Padrão | Desktop | Mobile (≤760) |
|---|---|---|
| Hero stage | full-bleed | full-bleed |
| Pillars | 4 col | 2 col |
| Plans | 34% / 1fr | 1 col |
| Location experience | 1.35fr / 0.65fr | 1 col |
| Architecture gallery | 1.35fr / 0.65fr, 2 rows | 1fr 1fr + main full |
| Trust certs | 1.1fr + 3 | 1 col / row cards |
| Footer | 4 col | 1 col (2 col ≤1050) |
| Proximity | 3 col | 2 col |

## Breakpoints (media queries observadas)

| Nome sugerido | px | Evidência | Confiança |
|---|---|---|---|
| `bp.sm` | 760 | mobile layout dominante | 🟢 |
| `bp.md` | 900 | header CTA icon-only (761–900) | 🟡 |
| `bp.lg` | 1050 | shell / footer 2-col / location | 🟢 |
| `bp.xl` | 1100 | header nav denser | 🟡 |

Não há `sm/md/lg` Tailwind theme custom além dessas media queries no CSS.

## Border radius

| Uso | Valor | Confiança |
|---|---|---|
| Default brand | **0** (botões, cards, modal, header pill) | 🟡 |
| Círculos | 50% / 999px (FAB, explore, menu-toggle mobile, seals) | 🟡 |
| Hero imagem (legado antigo path) | `180px 0 0 0` / mobile `100px` | 🟡 |
| Header mobile nav panel | 24px | 🟡 |
| Leaflet popup | 0 | 🟡 |

Direção visual: **ângulos retos** na UI de conversão/marketing; círculos só em FAB/ícones/seals.

## Safe areas

Padding/posição usam `env(safe-area-inset-*)` em header, FAB, contact, hero-stage. 🟢
