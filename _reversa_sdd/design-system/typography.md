---
schemaVersion: 1
generatedAt: 2026-09-10T18:39:12.657Z
reversa:
  version: "1.3.3"
kind: design-system-typography
producedBy: design-system
---

# Typography — Nature Residencial

## Famílias

| Token | Stack | Pesos usados | Confiança |
|---|---|---|---|
| `font.display` | `"Cormorant Garamond", Georgia, serif` | 400, 500, 600; itálico 400/500 | 🟢 |
| `font.body` | `"Manrope", sans-serif` | 400, 500, 600 | 🟢 |
| `font.nav` | `"Montserrat", system-ui, -apple-system, sans-serif` | 500, 600 | 🟢 |

**Import Google Fonts** (`index.css`): também carrega **DM Sans** (400–700), mas **não há token `--font-*` apontando para DM Sans** → 🔴 potencialmente morto / residual.

## Hierarquia (valores observados)

| Papel | Família | Tamanho | Peso | Line / tracking | Confiança |
|---|---|---|---|---|---|
| Hero title (stage) | display | `clamp(72px, 7.8vw, 122px)` · mobile `clamp(52px, 12.5vw, 86px)` | 400 | lh 1.04 / ls -0.045em | 🟡 |
| Section H2 | display | `clamp(42–80px)` conforme seção | 400 | ~1.0–1.06 / ls -0.03…-0.04em | 🟡 |
| Modal title | display | `clamp(32px, 5vw, 42px)` | 400 | 1.05 / -0.03em | 🟡 |
| H3 pilares | display | 24px | 500 | 1.12 | 🟡 |
| Body | body | 14px | 400 | 1.8–1.9 | 🟡 |
| Body compact | body | 11–13px | 400 | 1.55–1.7 | 🟡 |
| Eyebrow / kicker | body | 8–10px | 500–600 | ls 0.13–0.18em; uppercase frequente | 🟡 |
| Nav links | nav | 12px (11px ≤1100px) | 500 | ls 0.04em | 🟢 |
| CTA / section-cta | nav | 12px | 600 | ls 0.03–0.08em; uppercase no section-cta | 🟢 |
| Footer label | nav | 9–10px | 600 | ls 0.16–0.18em uppercase | 🟡 |
| Facts / números | display | 25–33px | 400 | — | 🟡 |

## Em / ênfase

- `h1 em`, `h2 em`: peso 400, cor `#788262` (sage) no body; no hero stage `#d9ddc0`.
- Quotes location: display itálico.

## Regras de wrap

- `h1, h2, h3, p { text-wrap: pretty }`; `h2 { text-wrap: balance }` (exceto hero title: `text-wrap: initial`).
