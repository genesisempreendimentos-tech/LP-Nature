# Preloader (Intro) — SUPERSEDED

> Caso de uso · `casca-aplicacao/preloader` · Writer · 2026-09-10  
> **Status 2026-09-11:** **substituído por DEV-010** — a landing Astro **não** monta overlay de preloader.

## Decisão atual (oficial)

- No load: `document.documentElement.dataset.appReady = "1"` + evento `nature:app-ready` (`apps/web/src/pages/index.astro`).
- Sem componente `Preloader`, sem `inert` de intro, sem `introVisible`.
- Seções de marketing continuam *consumindo* o contrato `appReady` (mesmo evento/dataset), só que ele dispara imediato.
- Ver: `_reversa_sdd/migration/screen_deviation_log.md` → **DEV-010**.
- Parity: `_reversa_sdd/migration/parity_tests/05-preloader-gate.feature` (reescrito).

## Histórico (legado React — referência apenas)

O texto abaixo descrevia o comportamento do `src/components/nature/Preloader.tsx` **antes** da remoção do legado. Mantido como arquivo histórico; **não implementar**.

---

## Visão Geral (legado, arquivado)

Overlay de marca exibido antes da landing ficar plenamente interativa. Garante que a imagem do hero e as fontes estejam prontas (com teto de tempo), permite pular a intro e devolve o foco de forma acessível ao concluir.

## Responsabilidades (legado, arquivado)

- Exibir marca Nature + caption + status.
- Travar scroll do `body` enquanto o overlay estiver montado.
- Aguardar decode da imagem hero, `document.fonts.ready` e animação — ou timeout.
- Notificar via `onReveal` / `onComplete`.
- Escape, botão “Pular”, reduced-motion.

## Regras de Negócio (legado, arquivado)

- Timeout assets 1800 ms; safety 2800 ms; reduced-motion pula slide — ver implementação histórica removida em 2026-09-11.
