# Captura de Lead, Tarefas de Implementação

> Unit de módulo · `captura-lead` · Writer · 2026-09-10  
> Sequência executável para reimplementar a unit a partir do legado.

## Pré-requisitos

- [ ] Radix Dialog + IMask
- [ ] Provider no App
- [ ] Decisão de endpoint CRM (bloqueia produção) 🔴

## Tarefas

> Cada tarefa referencia o arquivo do legado de onde o comportamento foi extraído.

- [ ] T-01, Implementar LeadModalContext
  - Origem no legado: `src/context/LeadModalContext.tsx`
  - Critério de pronto: open/close/isOpen
  - Confiança: 🟢

- [ ] T-02, Implementar LeadModal com validação e success state
  - Origem no legado: `src/components/nature/LeadModal.tsx`
  - Critério de pronto: Regras RF-02/03
  - Confiança: 🟢
  - Nota: captura-lead/modal-lead/

- [ ] T-03, Implementar WhatsAppFab (timing + modal)
  - Origem no legado: `src/components/nature/WhatsAppFab.tsx`
  - Critério de pronto: 10s/6s/52s max3; não wa.me
  - Confiança: 🟢

- [ ] T-04, Implementar LeadForm #contato + SectionCta
  - Origem no legado: `src/components/nature/LeadForm.tsx`
  - Critério de pronto: CTA abre modal
  - Confiança: 🟢

- [ ] T-05, Integrar POST conforme openapi/lead.yaml
  - Origem no legado: `n/a — lacuna`
  - Critério de pronto: Lead chega ao CRM; erros tratados
  - Confiança: 🔴

## Tarefas de Teste

- [ ] TT-01, Validação dos três campos
- [ ] TT-02, Payload +55
- [ ] TT-03, FAB não abre WhatsApp
- [ ] TT-04, Bolha max 3 e dismiss

## Tarefas de Migração de Dados (se aplicável)

- N/A até existir CRM. 🔴

## Ordem Sugerida

1. Context → Modal → SectionCta/LeadForm → FAB → API

## Lacunas Pendentes (🔴)

- 🔴 Endpoint/CRM e autenticação.
- 🔴 Consentimento/privacidade.
