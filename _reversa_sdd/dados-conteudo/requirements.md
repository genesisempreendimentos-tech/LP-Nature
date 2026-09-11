# Dados e Conteúdo

> Unit de módulo · `dados-conteudo` · Writer · 2026-09-10  
> Foca no QUE a unit faz, não no como.

## Visão Geral

Bundle estático `siteData` em `src/data/nature.ts` que alimenta copy, imagens e contatos da landing sem CMS/API. Resolve conteúdo versionado no código (ADR-004), com lacunas de campos não consumidos e drift ortográfico de endereço.

## Responsabilidades

- Exportar `siteData` (hero, seções, footer, contact).
- Servir URLs remotas (WP/Unsplash) e textos.
- Expor contact.whatsapp para Footer wa.me.

## Regras de Negócio

- Sem fetch — objeto importável no bundle. 🟢
- privacyHref = '#' (política ausente). 🔴
- Endereço location 'Hidelgardo' vs footer 'Hildegardo'. 🔴
- Campos órfãos: lifeMoment (não lido por LifeMoment), amenities.categories, architecture.images (Unsplash), cta, mapEmbedUrl, trust.proofs (parcial). 🟡

## Requisitos Funcionais

| ID | Requisito | Prioridade | Critério de Aceite |
|----|-----------|------------|-------------------|
| RF-01 | Fornecer siteData tipado/estruturado no módulo | Must | import { siteData } |
| RF-02 | Cobrir hero, pillars, location, floorPlans, architecture, trust, footer, contact | Must | chaves presentes |
| RF-03 | CMS headless | Won't | estático 🟢 |
| RF-04 | Consistência ortográfica e privacidade | Won't (hoje) | lacunas 🔴 |

## Requisitos Não Funcionais

| Tipo | Requisito inferido | Evidência no código | Confiança |
|------|--------------------|---------------------|-----------|
| Manutenibilidade | Conteúdo no repo exige deploy para alterar copy | `nature.ts` | 🟢 |
| Performance | Sem runtime network para JSON de conteúdo | import estático | 🟢 |

> Inferido a partir do código. Validar com equipe de operações.

## Critérios de Aceitação

```gherkin
Dado o app buildado
Quando um componente importa siteData
Então os dados estão disponíveis sem chamada HTTP

Dado location.address e footer.address
Quando comparados
Então há divergência de grafia do logradouro

Dado privacyHref
Quando o footer renderiza o link
Então o href é "#"
```

## Prioridade (MoSCoW)

| Requisito | MoSCoW | Justificativa |
|-----------|--------|---------------|
| siteData estático | Must | ADR-004 |
| Limpeza de órfãos / ortografia / privacidade | Should | Qualidade editorial |

> Prioridade inferida por frequência de chamada e posição na cadeia de dependências.

## Rastreabilidade de Código

| Arquivo | Função / Classe | Cobertura |
|---------|-----------------|-----------|
| `src/data/nature.ts` | siteData | 🟢 |
| `public/brand/*` | assets locais de marca | 🟢 |

## Adendo de revisao (2026-09-10)

Ver adendo em sitedata/. Grafia Hidelgardo + POIs em siteData. 🟢
