# Dependências — Nature - Pagina de Vendas

> Gerado pelo Scout em 2026-09-10  
> Fonte: `package.json` 🟢 CONFIRMADO

## Gerenciadores

| Gerenciador | Evidência |
|-------------|-----------|
| **npm** | `package-lock.json` |
| **pnpm** | `pnpm-lock.yaml`, `.mise.toml` (`npm:pnpm = 10.34.3`) |

Toolchain: Node **22** (`.mise.toml`).

## Runtime (`dependencies`)

| Pacote | Versão | Papel |
|--------|--------|-------|
| `react` | ^19.0.0 | UI |
| `react-dom` | ^19.0.0 | DOM binding |
| `gsap` | ^3.15.0 | animações |
| `@gsap/react` | ^2.1.2 | hook GSAP + React |
| `leaflet` | ^1.9.4 | mapa |
| `react-leaflet` | ^5.0.0 | mapa React |
| `@types/leaflet` | ^1.9.22 | tipos Leaflet |
| `@radix-ui/react-dialog` | ^1.1.23 | modal acessível (lead) |
| `react-imask` | ^7.6.1 | máscara telefone |
| `lucide-react` | ^1.43.0 | ícones |
| `clsx` | ^2.1.1 | classnames |
| `tailwind-merge` | ^3.6.0 | merge de classes Tailwind |

## Desenvolvimento (`devDependencies`)

| Pacote | Versão | Papel |
|--------|--------|-------|
| `vite` | ^8.0.5 | bundler / dev server |
| `@vitejs/plugin-react` | ^6.0.0 | React Refresh |
| `typescript` | ^5.7.0 | tipagem |
| `tailwindcss` | ^4.0.0 | CSS utilitário |
| `@tailwindcss/vite` | ^4.0.0 | plugin Tailwind v4 |
| `@types/react` | ^19.0.0 | tipos |
| `@types/react-dom` | ^19.0.0 | tipos |
| `@types/node` | ^22.0.0 | tipos Node |
| `oxfmt` | ^0.2.0 | formatação |

## Dependências críticas (snapshot)

- Stack front: **React 19 + Vite 8 + TypeScript 5.7 + Tailwind 4**
- Motion: **GSAP 3**
- Lead UX: **Radix Dialog + react-imask**
- Mapa: **Leaflet 1.9 + react-leaflet 5**

## Não encontrado

- Backend / ORM / driver de banco
- Framework de testes (Jest, Vitest, Playwright, Cypress)
- i18n runtime
- State management global além de Context API (`LeadModalContext`)
