# Proximidades

> Caso de uso · `mapa-localizacao/proximidades` · Writer · 2026-09-10  
> Foca no QUE a unit faz, não no como.

## Visão Geral

Lista textual 'Por perto' baseada em `siteData.location.proximity`, em paralelo aos POIs geográficos do mapa (`points[]`). Documenta a duplicação e o risco de inconsistência.

## Responsabilidades

- Renderizar 6 articles de proximity (label, text, distance).
- Manter coerência editorial com POIs do mapa (hoje manual).

## Regras de Negócio

- Fonte UI: siteData.location.proximity. 🟢
- Fonte mapa: points[] em LocationMap.tsx — não deriva de proximity. 🟢
- Categorias se correspondem aproximadamente (COMÉRCIO↔Comércio etc.) com textos diferentes (ex. saúde). 🟡
- Av. Alberto Tôrres (circunflexo) em proximity vs Alberto Torres no mapa. 🟡

## Requisitos Funcionais

| ID | Requisito | Prioridade | Critério de Aceite |
|----|-----------|------------|-------------------|
| RF-01 | Exibir grade POR PERTO com 6 itens | Must | location.proximity.map |
| RF-02 | Fonte única compartilhada com o mapa | Won't | Duplicação atual 🟡 |

## Requisitos Não Funcionais

| Tipo | Requisito inferido | Evidência no código | Confiança |
|------|--------------------|---------------------|-----------|
| Manutenibilidade | Duplicação aumenta risco de drift | nature.ts vs LocationMap.tsx | 🟡 |

> Inferido a partir do código. Validar com equipe de operações.

## Critérios de Aceitação

```gherkin
Dado siteData.location.proximity
Quando Location renderiza o bloco location-proximity
Então cada item mostra label, text e distance

Dado o mapa com points[]
Quando se compara com proximity
Então as distâncias batem na maioria dos pares mas descrições podem divergir
```

## Prioridade (MoSCoW)

| Requisito | MoSCoW | Justificativa |
|-----------|--------|---------------|
| Lista proximity | Must | Visível na seção |
| Unificação com points | Should (produto) / Won't (hoje) | Débito técnico |

> Prioridade inferida por frequência de chamada e posição na cadeia de dependências.

## Rastreabilidade de Código

| Arquivo | Função / Classe | Cobertura |
|---------|-----------------|-----------|
| `src/components/nature/Location.tsx` | proximity map | 🟢 |
| `src/data/nature.ts` | location.proximity | 🟢 |
| `src/components/nature/LocationMap.tsx` | points[] | 🟢 |

## Adendo de revisao (2026-09-10)

Fonte de verdade: siteData. points[] no mapa deve consumir siteData (eliminar copia). 🟢
