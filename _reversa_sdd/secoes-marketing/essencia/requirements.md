# Essência (LifeMoment)

> Caso de uso · `secoes-marketing/essencia` · Writer · 2026-09-10  
> Foca no QUE a unit faz, não no como.

## Visão Geral

Primeira seção narrativa pós-Hero: posiciona o Nature como evolução de estilo de vida (espaço, tempo, natureza) e convida à descoberta via CTA de lead.

## Responsabilidades

- Renderizar bloco story com eyebrow 01 / A ESSÊNCIA NATURE.
- Exibir princípios numerados Espaço, Tempo, Natureza.
- Abrir modal via SectionCta.

## Regras de Negócio

- Seção usa id=`nature` (âncora do Hero/Header). 🟢
- Copy está no componente; `siteData.lifeMoment` não é lido por LifeMoment. 🟢
- CTA padrão abre modal de lead. 🟢

## Requisitos Funcionais

| ID | Requisito | Prioridade | Critério de Aceite |
|----|-----------|------------|-------------------|
| RF-01 | Exibir heading e dois parágrafos de story | Must | Textos visíveis em #nature |
| RF-02 | Listar princípios 01–03 | Must | Espaço/Tempo/Natureza no DOM |
| RF-03 | CTA 'Descubra o que faz a diferença' abre modal | Must | openLeadModal |

## Requisitos Não Funcionais

| Tipo | Requisito inferido | Evidência no código | Confiança |
|------|--------------------|---------------------|-----------|
| Acessibilidade | Princípios com aria-label 'Espaço, tempo e natureza' | `LifeMoment.tsx:16` | 🟢 |

> Inferido a partir do código. Validar com equipe de operações.

## Critérios de Aceitação

```gherkin
Dado o visitante após o Hero
Quando navega para #nature
Então vê a essência Nature com princípios e CTA

Dado a seção Essência
Quando clica no CTA
Então o modal de lead abre
```

## Prioridade (MoSCoW)

| Requisito | MoSCoW | Justificativa |
|-----------|--------|---------------|
| Conteúdo + âncora #nature | Must | Deep-link e narrativa |
| CTA lead | Must | Conversão |

> Prioridade inferida por frequência de chamada e posição na cadeia de dependências.

## Rastreabilidade de Código

| Arquivo | Função / Classe | Cobertura |
|---------|-----------------|-----------|
| `src/components/nature/LifeMoment.tsx` | LifeMoment | 🟢 |
