# Lazer (Amenities)

> Caso de uso · `secoes-marketing/lazer` · Writer · 2026-09-10  
> Foca no QUE a unit faz, não no como.

## Visão Geral

Galeria horizontal dos ambientes de lazer/conveniência do Nature, com navegação por botões e CTA para estrutura completa.

## Responsabilidades

- Renderizar rail com 11 spaces hardcodados + card final '11 ambientes'.
- Scroll horizontal via move(-1|1) com passo baseado na viewport.
- CTA SectionCta no heading.

## Regras de Negócio

- Dados de imagem/nome estão no componente, não em siteData.amenities. 🟢
- behavior scroll: smooth salvo prefers-reduced-motion → auto. 🟢
- Passo = min(innerWidth*0.72, 720). 🟢
- Primeiras 2 imagens eager; demais lazy. 🟢

## Requisitos Funcionais

| ID | Requisito | Prioridade | Critério de Aceite |
|----|-----------|------------|-------------------|
| RF-01 | Exibir galeria #lazer com 11 ambientes | Must | 11 figures + end card |
| RF-02 | Navegar prev/next no rail | Must | scrollBy na direção |
| RF-03 | CTA abre modal | Must | SectionCta |

## Requisitos Não Funcionais

| Tipo | Requisito inferido | Evidência no código | Confiança |
|------|--------------------|---------------------|-----------|
| Acessibilidade | Botões com aria-label; rail aria-label | `Amenities.tsx` | 🟢 |
| Performance | eager só index < 2 | `Amenities.tsx:55` | 🟢 |
| Acessibilidade | Respeito a reduced-motion no scroll | `Amenities.tsx:25` | 🟢 |

> Inferido a partir do código. Validar com equipe de operações.

## Critérios de Aceitação

```gherkin
Dado a seção #lazer
Quando o visitante clica em "Ver próximos ambientes"
Então o rail avança horizontalmente

Dado prefers-reduced-motion: reduce
Quando navega o rail
Então behavior do scrollBy é auto

Dado o CTA "Conhecer toda a estrutura de lazer"
Quando clica
Então o modal de lead abre
```

## Prioridade (MoSCoW)

| Requisito | MoSCoW | Justificativa |
|-----------|--------|---------------|
| Galeria + navegação | Must | Prova visual de lazer |
| CTA | Must | Conversão |

> Prioridade inferida por frequência de chamada e posição na cadeia de dependências.

## Rastreabilidade de Código

| Arquivo | Função / Classe | Cobertura |
|---------|-----------------|-----------|
| `src/components/nature/Amenities.tsx` | Amenities | 🟢 |
| `src/data/nature.ts` | siteData.amenities (não consumido aqui) | 🟡 |

## Adendo de revisao (2026-09-10)

Consolidar rail em siteData.amenities (sugestao nova validada como direcao). 🟡
