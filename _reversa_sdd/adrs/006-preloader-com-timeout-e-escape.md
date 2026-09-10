# ADR-006 — Preloader de marca com teto de tempo e escape

- **Status:** aceito no código 🟢 (contrasta com o brief 🟡)
- **Módulos:** `app-shell`

## Contexto

O brief do hero diz: “Sem preloader longo.” Mesmo assim existe `Preloader.tsx` com logo, caption e trava de scroll.

## Decisão

- Mostrar overlay de marca enquanto decode da imagem do hero + `document.fonts.ready` + tween de entrada.
- Forçar `exit` em **1800ms** e `finish` em **2800ms** para nunca prender o visitante.
- Pular o preloader se reduced-motion **ou** se a URL já tem hash (deep-link).
- Escape / “Pular introdução” / mudança para reduced-motion também saem.

## Por quê (inferido)

Quer-se um beat editorial de marca sem transformar a intro em obstáculo. O teto de tempo e os atalhos conciliam o “sem preloader longo” com a identidade. Comentário no código: “slow assets must never trap the visitor.” 🟢
