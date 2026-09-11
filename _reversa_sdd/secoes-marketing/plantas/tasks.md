# Plantas (FloorPlans), Tarefas de Implementação

> Caso de uso · `secoes-marketing/plantas` · Writer · 2026-09-10  
> Sequência executável para reimplementar a unit a partir do legado.

## Pré-requisitos

- [ ] siteData.floorPlans.plans
- [ ] SectionCta

## Tarefas

> Cada tarefa referencia o arquivo do legado de onde o comportamento foi extraído.

- [ ] T-01, Implementar seletor de metragens com a11y e preview
  - Origem no legado: `src/components/nature/FloorPlans.tsx`
  - Critério de pronto: Troca visual e ARIA corretos
  - Confiança: 🟢

- [ ] T-02, Disparar CustomEvent nature:plan no CTA além do modal
  - Origem no legado: `src/components/nature/FloorPlans.tsx:46-50`
  - Critério de pronto: detail === área ativa
  - Confiança: 🟢

- [ ] T-03, Definir e implementar consumidor do evento (analytics/CRM) ou remover
  - Origem no legado: `n/a — lacuna`
  - Critério de pronto: Decisão documentada + código alinhado
  - Confiança: 🔴

## Tarefas de Teste

- [ ] TT-01, Seleção atualiza preview
- [ ] TT-02, CTA abre modal
- [ ] TT-03, Evento nature:plan com detail correto

## Tarefas de Migração de Dados (se aplicável)

- N/A. 🟢

## Ordem Sugerida

1. UI seleção → evento → decisão de consumer

## Lacunas Pendentes (🔴)

- 🔴 Destino de `nature:plan`.
