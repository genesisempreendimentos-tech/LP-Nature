# Análise de código — Nature - Pagina de Vendas

> Archaeologist · conclusão da fase de escavação · 2026-09-10  
> `doc_level`: completo  
> Módulos: `app-shell`, `hero`, `marketing-sections`, `location-map`, `lead-capture`, `motion`, `content-data`

---

## app-shell 🟢

**Propósito:** bootstrap React, composição da página, intro (preloader), navegação sticky e rodapé institucional.

### Arquivos primários
- `src/main.tsx` — mount `#root`, registro GSAP (`ScrollTrigger`, `useGSAP`)
- `src/App.tsx` — provider de lead modal + ordem das seções + preloader
- `src/components/nature/Preloader.tsx`
- `src/components/nature/Header.tsx`
- `src/components/nature/Footer.tsx`
- `src/components/nature/NatureLogo.tsx`

### Fluxo de controle (App)
1. `ready` inicia `true` se `prefers-reduced-motion: reduce` **ou** se há `location.hash`; senão `false`.
2. `introVisible` inicia como `!ready`.
3. Se intro visível → renderiza `Preloader`; página recebe `inert`.
4. `onReveal` → `ready=true` (libera animações do Hero/Header).
5. `onComplete` → `ready=true` + `introVisible=false` (remove preloader, habilita FAB).
6. `usePageMotion(pageRef, ready)` roda motion de página.

### Algoritmo — Preloader 🟢
- Trava `body.overflow = hidden`.
- Anima entrada da marca; aguarda `image.decode()` do hero + `document.fonts.ready` + tween de entrada.
- Timeout de assets **1800ms** força `exit`; safety **2800ms** força `finish` (sem animação completa se travar).
- `exit`: se reduced-motion → `finish` direto; senão `onReveal()` + slide `yPercent: -100`.
- Escape / botão “Pular” / mudança para reduced-motion disparam `exit`.
- Ao finalizar, se foco estava no overlay → remove `inert` e foca `.skip-link`.

### Algoritmo — Header solid state 🟢
- Histerese de scroll: vira sólido em `scrollY > 80`; volta transparente só se `scrollY ≤ 40` (evita flicker).
- Menu mobile: Escape fecha e devolve foco ao toggle; click fora fecha; ≥761px fecha menu.
- CTA do header chama `openLeadModal()` (não navega mais para `#contato`).

### Footer 🟢
- Dados de `siteData.footer` + `contact`.
- WhatsApp do rodapé ainda é link `wa.me` (exceção vs CTAs da página).
- `privacyHref` ainda `#` 🔴 LACUNA de política real.

### Dependências
→ `lead-capture` (context), `hero` (Header dentro do Hero), `content-data`, `motion`

---

## hero 🟢

**Propósito:** primeira dobra persuasiva — marca visual full-bleed, headline, CTA de lead, fatos.

### Arquivos
- `src/components/nature/Hero.tsx` (compõe `Header`)

### Fluxo / motion
- Só anima quando `ready` e `prefers-reduced-motion: no-preference`.
- SplitText no título (words + mask).
- Fade/slide em kicker, descrição, actions.
- Ken Burns suave na imagem de fundo (scale 1.065→1).
- Facts: timeline ScrollTrigger `start: top 88%`, `once: true`.
- Desktop ≥1024px: parallax scrub `yPercent: 9` no background.

### Regras embutidas
- CTA principal abre modal de lead (`openLeadModal`).
- Link secundário ancora `#nature`; fact link `#lazer`.
- Imagem hero: CDN WordPress oficial da fachada.

### Dependências
→ `app-shell`/`Header`, `lead-capture`, `motion/gsap`

---

## marketing-sections 🟢

**Propósito:** seções narrativas e de prova (exceto mapa e lead final).

| Seção | id | Componente | Notas |
|-------|-----|------------|-------|
| Essência | `#nature` | LifeMoment | CTA → modal |
| Diferenciais | `#diferenciais` | Pillars | 4 cards de `siteData.pillars` + copy local |
| Plantas | `#plantas` | FloorPlans | estado `activeIdx`; dispara `nature:plan` CustomEvent |
| Lazer | `#lazer` | Amenities | rail horizontal + nav; 11 espaços hardcoded |
| Arquitetura | — | Architecture | galeria 3 fachadas CDN + tags |
| Confiança | — | Trust | selos Nível A / PBQP-H / ISO 9001 |

### Algoritmos
- **FloorPlans:** seleção por índice; CTA dispara `window CustomEvent("nature:plan", { detail: plan.area })` antes de abrir modal (via SectionCta). 🟡 O LeadForm final **não** escuta mais esse evento (foi removido) — evento ficou órfão 🔴/🟡.
- **Amenities.move(direction):** `scrollBy` com step `min(0.72 * innerWidth, 720)`; behavior `auto` se reduced-motion.

### Dependências
→ `content-data`, `lead-capture` (SectionCta), `motion` (RevealText em Architecture/Trust)

---

## location-map 🟢

**Propósito:** seção de localização com mapa Leaflet interativo (lazy), endereço, quotes e grid de proximidades.

### Arquivos primários
- `src/components/nature/Location.tsx` — layout da seção `#localizacao`
- `src/components/nature/LocationMapLazy.tsx` — code-split por IntersectionObserver
- `src/components/nature/LocationMap.tsx` — mapa Leaflet + POIs

### Fluxo de controle
1. `Location` renderiza heading (`RevealText`), CTA (`SectionCta`), mapa lazy, painel de endereço/quotes e grade de proximidade de `siteData.location`.
2. `LocationMapLazy` observa o host com `rootMargin: 700px`; na primeira interseção importa dinamicamente `LocationMap` e desconecta o observer.
3. Placeholder `.location-map-loading` enquanto o chunk não carrega.
4. `LocationMap` inicia com interação **desligada** (`active=false`): dragging, zoom, scrollWheel, keyboard desabilitados.
5. Overlay “Clique para navegar” → `setActive(true)` → `Interaction` habilita handlers.
6. `FitPoints` ajusta bounds para Nature + 6 POIs (`padding: 46`, `maxZoom: 14`, `animate: false`).

### Algoritmos
- **Lazy load do mapa** 🟢: IntersectionObserver + dynamic `import("./LocationMap")`.
- **Gate de interação** 🟢: evita scroll/drag acidental até clique explícito.
- **Ícones DivIcon** 🟢: marker Nature (SVG `/brand/nature-symbol.svg` + pulse) e POIs via `renderToStaticMarkup` de ícones Lucide.
- **Tiles** 🟢: OpenStreetMap `tile.openstreetmap.org`.

### Estruturas / constantes
- `NATURE_POSITION`: `[-22.4372, -42.9822]` 🟢
- `points[]` (6 POIs) hardcoded em `LocationMap.tsx` — **fonte separada** de `siteData.location.proximity` (labels/distâncias no painel). 🟡 duplicação de conteúdo.
- `siteData.location.mapEmbedUrl` existe mas **não é usado** pelo mapa atual (Leaflet substitui iframe). 🟡

### Dependências
→ `content-data` (copy/proximidade), `lead-capture` (SectionCta), `motion` (RevealText + timeline em `usePageMotion`), Leaflet / react-leaflet / lucide

---

## lead-capture 🟢

**Propósito:** funil de conversão — modal de lead, CTAs de seção, FAB flutuante e seção final de contato.

### Arquivos primários
- `src/context/LeadModalContext.tsx` — estado global `isOpen` / open / close
- `src/components/nature/LeadModal.tsx` — Dialog Radix + formulário
- `src/components/nature/SectionCta.tsx` — botão padrão que abre o modal
- `src/components/nature/WhatsAppFab.tsx` — FAB + bubble (abre modal, **não** WhatsApp)
- `src/components/nature/LeadForm.tsx` — seção `#contato` (CTA panel, sem form inline)

### Fluxo — modal
1. Qualquer CTA (`SectionCta`, Header, Hero, FAB, bubble) chama `openLeadModal()`.
2. Ao abrir: limpa campos, erros e `submitted`.
3. Submit → `validate()` → se ok, monta payload `{ name, email, phone: "+55"+digits }` → **`console.log(data)`** → tela de sucesso.
4. Fechar (X, overlay, botão sucesso) → `closeLeadModal()`.

### Validação 🟢
| Campo | Regra |
|-------|--------|
| nome | trim não vazio |
| e-mail | não vazio + regex `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` |
| telefone | exatamente **11 dígitos** (máscara `00 00000-0000`) |

### Algoritmo — WhatsAppFab / bubble 🟢
- Visibilidade do FAB: ScrollTrigger em `#inicio` (`start: bottom top`) — some ao voltar ao hero.
- Bubble: 1ª aparição após **10s** do mount (se FAB visível); visível **6s**; reaparece após **52s**; máx. **3** shows por sessão.
- Persistência `sessionStorage`: `nature_bubble_dismissed`, `nature_bubble_shown`, `nature_bubble_index`.
- Modal aberto → esconde bubble e pausa timers; ao fechar, retoma ciclo se ainda houver shows.
- Dismiss (X) → `dismissed=1` e cancela reaparecimentos.
- Clique no FAB ou na bubble → `openLeadModal()` (não abre `wa.me`).

### Lacunas / observações
- 🔴 **Sem backend / CRM / webhook** — lead só vai para `console.log`.
- 🟡 Nome do componente `WhatsAppFab` é legado; comportamento atual é lead modal.
- 🟡 Footer ainda usa WhatsApp real via `contact.whatsapp` — canal paralelo ao modal.
- 🟡 Evento `nature:plan` órfão (disparado em FloorPlans, sem consumidor no lead).

### Dependências
→ Radix Dialog, react-imask, GSAP/ScrollTrigger (FAB), `content-data` (só indireto no footer/wa)

---

## motion 🟢

**Propósito:** infraestrutura e orquestração de animações GSAP da landing.

### Arquivos primários
- `src/motion/gsap.ts` — registro CustomEase / SplitText / ScrollTrigger + `natureEase`
- `src/motion/usePageMotion.ts` — animações de página após `ready`
- `src/motion/RevealText.tsx` — reveal reutilizável por elemento
- `src/lib/gsap.ts` — registro legado ScrollTrigger + useGSAP (usado por `main.tsx`)
- `src/hooks/useScrollDirection.ts` — hook de direção de scroll (disponível; Header usa lógica própria)

### Algoritmos
- **`natureEase`** 🟢: `CustomEase("nature-out", "0.23,1,0.32,1")`.
- **`usePageMotion(scope, ready)`** 🟢: só roda se `ready`; gated por `prefers-reduced-motion: no-preference` via `matchMedia`. Anima:
  - `[data-motion-heading]` → SplitText lines + mask
  - `.contact-copy > p`
  - `.pillar-grid` / `.pillar-item` / `.pillar-photo img`
  - `.location-experience` (mapa, painel, proximidade)
  - `.amenity-card`, `.architecture-image`, `.trust-certificate`
- **`RevealText`** 🟢: h2/h3 → SplitText lines; demais → fade/y simples; `once` em ScrollTrigger.
- **`useScrollDirection`** 🟢: rAF + delta mínimo; `scrollingDown` / `isSolid` — 🟡 Header atual **não** consome este hook (histerese inline).

### Dependências
→ GSAP 3.15, @gsap/react; usado por app-shell, hero, marketing, location, lead FAB

---

## content-data 🟢

**Propósito:** fonte única de copy e mídia comercial do empreendimento (`siteData`).

### Arquivo
- `src/data/nature.ts` — objeto `siteData` exportado

### Seções do objeto
| Chave | Uso principal | Confiança |
|-------|---------------|-----------|
| `hero` | Hero (parcial; alguns texts locais no componente) | 🟢 |
| `lifeMoment` | LifeMoment | 🟢 |
| `pillars` | Pillars | 🟢 |
| `location` | Location (address, quotes, proximity, map links) | 🟢 |
| `floorPlans` | FloorPlans | 🟢 |
| `amenities` | categorias textuais — 🟡 imagens do rail estão hardcoded em Amenities.tsx | 🟢/🟡 |
| `architecture` | Architecture (tags + images Unsplash) | 🟢 |
| `trust` | Trust (lista de proofs textual) | 🟢 |
| `cta` | 🟡 parece legado / pouco ou não referenciado nos CTAs atuais de modal | 🟡 |
| `footer` | Footer | 🟢 |
| `contact` | Footer WhatsApp (`wa.me`) | 🟢 |

### Regras / observações
- URLs de imagem misturam CDNs: `wp.moregenesis.com.br`, `wp.genesisempreendimentos.com.br`, `wp.residencialnature.com.br`, Unsplash.
- Endereço no footer usa grafia `Hildegardo`; Location/mapa usam `Hidelgardo` 🟡 inconsistência ortográfica.
- `mapEmbedUrl` sem consumidor no código atual.
- Sem i18n / CMS runtime — conteúdo estático no bundle.

### Dependências
→ consumido por quase todas as seções; sem deps de runtime

---

## Resumo consolidado de dados

| Entidade / estrutura | Onde | Confiança |
|----------------------|------|-----------|
| Estado App (`ready`, `introVisible`) | App.tsx | 🟢 |
| Header solid hysteresis | Header.tsx | 🟢 |
| Plan option (`area`, `image`) | FloorPlans + nature.ts | 🟢 |
| Amenity space (`name`, `image`) | Amenities.tsx constante | 🟢 |
| Certification (`name`, `description`, `image`) | Trust.tsx | 🟢 |
| Map POI (`name`, `category`, `distance`, `icon`, `position`) | LocationMap.tsx | 🟢 |
| Proximity item (`label`, `text`, `distance`) | nature.ts | 🟢 |
| Lead payload (`name`, `email`, `phone`) | LeadModal.tsx | 🟢 |
| Bubble session keys | WhatsAppFab.tsx | 🟢 |
| `siteData` (objeto comercial) | nature.ts | 🟢 |

### Lacunas abertas 🔴
1. Persistência/envio real de leads (API/CRM).
2. Política de privacidade (`privacyHref: "#"`).
3. Destino do CustomEvent `nature:plan` (órfão).
4. 🟡 Conteúdo de mapa duplicado (POIs vs proximity) e `mapEmbedUrl` morto.
