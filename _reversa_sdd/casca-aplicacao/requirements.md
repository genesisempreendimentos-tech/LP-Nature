# Casca da Aplicação

> Unit de módulo · Writer · 2026-09-10  
> Fonte: `src/App.tsx`, `src/main.tsx`, Preloader, Header, Footer, NatureLogo  
> Foca no QUE a unit faz, não no como.

## Visão Geral

Bootstrap e composição da landing Nature Residencial (Astro + islands): shell sticky, seções de conversão, funil de lead (nanostores) e rodapé institucional. **Sem** gate visual de preloader (DEV-010): `appReady` no load.

## Responsabilidades

- Compor a ordem linear das seções de marketing e conversão (`apps/web/src/pages/index.astro`).
- Expor skip-link, header sticky, footer e FAB.
- Marcar `appReady` imediato; reveals de seção via CSS + IntersectionObserver (DEV-011); Hero com GSAP.

## Regras de Negócio

- Não há overlay de preloader nem `inert` de intro (DEV-010). 🟢
- `dataset.appReady` + `nature:app-ready` no load. 🟢
- FAB monta com a página (sem esperar intro). 🟢
- CTA do header abre o modal de lead (não navega para `#contato`). 🟢
- Header usa histerese de scroll 80/40 px para estado sólido. 🟢
- WhatsApp do rodapé permanece link `wa.me` (exceção vs CTAs da página). 🟢
- `privacyHref` do footer → https://genesisempreendimentos.com.br/politicas. 🟢

## Requisitos Funcionais

| ID | Requisito | Prioridade | Critério de Aceite |
|----|-----------|------------|-------------------|
| RF-01 | A aplicação monta a landing Astro com composição completa | Must | Com `pnpm run dev:web`, a página exibe Hero → seções → Footer |
| RF-02 | Sem gate de preloader; appReady imediato (DEV-010) | Must | Sem overlay; `dataset.appReady=1` no load |
| RF-03 | *(removido)* Página `inert` durante intro | — | N/A — DEV-010 |
| RF-04 | Skip-link “Pular para o conteúdo” aponta para `#conteudo` | Must | Tab inicial alcança o skip-link e o foco vai ao main |
| RF-05 | Ordem das seções: Hero, LifeMoment, Pillars, Location, FloorPlans, Amenities, Architecture, Trust, Contact | Must | DOM/`main` segue essa ordem |
| RF-06 | Funil de lead (nanostores) + LeadModal sempre montado | Must | Qualquer CTA pode abrir o modal |
| RF-07 | Reveals de seção após appReady via CSS+IO; Hero GSAP (DEV-011) | Must | Sem exigir SplitText fora do Hero |
| RF-08 | Header sticky com menu e CTA de lead | Must | Scroll muda sólido; CTA abre modal |
| RF-09 | Footer exibe contatos e link WhatsApp institucional | Should | Dados de shell/siteData visíveis |
| RF-10 | Link de privacidade funcional | Must | URL real da Gênesis |

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
