---
schemaVersion: 1
generatedAt: 2026-09-10T18:58:32.088Z
reversa:
  version: "1.3.3"
kind: design-system-color-palette
producedBy: design-system
amendedBy: human-decision-dual-accent
---

# Color Palette — Nature Residencial

> Extraído de `src/styles/theme.css` (@theme + :root) e literais em `src/index.css`.
> Escala: 🟢 config/tema · 🟡 inferido de uso · 🔴 lacuna

## Decisão humana — dois accents (MANTER, não unificar)

**Decidido:** os dois hex coexistem de propósito. Não há “accent único”.

| Token semântico (intenção) | Hex | Papel | Alias legado atual no código |
|---|---|---|---|
| `color.contentAccent` | `#788262` | Ênfase tipográfica em **conteúdo**: `<em>` em títulos, eyebrows/labels estáticos | `--color-nature-accent` (@theme); literais `#788262` em `index.css` |
| `color.interactiveAccent` | `#5c6450` | **Chrome interativo**: CTA (`.section-cta`), FAB, header CTA scrolled/fill | `--color-accent` (:root) |

**Nome canônico alvo em `theme.css`** (quando `allowLegacyEdits` liberar a edição):

```css
--color-content-accent: #788262;      /* conteúdo */
--color-interactive-accent: #5c6450;  /* chrome */
--color-accent: #5c6450;              /* alias compat = interactive */
--color-nature-accent: #788262;       /* alias Tailwind = content (não remover sem migrar classes) */
```

**Regra para Screen Translator / codificador:**
- Texto/label/em de seção → `contentAccent` / `#788262`
- Botão/CTA/FAB/header chrome → `interactiveAccent` / `#5c6450`
- Proibido substituir um pelo outro “para padronizar”

**Consumidores (não misturar):**
- Content: LifeMoment, FloorPlans, Amenities, LeadForm (`<em>`), Architecture, Trust, Location, LocationMap (+ selection Tailwind no App)
- Interactive: Header, SectionCta (+ LeadModal), WhatsAppFab

## Outras famílias de token (inalteradas)

| Família | Onde | Uso típico |
|---|---|---|
| `--color-nature-*` (`@theme`) | `theme.css` | Tailwind `bg-nature-*`, etc. |
| `--color-bg|surface|text|muted` (`:root`) | `theme.css` | shell / superfícies |

## Tokens canônicos (@theme / Tailwind nature-*)

| Token | Hex | Papel | Confiança |
|---|---|---|---|
| `color.nature.background` | `#f5f3ec` | fundo de página / body | 🟢 |
| `color.nature.backgroundAlt` | `#e9ecdf` | seções alt | 🟢 |
| `color.nature.surface` | `#faf9f3` | superfícies claras | 🟢 |
| `color.nature.text` | `#263e32` | texto principal | 🟢 |
| `color.nature.textMuted` | `#64705e` | texto secundário (token) | 🟢 |
| `color.nature.primary` | `#304b3a` | verde primário / estados ativos | 🟢 |
| `color.nature.accent` (= `contentAccent`) | `#788262` | **content accent** — não é interactive | 🟢 |
| `color.nature.border` | `#d3d6ca` | bordas padrão | 🟢 |

## Tokens :root (shell)

| Token | Hex | Papel | Confiança |
|---|---|---|---|
| `color.bg` | `#f9f8f6` | fundo genérico shell | 🟢 |
| `color.bgAlt` | `#f0efeb` | fundo alt shell | 🟢 |
| `color.surface` | `#ffffff` | superfície / fill CTA | 🟢 |
| `color.text` | `#1a1c1a` | texto shell | 🟢 |
| `color.muted` | `#757470` | muted shell | 🟢 |
| `color.accent` (= `interactiveAccent`) | `#5c6450` | **interactive accent** — CTA/FAB/header | 🟢 |

## Escala de verdes / sage (literais)

| Nome sugerido | Hex | Notas |
|---|---|---|
| `green.ink` | `#263e32` | = nature.text |
| `green.forest` | `#2b4738` | painéis / button-primary (≠ interactive accent) |
| `green.primary` | `#304b3a` | plan active |
| `green.hover` | `#49604a` | hover forest |
| `contentAccent` / sage | `#788262` | ver decisão acima |
| `interactiveAccent` | `#5c6450` | ver decisão acima |
| `sage.soft` | `#e9ecdf` | section alt bg |
| `gold.footer` | `#c4a574` | footer |
| `teal.trust` | `#0d8176` | trust / distância |
| `focus.ring` | `#8b6d38` | focus-visible |
| `error.form` | `#8a4b2f` | lead-modal-error |

## Feedback

| Semântica | Valor | Confiança |
|---|---|---|
| Sucesso | sem token dedicado | 🔴 |
| Erro | `#8a4b2f` | 🟡 |
| Focus | `#8b6d38` | 🟡 |

## Pendência de código legado

- Formalizar nomes em `theme.css` + remover regra órfã `.amenity-tabs button span` em `index.css` — **bloqueado** por `allowLegacyEdits: false` (ver `migration/pending_legacy_accent_formalization.md`).
