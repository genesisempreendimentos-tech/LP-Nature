# siteData, Design Técnico

> Caso de uso · `dados-conteudo/sitedata` · Writer · 2026-09-10  
> Foca no COMO a unit é construída, com base no código legado lido.

## Interface

### Consumo

| Chave | Consumidor principal | Status |
|-------|----------------------|--------|
| hero | Hero | 🟢 |
| lifeMoment | — | 🟡 órfão |
| pillars | Pillars | 🟢 (textos extras no JSX) |
| location | Location | 🟢 (mapEmbedUrl órfão) |
| floorPlans | FloorPlans | 🟢 |
| amenities | — (Amenities local) | 🟡 |
| architecture | Architecture (headline/tags); images Unsplash órfãs | 🟡 |
| trust | Trust (headline); proofs paralelos | 🟡 |
| cta | — | 🟡 |
| footer | Footer | 🟢 |
| contact | Footer wa.me | 🟢 |

## Fluxo Principal

Import estático → leitura de propriedades. 🟢

## Fluxos Alternativos

- **CMS futuro:** Substituir módulo por client fetch mantendo shape. 🟡

## Dependências

- Componentes de UI

## Decisões de Design Identificadas

| Decisão | Evidência no código | Confiança |
|---------|---------------------|-----------|
| ADR-004 conteúdo no bundle | `nature.ts` | 🟢 |

## Estado Interno

Constante de módulo. 🟢

## Observabilidade

Nenhuma. 🟢

## Riscos e Lacunas

- 🔴 Ortografia e privacy.
- 🟡 Órfãos.
