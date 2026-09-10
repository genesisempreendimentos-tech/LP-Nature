# Inventário — Nature - Pagina de Vendas

> Gerado pelo Scout em 2026-09-10  
> Confiança: 🟢 CONFIRMADO (estrutura e configs) · 🟡 INFERIDO (agrupamento de módulos)

## Visão geral

Landing page de vendas do **Nature Residencial** (Gênesis Empreendimentos), Alto · Teresópolis — RJ.  
Aplicação SPA React + Vite + Tailwind CSS v4, hospedada/desenvolvida no contexto **Figma Make**.

## Árvore de diretórios (resumo)

```
.
├── index.html
├── package.json
├── package-lock.json
├── pnpm-lock.yaml
├── vite.config.ts
├── tsconfig.json
├── .mise.toml
├── AGENTS.md / CLAUDE.md / PRODUCT.md
├── .figma/make/          # tooling Figma Make (dev, deploy, site.json)
├── guidelines/
├── public/               # logos SVG / brand
└── src/
    ├── main.tsx          # entry
    ├── App.tsx           # composição das seções
    ├── index.css
    ├── components/nature/
    ├── context/          # LeadModalContext
    ├── data/nature.ts
    ├── hooks/
    ├── motion/
    ├── styles/theme.css
    ├── lib/
    └── imports/pasted_text/  # briefs e regras (não runtime)
```

Excluídos da varredura: `node_modules`, `.git`, `.reversa`, `_reversa_sdd`, `.agents`, `.kiro`, `.cursor`.

## Contagem de arquivos

| Extensão | Qtd |
|----------|-----|
| `.tsx` | 22 |
| `.ts` | 8 |
| `.md` | 7 |
| `.json` | 6 |
| `.svg` | 4 |
| `.css` | 2 |
| `.html` | 1 |
| `.yaml` / `.toml` | 1+1 |
| sem extensão / outros | ~10 |
| **Total (escopo Scout)** | **62** |

## Módulos identificados (lógicos)

| Módulo | Escopo principal |
|--------|------------------|
| `app-shell` | `App.tsx`, `Preloader`, `Header`, `Footer`, skip-link |
| `hero` | `Hero.tsx` + integração com Header |
| `marketing-sections` | LifeMoment, Pillars, FloorPlans, Amenities, Architecture, Trust |
| `location-map` | Location, LocationMap, LocationMapLazy (Leaflet) |
| `lead-capture` | LeadModal, LeadModalContext, LeadForm (CTA), SectionCta, WhatsAppFab |
| `motion` | `usePageMotion`, `RevealText`, GSAP setup |
| `content-data` | `src/data/nature.ts`, assets em `public/brand` |

## Pontos de entrada

| Caminho | Tipo |
|---------|------|
| `index.html` | shell HTML |
| `src/main.tsx` | app entry (React mount) |
| `src/App.tsx` | composição da página |
| `vite.config.ts` | build / dev server |

## Configuração

- `tsconfig.json`, `vite.config.ts`, `.mise.toml` (Node 22, pnpm)
- `.figma/make/site.json` — título, OG, robots `noindex`
- Sem `.env.example`, sem Docker, sem CI/CD detectado no repositório

## Scripts npm

| Script | Comando |
|--------|---------|
| `dev` | `vite` (porta padrão 8443) |
| `build` | `vite build` |
| `preview` | `vite preview` |
| `format` | `oxfmt` |

## Banco de dados

Ausente. Sem migrations, ORM ou DDL.

## Testes

Nenhum arquivo `*.test.*` / `*.spec.*` no código da aplicação. Sem framework de teste declarado em `package.json`.

## Integrações externas (superfície)

- **Leaflet / OpenStreetMap** — mapa da seção localização
- **CDN WordPress** (`wp.residencialnature.com.br`) — imagens oficiais do empreendimento
- **Figma Make** — plugins Vite e configuração de site
- **Radix Dialog** — modal de lead
- **react-imask** — máscara de telefone no modal

## Observações

- Locks duplicados: `package-lock.json` e `pnpm-lock.yaml` (toolchain mise aponta pnpm).
- Conteúdo comercial e copy centralizados em `src/data/nature.ts`.
- Captação de leads: modal global (`LeadModal`) + seção `#contato` como CTA (sem formulário embutido na seção).
