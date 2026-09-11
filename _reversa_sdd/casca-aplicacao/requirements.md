# Casca da Aplicação

> Unit de módulo · Writer · 2026-09-10  
> Fonte: `src/App.tsx`, `src/main.tsx`, Preloader, Header, Footer, NatureLogo  
> Foca no QUE a unit faz, não no como.

## Visão Geral

Bootstrap e composição da landing Nature Residencial: monta o provider de lead, controla o gate de intro (`ready` / `introVisible`), ordena as seções de conversão e disponibiliza navegação sticky e rodapé institucional. Resolve o problema de entregar uma SPA de uma página coerente, acessível e com intro controlada antes da interação plena.

## Responsabilidades

- Montar a árvore React (`main.tsx` → `App`) e envolver a página com `LeadModalProvider`.
- Decidir se o preloader roda ou se a página inicia já interativa.
- Compor a ordem linear das seções de marketing e conversão.
- Expor skip-link, header (via Hero), footer e liberar FAB após o fim da intro.
- Acionar motion de página via `usePageMotion` quando `ready`.

## Regras de Negócio

- Preloader é pulado se `prefers-reduced-motion: reduce` **ou** se há `location.hash` na URL. 🟢
- Enquanto `introVisible`, a página recebe `inert` (não interativa). 🟢
- `onReveal` do Preloader define `ready=true` (libera animações do Hero/Header) sem remover o overlay ainda. 🟢
- `onComplete` define `ready=true` e `introVisible=false` (remove Preloader e libera WhatsAppFab). 🟢
- FAB só monta quando `!introVisible`. 🟢
- CTA do header abre o modal de lead (não navega para `#contato`). 🟢
- Header usa histerese de scroll 80/40 px para estado sólido. 🟢
- WhatsApp do rodapé permanece link `wa.me` (exceção vs CTAs da página). 🟢
- `privacyHref` do footer ainda aponta para `#` — política real ausente. 🔴

## Requisitos Funcionais

| ID | Requisito | Prioridade | Critério de Aceite |
|----|-----------|------------|-------------------|
| RF-01 | A aplicação monta a SPA em `#root` e renderiza a composição completa da landing | Must | Com `pnpm dev`/`build`, a página exibe Hero → seções → Footer |
| RF-02 | Gate de intro: iniciar com preloader salvo se reduced-motion ou hash | Must | Com hash `#plantas` ou reduced-motion, não há overlay de intro |
| RF-03 | Página fica `inert` durante intro e volta interativa ao completar | Must | Links/CTAs não respondem durante intro; respondem após `onComplete` |
| RF-04 | Skip-link “Pular para o conteúdo” aponta para `#conteudo` | Must | Tab inicial alcança o skip-link e o foco vai ao main |
| RF-05 | Ordem das seções: Hero, LifeMoment, Pillars, Location, FloorPlans, Amenities, Architecture, Trust, LeadForm | Must | DOM/`main` segue essa ordem |
| RF-06 | Provider de lead envolve toda a página; LeadModal sempre montado | Must | Qualquer CTA pode abrir o modal |
| RF-07 | Motion de página só após `ready` | Must | Sem `ready`, reveals globais não disparam |
| RF-08 | Header sticky com menu e CTA de lead | Must | Scroll muda sólido; CTA abre modal |
| RF-09 | Footer exibe contatos e link WhatsApp institucional | Should | Dados de `siteData.footer`/`contact` visíveis |
| RF-10 | Link de privacidade funcional | Won't (hoje) / Must (produto) | Hoje `#` 🔴; aceite futuro = URL real |

## Requisitos Não Funcionais

| Tipo | Requisito inferido | Evidência no código | Confiança |
|------|--------------------|---------------------|-----------|
| Performance | Timeout de assets do preloader 1800 ms; safety finish 2800 ms | `src/components/nature/Preloader.tsx` | 🟢 |
| Acessibilidade | Skip-link; `inert` na intro; Escape no preloader/menu | `App.tsx`, Preloader, Header | 🟢 |
| Acessibilidade | Respeito a `prefers-reduced-motion` no bootstrap | `App.tsx:20-24` | 🟢 |
| Disponibilidade | Escape / “Pular” forçam saída da intro se assets travarem | Preloader | 🟢 |

> Inferido a partir do código. Validar com equipe de operações.

## Critérios de Aceitação

```gherkin
Dado um visitante sem prefers-reduced-motion e sem hash na URL
Quando a página carrega
Então o Preloader é exibido e o conteúdo principal está inert
E após conclusão ou timeout da intro o conteúdo fica interativo e o FAB pode aparecer

Dado um visitante com prefers-reduced-motion: reduce
Quando a página carrega
Então ready inicia true, introVisible false e não há Preloader

Dado um visitante que abre a URL com #localizacao
Quando a página carrega
Então o Preloader é pulado para permitir deep-link à âncora

Dado a intro ainda visível
Quando o visitante tenta interagir com seções da página
Então a interação é bloqueada via inert até onComplete
```

## Prioridade (MoSCoW)

| Requisito | MoSCoW | Justificativa |
|-----------|--------|---------------|
| Composição da página + provider | Must | Raiz de todo o funil |
| Gate ready/introVisible | Must | Controla motion, FAB e interação |
| Skip-link / reduced-motion / hash | Must | Acessibilidade e deep-link |
| Header sticky + CTA lead | Must | Navegação e conversão |
| Footer institucional | Should | Contato secundário; wa.me é fallback |
| Privacy href real | Won't (estado atual) | Código aponta `#` — lacuna de produto |

> Prioridade inferida por frequência de chamada e posição na cadeia de dependências.

## Rastreabilidade de Código

| Arquivo | Função / Classe | Cobertura |
|---------|-----------------|-----------|
| `src/main.tsx` | mount + registro GSAP | 🟢 |
| `src/App.tsx` | `App` | 🟢 |
| `src/components/nature/Preloader.tsx` | Preloader | 🟢 (detalhe em unit aninhada) |
| `src/components/nature/Header.tsx` | Header | 🟢 (detalhe em unit aninhada) |
| `src/components/nature/Footer.tsx` | Footer | 🟢 (detalhe em unit aninhada) |
| `src/components/nature/NatureLogo.tsx` | NatureLogo | 🟢 |
| `src/context/LeadModalContext.tsx` | Provider (consumo) | 🟢 |
| `src/motion/usePageMotion.ts` | hook (disparo) | 🟢 |
