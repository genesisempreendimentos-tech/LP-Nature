# Apresentação e CTA do Hero

> Caso de uso · `hero/apresentacao-cta` · Writer · 2026-09-10  
> Fonte: `Hero.tsx` (ações e facts)

## Visão Geral
Comportamento de conversão e leitura da primeira dobra: CTA de lead, links de âncora e bloco de fatos.

## Responsabilidades
- Abrir modal no CTA principal
- Âncoras #nature / #lazer
- Exibir facts com motion on-scroll

## Regras de Negócio
- CTA principal = lead modal. 🟢
- Facts animam uma vez ao entrar no viewport. 🟢

## Requisitos Funcionais

| ID | Requisito | Prioridade | Critério de Aceite |
|----|-----------|------------|-------------------|
| RF-01 | CTA principal dispara openLeadModal | Must | Modal aberto |
| RF-02 | Links secundários navegam por âncora | Should | Hash correto |
| RF-03 | Facts visíveis com regra visual | Should | Itens no DOM |

## Requisitos Não Funcionais

| Tipo | Requisito inferido | Evidência no código | Confiança |
|------|--------------------|---------------------|-----------|
| Acessibilidade | Botões/links focáveis | Hero actions | 🟢 |

## Critérios de Aceitação

```gherkin
Dado o Hero
Quando clica no CTA principal
Então LeadModal abre
```

## Prioridade (MoSCoW)

| Requisito | MoSCoW | Justificativa |
|-----------|--------|---------------|
| CTA lead | Must | Funil |

## Rastreabilidade de Código

| Arquivo | Função / Classe | Cobertura |
|---------|-----------------|-----------|
| `src/components/nature/Hero.tsx` | actions/facts | 🟢 |
