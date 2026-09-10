# ADR-005 — Scroll nativo; Lenis não instalado

- **Status:** aceito no código 🟢
- **Módulos:** `motion`

## Contexto

O brief permitia Lenis “apenas se a integração não prejudicar ScrollTrigger, acessibilidade ou performance”. `engineering-rules.md` define fase 1 = scroll nativo + ScrollTrigger; Lenis só depois de medir.

## Decisão

Não adicionar Lenis. Scroll da página é o do browser; GSAP ScrollTrigger escuta o scroll nativo.

## Por quê (inferido)

Evitar dessincronia ticker/lenis e custo de smooth scroll em mobile, alinhado à prioridade “fluidez e estabilidade > quantidade de animações”. 🟡
