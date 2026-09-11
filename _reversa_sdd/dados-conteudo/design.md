# Dados e Conteúdo, Design Técnico

> Unit de módulo · `dados-conteudo` · Writer · 2026-09-10  
> Foca no COMO a unit é construída, com base no código legado lido.

## Interface

```ts
export const siteData = { hero, lifeMoment, pillars, location, floorPlans, amenities, architecture, trust, cta, footer, contact }
```

Contact: `whatsapp`, `whatsappLabel`, `whatsappMessage` → Footer monta wa.me.

## Fluxo Principal

1. Build inclui nature.ts. 🟢
2. Componentes importam fatias necessárias. 🟢
3. Alguns componentes ignoram fatias e usam constantes locais. 🟢

## Fluxos Alternativos

- **Troca de copy:** Requer commit/deploy — sem preview CMS. 🟡

## Dependências

- Consumidores: Hero, Pillars, Location, FloorPlans, Architecture, Trust, Footer
- CDNs WP/Unsplash

## Decisões de Design Identificadas

| Decisão | Evidência no código | Confiança |
|---------|---------------------|-----------|
| Conteúdo estático no bundle (ADR-004) | `nature.ts` | 🟢 |
| Sem i18n | pt-BR only | 🟢 |

## Estado Interno

Imutável em runtime. 🟢

## Observabilidade

Nenhuma. 🟢

## Riscos e Lacunas

- 🔴 privacyHref.
- 🔴 Drift Hidelgardo/Hildegardo.
- 🟡 Campos mortos aumentam confusão na reimplementação.
- 🟡 Dependência de hosts WP externos para imagens.
