# Reveals de Página

> Caso de uso · `animacao/reveals-pagina` · Writer · 2026-09-10  
> Foca no QUE a unit faz, não no como.

## Visão Geral

Comportamento específico do registry `usePageMotion` + `RevealText` + bootstrap GSAP: animações on-scroll one-shot das seções.

## Responsabilidades

- Criar/destruir ScrollTriggers no scope da página.
- Aplicar SplitText em headings marcados.
- Oferecer RevealText para nós avulsos.

## Regras de Negócio

- dependencies: [ready]; revertOnUpdate true. 🟢
- Starts tipicamente top 86%–92%. 🟢
- RevealText: h2/h3 usam SplitText; outros opacity/y. 🟢

## Requisitos Funcionais

| ID | Requisito | Prioridade | Critério de Aceite |
|----|-----------|------------|-------------------|
| RF-01 | Registry cobre pilares, location, amenities, architecture, trust, contact, headings | Must | Seletores presentes |
| RF-02 | RevealText com delay opcional | Should | prop delay |

## Requisitos Não Funcionais

| Tipo | Requisito inferido | Evidência no código | Confiança |
|------|--------------------|---------------------|-----------|
| Performance | stagger moderado; clearProps | `usePageMotion.ts` | 🟢 |

> Inferido a partir do código. Validar com equipe de operações.

## Critérios de Aceitação

```gherkin
Dado ready=true
Quando .pillar-grid cruza top 86%
Então pillar-items e imagens animam uma vez

Dado RevealText as=h2
Quando entra no viewport
Então SplitText lines animam com natureEase
```

## Prioridade (MoSCoW)

| Requisito | MoSCoW | Justificativa |
|-----------|--------|---------------|
| Registry + RevealText | Must | Motion da página |

> Prioridade inferida por frequência de chamada e posição na cadeia de dependências.

## Rastreabilidade de Código

| Arquivo | Função / Classe | Cobertura |
|---------|-----------------|-----------|
| `src/motion/usePageMotion.ts` | usePageMotion | 🟢 |
| `src/motion/RevealText.tsx` | RevealText | 🟢 |
| `src/motion/gsap.ts` | plugins | 🟢 |
