# Proximidades, Tarefas de Implementação

> Caso de uso · `mapa-localizacao/proximidades` · Writer · 2026-09-10  
> Sequência executável para reimplementar a unit a partir do legado.

## Pré-requisitos

- [ ] siteData.location.proximity

## Tarefas

> Cada tarefa referencia o arquivo do legado de onde o comportamento foi extraído.

- [ ] T-01, Renderizar bloco proximity como no Location.tsx
  - Origem no legado: `src/components/nature/Location.tsx:50-62`
  - Critério de pronto: 6 itens visíveis
  - Confiança: 🟢

- [ ] T-02, Propor schema único (id, label, text, distance, position, icon) alimentando UI e mapa
  - Origem no legado: `src/data/nature.ts + LocationMap.tsx`
  - Critério de pronto: Uma fonte; mapa e lista sincronizados
  - Confiança: 🔴

## Tarefas de Teste

- [ ] TT-01, 6 proximidades
- [ ] TT-02 (futuro), distância igual na lista e no popup

## Tarefas de Migração de Dados (se aplicável)

- Migrar points[] → siteData se unificar. 🔴

## Ordem Sugerida

1. UI atual → refactor de dados

## Lacunas Pendentes (🔴)

- 🔴 Modelo canônico de POI.
