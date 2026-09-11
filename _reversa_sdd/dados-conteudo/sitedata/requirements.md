# siteData (nature.ts)

> Caso de uso · `dados-conteudo/sitedata` · Writer · 2026-09-10  
> Foca no QUE a unit faz, não no como.

## Visão Geral

Caso de uso focado no artefato `src/data/nature.ts` como contrato de conteúdo da SPA.

## Responsabilidades

- Definir shape e valores de siteData.
- Documentar quais chaves são consumidas vs órfãs.

## Regras de Negócio

- Export nomeado `siteData`. 🟢
- floorPlans.plans[].area é identidade da planta. 🟢
- contact.whatsapp sem '+' (Footer adiciona wa.me). 🟢

## Requisitos Funcionais

| ID | Requisito | Prioridade | Critério de Aceite |
|----|-----------|------------|-------------------|
| RF-01 | Manter paridade de chaves com o legado | Must | Diff estrutural vazio |
| RF-02 | Marcar órfãos na documentação | Should | Lista abaixo |

## Requisitos Não Funcionais

| Tipo | Requisito inferido | Evidência no código | Confiança |
|------|--------------------|---------------------|-----------|
| Integridade | URLs HTTPS para imagens | `nature.ts` | 🟢 |

> Inferido a partir do código. Validar com equipe de operações.

## Critérios de Aceitação

```gherkin
Dado nature.ts
Quando se lista consumers
Então pillars, location, floorPlans, architecture(headline/tags), trust.headline, footer, contact, hero são lidos
E lifeMoment, amenities, architecture.images, cta, mapEmbedUrl têm consumo nulo ou parcial
```

## Prioridade (MoSCoW)

| Requisito | MoSCoW | Justificativa |
|-----------|--------|---------------|
| Paridade siteData | Must | Conteúdo |

> Prioridade inferida por frequência de chamada e posição na cadeia de dependências.

## Rastreabilidade de Código

| Arquivo | Função / Classe | Cobertura |
|---------|-----------------|-----------|
| `src/data/nature.ts` | siteData | 🟢 |

## Adendo de revisao (2026-09-10)

Grafia oficial: Hidelgardo (nao Hildegardo). 🟢
POIs/proximidades: fonte = siteData. 🟢
Lazer: consolidar em siteData.amenities (direcao desejada). 🟡
whatsappMessage: usar no wa.me do rodape. 🟢
