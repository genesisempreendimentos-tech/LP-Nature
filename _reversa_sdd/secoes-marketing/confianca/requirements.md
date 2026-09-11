# Confiança (Trust)

> Caso de uso · `secoes-marketing/confianca` · Writer · 2026-09-10  
> Foca no QUE a unit faz, não no como.

## Visão Geral

Seção de prova social institucional: Gênesis Empreendimentos, certificações (Nível A, PBQP-H, ISO 9001) e linhas de experiência/parceria/compromisso.

## Responsabilidades

- Headline via RevealText + siteData.trust.headline.
- Listar certificações hardcodadas com selos remotos.
- Exibir proofline (experiência, Caixa, pós-entrega).

## Regras de Negócio

- Certificações estão no componente, não em siteData.trust.proofs (lista textual paralela). 🟢
- Sem CTA nesta seção. 🟢
- Sem id de âncora. 🟢

## Requisitos Funcionais

| ID | Requisito | Prioridade | Critério de Aceite |
|----|-----------|------------|-------------------|
| RF-01 | Exibir headline e intro Gênesis | Must | Texto + strong Gênesis |
| RF-02 | Exibir 3 certificações com selo | Must | Nível A, PBQP-H, ISO 9001 |
| RF-03 | Exibir 3 proof lines | Should | Experiência/Parceria/Compromisso |

## Requisitos Não Funcionais

| Tipo | Requisito inferido | Evidência no código | Confiança |
|------|--------------------|---------------------|-----------|
| Performance | selos loading=lazy | `Trust.tsx` | 🟢 |

> Inferido a partir do código. Validar com equipe de operações.

## Critérios de Aceitação

```gherkin
Dado a seção Trust
Quando o visitante chega ao bloco de certificações
Então vê Nível A, PBQP-H e ISO 9001 com imagens de selo

Dado siteData.trust.proofs
Quando Trust renderiza
Então a UI usa o array local certifications (não itera proofs)
```

## Prioridade (MoSCoW)

| Requisito | MoSCoW | Justificativa |
|-----------|--------|---------------|
| Certificações + marca | Must | Confiança na decisão |
| Proof lines | Should | Reforço |

> Prioridade inferida por frequência de chamada e posição na cadeia de dependências.

## Rastreabilidade de Código

| Arquivo | Função / Classe | Cobertura |
|---------|-----------------|-----------|
| `src/components/nature/Trust.tsx` | Trust | 🟢 |
| `src/data/nature.ts` | trust.headline; proofs paralelos | 🟡 |
