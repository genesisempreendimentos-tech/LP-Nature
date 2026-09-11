# Captura de Lead, Design Técnico

> Unit de módulo · `captura-lead` · Writer · 2026-09-10  
> Foca no COMO a unit é construída, com base no código legado lido.

## Interface

### Contexto

| Símbolo | Assinatura | Retorno | Observação |
|---------|------------|---------|------------|
| `LeadModalProvider` | `(children)` | JSX | state isOpen |
| `useLeadModal` | `()` | `{isOpen, openLeadModal, closeLeadModal}` | throw fora do provider |

### LeadPayload (de facto)

```ts
{ name: string; email: string; phone: string } // phone = +55 + 11 digitos
```

### HTTP

Nenhum. Contrato proposto em `openapi/lead.yaml`. 🔴

## Fluxo Principal

1. Provider envolve App; LeadModal sempre montado. 🟢
2. CTAs/FAB/Header chamam openLeadModal. 🟢
3. Usuário preenche; validate(); console.log; submitted=true. 🟢
4. FAB: ScrollTrigger após #inicio; agenda bolhas via sessionStorage. 🟢

## Fluxos Alternativos

- **Validação falha:** setErrors; não submete. 🟢
- **Modal aberto:** Bolha esconde e pausa timers. 🟢
- **Dismiss bolha:** nature_bubble_dismissed=1; não reaparece na sessão. 🟢

## Dependências

- @radix-ui/react-dialog
- react-imask
- gsap/ScrollTrigger (FAB)
- siteData.contact só no Footer (wa.me), não no FAB

## Decisões de Design Identificadas

| Decisão | Evidência no código | Confiança |
|---------|---------------------|-----------|
| Modal como conversão primária (ADR-003) | LeadModal + SectionCta | 🟢 |
| FAB nome WhatsApp mas abre modal | `WhatsAppFab.tsx` | 🟢 |
| Sem backend — console.log | `LeadModal.tsx:62` | 🔴 |

## Estado Interno

- Context: isOpen.
- Modal: name, email, phone, errors, submitted.
- FAB: fabVisible, bubbleOpen, phrase + sessionStorage COUNT/INDEX/DISMISS.

## Observabilidade

`console.log` do payload no submit — único 'telemetria'. 🟡

## Riscos e Lacunas

- 🔴 Nenhum CRM/endpoint — leads perdidos ao fechar a aba.
- 🔴 LGPD/consentimento de privacidade (privacyHref #).
- 🟡 Nome do componente WhatsAppFab sugere wa.me (comportamento diferente do footer).
