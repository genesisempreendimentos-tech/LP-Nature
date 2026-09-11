# Dados e Conteúdo, Tarefas de Implementação

> Unit de módulo · `dados-conteudo` · Writer · 2026-09-10  
> Sequência executável para reimplementar a unit a partir do legado.

## Pré-requisitos

- [ ] Nenhum serviço externo obrigatório para o objeto em si

## Tarefas

> Cada tarefa referencia o arquivo do legado de onde o comportamento foi extraído.

- [ ] T-01, Portar siteData completo de nature.ts
  - Origem no legado: `src/data/nature.ts`
  - Critério de pronto: Todas as chaves do legado
  - Confiança: 🟢
  - Nota: dados-conteudo/sitedata/

- [ ] T-02, Corrigir ortografia canônica do endereço e privacyHref
  - Origem no legado: `src/data/nature.ts footer/location`
  - Critério de pronto: Grafia única + URL real
  - Confiança: 🔴

- [ ] T-03, Remover ou religar campos órfãos (lifeMoment, Unsplash, amenities, cta, mapEmbedUrl)
  - Origem no legado: `src/data/nature.ts`
  - Critério de pronto: Sem mortos ou consumo explícito
  - Confiança: 🟡

## Tarefas de Teste

- [ ] TT-01, Imports não quebram build
- [ ] TT-02, Footer/Location usam mesmos dados de endereço após fix

## Tarefas de Migração de Dados (se aplicável)

- Se migrar para CMS, mapear chaves 1:1. 🟡

## Ordem Sugerida

1. Portar → limpar órfãos → corrigir lacunas editoriais

## Lacunas Pendentes (🔴)

- 🔴 privacyHref e ortografia.
- 🟡 Estratégia CMS futura.
