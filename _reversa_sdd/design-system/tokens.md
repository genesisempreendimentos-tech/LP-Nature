---
schemaVersion: 1
generatedAt: 2026-09-10T18:58:32.088Z
reversa:
  version: "1.3.3"
kind: design-system-tokens
producedBy: design-system
amendedBy: human-decision-dual-accent
---

# Tokens — tabela mestra

Fonte: `src/styles/theme.css` + `src/index.css` + `src/motion/gsap.ts`.

## Accents (dois papéis — decisão humana 2026-09-10)

| ID canônico | Valor | Papel | Alias no código hoje | Fonte |
|---|---|---|---|---|
| **color.contentAccent** | #788262 | Ênfase tipográfica / labels de conteúdo | `--color-nature-accent`; literais #788262 | decisão + @theme 🟢 |
| **color.interactiveAccent** | #5c6450 | Chrome interativo (CTA, FAB, header) | `--color-accent` | decisão + :root 🟢 |

> Screen Translator: usar estes IDs. Nunca colapsar em um único `color.accent` sem qualificador.

## Cores (demais canônicas)

| ID | Valor | Fonte |
|---|---|---|
| color.nature.background | #f5f3ec | @theme 🟢 |
| color.nature.backgroundAlt | #e9ecdf | @theme 🟢 |
| color.nature.surface | #faf9f3 | @theme 🟢 |
| color.nature.text | #263e32 | @theme 🟢 |
| color.nature.textMuted | #64705e | @theme 🟢 |
| color.nature.primary | #304b3a | @theme 🟢 |
| color.nature.accent | #788262 | alias Tailwind de contentAccent 🟢 |
| color.nature.border | #d3d6ca | @theme 🟢 |
| color.bg | #f9f8f6 | :root 🟢 |
| color.bgAlt | #f0efeb | :root 🟢 |
| color.surface | #ffffff | :root 🟢 |
| color.text | #1a1c1a | :root 🟢 |
| color.muted | #757470 | :root 🟢 |
| color.accent | #5c6450 | alias de interactiveAccent 🟢 |
| color.forest | #2b4738 | literal 🟡 |
| color.forestHover | #49604a | literal 🟡 |
| color.creamOnDark | #fffdf6 | literal 🟡 |
| color.gold | #c4a574 | literal 🟡 |
| color.teal | #0d8176 | literal 🟡 |
| color.focus | #8b6d38 | literal 🟡 |
| color.error | #8a4b2f | literal 🟡 |
| color.preloader | #233c2e | literal 🟡 |

## Tipografia

| ID | Valor | Fonte |
|---|---|---|
| font.display | Cormorant Garamond, Georgia, serif | @theme 🟢 |
| font.body | Manrope, sans-serif | @theme 🟢 |
| font.nav | Montserrat, system-ui, sans-serif | @theme/:root 🟢 |

## Espaçamento / layout

| ID | Valor | Fonte |
|---|---|---|
| spacing.section | clamp(4rem, 7vw, 7rem) | @theme 🟢 |
| layout.shell | min(1320px, calc(100% - 112px)) | CSS 🟡 |
| layout.headerMax | 1192px | CSS 🟡 |
| bp.sm | 760px | CSS 🟢 |
| bp.lg | 1050px | CSS 🟢 |

## Motion / easing

| ID | Valor | Fonte |
|---|---|---|
| ease.out | cubic-bezier(0.23, 1, 0.32, 1) | :root / index 🟢 |
| ease.inOut | cubic-bezier(0.77, 0, 0.175, 1) | :root 🟢 |
| header.colorEase | = ease.out | :root 🟢 |
| header.layoutEase | cubic-bezier(0.4, 0, 0.2, 1) | :root 🟢 |
| header.colorDuration | 240ms | :root 🟢 |
| header.layoutDuration | 700ms | :root 🟢 |
| motion.natureEase | CustomEase "0.23,1,0.32,1" | gsap.ts 🟢 |

## Elevação / sombra (amostra)

| ID | Valor | Uso |
|---|---|---|
| shadow.header | 0 14px 36px rgba(92,100,80,.18) | header scrolled |
| shadow.fab | 0 10px 28px rgba(18,80,42,.28) | FAB |
| shadow.modal | 0 28px 80px rgba(18,35,27,.22) | lead modal |
| shadow.ctaHover | 0 8px 20px rgba(92,100,80,.25) | section-cta |

## Z-index

| Camada | z-index |
|---|---|
| skip / header | 20 |
| preloader | 30 |
| FAB | 35 |
| modal overlay / content | 80 / 81 |
| map legend / gate | 800 / 900 |

## Radius

| ID | Valor |
|---|---|
| radius.none | 0 |
| radius.pill | 999px / 50% |
