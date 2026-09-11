# Proximidades, Design Técnico

> Caso de uso · `mapa-localizacao/proximidades` · Writer · 2026-09-10  
> Foca no COMO a unit é construída, com base no código legado lido.

## Interface

### siteData.location.proximity (UI)

| Campo | Tipo | Exemplo |
|-------|------|---------|
| label | string | COMÉRCIO |
| text | string | Feirinha do Alto... |
| distance | string | 850 m |

### points[] (mapa)

| Campo | Tipo | Exemplo |
|-------|------|---------|
| name | string | Praça Higino... |
| category | string | Comércio |
| distance | string | 850 m |
| position | [lat,lng] | coordenadas |
| icon | LucideIcon | ShoppingBag |

## Fluxo Principal

1. Location mapeia proximity para articles. 🟢
2. LocationMap mapeia points para Markers (independente). 🟢

## Fluxos Alternativos

- **Atualização de distância:** Exige editar dois arquivos. 🟡

## Dependências

- siteData.location
- LocationMap points

## Decisões de Design Identificadas

| Decisão | Evidência no código | Confiança |
|---------|---------------------|-----------|
| Duas fontes em vez de join por id | código atual | 🟡 |

## Estado Interno

Nenhum. 🟢

## Observabilidade

Nenhuma. 🟢

## Riscos e Lacunas

- 🔴 Sem chave comum entre proximity e points.
- 🟡 Divergência saúde (UBS vs Hospital das Clínicas).
