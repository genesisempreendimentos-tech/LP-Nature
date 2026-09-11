# Arquitetura (Architecture)

> Caso de uso · `secoes-marketing/arquitetura` · Writer · 2026-09-10  
> Foca no QUE a unit faz, não no como.

## Visão Geral

Seção visual de fachadas e princípios arquitetônicos do Nature, com headline animada e CTA para o projeto completo.

## Responsabilidades

- Exibir galeria de 3 fachadas (URLs WP no componente).
- Usar headline e tags de `siteData.architecture`.
- RevealText no h2; SectionCta.

## Regras de Negócio

- Imagens oficiais vêm do array local `facades` (WP), não de `siteData.architecture.images` (Unsplash). 🟢
- Tags e headline vêm de siteData. 🟢
- CTA abre modal. 🟢

## Requisitos Funcionais

| ID | Requisito | Prioridade | Critério de Aceite |
|----|-----------|------------|-------------------|
| RF-01 | Galeria com 3 figuras legendadas | Must | main/detail/landscape |
| RF-02 | Exibir tags do projeto | Must | 4 tags de siteData |
| RF-03 | CTA abre modal | Should | SectionCta |

## Requisitos Não Funcionais

| Tipo | Requisito inferido | Evidência no código | Confiança |
|------|--------------------|---------------------|-----------|
| Performance | imgs loading=lazy | `Architecture.tsx` | 🟢 |

> Inferido a partir do código. Validar com equipe de operações.

## Critérios de Aceitação

```gherkin
Dado a seção Arquitetura
Quando carrega
Então três imagens WP de fachada aparecem com legendas 01–03

Dado siteData.architecture.images (Unsplash)
Quando Architecture renderiza
Então essas URLs Unsplash NÃO são usadas no DOM

Dado o CTA da seção
Quando clica
Então o modal de lead abre
```

## Prioridade (MoSCoW)

| Requisito | MoSCoW | Justificativa |
|-----------|--------|---------------|
| Galeria WP + tags | Must | Prova visual |
| CTA | Should | Conversão auxiliar |

> Prioridade inferida por frequência de chamada e posição na cadeia de dependências.

## Rastreabilidade de Código

| Arquivo | Função / Classe | Cobertura |
|---------|-----------------|-----------|
| `src/components/nature/Architecture.tsx` | Architecture | 🟢 |
| `src/data/nature.ts` | architecture.headline/tags; images órfãs | 🟢 |
| `src/motion/RevealText.tsx` | RevealText | 🟢 |

## Adendo de revisao (2026-09-10)

Manter Unsplash por enquanto. Troca por asset oficial depende da Genesis. Pendencia rastreada. 🟢 (decisao temporaria)
