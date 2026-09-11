# Screenshots para o Visor / Screen Translator

Coloque aqui os arquivos de captura **antes** de rodar `/reversa-visor`.

## Formato

- Extensões: `.png`, `.jpg`/`.jpeg` ou `.webp` (preferência: **PNG**).
- Um arquivo por estado de tela quando possível (ex.: `lead-modal-form.png`, `lead-modal-success.png`).
- Nomes em kebab-case, descritivos: `hero-desktop.png`, `header-scrolled.png`, `architecture-gallery.png`, `lead-modal-step-01.png`.
- Desktop e mobile: sufixo `-desktop` / `-mobile` se for o mesmo frame em viewports diferentes.

## Destino final (após o Visor)

O Visor **move/copia** (ou você organiza) para as units:

```
_reversa_sdd/<unit>/screenshots/<nome-da-tela>.<ext>
```

Exemplos com a granularity `hybrid` deste projeto:

| Conteúdo da captura | Unit sugerida |
|---|---|
| Header / preloader / footer | `casca-aplicacao/header`, `…/preloader`, `…/rodape` |
| Hero | `hero/apresentacao-cta` |
| Essência, pilares, plantas, lazer, arquitetura, confiança | `secoes-marketing/<sub>` |
| Mapa / proximidades | `mapa-localizacao/mapa-lazy`, `…/proximidades` |
| FAB, modal lead, seção contato | `captura-lead/fab-bubble`, `…/modal-lead`, `…/secao-contato` |

Globais gerados pelo Visor:

- `_reversa_sdd/ui/inventory.md`
- `_reversa_sdd/ui/flow.md`

## Não use

- `docs/screenshots/` na raiz do app legado — o Visor e o Screen Translator leem sob `_reversa_sdd/`.
- Não apague capturas já salvas nas units (política non-destructive do Visor).
