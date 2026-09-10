# Máquinas de estado — Nature Residencial

> Detective · 2026-09-10  
> `doc_level`: completo  
> Não há entidades persistidas com `status` em banco. Os estados abaixo são **UI/sessão no cliente**. 🟢

---

## 1. Intro da página (`ready` + `introVisible`)

Estados efetivos derivados de `App.tsx` + `Preloader.tsx`.

| Estado | Condição | Confiança |
|--------|----------|-----------|
| `skipped` | `ready=true`, `introVisible=false` no mount (reduced-motion **ou** `location.hash`) | 🟢 |
| `intro` | `ready=false`, `introVisible=true` — overlay visível, página `inert` | 🟢 |
| `revealing` | `onReveal()` → `ready=true`, overlay ainda visível (slide `yPercent: -100`) | 🟢 |
| `complete` | `onComplete()` → `ready=true`, `introVisible=false` — FAB pode montar | 🟢 |

### Transições

```mermaid
stateDiagram-v2
  [*] --> skipped: reduced-motion OU hash na URL
  [*] --> intro: caso contrário
  intro --> revealing: onReveal (assets prontos, timeout 1800ms, Escape, Pular)
  intro --> complete: reduced-motion durante intro OU safety 2800ms
  revealing --> complete: overlay termina (onComplete)
  skipped --> [*]
  complete --> [*]
```

### Gatilhos 🟢

| De | Para | Gatilho |
|----|------|---------|
| mount | `skipped` | `prefers-reduced-motion: reduce` **ou** `window.location.hash` |
| `intro` | `revealing` | `Promise.all(image.decode, fonts.ready, entry tween)` **ou** timeout 1800ms **ou** Escape **ou** “Pular introdução” |
| `intro` | `complete` | `reduce.matches` no `exit` **ou** safety timeout 2800ms (`finish` direto) |
| `revealing` | `complete` | tween de saída `onComplete` |

Não há retorno de `complete` para `intro` na mesma sessão. 🟢

---

## 2. Lead modal (`isOpen` + campos + `submitted`)

Máquina composta: o context só conhece aberto/fechado; o formulário adiciona validação e sucesso.

```mermaid
stateDiagram-v2
  [*] --> closed
  closed --> editing: openLeadModal (CTA, Header, Hero, FAB, bubble)
  editing --> editing: openLeadModal de novo (reset de campos)
  editing --> invalid: submit com erros
  invalid --> editing: usuário corrige
  invalid --> submitted: submit válido
  editing --> submitted: submit válido (console.log)
  submitted --> closed: Fechar / overlay / X
  editing --> closed: overlay / X / Escape Radix
  closed --> editing: openLeadModal
```

### Regras de transição 🟢

| Gatilho | Efeito |
|--------|--------|
| `openLeadModal` | `isOpen=true`; effect zera `name`, `email`, `phone`, `errors`, `submitted` |
| submit inválido | permanece aberto; `FieldErrors` por campo |
| submit válido | payload `{name, email, phone:"+55…"}` → `console.log` → `submitted=true` |
| `closeLeadModal` / `onOpenChange(false)` | `isOpen=false` |

**Lacuna 🔴:** não há estado `sending` / `error` de rede — o sucesso não depende de ACK.

---

## 3. FAB + bubble (`WhatsAppFab`)

Estados simultâneos: visibilidade do FAB (scroll) e ciclo da bubble (timers + sessionStorage).

### 3.1 FAB (scroll)

```mermaid
stateDiagram-v2
  [*] --> fabHidden: intro ainda visível (componente nem monta)
  fabHidden --> fabHidden: montou, ainda no hero
  fabHidden --> fabVisible: ScrollTrigger #inicio bottom top (onEnter)
  fabVisible --> fabHidden: onLeaveBack (voltou ao hero)
```

O componente só monta quando `!introVisible`. 🟢

### 3.2 Bubble

```mermaid
stateDiagram-v2
  [*] --> idle
  idle --> scheduled: FAB visível E count=0 E não dismissed
  scheduled --> visible: timer FIRST_DELAY (10s, ajustado pelo tempo já montado)
  visible --> cooling: 6s sem dismiss
  cooling --> scheduled: REAPPEAR 52s se count < 3
  visible --> dismissed: clique no X
  visible --> paused: modal abre
  cooling --> paused: modal abre
  scheduled --> paused: modal abre
  paused --> scheduled: modal fecha E ainda há shows
  visible --> idle: count chegou a 3 (após hide)
  dismissed --> [*]
```

### Persistência de sessão 🟢

| Chave | Semântica |
|-------|----------|
| `nature_bubble_dismissed=1` | estado terminal `dismissed` até fechar a aba |
| `nature_bubble_shown` | contador; teto 3 |
| `nature_bubble_index` | índice rotativo em `PHRASES` |

Clique no FAB ou no corpo da bubble **não** altera dismissed; abre o modal (`openLeadModal`). 🟢

---

## 4. Header sólido / menu

### 4.1 Superfície do header

```mermaid
stateDiagram-v2
  [*] --> transparent: scrollY ≤ 80 no mount
  [*] --> solid: scrollY > 80 no mount
  transparent --> solid: scrollY > 80
  solid --> transparent: scrollY ≤ 40
  transparent --> solidVisual: menuOpen
  solid --> solidVisual: menuOpen
```

`data-scrolled={isSolid \|\| menuOpen}` — menu aberto força o visual sólido mesmo no topo. 🟢

Histerese 80/40 é regra anti-flicker, não requisito de negócio imobiliário. 🟢 técnico

### 4.2 Menu mobile

```mermaid
stateDiagram-v2
  [*] --> closed
  closed --> open: toggle
  open --> closed: toggle / Escape / pointer fora / viewport ≥761px / clique em âncora ou CTA
```

---

## 5. Seletor de plantas

```mermaid
stateDiagram-v2
  [*] --> plan0: activeIdx = 0 (56,60 m²)
  plan0 --> planN: clique em option i
  planN --> planN: clique outra metragem
```

Não há persistência da escolha. O CTA dispara `nature:plan` com `plan.area` e abre o modal; o modal **não** guarda a metragem. 🔴

---

## 6. Mapa Leaflet

```mermaid
stateDiagram-v2
  [*] --> notLoaded: LocationMapLazy placeholder
  notLoaded --> loadedInactive: IntersectionObserver (rootMargin 700px) + import dinâmico
  loadedInactive --> interactive: clique em "Clique para navegar"
```

Não há transição de volta para inativo. 🟢

---

## 7. Entidades sem máquina de status

Não existem: pedido, unidade (estoque), usuário autenticado, contrato, pagamento.

O disclaimer do footer deixa implícito que **disponibilidade é estado externo** (equipe comercial), não modelado aqui. 🔴
