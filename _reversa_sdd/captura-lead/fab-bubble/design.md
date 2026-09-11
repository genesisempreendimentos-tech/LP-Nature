# FAB e Bolha, Design Técnico

> Caso de uso · `captura-lead/fab-bubble` · Writer · 2026-09-10  
> Foca no COMO a unit é construída, com base no código legado lido.

## Interface

| Constante | Valor |
|-----------|-------|
| FIRST_DELAY_MS | 10000 |
| VISIBLE_MS | 6000 |
| REAPPEAR_MS | 52000 |
| MAX_SHOWS | 3 |
| PHRASES | 5 strings rotativas |

## Fluxo Principal

1. useGSAP ScrollTrigger em #inicio → fabVisible. 🟢
2. scheduleShow com guards (dismiss, count, modal, fab). 🟢
3. Ao mostrar: incrementa count, avança index, agenda hide. 🟢
4. Hide agenda reappear se count < MAX. 🟢
5. Click → openLeadModal. 🟢

## Fluxos Alternativos

- **Modal abre:** Fecha bolha e pausa; retoma com REAPPEAR se awaiting. 🟢
- **LeaveBack no Hero:** fabVisible false; limpa timers. 🟢

## Dependências

- LeadModalContext
- gsap ScrollTrigger
- sessionStorage

## Decisões de Design Identificadas

| Decisão | Evidência no código | Confiança |
|---------|---------------------|-----------|
| Modal em vez de WhatsApp no FAB | `openLeadModal` | 🟢 |
| sessionStorage (não localStorage) | keys nature_bubble_* | 🟢 |

## Estado Interno

fabVisible, bubbleOpen, phrase + refs de timers/flags. 🟢

## Observabilidade

Nenhuma além do comportamento UI. 🟢

## Riscos e Lacunas

- 🟡 Nome WhatsAppFab enganoso.
- 🟡 Depende de #inicio existir no Hero.
