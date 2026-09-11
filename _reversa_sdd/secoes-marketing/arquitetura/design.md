# Arquitetura (Architecture), Design Técnico

> Caso de uso · `secoes-marketing/arquitetura` · Writer · 2026-09-10  
> Foca no COMO a unit é construída, com base no código legado lido.

## Interface

| Símbolo | Assinatura | Retorno | Observação |
|---------|------------|---------|------------|
| `Architecture` | `()` | JSX | facades locais + siteData |

## Fluxo Principal

1. Lê architecture de siteData. 🟢
2. RevealText com headline. 🟢
3. Galeria facades[0..2]. 🟢
4. Princípios + tags. 🟢

## Fluxos Alternativos

- **Unsplash em siteData:** Mortos no bundle — não renderizados. 🟢

## Dependências

- siteData.architecture
- RevealText
- SectionCta
- CDN WP

## Decisões de Design Identificadas

| Decisão | Evidência no código | Confiança |
|---------|---------------------|-----------|
| Imagens oficiais no componente vs Unsplash no data file | `Architecture.tsx` vs `nature.ts:154-158` | 🟢 |

## Estado Interno

Stateless. 🟢

## Observabilidade

Nenhuma. 🟢

## Riscos e Lacunas

- 🔴 Limpar ou passar a usar `architecture.images` Unsplash.
- 🟡 Sem id de âncora na section (diferente de outras seções).
