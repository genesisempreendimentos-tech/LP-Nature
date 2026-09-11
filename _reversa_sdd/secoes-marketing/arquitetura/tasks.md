# Arquitetura (Architecture), Tarefas de Implementação

> Caso de uso · `secoes-marketing/arquitetura` · Writer · 2026-09-10  
> Sequência executável para reimplementar a unit a partir do legado.

## Pré-requisitos

- [ ] siteData.architecture
- [ ] RevealText
- [ ] SectionCta

## Tarefas

> Cada tarefa referencia o arquivo do legado de onde o comportamento foi extraído.

- [ ] T-01, Implementar Architecture com facades WP, tags e CTA
  - Origem no legado: `src/components/nature/Architecture.tsx`
  - Critério de pronto: 3 imagens WP no DOM; Unsplash ausente
  - Confiança: 🟢

- [ ] T-02, Remover ou documentar images Unsplash órfãs em nature.ts
  - Origem no legado: `src/data/nature.ts:154-158`
  - Critério de pronto: Sem dados mortos ou uso explícito
  - Confiança: 🔴

## Tarefas de Teste

- [ ] TT-01, Galeria e tags
- [ ] TT-02, CTA modal
- [ ] TT-03, URLs Unsplash não no DOM

## Tarefas de Migração de Dados (se aplicável)

- N/A assets remotos. 🟢

## Ordem Sugerida

1. UI → limpeza de dados mortos

## Lacunas Pendentes (🔴)

- 🔴 Destino de architecture.images Unsplash.
