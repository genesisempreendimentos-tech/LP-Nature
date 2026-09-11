---
schemaVersion: 1
generatedAt: 2026-09-10T18:18:46.015Z
reversa:
  version: "1.3.3"
kind: target_domain_model
producedBy: designer
hash: "sha256:815de96786cf3dded609abfcccfc60e9cf10635c955b2cf136b60106de41400a"
---

# Target Domain Model

## Bounded contexts e aggregates

### Conversion — Aggregate Lead
- **Root**: Lead  
- **Invariantes**: nome/email/telefone válidos no create; telefone 11 dígitos; PATCH só com token válido e field ∈ allowlist shared; v1 sem PATCH público.  
- **Comandos**: CreateLead, (fase2) PatchLeadField  
- **Eventos** (opcionais/log): LeadCreated, LeadFieldUpdated — não há fila; podem ser logs de domínio.

### Experience Shell — Aggregate PageSession (VO/estado)
- **Campos**: ready, introVisible, bubbleDismissed/count  
- **Comandos**: CompleteIntro, SkipIntro, OpenLeadModal, DismissBubble  
- Persistência: sessionStorage + store (não Neon)

### Content — SiteContent (não aggregate transacional)
- siteData unificado; identidade de planta = metragem; grafia Hidelgardo

### Location — MapView
- POIs de siteData; gate de interação; lazy load

## Value objects / tipos shared
- LeadCreate: `{ nome, email, telefone, interesse_planta? }`  
- LeadPatchField enum (exato): relationship_status, children_status, profession, monthly_investment, sexo, current_city, birth_date, profile_type  
- LeadCreateResponse: `{ id, token }`  
- pagina_origem: "Página de Vendas" | "Legado React" (valores a fixar no shared)

## Regras de domínio → local
| BR-MIGRAR | Local |
|-----------|-------|
| 001–004,016–017,019–020 | Content / copy |
| 005–012,021 | Conversion Lead + UI |
| 013–014,018 | Experience Shell / motion |
| 015 | Location |
| 008–009 | Conversion + shared + API |

## Rastreabilidade legado → novo
| Legado | Novo | Tipo |
|-------|------|------|
| LeadPayload name/email/phone+55 | LeadCreate nome/email/telefone | renomeado+transform |
| nature:plan | interesse_planta | novo campo create |
| LeadModalContext | nanostores | mecanismo novo |
| siteData | src/data | 1-para-1 unificado |
| points[]/amenities HW | siteData | fundido |
| console.log success | LeadCreated após POST | substituído |

## Eventos de domínio
| Evento | Quando | Consumidor |
|--------|--------|------------|
| LeadCreated | POST 201 | telemetria / futuro sync (CVCRM fora) |
| LeadFieldUpdated | PATCH fase 2 | telemetria |
