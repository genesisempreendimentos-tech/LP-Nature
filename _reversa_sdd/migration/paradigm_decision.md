---
schemaVersion: 1
generatedAt: 2026-09-10T18:05:36.880Z
reversa:
  version: "1.3.3"
kind: paradigm_decision
producedBy: paradigm_advisor
hash: "sha256:be35ec8241ee836b3024da07d6edbd47de849a6f2d28a9ea47d959a2f1d1f79c"
---

# Paradigm Decision

> Decisão consciente sobre como tratar a mudança (ou ausência) de paradigma entre o legado e a stack alvo.
> Este artefato é leitura obrigatória primeiro para qualquer agente posterior e para o agente de codificação.

## Paradigma do legado detectado
- **Paradigma principal**: híbrido — UI em componentes React + domínio procedural/estático
- **Confiança**: 🟢 CONFIRMADO
- **Evidências**:
  - SPA monolítica React/Vite, composição linear em App, sem router (`architecture.md` §1–2) 🟢
  - Domínio como landing de conversão sem aggregates/DI/filas; `siteData` como objeto estático (`domain.md` §1, `architecture.md` §2) 🟢
  - Estado mínimo via Context (`LeadModalContext`); gate `ready`/`introVisible` no root (`architecture.md` §5, units captura-lead / casca-aplicacao) 🟢
- **Variações observadas** (híbrido):
  - UI: composição por componentes React (feature modules) 🟢
  - Domínio/dados: procedural + dicts estáticos (`dados-conteudo`) 🟢
  - Integrações: sync client-side (CDN, OSM, wa.me); sem event bus 🟢

## Stack alvo declarada
- Linguagem: TypeScript / JavaScript (Node)
- Framework: Astro (Tailwind, GSAP, Leaflet) + nanostores; Express + Neon Postgres
- Infra: VPS própria

## Paradigma natural inferido
- **Paradigma**: híbrido content-first / islands (Astro) + API REST síncrona async-runtime (Express/Node)
- **Justificativa**: Astro prioriza HTML estático e JS sob demanda (islands); Node/Express é async-first, mas o contrato de leads validado é request/response síncrono (não fila/event-driven). Nanostores cobre estado cross-island que o React Context não atravessa.
- **Alternativas viáveis**: forçar SPA React dentro do Astro (`client:load` amplo) — viável mas anula ganho SEO/LCP; NestJS OO+DI no backend — overkill para o escopo atual do contrato de leads.

## Gap identificado
- **Severidade**: médio–alto
- **Implicações concretas**:
  1. **Estado compartilhado**: `LeadModalContext` + CTAs/FAB não atravessam ilhas Astro — exige nanostores (risco a do brief).
  2. **Gate de intro**: `App.ready`/`introVisible`/`inert` no root React precisa virar layout/ilha + store, senão motion/FAB quebram.
  3. **Lead vira cliente de API**: de `console.log` para `POST/PATCH /api/leads` (Express/Neon) — desacoplar UI de persistência; risco de sequenciar front e backend juntos.
  4. **Conteúdo estático**: `siteData` mapeia bem a data/content do Astro; migrar sem unificar POIs/amenities replica duplicação (risco d).

## Opções apresentadas ao usuário
1. **Adotar paradigma natural da stack** (transformacional)
   - Consequências: máximo LCP/SEO; mais redesenho de shell/estado; islands mínimas.
2. **Forçar paradigma similar ao legado** (conservador)
   - Consequências: SPA mental no Astro; perde o motivo declarado da migração (performance/SEO).
3. **Híbrido** (equilibrado)
   - Consequências: HTML estático nas seções de narrativa; islands React em lead/mapa/motion/preloader; nanostores no funil; Express no contrato já validado; unificar siteData na migração.

## Decisão do usuário
- **Escolha**: 3
- **Justificativa do usuário**: (não fornecida além da escolha; orquestrador registra opção 3 — híbrido/equilibrado)
- **Decidido em**: 2026-09-10T18:05:36.880Z

## Apetite derivado
- `derived_appetite`: balanced

## Implicações pendentes para próximos agentes
| Agente | Implicação | Como honrar |
|---|---|---|
| Curator | Context React e root App não são portáveis 1:1 | Marcar LeadModalContext/App.ready como DECISÃO / adaptar a nanostores+ilhas; não “copiar Context” |
| Strategist | Frontend Astro vs backend Express+Neon | Estratégia de sequenciamento (API stub → front, ou API primeiro); preservar contrato OpenAPI; zero regressão de captura |
| Designer | Topologia islands + store + API | topology/architecture: seções estáticas vs islands; nanostores; Express em VPS; Neon |
| Screen Translator | Mesma landing, shell diferente | Modernizar shell (Astro) sem mudar jornada de conversão; desvios só onde islands exigirem |
| Inspector | Paridade de funil lead + LCP | Specs de paridade: abrir modal, validar, POST; métricas LCP/TTFB; LGPD bloqueia go-live estendido |

## Notas
- Objetivo SEO/ads no brief é hipótese do Bruno até o time confirmar — Strategist deve tratar como prioridade provisória.
- Formulário estendido + PATCH allowlist existem no contrato, mas produção bloqueada sem política/checkbox LGPD.
- wa.me só no rodapé; FAB → modal (decisão Reviewer) permanece no paradigma híbrido.
