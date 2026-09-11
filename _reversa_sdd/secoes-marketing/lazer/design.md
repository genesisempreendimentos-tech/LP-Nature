# Lazer (Amenities), Design Técnico

> Caso de uso · `secoes-marketing/lazer` · Writer · 2026-09-10  
> Foca no COMO a unit é construída, com base no código legado lido.

## Interface

| Símbolo | Assinatura | Retorno | Observação |
|---------|------------|---------|------------|
| `Amenities` | `()` | JSX | railRef + move |
| `move` | `(direction: -1 \| 1)` | void | scrollBy |

## Fluxo Principal

1. Renderiza heading + SectionCta. 🟢
2. Monta rail com spacer, cards e end. 🟢
3. Prev/next chamam move. 🟢

## Fluxos Alternativos

- **siteData.amenities.categories:** Não usados na UI atual. 🟡

## Dependências

- SectionCta
- lucide arrows
- CDN wp.residencialnature.com.br
- usePageMotion (.amenity-card)

## Decisões de Design Identificadas

| Decisão | Evidência no código | Confiança |
|---------|---------------------|-----------|
| Rail horizontal vs categorias de siteData | `Amenities.tsx` | 🟢 |

## Estado Interno

Apenas ref do rail; posição de scroll no DOM. 🟢

## Observabilidade

Nenhuma. 🟢

## Riscos e Lacunas

- 🟡 Vários itens nomeados 'Área gourmet'.
- 🔴 Desalinhamento com siteData.amenities.
