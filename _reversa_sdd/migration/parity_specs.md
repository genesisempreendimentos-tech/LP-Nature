---
schemaVersion: 1
generatedAt: 2026-09-10T19:27:56.179Z
reversa:
  version: "1.3.3"
kind: parity_specs
producedBy: inspector
hash: "sha256:e7fdafb18e715d5673da7d8f7324000fccfb127373035da463ca409da7e37a23"
---

# Parity Specs

> Equivalência comportamental legado React ↔ Astro+BFF, adaptada ao paradigma híbrido (islands + nanostores + API síncrona) e estratégia **B Parallel Run**.

## Estratégia geral
- **Modos de validação aplicáveis**:
  - [x] Characterization tests (comportamento legado → cenários Gherkin)
  - [x] Contract tests (POST/PATCH OpenAPI; `packages/shared`)
  - [x] Data parity (leads Neon por `pagina_origem` no parallel run)
  - [x] Contract test de tela (híbrido: literal-ish por código; modernizado por estados/eventos)
  - [ ] Shadow mode (opcional depois; não bloqueia v1)
  - [ ] Golden file pixel (dispensado — Visor skipped, DEV-001)

## Critérios de "paridade aceita"
- **Métrica primária**: taxa de captura de lead (leads válidos / sessões ou / cliques ads) na URL Astro **≥** taxa do legado na mesma janela, por `pagina_origem` — **zero regressão** (brief).
- **Janela de observação**: 7–14 dias de parallel run com tráfego significativo **ou** N leads úteis (N a definir no Go/No-Go).
- **Critério de bloqueio do cutover**:
  - Captura Astro significativamente pior que legado sem causa atribuível a mídia; **ou**
  - Erros 5xx / falha Neon no funil; **ou**
  - Quebra de contrato POST (campos/allowlist); **ou**
  - FAB/CTA abrindo wa.me em vez do modal.

## Cobertura adaptada ao paradigma

Transição: SPA React monolítica + Context → **Astro content-first + islands + nanostores + Express/Neon síncrono** (`paradigm_decision` opção 3).

Dimensões além de “mesma entrada → mesma saída”:
1. **Estado cross-island**: abrir modal a partir de Header/Hero/SectionCta/FAB/planos deve usar a **mesma store** (nanostores), não Context React.
2. **Gate de intro**: `ready` / `introVisible` / `inert` equivalentes ao legado (hash / reduced-motion pulam preloader).
3. **Borda API**: UI não persiste lead localmente; POST retorna `{ id }` (sem `token` / `lead_token` no contrato estável v1); `pagina_origem` é stampada no servidor; v1 sem PATCH sensível.
4. **Parallel run**: dois fronts, mesma tabela Neon; `pagina_origem` diferencia canais.
5. **Copy**: strings de CTA/labels do subset literal = código legado (diff textual = 0, salvo DEV aprovado).

## Paridade de telas (híbrido)

| Subset | Modo | Validação |
|---|---|---|
| hero, life-moment, pillars, location, floor-plans, amenities, architecture, trust | literal-ish | Contrato: hierarquia/classes principais, copy, CTAs → `leadModal.open`; oráculo = código React |
| preloader, landing-page/shell, location-map, lead-cta, footer, whatsapp-fab, lead-modal | modernizado | Contrato: eventos, 4 estados onde aplicável, tokens content vs interactive |

Sem `@paridade-visual` pixel: golden `present: false` (DEV-001).

## Exceções (deviations aprovadas)

| ID | Exceção na paridade |
|---|---|
| DEV-001 | Sem golden/Visor; parity por código/semântica |
| DEV-002 | Adapter EC-01; formato component-tree |
| DEV-003 | Literal sem screenshots |
| DEV-004 | Context → nanostores (não exigir Context no alvo) |
| DEV-005 | console.log → POST /api/leads |
| DEV-006 | Dois accents (content vs interactive) |
| DEV-007 | Unificar amenities/POIs em siteData |
| DEV-008 | Header global/sticky no shell (fora do Hero) — ver descrição expandida no screen_deviation_log |
| DEV-009 | Modal BR-only (+55) v1; **revisável**; wa.me rodapé sem restrição de país |

## Features ativas vs deprecated

| Spec | Arquivo | Status |
|---|---|---|
| PT-001 | `01-captura-lead-post.feature` | ativo — resposta `{ id }`, sem token |
| PT-002 | `02-funil-modal-nao-whatsapp.feature` | ativo |
| PT-003 | `03-footer-whatsapp.feature` | ativo |
| PT-004 | `04-interesse-planta.feature` | **DEPRECATED** — nature:plan / interesse_planta removidos (Curator + reversão; ver ambiguity_log) |
| PT-005 | `05-preloader-gate.feature` | ativo |
| PT-006 | `06-parallel-run-pagina-origem.feature` | ativo (cenário legado = skip até instrumentação) |
| PT-007 | `07-mapa-island.feature` | ativo |
| PT-008 | `08-copy-literal-hero.feature` | ativo |

## Tipos de teste a aplicar
- **Funcionais**: Gherkin em `parity_tests/` → Playwright/Cypress a critério do codificador (**ignorar** features com `# status: DEPRECATED`)
- **Contrato**: OpenAPI `lead.yaml` + tipos `packages/shared` (alinhar a `{ id }` sem token)
- **Dados**: contagem/amostra Neon por `pagina_origem`
- **Performance**: LCP/TTFB se SEO confirmado (HUMANA-005); senão informativo

## Reuso de characterization_specs
- **Origem**: ausente
- **Adaptação**: cenários derivados de `target_screens.md`, `captura-lead/`, `code-analysis`/domínio e regras BR-MIGRAR críticas

## Saídas
- `parity_tests/*.feature` (7 ativos + 1 deprecated)

## Notas
- Estratégia B: comparação **online** entre URLs; instrumentar legado para Neon ou baseline só Astro (cutover_plan).
- PATCH fase 2 / LGPD fora da paridade v1.
- PT-004 removida do suite ativo: CTA de plantas abre o mesmo cadastro que qualquer SectionCta; sem distinção de metragem no POST.

