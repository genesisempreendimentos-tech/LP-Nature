# Matriz Código → Spec

> Writer · 2026-09-10 · doc_level completo  
> Mapeia arquivos do legado `src/` para units em `_reversa_sdd/`.

| Arquivo do legado | Unit correspondente | Cobertura |
|-------------------|---------------------|-----------|
| `src/main.tsx` | `casca-aplicacao/`, `animacao/` | 🟢 |
| `src/App.tsx` | `casca-aplicacao/` | 🟢 |
| `src/index.css` | n/a (estilo global) | n/a |
| `src/styles/theme.css` | n/a (tokens) | n/a |
| `src/vite-env.d.ts` | n/a | n/a |
| `src/components/nature/Preloader.tsx` | `casca-aplicacao/preloader/` | 🟢 |
| `src/components/nature/Header.tsx` | `casca-aplicacao/header/` | 🟢 |
| `src/components/nature/Footer.tsx` | `casca-aplicacao/rodape/` | 🟢 |
| `src/components/nature/NatureLogo.tsx` | `casca-aplicacao/` | 🟢 |
| `src/components/nature/Hero.tsx` | `hero/`, `hero/apresentacao-cta/` | 🟢 |
| `src/components/nature/LifeMoment.tsx` | `secoes-marketing/essencia/` | 🟢 |
| `src/components/nature/Pillars.tsx` | `secoes-marketing/pilares/` | 🟢 |
| `src/components/nature/FloorPlans.tsx` | `secoes-marketing/plantas/` | 🟢 |
| `src/components/nature/Amenities.tsx` | `secoes-marketing/lazer/` | 🟢 |
| `src/components/nature/Architecture.tsx` | `secoes-marketing/arquitetura/` | 🟢 |
| `src/components/nature/Trust.tsx` | `secoes-marketing/confianca/` | 🟢 |
| `src/components/nature/SectionCta.tsx` | `captura-lead/`, `secoes-marketing/` | 🟢 |
| `src/components/nature/Location.tsx` | `mapa-localizacao/`, `mapa-localizacao/proximidades/` | 🟢 |
| `src/components/nature/LocationMapLazy.tsx` | `mapa-localizacao/mapa-lazy/` | 🟢 |
| `src/components/nature/LocationMap.tsx` | `mapa-localizacao/mapa-lazy/` | 🟢 |
| `src/components/nature/LeadModal.tsx` | `captura-lead/modal-lead/` | 🟢 |
| `src/components/nature/LeadForm.tsx` | `captura-lead/secao-contato/` | 🟢 |
| `src/components/nature/WhatsAppFab.tsx` | `captura-lead/fab-bubble/` | 🟢 |
| `src/context/LeadModalContext.tsx` | `captura-lead/`, `captura-lead/modal-lead/` | 🟢 |
| `src/data/nature.ts` | `dados-conteudo/`, `dados-conteudo/sitedata/` | 🟢 |
| `src/motion/gsap.ts` | `animacao/`, `animacao/reveals-pagina/` | 🟢 |
| `src/motion/usePageMotion.ts` | `animacao/reveals-pagina/` | 🟢 |
| `src/motion/RevealText.tsx` | `animacao/reveals-pagina/` | 🟢 |
| `src/lib/gsap.ts` | `animacao/` | 🟡 |
| `src/lib/utils.ts` | n/a (utilitário genérico) | n/a |
| `src/hooks/useScrollDirection.ts` | n/a (não usado pelo Header) | n/a |
| `public/brand/*` | `dados-conteudo/`, `casca-aplicacao/`, `mapa-localizacao/mapa-lazy/` | 🟢 |
| `index.html` | `casca-aplicacao/` | 🟢 |

## Cobertura estimada

- Arquivos runtime `src/**/*.{ts,tsx}` mapeados a alguma unit: **~90%+** (exceto utils/css/d.ts/hook morto).
- Lacunas de produto documentadas nas units (`nature:plan`, CRM, privacy, ortografia).
