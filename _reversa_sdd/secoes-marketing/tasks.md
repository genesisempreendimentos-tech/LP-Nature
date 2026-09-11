# Seções de Marketing, Tarefas de Implementação

> Unit de módulo · `secoes-marketing` · Writer · 2026-09-10  
> Sequência executável para reimplementar a unit a partir do legado.

## Pré-requisitos

- [ ] `siteData` disponível (unit dados-conteudo) ou stub equivalente
- [ ] LeadModalProvider / SectionCta disponíveis
- [ ] Tokens CSS Nature e motion hooks disponíveis ou no-op
- [ ] Sem banco — N/A 🟢

## Tarefas

> Cada tarefa referencia o arquivo do legado de onde o comportamento foi extraído.

- [ ] T-01, Implementar LifeMoment (#nature) com princípios Espaço/Tempo/Natureza e SectionCta
  - Origem no legado: `src/components/nature/LifeMoment.tsx`
  - Critério de pronto: Âncora e CTA abrem modal
  - Confiança: 🟢
  - Nota: Detalhe em secoes-marketing/essencia/

- [ ] T-02, Implementar Pillars (#diferenciais) a partir de siteData.pillars.items + copy local por índice
  - Origem no legado: `src/components/nature/Pillars.tsx`
  - Critério de pronto: 4 artigos com imagem lazy e nota de referência
  - Confiança: 🟢

- [ ] T-03, Implementar FloorPlans com seleção por metragem, preview e CustomEvent nature:plan
  - Origem no legado: `src/components/nature/FloorPlans.tsx`
  - Critério de pronto: Troca de planta + evento + modal
  - Confiança: 🟢

- [ ] T-04, Implementar Amenities (#lazer) com rail, move e reduced-motion
  - Origem no legado: `src/components/nature/Amenities.tsx`
  - Critério de pronto: 11 ambientes + end card; nav funciona
  - Confiança: 🟢

- [ ] T-05, Implementar Architecture com 3 fachadas WP, RevealText e tags de siteData
  - Origem no legado: `src/components/nature/Architecture.tsx`
  - Critério de pronto: Galeria e princípios visíveis; não usar Unsplash órfão
  - Confiança: 🟢

- [ ] T-06, Implementar Trust com certificações e proofline
  - Origem no legado: `src/components/nature/Trust.tsx`
  - Critério de pronto: 3 selos + Gênesis + proof lines
  - Confiança: 🟢

## Tarefas de Teste

- [ ] TT-01, Happy path: scroll pelas seções e CTAs abrem modal
- [ ] TT-02, Plantas: troca de metragem atualiza preview e aria-pressed
- [ ] TT-03, Lazer: prev/next scroll; reduced-motion usa behavior auto
- [ ] TT-04, nature:plan dispara com detail = área ativa (mesmo sem consumer)

## Tarefas de Migração de Dados (se aplicável)

- N/A — conteúdo estático no bundle. 🟢

## Ordem Sugerida

1. SectionCta + dados (bloqueiam CTAs e copy).
2. Essência/pilares → plantas → lazer → arquitetura → confiança.
3. Decidir destino de nature:plan antes de instrumentar analytics.

## Lacunas Pendentes (🔴)

- 🔴 O que deve consumir `nature:plan`?
- 🔴 Unificar conteúdo hardcodado com `siteData` (lifeMoment, amenities, architecture.images)?
