# Confiança (Trust), Design Técnico

> Caso de uso · `secoes-marketing/confianca` · Writer · 2026-09-10  
> Foca no COMO a unit é construída, com base no código legado lido.

## Interface

| Símbolo | Assinatura | Retorno | Observação |
|---------|------------|---------|------------|
| `Trust` | `()` | JSX | certifications locais |

## Fluxo Principal

1. Lê trust.headline. 🟢
2. RevealText + intro. 🟢
3. Mapeia certifications. 🟢
4. Proofline estático. 🟢

## Fluxos Alternativos

- **proofs em siteData:** Não renderizados como lista — conteúdo paralelo. 🟡

## Dependências

- siteData.trust
- RevealText
- CDN genesisempreendimentos
- usePageMotion (.trust-certificate)

## Decisões de Design Identificadas

| Decisão | Evidência no código | Confiança |
|---------|---------------------|-----------|
| Selos visuais hardcodados vs proofs textuais no data | `Trust.tsx` | 🟢 |

## Estado Interno

Stateless. 🟢

## Observabilidade

Nenhuma. 🟢

## Riscos e Lacunas

- 🟡 Duplicação editorial trust.proofs vs certifications.
