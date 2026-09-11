# Mapa e Localização, Tarefas de Implementação

> Unit de módulo · `mapa-localizacao` · Writer · 2026-09-10  
> Sequência executável para reimplementar a unit a partir do legado.

## Pré-requisitos

- [ ] Dependências leaflet/react-leaflet
- [ ] siteData.location
- [ ] brand/nature-symbol.svg em public
- [ ] Sem banco — N/A 🟢

## Tarefas

> Cada tarefa referencia o arquivo do legado de onde o comportamento foi extraído.

- [ ] T-01, Implementar Location com endereço, quotes, proximity e CTA
  - Origem no legado: `src/components/nature/Location.tsx`
  - Critério de pronto: #localizacao completa
  - Confiança: 🟢

- [ ] T-02, Implementar LocationMapLazy com IO rootMargin 700px e dynamic import
  - Origem no legado: `src/components/nature/LocationMapLazy.tsx`
  - Critério de pronto: Chunk só após interseção
  - Confiança: 🟢
  - Nota: Detalhe em mapa-localizacao/mapa-lazy/

- [ ] T-03, Implementar LocationMap OSM + gate + POIs + FitPoints
  - Origem no legado: `src/components/nature/LocationMap.tsx`
  - Critério de pronto: Paridade com legado
  - Confiança: 🟢

- [ ] T-04, Unificar ou documentar sync proximity ↔ points e ortografia do endereço
  - Origem no legado: `src/data/nature.ts + LocationMap.tsx`
  - Critério de pronto: Fonte única ou matriz de equivalência
  - Confiança: 🔴

## Tarefas de Teste

- [ ] TT-01, Mapa não carrega no first paint longe da seção
- [ ] TT-02, Gate bloqueia scroll-zoom até clique
- [ ] TT-03, Marcador Nature e 6 POIs com popup
- [ ] TT-04, Link 'Explorar no mapa' abre mapLinkUrl

## Tarefas de Migração de Dados (se aplicável)

- N/A persistência. Conteúdo estático. 🟢

## Ordem Sugerida

1. Location shell → Lazy → Map → unificação de dados

## Lacunas Pendentes (🔴)

- 🔴 Ortografia canônica do logradouro.
- 🔴 Modelo único de proximidades.
