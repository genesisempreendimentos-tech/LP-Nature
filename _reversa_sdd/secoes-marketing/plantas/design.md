# Plantas (FloorPlans), Design Técnico

> Caso de uso · `secoes-marketing/plantas` · Writer · 2026-09-10  
> Foca no COMO a unit é construída, com base no código legado lido.

## Interface

| Símbolo | Assinatura | Retorno | Observação |
|---------|------------|---------|------------|
| `FloorPlans` | `()` | JSX | estado activeIdx |
| CustomEvent | `nature:plan` | detail: string (área) | sem consumer |

## Fluxo Principal

1. Inicializa activeIdx=0. 🟢
2. Renderiza opções; clique seta índice. 🟢
3. Preview usa plan = plans[activeIdx]. 🟢
4. CTA: dispatchEvent nature:plan → SectionCta abre modal. 🟢

## Fluxos Alternativos

- **Lista vazia:** Quebra ao ler plan — não há guard. 🟡

## Dependências

- siteData.floorPlans
- SectionCta
- lucide ArrowUpRight

## Decisões de Design Identificadas

| Decisão | Evidência no código | Confiança |
|---------|---------------------|-----------|
| Área como key/identidade (ADR-009) | `FloorPlans.tsx` | 🟢 |
| Evento DOM em vez de callback tipado | `window.dispatchEvent` | 🟢 |

## Estado Interno

`activeIdx: number` (React). Sem persistência. 🟢

## Observabilidade

Evento custom potencialmente para analytics — não implementado. 🔴

## Riscos e Lacunas

- 🔴 Sem consumidor de `nature:plan`.
- 🟡 Sem validação se plans.length === 0.
