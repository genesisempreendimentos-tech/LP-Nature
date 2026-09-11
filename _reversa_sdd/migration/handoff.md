---
schemaVersion: 1
generatedAt: 2026-09-10T19:27:56.179Z
amendedAt: 2026-09-10T19:32:48.294Z
reversa:
  version: "1.3.3"
kind: handoff
producedBy: orchestrator
hash: "sha256:835b87baeb19ee42c82ef92465ef46266e976d15444a64cdc010d7243ea0ff31"
---

# Handoff para o Agente de Codificação

> Porta de entrada para implementar o sistema novo a partir das specs de migração.

## ⚠️ Leitura obrigatória primeiro

1. **`paradigm_decision.md`** — opção **3 híbrido** / `derived_appetite: balanced` (Astro islands + nanostores + Express síncrono).
2. **`topology_decision.md`** — topologia **híbrida** + **`packages/shared` obrigatório**.
3. **`screen_modernization_decision.md`** — modo **híbrido**; Visor dispensado; código = oráculo do subset literal.

## Ordem de leitura recomendada

1. paradigm_decision.md
2. topology_decision.md
3. screen_modernization_decision.md
4. migration_brief.md
5. target_business_rules.md
6. migration_strategy.md (estratégia **B Parallel Run**)
7. target_architecture.md
8. target_domain_model.md
9. target_data_model.md (schema Neon **não inventar**; tabela compartilhada)
10. data_migration_plan.md
11. target_screens.md
12. design-system/tokens.md (`contentAccent` vs `interactiveAccent`)
13. parity_specs.md + parity_tests/
14. screen_deviation_log.md (DEV-001…009 aprovados)
15. risk_register.md + cutover_plan.md
16. discard_log.md / ambiguity_log.md (consultivo)

## Lista de artefatos produzidos

| Artefato | Produzido por | Status |
|---|---|---|
| migration_brief.md | orchestrator | criado |
| paradigm_decision.md | paradigm_advisor | criado |
| target_business_rules.md | curator | criado |
| discard_log.md | curator | criado |
| migration_strategy.md | strategist | criado |
| risk_register.md | strategist | criado |
| cutover_plan.md | strategist | criado |
| topology_decision.md | designer (Fase 1) | criado |
| target_architecture.md | designer | criado |
| target_domain_model.md | designer | criado |
| target_data_model.md | designer | criado |
| data_migration_plan.md | designer | criado |
| screen_modernization_decision.md | screen_translator | criado (hybrid) |
| target_screens.md | screen_translator | criado (15) |
| screen_deviation_log.md | screen_translator | 9 aprovadas / 0 pendentes |
| screens/inventory.json | screen_translator | criado |
| screens/golden/manifest.yaml | screen_translator | skip visual |
| design-system/* | design-system | criado |
| parity_specs.md | inspector | criado |
| parity_tests/*.feature | inspector | 8 arquivos (7 ativos; PT-004 DEPRECATED) |
| ambiguity_log.md | orchestrator | consolidado |
| handoff.md | orchestrator | este arquivo |

## Bloqueadores para começar a implementação

Não bloqueiam o **start** do monorepo/BFF/front, mas bloqueiam go-live parcial:

- Admin Neon: nome/DDL real da tabela + migration `pagina_origem` (proibido tabela paralela).
- URL política de privacidade + checkbox (bloqueia PATCH fase 2 / formulário estendido).
- Confirmar SEO/ads com o time (HUMANA-005) — métrica LCP é condicional.
- Normalização E.164 vs formato livre do campo phone na API (ainda aberto no ambiguity_log) — pode seguir formato livre na v1 até decidir.
- Coluna `codigo` (função desconhecida) — não usar no BFF até esclarecer.
- Confirmar metragem oficial com a Gênesis (campanha **65,88 m²** vs site/código **56,60 m²**). Curator **BR-HUMANA-004 = (b)**: manter metragens do site na migração de stack; a confirmação de negócio é dependência externa do mesmo tipo dos outros gaps de go-live — **não** é resolvida pela troca React → Astro.

## Itens REFERIDOS À CODIFICAÇÃO

- Monorepo: `apps/web` (Astro), `apps/api` (Express), `packages/shared` (Lead types + PATCH allowlist 8 campos).
- nanostores no funil; islands lead/mapa/motion/preloader.
- Unificar amenities + POIs em siteData.
- **Prioridade #0 (decisão explícita, desacoplada do cronograma Astro):** ligar o **app React atual** (legado, sem esperar a migração de stack) ao backend já desenhado — `POST`/`PATCH /api/leads`, Neon, allowlist de 8 campos via `packages/shared` — para **parar de perder leads reais agora** (`console.log` → API). Não é “baseline só Astro”; não é opcional do parallel run. É tarefa separada e prioritária antes / em paralelo da portagem visual.
- Honrar DEV-009: modal +55 BR-only v1; wa.me sem filtro de país; marcar código/comentário como **revisável**.

## Próximos passos para o agente de codificação

1. Internalizar paradigma híbrido + topologia + screen hybrid.
2. Criar repositório/workspace com a árvore de `topology_decision.md`.
3. **Prioridade #0 — captura agora:** implementar `packages/shared` + `apps/api` (Neon) e **instrumentar o React legado** para `POST /api/leads` (e PATCH quando LGPD permitir), sem depender do front Astro estar pronto.
4. Implementar bottom-up (ordem de risco R01 / estratégia B): `shared` → `api`/Neon → **lead + mapa islands** (caminho de ponta a ponta cedo) → web shell → marketing literal.
5. Materializar telas via `target_screens.md` (literal = fidelidade ao JSX/CSS; modernizado = estados/eventos/API).
6. Escrever testes a partir de `parity_tests/*.feature` e § Exceções.
7. Validar parallel run conforme `cutover_plan.md` antes de desligar o legado.

## Notas finais

- Pipeline `/reversa-migrate` **concluído** (6 agentes).
- Liberação `allowLegacyEdits` atual cobre só `theme.css` / `index.css` — para codificar o app novo, ampliar `allowedPaths` ou trabalhar fora do legado conforme política do time.

