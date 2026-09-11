# C4 — Contexto (Nível 1)

> Architect · 2026-09-10 · Nature Residencial Landing  
> Confiança: relações 🟢 CONFIRMADO no código; destino do lead 🔴 LACUNA

---

## Diagrama

```mermaid
C4Context
    title Nature Residencial — Contexto do Sistema

    Person(visitante, "Visitante / comprador-alvo", "Pessoa interessada no empreendimento; sem login")
    Person(comercial, "Equipe comercial Gênesis", "Destinatária implícita do lead; fora do sistema")
    Person(a11y, "Visitante a11y / reduced-motion", "Teclado, leitor de tela ou prefers-reduced-motion")

    System(spa, "Nature Landing SPA", "Página única de conversão: narrativa + mapa + captura de lead")

    System_Ext(cdn_wp, "CDN WordPress Nature", "Imagens oficiais do empreendimento")
    System_Ext(unsplash, "Unsplash CDN", "Imagens da galeria Architecture")
    System_Ext(osm, "OpenStreetMap Tiles", "Raster do mapa Leaflet")
    System_Ext(gmaps, "Google Maps", "Link externo para navegação")
    System_Ext(wa, "WhatsApp", "Link wa.me no rodapé")
    System_Ext(crm, "CRM / API de lead", "Não implementado — lacuna")

    Rel(visitante, spa, "Navega, consulta plantas/localização, envia lead")
    Rel(a11y, spa, "Usa skip-link, Dialog, Escape, gate do mapa")
    Rel(spa, cdn_wp, "GET imagens HTTPS")
    Rel(spa, unsplash, "GET imagens HTTPS")
    Rel(spa, osm, "GET tiles HTTPS")
    Rel(spa, gmaps, "Abre link mapLinkUrl")
    Rel(spa, wa, "Abre wa.me (footer)")
    Rel_D(spa, crm, "Deveria enviar LeadPayload", "🔴 ausente — só console.log")
    Rel_D(comercial, crm, "Consumiria leads", "🔴 fora do escopo atual")
```

> Nota: se o renderer não suportar C4, use o diagrama de fluxo abaixo.

```mermaid
flowchart LR
  V[Visitante] --> SPA[Nature Landing SPA]
  A[Visitante a11y / reduced-motion] --> SPA
  SPA -->|GET imagens| CDN[CDN WP Nature]
  SPA -->|GET imagens| US[Unsplash]
  SPA -->|GET tiles| OSM[OpenStreetMap]
  SPA -->|link| GM[Google Maps]
  SPA -->|wa.me footer| WA[WhatsApp]
  SPA -.->|LeadPayload 🔴| CRM[CRM / API]
  COM[Equipe comercial] -.-> CRM
```

---

## Atores

| Ator | Relação com o sistema | Confiança |
|------|----------------------|-----------|
| Visitante / comprador-alvo | Único usuário runtime; scroll + CTAs + formulário | 🟢 |
| Equipe comercial Gênesis | Destinatária implícita; sem UI no sistema | 🟢 / 🔴 |
| Visitante a11y / reduced-motion | Mesma SPA com caminhos abreviados | 🟢 |

---

## Sistemas externos

| Sistema | Tipo | Confiança |
|---------|------|-----------|
| CDN WordPress (`wp.residencialnature.com.br`) | Mídia inbound | 🟢 |
| Unsplash | Mídia inbound (galeria arquitetura) | 🟢 |
| OpenStreetMap tile server | Mapa inbound | 🟢 |
| Google Maps (URL) | Navegação outbound | 🟢 |
| WhatsApp (`wa.me`) | Contato outbound (footer) | 🟢 |
| CRM / endpoint de lead | **Inexistente** | 🔴 |

---

## Limite do sistema

Dentro: React SPA + assets estáticos + `sessionStorage` do bubble.  
Fora: CMS WordPress institucional, CRM, autenticação, painel admin, estoque de unidades.
