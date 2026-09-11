---
schemaVersion: 1
generatedAt: 2026-09-10T18:10:50.870Z
reversa:
  version: "1.3.3"
kind: risk_register
producedBy: strategist
hash: "sha256:b9c149d53a72dd02429239dd589b61f036c1786b91decefc1459f7c0e6637a67"
---

# Risk Register

> Riscos da migração Nature → Astro+BFF. Owners = papéis.

| ID | Risco | Prob. | Impacto | Mitigação | Contingência | Owner |
|----|-------|-------|---------|-----------|--------------|-------|
| R01 | Regressão na taxa de captura de lead | M | Crítico | Soft-launch; E2E funil; telemetria submit/erro; v1 POST simples | Rollback DNS/ads ao legado | Bruno + eng. |
| R02 | Premissa SEO/ads falsa (HUMANA-005) | M | Médio | Confirmar com time antes de otimizar content-first vs islands | Reponderar motion/islands se objetivo for outro | Bruno / stakeholders |
| R03 | Estado cross-island (modal/ready) quebrado | M | Alto | nanostores desde o Designer; testes de CTA→modal | Hotfix store; feature flag FAB | Eng. front |
| R04 | BFF/Neon indisponível no cutover | M | Alto | Healthcheck; migrate coluna pagina_origem aprovada; staging | Manter legado; fila local opcional | Admin Neon + eng. |
| R05 | LGPD: PATCH/sensível vazar na v1 | B | Crítico | Escopo v1 POST-only (HUMANA-002); code review allowlist | Remover rotas PATCH da build v1 | Bruno + eng. |
| R06 | Política privacidade ausente em go-live | A | Alto | v1 sem dados sensíveis; checkbox só com texto/URL real quando existir | Não publicar formulário estendido | Gênesis + Bruno |
| R07 | Duplicação POI/amenities portada | M | Médio | HUMANA-006=a unificar na migração | Refactor data layer | Eng. |
| R08 | Sequência front/API desalinhada | B | Médio | BFF mesmo deploy (003=c); OpenAPI contrato fixo | Stub tipado só em staging | Eng. |
| R09 | Metragem errada (campanha vs site) | M | Médio | HUMANA-004=b manter site; Gênesis confirma depois | Patch de conteúdo | Gênesis |
| R10 | Gap Astro/React (skills do time) | M | Médio | Spike islands+nanostores cedo | Pairing / consultoria | Eng. |
| R11 | Observabilidade ausente | A | Médio | Definir logs BFF + analytics mínimo antes do soft-launch | Adiar cutover 100% | Eng. (gap brief) |
| R12 | Rollback incompleto (CDN/cache) | B | Médio | Checklist cutover; TTL baixo no lançamento | Purge + DNS legado | Eng. infra VPS |

## Riscos de paradigma (explícitos)
- Context → nanostores (R03)
- App root → layout+islands (R03)
- console.log → API (R01, R04)

## Riscos de dados
- Schema Neon compartilhado / coluna `pagina_origem` (R04)
- Sem migração de dados de leads legados (não havia persistência)

## Notas
Prazo/orçamento indefinidos → sensibilidade: soft-launch permite parar sem “big bang de calendário”.

## Riscos adicionais — estratégia B
| ID | Risco | Prob. | Impacto | Mitigação | Contingência | Owner |
|----|-------|-------|---------|-----------|--------------|-------|
| R13 | Comparar captura com legado sem Neon | A | Alto | Instrumentar legado POST ou não declarar paridade numérica | Baseline qualitativo só Astro | Eng. |
| R14 | Custo/tempo de dois fronts | M | Médio | Limitar parallel a 7–14 d; v1 mínimo | Abortar para cutover tipo A | Bruno |
| R15 | Split de ads enviesa amostra | M | Médio | Mesmas campanhas/criativos; janela suficiente | Aumentar % ou duração | Bruno/mídia |
