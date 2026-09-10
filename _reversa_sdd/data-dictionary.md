# Dicionário de dados — Nature

> Archaeologist · escavação completa · 2026-09-10  
> `doc_level`: completo

## App bootstrap

| Campo | Tipo | Obrigatório | Default / regra | Confiança |
|-------|------|-------------|-----------------|-----------|
| `ready` | `boolean` | sim | `true` se reduced-motion **ou** hash na URL | 🟢 |
| `introVisible` | `boolean` | sim | `!ready` | 🟢 |

## Header

| Campo | Tipo | Obrigatório | Default / regra | Confiança |
|-------|------|-------------|-----------------|-----------|
| `menuOpen` | `boolean` | sim | `false` | 🟢 |
| `isSolid` | `boolean` | sim | `scrollY > 80` inicial; histerese 80/40 | 🟢 |

## FloorPlans

| Campo | Tipo | Obrigatório | Default | Confiança |
|-------|------|-------------|---------|-----------|
| `activeIdx` | `number` | sim | `0` | 🟢 |
| `plan.area` | `string` | sim | de `siteData.floorPlans.plans` | 🟢 |
| `plan.image` | `string` (URL) | sim | CDN WP | 🟢 |

## Amenities (constante local)

| Campo | Tipo | Obrigatório | Confiança |
|-------|------|-------------|-----------|
| `spaces[].name` | `string` | sim | 🟢 |
| `spaces[].image` | `string` (URL) | sim | 🟢 |

## Trust certifications (constante local)

| Campo | Tipo | Obrigatório | Confiança |
|-------|------|-------------|-----------|
| `name` | `string` | sim | 🟢 |
| `description` | `string` | sim | 🟢 |
| `image` | `string` (URL) | sim | 🟢 |

## CustomEvent `nature:plan`

| Campo | Tipo | Notas | Confiança |
|-------|------|-------|-----------|
| `detail` | `string` (metragem) | Disparado por FloorPlans; **sem listener ativo** após remoção no LeadForm | 🟡 |

---

## LocationMap

| Campo | Tipo | Obrigatório | Default / regra | Confiança |
|-------|------|-------------|-----------------|-----------|
| `NATURE_POSITION` | `[number, number]` | sim | `[-22.4372, -42.9822]` | 🟢 |
| `active` | `boolean` | sim | `false` até clique no gate | 🟢 |
| `points[].name` | `string` | sim | hardcoded | 🟢 |
| `points[].category` | `string` | sim | Comércio, Natureza, etc. | 🟢 |
| `points[].distance` | `string` | sim | ex. `"850 m"` | 🟢 |
| `points[].icon` | `LucideIcon` | sim | componente Lucide | 🟢 |
| `points[].position` | `[number, number]` | sim | lat/lng | 🟢 |

## Location / siteData.location

| Campo | Tipo | Obrigatório | Confiança |
|-------|------|-------------|-----------|
| `headline` | `string` | sim | 🟢 |
| `address` | `string` | sim | 🟢 |
| `mapEmbedUrl` | `string` (URL) | sim | 🟡 sem uso no mapa atual |
| `mapLinkUrl` | `string` (URL) | sim | 🟢 |
| `proximity[].label` | `string` | sim | 🟢 |
| `proximity[].text` | `string` | sim | 🟢 |
| `proximity[].distance` | `string` | sim | 🟢 |
| `quotes[].title` | `string` | sim | 🟢 |
| `quotes[].text` | `string` | sim | 🟢 |

## LeadModal

| Campo | Tipo | Obrigatório | Default / regra | Confiança |
|-------|------|-------------|-----------------|-----------|
| `isOpen` | `boolean` | sim | `false` (context) | 🟢 |
| `name` | `string` | sim | trim ≠ vazio | 🟢 |
| `email` | `string` | sim | regex e-mail simples | 🟢 |
| `phone` | `string` (máscara) | sim | 11 dígitos nacionais | 🟢 |
| `phone` (payload) | `string` | sim | `+55` + dígitos | 🟢 |
| `errors` | `FieldErrors` | não | `{}` | 🟢 |
| `submitted` | `boolean` | sim | `false` → sucesso local | 🟢 |

## WhatsAppFab / bubble (sessionStorage)

| Chave | Tipo | Regra | Confiança |
|-------|------|-------|-----------|
| `nature_bubble_dismissed` | `"1"` \| ausente | dismiss permanente na sessão | 🟢 |
| `nature_bubble_shown` | `string` (int) | contagem; máx. 3 | 🟢 |
| `nature_bubble_index` | `string` (int) | índice da frase em `PHRASES` | 🟢 |
| `fabVisible` | `boolean` | true após sair do hero | 🟢 |
| `bubbleOpen` | `boolean` | ciclo 10s / 6s / 52s | 🟢 |

## Timing constants (WhatsAppFab)

| Constante | Valor | Confiança |
|-----------|-------|-----------|
| `FIRST_DELAY_MS` | `10000` | 🟢 |
| `VISIBLE_MS` | `6000` | 🟢 |
| `REAPPEAR_MS` | `52000` | 🟢 |
| `MAX_SHOWS` | `3` | 🟢 |

## siteData (demais seções)

| Path | Tipo | Notas | Confiança |
|------|------|-------|-----------|
| `hero.*` | strings CTA/copy | | 🟢 |
| `lifeMoment.steps[]` | `string[]` | | 🟢 |
| `pillars.items[]` | `{number,title,image}` | | 🟢 |
| `floorPlans.plans[]` | `{area,image}` | | 🟢 |
| `amenities.categories[]` | `{title,items[]}` | imagens do rail não vêm daqui | 🟡 |
| `architecture.tags[]` / `images[]` | strings | Unsplash | 🟢 |
| `trust.proofs[]` | `string[]` | | 🟢 |
| `cta.*` | strings | 🟡 pouco referenciado | 🟡 |
| `footer.*` | copy + links sociais | `privacyHref: "#"` | 🟢/🔴 |
| `contact.whatsapp` | `string` | E.164 sem `+` | 🟢 |
| `contact.whatsappMessage` | `string` | prefills wa.me | 🟢 |

## contact payload (saída do formulário)

| Campo | Tipo | Exemplo | Persistência | Confiança |
|-------|------|---------|--------------|-----------|
| `name` | `string` | `"Bruno"` | só `console.log` | 🟢/🔴 |
| `email` | `string` | `"a@b.com"` | só `console.log` | 🟢/🔴 |
| `phone` | `string` | `"+5521999999999"` | só `console.log` | 🟢/🔴 |
