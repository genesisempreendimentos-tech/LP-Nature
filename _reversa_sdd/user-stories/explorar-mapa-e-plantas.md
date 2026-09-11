# User Story — Explorar mapa e plantas

> Writer · 2026-09-10 · doc_level completo

## História

Como **visitante avaliando localização e tipologias**,  
quero **interagir com o mapa do Alto e comparar metragens**,  
para **escolher uma configuração e pedir contato**.

## Critérios

- [ ] Na seção #localizacao vejo endereço, proximidades e mapa OSM lazy-loaded.
- [ ] Só interajo com o mapa após o gate "Clique para navegar".
- [ ] Em #plantas seleciono metragens e vejo o preview correspondente.
- [ ] CTA da planta abre o modal; evento `nature:plan` é disparado (consumer TBD). 🔴

## Units relacionadas

- `mapa-localizacao/`, `mapa-localizacao/mapa-lazy/`, `mapa-localizacao/proximidades/`
- `secoes-marketing/plantas/`, `captura-lead/`

## Confiança

Mapa e plantas 🟢 · Consumer do evento 🔴 · Unificação proximity/points 🟡
