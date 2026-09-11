# Pilares (Pillars)

> Caso de uso · `secoes-marketing/pilares` · Writer · 2026-09-10  
> Foca no QUE a unit faz, não no como.

## Visão Geral

Grade de quatro diferenciais do Nature (localização, plantas, lazer, arquitetura) com foto e texto curto, reforçando por que escolher o empreendimento.

## Responsabilidades

- Ler `siteData.pillars.items` (número, título, imagem).
- Associar parágrafo descritivo por índice (array local).
- Expor seção `#diferenciais`.

## Regras de Negócio

- Quatro itens mapeados de siteData. 🟢
- Descrições não vêm do siteData — array hardcodado de 4 strings. 🟢
- Imagens lazy; nota 'Imagens de referência...'. 🟢

## Requisitos Funcionais

| ID | Requisito | Prioridade | Critério de Aceite |
|----|-----------|------------|-------------------|
| RF-01 | Renderizar 4 pilares com número, título, imagem e texto | Must | 4 articles.pillar-item |
| RF-02 | id diferenciais para navegação | Must | document.getElementById('diferenciais') |

## Requisitos Não Funcionais

| Tipo | Requisito inferido | Evidência no código | Confiança |
|------|--------------------|---------------------|-----------|
| Performance | loading=lazy nas imagens | `Pillars.tsx` | 🟢 |

> Inferido a partir do código. Validar com equipe de operações.

## Critérios de Aceitação

```gherkin
Dado siteData.pillars.items com 4 entradas
Quando Pillars renderiza
Então cada item mostra número, título, imagem e a descrição do índice correspondente

Dado o header/footer
Quando o usuário segue a âncora #diferenciais
Então a seção de pilares fica no viewport
```

## Prioridade (MoSCoW)

| Requisito | MoSCoW | Justificativa |
|-----------|--------|---------------|
| Grade de diferenciais | Must | Proposta de valor |

> Prioridade inferida por frequência de chamada e posição na cadeia de dependências.

## Rastreabilidade de Código

| Arquivo | Função / Classe | Cobertura |
|---------|-----------------|-----------|
| `src/components/nature/Pillars.tsx` | Pillars | 🟢 |
| `src/data/nature.ts` | siteData.pillars | 🟢 |
