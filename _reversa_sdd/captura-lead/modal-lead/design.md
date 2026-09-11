# Modal de Lead, Design Técnico

> Caso de uso · `captura-lead/modal-lead` · Writer · 2026-09-10  
> Foca no COMO a unit é construída, com base no código legado lido.

## Interface

| Símbolo | Assinatura | Retorno | Observação |
|---------|------------|---------|------------|
| `LeadModal` | `()` | JSX | Dialog.Root controlled |
| `validate` | `()` | FieldErrors | name/email/phone |
| `onSubmit` | `(FormEvent)` | void | console.log |

Ver também `contracts.md` e `openapi/lead.yaml`.

## Fluxo Principal

1. isOpen → reset fields. 🟢
2. Submit → validate → errors ou log+success. 🟢
3. Close limpa via unmount visual (reset na próxima abertura). 🟢

## Fluxos Alternativos

- **Erros parciais:** Mostra só campos inválidos. 🟢

## Dependências

- Radix Dialog
- IMaskInput
- LeadModalContext

## Decisões de Design Identificadas

| Decisão | Evidência no código | Confiança |
|---------|---------------------|-----------|
| Validação manual + noValidate | `LeadModal.tsx` | 🟢 |
| Somente console.log | `LeadModal.tsx:62` | 🔴 |

## Estado Interno

name, email, phone, errors, submitted. 🟢

## Observabilidade

console.log(payload). 🟡

## Riscos e Lacunas

- 🔴 Sem API/CRM.
- 🔴 Sem opt-in LGPD explícito no form.
