# Mapa Lazy, Tarefas de Implementação

> Caso de uso · `mapa-localizacao/mapa-lazy` · Writer · 2026-09-10  
> Sequência executável para reimplementar a unit a partir do legado.

## Pré-requisitos

- [ ] leaflet CSS
- [ ] public/brand/nature-symbol.svg

## Tarefas

> Cada tarefa referencia o arquivo do legado de onde o comportamento foi extraído.

- [ ] T-01, LocationMapLazy com IntersectionObserver 700px
  - Origem no legado: `src/components/nature/LocationMapLazy.tsx`
  - Critério de pronto: Import único pós-IO
  - Confiança: 🟢

- [ ] T-02, LocationMap completo com gate e POIs
  - Origem no legado: `src/components/nature/LocationMap.tsx`
  - Critério de pronto: Paridade legado
  - Confiança: 🟢

## Tarefas de Teste

- [ ] TT-01, Lazy load
- [ ] TT-02, Gate
- [ ] TT-03, fitBounds inclui Nature e POIs

## Tarefas de Migração de Dados (se aplicável)

- N/A. 🟢

## Ordem Sugerida

1. Lazy host → Map → ícones

## Lacunas Pendentes (🔴)

- 🟡 Tratamento de erro de import.
