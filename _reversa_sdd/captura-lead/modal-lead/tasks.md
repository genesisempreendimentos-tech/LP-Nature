# Modal de Lead, Tarefas de Implementação

> Caso de uso · `captura-lead/modal-lead` · Writer · 2026-09-10  
> Sequência executável para reimplementar a unit a partir do legado.

## Pré-requisitos

- [ ] Context
- [ ] Radix
- [ ] IMask

## Tarefas

> Cada tarefa referencia o arquivo do legado de onde o comportamento foi extraído.

- [ ] T-01, UI Dialog + campos + máscara telefone
  - Origem no legado: `src/components/nature/LeadModal.tsx`
  - Critério de pronto: Paridade visual/a11y
  - Confiança: 🟢

- [ ] T-02, Validação e success state com console.log
  - Origem no legado: `src/components/nature/LeadModal.tsx:40-63`
  - Critério de pronto: Regras de negócio cobertas
  - Confiança: 🟢

- [ ] T-03, Substituir console.log por fetch do contrato OpenAPI
  - Origem no legado: `_reversa_sdd/openapi/lead.yaml`
  - Critério de pronto: POST 2xx → success; 4xx/5xx → erro UI
  - Confiança: 🔴

## Tarefas de Teste

- [ ] TT-01, Happy path
- [ ] TT-02, Cada erro de campo
- [ ] TT-03, Reset ao reabrir

## Tarefas de Migração de Dados (se aplicável)

- N/A. 🟢

## Ordem Sugerida

1. UI → validação → API

## Lacunas Pendentes (🔴)

- 🔴 CRM endpoint.
- 🔴 Mensagens de erro de rede.
