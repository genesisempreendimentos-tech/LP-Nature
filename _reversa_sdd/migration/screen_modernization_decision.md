---
schemaVersion: 1
generatedAt: 2026-09-10T19:21:58.748Z
reversa:
  version: "1.3.3"
kind: screen_modernization_decision
producedBy: screen-translator
decidedBy: Bruno
decidedAt: 2026-09-10T19:21:58.748Z
mode: hybrid
sourcePlatform: react-spa
targetPlatform: astro-islands
hash: "sha256:5d5f11f61243fd1c316edb2426b37fbb6d2abea38b1116b4f64da7aaee70f24b"
---

# Decisão de Modernização de Telas

> Decisão consciente sobre como traduzir as telas do sistema legado.

## Contexto

- **Plataforma origem**: `react-spa` 🟢
- **Plataforma alvo**: `astro-islands`
- **Telas inventariadas**: 15
- **Inventário**: código-fonte (`_reversa_sdd/screens/inventory.json`). Visor/`ui/inventory.md` **explicitamente dispensados** pelo humano (fidelidade via JSX/CSS/lógica).
- **Design-system**: presente (`_reversa_sdd/design-system/`) — contentAccent vs interactiveAccent formalizados.
- **Adapter**: `react_spa__astro_islands` (EC-01 — fora da tabela v1; specs em `component-tree`).

## Modos avaliados

(Resumo: literal / modernizado / híbrido — ver histórico; recomendação = híbrido.)

## Decisão

- **Modo escolhido**: **híbrido**
- **Justificativa do humano**: Portar tecnologia React SPA → Astro islands preservando comportamento; código como fonte de verdade para subset quase 1:1 (marketing/hero/location); specs de arquitetura/design-system/domínio para modernizadas (shell/lead/mapa). Visor/screenshots pulados — não necessários.
- **Alternativas descartadas**: literal (RF-13/screenshots + contradiz Astro); modernizado total (reescreve narrativa sem ganho); Visor prévio (dispensado).
- **Decidido em**: 2026-09-10T19:21:58.748Z
- **Decidido por**: Bruno

### Listas explícitas (híbrido)

**Telas em modo literal** (quase 1:1 — parity por leitura de código):
- hero (SCR-0003)
- life-moment (SCR-0004)
- pillars (SCR-0005)
- location (SCR-0006)
- floor-plans (SCR-0008)
- amenities (SCR-0009)
- architecture (SCR-0010)
- trust (SCR-0011)

**Telas em modo modernizado** (Astro/islands/API — `target_architecture` + design-system + domain):
- preloader (SCR-0001)
- landing-page (SCR-0002)
- location-map (SCR-0007)
- lead-cta-section (SCR-0012)
- footer (SCR-0013)
- whatsapp-fab (SCR-0014)
- lead-modal (SCR-0015)
- Header: tratado dentro de `landing-page` / shell (legado vive no Hero).

## Implicações pendentes para a Fase 2

| Etapa | Implicação | Como honrar |
|---|---|---|
| `target_screens.md` | 15 telas; modo por lista | component-tree; copy literal do código |
| Golden files | sem Visor/oráculo visual | manifest com `present: false`; parity semântica |
| Tokens | content vs interactive | tokens.md |
| Texto | preservar | diff strings = 0 |

## Implicações para o Inspector

- Paridade **semântica + copy + eventos** (não pixel golden).
- Subset literal: comparar contra implementação React (código como oráculo).
- Deviations DEV-001+ propagam para exceptions.

## Notas

- EC-18 / RF-13 / Visor: **waived** conscientemente nesta decisão.
- FAB→modal; wa.me só footer.
- v1 POST-only; PATCH fase 2 + LGPD.

