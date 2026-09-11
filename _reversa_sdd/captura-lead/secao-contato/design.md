# Seção Contato, Design Técnico

> Caso de uso · `captura-lead/secao-contato` · Writer · 2026-09-10  
> Foca no COMO a unit é construída, com base no código legado lido.

## Interface

| Símbolo | Assinatura | Retorno | Observação |
|---------|------------|---------|------------|
| `LeadForm` | `()` | JSX | nome histórico; sem <form> |

## Fluxo Principal

1. Render layout contact-copy + contact-cta-panel. 🟢
2. SectionCta dispara openLeadModal. 🟢

## Fluxos Alternativos

- **siteData.cta:** Não consumido por LeadForm (copy local). 🟡

## Dependências

- SectionCta
- animacao

## Decisões de Design Identificadas

| Decisão | Evidência no código | Confiança |
|---------|---------------------|-----------|
| CTA-only em vez de form duplicado | `LeadForm.tsx` | 🟢 |

## Estado Interno

Stateless. 🟢

## Observabilidade

Nenhuma. 🟢

## Riscos e Lacunas

- 🟡 Nome LeadForm sugere formulário inline.
