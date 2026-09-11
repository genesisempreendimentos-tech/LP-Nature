# Arquitetura — Nature Residencial (Landing de Vendas)

> Architect · 2026-09-10  
> `doc_level`: completo  
> Fontes: `code-analysis.md`, `domain.md`, `dependencies.md`, `data-dictionary.md`, `.reversa/context/*`

---

## 1. Visão geral

O sistema é uma **SPA de conversão de uma página** (React 19 + Vite 8 + Tailwind 4) hospedável como site estático. Não há backend próprio, banco, autenticação nem CMS runtime.

| Aspecto | Decisão | Confiança |
|---------|---------|-----------|
| Forma | Single-page landing | 🟢 |
| Objetivo | Capturar lead (nome, e-mail, telefone) | 🟢 |
| Persistência de lead | `console.log` apenas | 🟢 / 🔴 lacuna de integração |
| Conteúdo comercial | Bundle estático (`siteData`) | 🟢 |
| Motion | GSAP + ScrollTrigger | 🟢 |
| Mapa | Leaflet + tiles OSM (lazy) | 🟢 |
| Modal | Radix Dialog | 🟢 |

Detalhes C4: [`c4-context.md`](./c4-context.md), [`c4-containers.md`](./c4-containers.md), [`c4-components.md`](./c4-components.md).  
Modelo de dados: [`erd-complete.md`](./erd-complete.md).  
Impacto entre módulos: [`traceability/spec-impact-matrix.md`](./traceability/spec-impact-matrix.md).

---

## 2. Estilo arquitetural

**Frontend monolítico estático com módulos por feature de conversão.**

- Entrada: `index.html` → `src/main.tsx` → `src/App.tsx`
- Composição linear de seções (sem router)
- Estado global mínimo: `LeadModalContext` (abrir/fechar modal)
- Dados de domínio embutidos em `src/data/nature.ts`
- Integrações externas só de leitura (CDN de mídia, tiles OSM) ou outbound (link `wa.me` no footer)

Não se aplica: microserviços, BFF, event bus, ORM, filas.

---

## 3. Containers lógicos

| Container | Tecnologia | Responsabilidade |
|-----------|------------|------------------|
| **Nature SPA** | React 19 / TS / Vite | UI, validação de lead, motion, mapa |
| **Assets estáticos** | Vite build + `/public` | HTML, JS/CSS, brand SVGs |
| **CDN WordPress Nature** | `wp.residencialnature.com.br` | Imagens oficiais (hero, plantas, amenidades) |
| **Unsplash** | CDN externo | Galeria de arquitetura (desvio do brief) 🟡 |
| **OpenStreetMap tiles** | `tile.openstreetmap.org` | Raster do mapa |
| **WhatsApp Web** | `wa.me` | Canal outbound só no footer |
| **sessionStorage** | Browser | Persistência de dismiss/contagem do bubble |

---

## 4. Módulos internos (nível componente)

| Módulo | Papel |
|--------|-------|
| `app-shell` | Bootstrap, preloader, header, footer, ordem das seções |
| `hero` | Primeira dobra + CTA principal |
| `marketing-sections` | Essência, pilares, plantas, lazer, arquitetura, confiança |
| `location-map` | Localização + Leaflet lazy |
| `lead-capture` | Modal, CTAs, FAB/bubble, seção contato |
| `motion` | GSAP registry + reveals de página |
| `content-data` | `siteData` estático |

---

## 5. Fluxos arquiteturais críticos

### 5.1 Gate de intro → página interativa 🟢

`ready` / `introVisible` em `App` controlam preloader, `inert` na página e liberação de motion/FAB. Escape e reduced-motion / hash encurtam o caminho.

### 5.2 Conversão de lead 🟢 / 🔴

Qualquer CTA → `openLeadModal()` → validação client-side → payload `{ name, email, phone }` → **sem transporte** (só log). Sucesso local no Dialog.

### 5.3 Mapa sob demanda 🟢

IntersectionObserver (`rootMargin: 700px`) → dynamic import de Leaflet → gate de interação até clique.

### 5.4 Evento órfão `nature:plan` 🟡 / 🔴

`FloorPlans` dispara metragem ativa; nenhum listener consome — intenção de pré-seleção no formulário perdida.

---

## 6. Integrações externas

| Sistema | Direção | Protocolo | Uso | Confiança |
|---------|---------|-----------|-----|-----------|
| CDN WP Nature | inbound (GET imagem) | HTTPS | Hero, plantas, lazer, trust | 🟢 |
| Unsplash | inbound | HTTPS | `architecture.images` | 🟢 |
| OSM tile server | inbound | HTTPS | Tiles Leaflet | 🟢 |
| Google Maps (link) | outbound | HTTPS link | `mapLinkUrl` / “abrir no Maps” | 🟢 |
| WhatsApp | outbound | HTTPS `wa.me` | Footer apenas | 🟢 |
| CRM / API de lead | — | — | **Ausente** | 🔴 |
| Analytics / pixels | — | — | **Não detectado** | 🟡 |

`siteData.location.mapEmbedUrl` (iframe Google) existe mas **não é consumido**. 🟡

---

## 7. Dívidas técnicas

| Dívida | Impacto | Confiança |
|--------|---------|-----------|
| Lead sem backend/CRM | Conversão não chega à equipe comercial | 🟢 / 🔴 |
| Evento `nature:plan` sem consumidor | Perde contexto de metragem no lead | 🟢 |
| Duplicação proximity vs `points[]` do mapa | Drift de conteúdo | 🟡 |
| Amenities: rail hardcoded vs `siteData.amenities` | Duas fontes de verdade | 🟡 |
| `mapEmbedUrl` e `siteData.cta` pouco/não usados | Dead data | 🟡 |
| `useScrollDirection` ocioso (Header tem histerese própria) | Código morto potencial | 🟡 |
| Galeria Architecture em Unsplash | Desvio do brief (materiais oficiais) | 🟡 |
| `privacyHref: "#"` | Política de privacidade inexistente | 🔴 |
| Grafia endereço Hildegardo vs Hidelgardo | Inconsistência de copy | 🟢 |
| Zero testes automatizados | Regressão de funil sem rede de segurança | 🟢 |
| Sem CI/CD no repositório | Deploy/processo não versionado aqui | 🟢 |
| Lockfiles npm + pnpm | Ambiguidades de install | 🟡 |
| Nome `WhatsAppFab` vs comportamento (abre modal) | Confusão de manutenção | 🟢 |

---

## 8. Qualidade e riscos

| Tema | Estado |
|------|--------|
| Acessibilidade | Skip-link, Radix Dialog, Escape no menu/preloader, gate de mapa — parcial 🟢 |
| SEO | Ambiente Figma Make com noindex (ADR-007) 🟢 |
| Segurança | Sem auth; risco principal = XSS via conteúdo futuro / integração de lead 🟡 |
| Performance | Lazy do mapa + timeouts do preloader 🟢; imagens CDN sem pipeline local 🟡 |
| Observabilidade | Sem analytics/error tracking no código 🟡 |

---

## 9. ADRs relacionados

- ADR-001 GSAP/ScrollTrigger  
- ADR-002 Leaflet/OSM  
- ADR-003 Modal como conversão primária  
- ADR-004 Conteúdo estático no bundle  
- ADR-005 Scroll nativo (sem Lenis)  
- ADR-006 Preloader com timeout/escape  
- ADR-007 noindex no Figma Make  
- ADR-008 Conversão sem urgência falsa  
- ADR-009 Metragem como identidade da planta  

---

## 10. Lacunas para validação humana

1. 🔴 Destino real do lead (CRM, e-mail, webhook, planilha).  
2. 🔴 Política de privacidade e consentimento LGPD.  
3. 🔴 Disponibilidade/estoque real (proibido inventar no front).  
4. 🟡 Manter Unsplash na galeria Architecture ou trocar por renders oficiais.  
5. 🟡 Unificar proximity / POIs / amenities em uma fonte.
