# ADR-002 — Leaflet + OpenStreetMap em vez de iframe Google Maps

- **Status:** aceito no código 🟢 (decisão retroativa 🟡)
- **Módulos:** `location-map`, `content-data`

## Contexto

O brief pedia mapa “sofisticado, monocromático e integrado”, “nada de iframe do Google Maps visualmente solto”. `siteData.location.mapEmbedUrl` ainda guarda um embed clássico do Google.

## Decisão

Implementar mapa **Leaflet + react-leaflet** com tiles `tile.openstreetmap.org`, markers customizados (símbolo Nature + POIs Lucide) e **gate de interação** (drag/zoom desligados até o clique).

O chunk só carrega via `IntersectionObserver` (`rootMargin: 700px`). O embed Google **não é montado**. `mapLinkUrl` permanece como saída para o Google Maps em nova aba.

## Por quê (inferido)

Integração visual e controle de UX (não sequestrar o scroll da landing) batem com o brief. Manter `mapEmbedUrl` parece resquício da versão institucional / de um protótipo anterior. 🟡
