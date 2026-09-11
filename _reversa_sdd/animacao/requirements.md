# Animação

> Unit de módulo · `animacao` · Writer · 2026-09-10  
> Foca no QUE a unit faz, não no como.

## Visão Geral

Camada de motion da landing: registro GSAP (CustomEase, SplitText, ScrollTrigger), hook `usePageMotion` com reveals por seletor, e componente `RevealText`. Garante presença animada respeitando prefers-reduced-motion.

## Responsabilidades

- Exportar gsap/plugins/natureEase (`src/motion/gsap.ts`).
- Orquestrar reveals de página quando `ready` (`usePageMotion`).
- RevealText para headings/eyebrows pontuais.
- Registro adicional em main.tsx / lib/gsap.ts (duplicidade parcial).

## Regras de Negócio

- usePageMotion no-op se !ready. 🟢
- Reveals só em `(prefers-reduced-motion: no-preference)` via matchMedia. 🟢
- ScrollTriggers with once: true nos reveals de seção. 🟢
- natureEase = CustomEase '0.23,1,0.32,1'. 🟢
- SplitText lines + mask em [data-motion-heading] e h2/h3 RevealText. 🟢

## Requisitos Funcionais

| ID | Requisito | Prioridade | Critério de Aceite |
|----|-----------|------------|-------------------|
| RF-01 | Armar reveals após ready | Must | Sem ready não anima |
| RF-02 | Respeitar reduced-motion | Must | matchMedia branch |
| RF-03 | RevealText reutilizável | Should | Location/Architecture/Trust |
| RF-04 | Ease Nature compartilhado | Should | natureEase export |

## Requisitos Não Funcionais

| Tipo | Requisito inferido | Evidência no código | Confiança |
|------|--------------------|---------------------|-----------|
| Acessibilidade | SplitText aria:'auto'; reduced-motion skip | `usePageMotion.ts` / `RevealText.tsx` | 🟢 |
| Performance | once:true; revertOnUpdate; clearProps | `usePageMotion.ts` | 🟢 |

> Inferido a partir do código. Validar com equipe de operações.

## Critérios de Aceitação

```gherkin
Dado ready=false
Quando usePageMotion roda
Então nenhum ScrollTrigger de seção é criado pelo hook

Dado ready=true e prefers-reduced-motion: no-preference
Quando um [data-motion-heading] entra em top 90%
Então as linhas fazem reveal uma vez

Dado prefers-reduced-motion: reduce
Quando a página está ready
Então o matchMedia de no-preference não aplica as tweens do registry
```

## Prioridade (MoSCoW)

| Requisito | MoSCoW | Justificativa |
|-----------|--------|---------------|
| Gate ready + reduced-motion | Must | ADR-005/motion |
| Registry de seções | Must | Presença visual |
| RevealText | Should | Usado em subset |

> Prioridade inferida por frequência de chamada e posição na cadeia de dependências.

## Rastreabilidade de Código

| Arquivo | Função / Classe | Cobertura |
|---------|-----------------|-----------|
| `src/motion/gsap.ts` | register + natureEase | 🟢 |
| `src/motion/usePageMotion.ts` | usePageMotion | 🟢 |
| `src/motion/RevealText.tsx` | RevealText | 🟢 |
| `src/main.tsx` | registerPlugin ScrollTrigger/useGSAP | 🟢 |
| `src/lib/gsap.ts` | register paralelo | 🟡 |
