# Essência (LifeMoment), Design Técnico

> Caso de uso · `secoes-marketing/essencia` · Writer · 2026-09-10  
> Foca no COMO a unit é construída, com base no código legado lido.

## Interface

| Símbolo | Assinatura | Retorno | Observação |
|---------|------------|---------|------------|
| `LifeMoment` | `()` | JSX | section#nature.story-section |

## Fluxo Principal

1. Renderiza intro (eyebrow + span decorativo). 🟢
2. Renderiza heading com `data-motion-heading` e princípios. 🟢
3. Renderiza copy + SectionCta. 🟢

## Fluxos Alternativos

- **siteData.lifeMoment presente:** Ignorado por este componente — possível conteúdo legado não migrado. 🟡

## Dependências

- `SectionCta` / captura-lead
- `animacao` via data-motion-heading

## Decisões de Design Identificadas

| Decisão | Evidência no código | Confiança |
|---------|---------------------|-----------|
| Copy inline em vez de siteData.lifeMoment | `LifeMoment.tsx` | 🟢 |

## Estado Interno

Stateless. 🟢

## Observabilidade

Nenhuma. 🟢

## Riscos e Lacunas

- 🔴 Decidir se `siteData.lifeMoment` deve voltar a alimentar a seção.
