---
schemaVersion: 1
generatedAt: 2026-09-10T18:58:32.088Z
amendedAt: 2026-09-10T19:04:00.000Z
appliedAt: 2026-09-10T19:04:00.000Z
kind: pending_legacy_edit
status: applied
---

# Formalização accents + limpeza amenity-tabs — APLICADO

## Resposta direta (Tailwind / App.tsx)

**`--color-nature-accent` NÃO foi renomeada.**  
**`--color-content-accent`** = alias. **`App.tsx`** intocado.

## Status

Aplicado com `allowLegacyEdits: true` e `allowedPaths` = `theme.css` + `index.css`.

## Diff aplicado

### `src/styles/theme.css`

```diff
 @theme {
   --color-nature-background: #f5f3ec;
   --color-nature-background-alt: #e9ecdf;
   --color-nature-surface: #faf9f3;
   --color-nature-text: #263e32;
   --color-nature-text-muted: #64705e;
   --color-nature-primary: #304b3a;
-  --color-nature-accent: #788262;
+  /* content accent (ênfase tipográfica). NOME Tailwind: manter —
+     gera selection:bg-nature-accent / bg-nature-accent. NÃO renomear. */
+  --color-nature-accent: #788262;
   --color-nature-border: #d3d6ca;
   --font-display: "Cormorant Garamond", Georgia, serif;
   --font-body: "Manrope", sans-serif;
   --font-nav: "Montserrat", system-ui, -apple-system, sans-serif;
   --spacing-section: clamp(4rem, 7vw, 7rem);
 }
 
 :root {
   --color-bg: #f9f8f6;
   --color-bg-alt: #f0efeb;
   --color-surface: #ffffff;
   --color-text: #1a1c1a;
   --color-muted: #757470;
-  --color-accent: #5c6450;
+  /* Alias semântico = nature-accent / content (mesmo hex). Uso futuro via var();
+     não substitui --color-nature-accent no @theme. */
+  --color-content-accent: #788262;
+  /* interactive accent (CTA / FAB / header). Alias explícito de intenção. */
+  --color-interactive-accent: #5c6450;
+  /* Alias legado: consumidores existentes usam var(--color-accent). */
+  --color-accent: #5c6450;
   --font-nav: "Montserrat", system-ui, -apple-system, sans-serif;
   --header-color-ease: cubic-bezier(0.23, 1, 0.32, 1);
   --header-layout-ease: cubic-bezier(0.4, 0, 0.2, 1);
   --header-color-duration: 240ms;
   --header-layout-duration: 700ms;
 }
```

**Fora do escopo deste patch:** literais `#788262` em `index.css`; `var(--color-accent)` nos CTAs; `App.tsx`.

### `src/index.css`

```diff
 .amenity-tabs { display: grid; grid-template-columns: repeat(4, 1fr); border-bottom: 1px solid #cdd2c4; margin-bottom: 28px; }
 .amenity-tabs button { text-align: left; padding: 18px 10px; font: 400 29px var(--font-display); border-bottom: 2px solid transparent; transition: background .2s; }
-.amenity-tabs button span { font: 10px var(--font-body); margin-right: 14px; color: #788262; }
 .amenity-tabs button.active { border-bottom-color: #324f3d; background: #e9ecdf; }
```

(Resto do bloco `.amenity-tabs` permanece; limpeza maior fica para outro pedido.)

### `src/App.tsx`

```diff
 (nenhuma alteração)
```

---

## Já feito em `_reversa_sdd/design-system/`

- `color-palette.md` / `tokens.md`: papéis `contentAccent` vs `interactiveAccent`
- `design-system.md`: DS-02 resolvido
