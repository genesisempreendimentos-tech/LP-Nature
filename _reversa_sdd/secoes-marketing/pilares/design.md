# Pilares (Pillars), Design Técnico

> Caso de uso · `secoes-marketing/pilares` · Writer · 2026-09-10  
> Foca no COMO a unit é construída, com base no código legado lido.

## Interface

| Símbolo | Assinatura | Retorno | Observação |
|---------|------------|---------|------------|
| `Pillars` | `()` | JSX | Consome siteData.pillars |

## Fluxo Principal

1. Importa siteData.pillars. 🟢
2. Mapeia items para articles; descrição = array local[i]. 🟢
3. Anexa image-note. 🟢

## Fluxos Alternativos

- **Item sem imagem:** Ainda renderiza img com src vazio/quebrado — sem guard. 🟡

## Dependências

- `siteData`
- CSS pillars-section
- `usePageMotion` anima .pillar-grid

## Decisões de Design Identificadas

| Decisão | Evidência no código | Confiança |
|---------|---------------------|-----------|
| Descrições fora do siteData | `Pillars.tsx` array inline | 🟢 |

## Estado Interno

Stateless. 🟢

## Observabilidade

Nenhuma. 🟢

## Riscos e Lacunas

- 🟡 Manutenção duplicada título (data) vs descrição (código).
