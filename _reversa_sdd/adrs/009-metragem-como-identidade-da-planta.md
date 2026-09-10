# ADR-009 — Planta identificada só pela metragem

- **Status:** aceito no código 🟢
- **Módulos:** `marketing-sections`, `content-data`

## Contexto

O brief manda não associar quartos a uma metragem sem confirmação, e não inventar suítes, vagas, banheiros ou preços.

Há conflito de **valores** entre fontes:

| Fonte | Metragens |
|-------|-----------|
| Brief original | 65,88 · 76,40 · 146,19 · 292,49 m² |
| `siteData.floorPlans` + bubble | 56,60 · 66,68 · 128,28 · 292,49 m² |

O teto 292,49 m² coincide; as três menores mudaram. 🔴 qual conjunto é o oficial?

## Decisão

O seletor expõe apenas `area` + `image`. O copy geral (“2 e 3 quartos”) fica fora do seletor. CTA dispara `nature:plan` com a string da metragem (hoje sem consumidor).

## Por quê

Cumpre a restrição de não inventar composição da unidade. A troca dos números em relação ao brief sugere atualização com material oficial (plantas no CDN `wp.residencialnature.com.br`) — **não confirmado por commit**. 🟡
