# Seção Contato (LeadForm)

> Caso de uso · `captura-lead/secao-contato` · Writer · 2026-09-10  
> Foca no QUE a unit faz, não no como.

## Visão Geral

Última seção de conversão `#contato`: não contém inputs — convida a consultar plantas/unidades abrindo o mesmo modal de lead via SectionCta.

## Responsabilidades

- Renderizar copy + painel CTA.
- Abrir modal (não formulário inline).

## Regras de Negócio

- id=`contato`. 🟢
- Sem campos de formulário no componente. 🟢
- SectionCta 'Consultar plantas e unidades' → openLeadModal. 🟢

## Requisitos Funcionais

| ID | Requisito | Prioridade | Critério de Aceite |
|----|-----------|------------|-------------------|
| RF-01 | Seção #contato visível no fim do main | Must | âncora funciona |
| RF-02 | CTA abre LeadModal | Must | modal open |

## Requisitos Não Funcionais

| Tipo | Requisito inferido | Evidência no código | Confiança |
|------|--------------------|---------------------|-----------|
| Motion | data-motion-heading + usePageMotion em .contact-copy > p | `LeadForm.tsx` / `usePageMotion.ts` | 🟢 |

> Inferido a partir do código. Validar com equipe de operações.

## Critérios de Aceitação

```gherkin
Dado o visitante em #contato
Quando clica em "Consultar plantas e unidades"
Então o LeadModal abre

Dado a expectativa de um form HTML na seção
Quando inspeciona LeadForm
Então não há inputs — apenas CTA
```

## Prioridade (MoSCoW)

| Requisito | MoSCoW | Justificativa |
|-----------|--------|---------------|
| Âncora + CTA modal | Must | Conversão final |

> Prioridade inferida por frequência de chamada e posição na cadeia de dependências.

## Rastreabilidade de Código

| Arquivo | Função / Classe | Cobertura |
|---------|-----------------|-----------|
| `src/components/nature/LeadForm.tsx` | LeadForm | 🟢 |
| `src/components/nature/SectionCta.tsx` | SectionCta | 🟢 |
