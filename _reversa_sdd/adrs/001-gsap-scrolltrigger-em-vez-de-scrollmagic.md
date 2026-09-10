# ADR-001 — GSAP ScrollTrigger em vez de ScrollMagic

- **Status:** aceito no código 🟢 (decisão retroativa 🟡 — sem Git)
- **Data inferida:** briefs em `src/imports/pasted_text/` + `package.json`
- **Módulos:** `motion`, `hero`, `app-shell`, `lead-capture`

## Contexto

O brief inicial (`nature-residencial-brief.md`) pedia GSAP 3 **e** ScrollMagic 3 para cenas de scroll, pinning e progress.

Um segundo documento (`animation-architecture.md`) anula isso: “Desconsidere qualquer orientação anterior para utilizar ScrollMagic” e fixa a stack oficial: GSAP 3, ScrollTrigger, SplitText, `@gsap/react` / `useGSAP()`.

## Decisão

Usar **apenas GSAP 3 + ScrollTrigger + SplitText + useGSAP**. Não instalar ScrollMagic.

Evidência: `package.json` não lista ScrollMagic; `src/motion/gsap.ts` registra CustomEase, SplitText e ScrollTrigger; `src/lib/gsap.ts` registra ScrollTrigger + useGSAP.

## Por quê (inferido)

ScrollMagic sobrepõe o modelo de scenes ao ScrollTrigger; o segundo documento alinha o projeto ao ecossistema React (`useGSAP` com scope e cleanup). 🟡
