# FAB e Bolha, Tarefas de Implementação

> Caso de uso · `captura-lead/fab-bubble` · Writer · 2026-09-10  
> Sequência executável para reimplementar a unit a partir do legado.

## Pré-requisitos

- [ ] LeadModalContext
- [ ] Hero #inicio
- [ ] GSAP

## Tarefas

> Cada tarefa referencia o arquivo do legado de onde o comportamento foi extraído.

- [ ] T-01, ScrollTrigger show/hide FAB
  - Origem no legado: `src/components/nature/WhatsAppFab.tsx:209-250`
  - Critério de pronto: Visível só após Hero
  - Confiança: 🟢

- [ ] T-02, Ciclo de bolha 10s/6s/52s max3 + dismiss
  - Origem no legado: `src/components/nature/WhatsAppFab.tsx:25-134`
  - Critério de pronto: Keys sessionStorage corretas
  - Confiança: 🟢

- [ ] T-03, Clicks abrem modal (não wa.me)
  - Origem no legado: `src/components/nature/WhatsAppFab.tsx:263-285`
  - Critério de pronto: openLeadModal apenas
  - Confiança: 🟢

## Tarefas de Teste

- [ ] TT-01, Timing da primeira bolha
- [ ] TT-02, Max 3
- [ ] TT-03, Dismiss
- [ ] TT-04, Não abre WhatsApp

## Tarefas de Migração de Dados (se aplicável)

- N/A. 🟢

## Ordem Sugerida

1. Visibilidade FAB → timers → clicks

## Lacunas Pendentes (🔴)

- 🟡 Renomear componente?
