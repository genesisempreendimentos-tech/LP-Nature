---
schemaVersion: 1
generatedAt: 2026-09-10T19:21:58.748Z
reversa:
  version: "1.3.3"
kind: screen_deviation_log
producedBy: screen-translator
mode: append-only
hash: "sha256:31958805ec81cb7cd71ac57cfe6a800849db41dd9a9890c4d2955b179bcee59c"
---

# Screen Deviation Log

## Resumo

- **Total**: 9
- **Pendentes**: 0
- **Aprovadas**: 9
- **Rejeitadas**: 0
- **Nota 2026-09-11**: DEV-008 descrição expandida (Header fora do Hero = sticky shell).

## Entradas

### DEV-001

| Campo | Valor |
|---|---|
| Tela afetada | (todas) |
| Tipo | `plataforma` |
| Descrição | Visor/screenshots e ui/inventory.md dispensados; fidelidade via código-fonte. |
| Motivo | Decisão humana explícita — port tecnológico com acesso total ao JSX/CSS. |
| Origem no legado | (ver target_screens) |
| Implicação para parity tests | Comparação semântica / copy; não pixel |
| Aprovação | `aprovado` |
| Aprovado por | Bruno |
| Aprovado em | 2026-09-10T19:21:58.748Z |
| Propaga para parity_specs § Exceções | sim |

### DEV-002

| Campo | Valor |
|---|---|
| Tela afetada | (todas) |
| Tipo | `tecnica` |
| Descrição | Par react-spa→astro-islands fora de adapter-pairs v1 (EC-01); specs em component-tree. |
| Motivo | Mesmo meio web; adapter canônico inexistente. |
| Origem no legado | (ver target_screens) |
| Implicação para parity tests | Comparação semântica / copy; não pixel |
| Aprovação | `aprovado` |
| Aprovado por | Bruno |
| Aprovado em | 2026-09-10T19:21:58.748Z |
| Propaga para parity_specs § Exceções | sim |

### DEV-003

| Campo | Valor |
|---|---|
| Tela afetada | subset literal |
| Tipo | `tecnica` |
| Descrição | RF-13: literal-ish sem screenshots; oráculo = implementação React. |
| Motivo | Aceite explícito no modo híbrido + skip Visor. |
| Origem no legado | (ver target_screens) |
| Implicação para parity tests | Comparação semântica / copy; não pixel |
| Aprovação | `aprovado` |
| Aprovado por | Bruno |
| Aprovado em | 2026-09-10T19:21:58.748Z |
| Propaga para parity_specs § Exceções | sim |

### DEV-004

| Campo | Valor |
|---|---|
| Tela afetada | landing-page, whatsapp-fab, lead-modal, lead-cta-section |
| Tipo | `modernizacao` |
| Descrição | LeadModalContext → nanostores cross-island. |
| Motivo | paradigm_decision + topology (Astro islands). |
| Origem no legado | (ver target_screens) |
| Implicação para parity tests | Comparação semântica / copy; não pixel |
| Aprovação | `aprovado` |
| Aprovado por | Bruno |
| Aprovado em | 2026-09-10T19:21:58.748Z |
| Propaga para parity_specs § Exceções | sim |

### DEV-005

| Campo | Valor |
|---|---|
| Tela afetada | lead-modal |
| Tipo | `modernizacao` |
| Descrição | console.log → POST /api/leads (Neon, pagina_origem, interesse_planta). |
| Motivo | Contrato Reviewer / target_architecture. |
| Origem no legado | (ver target_screens) |
| Implicação para parity tests | Comparação semântica / copy; não pixel |
| Aprovação | `aprovado` |
| Aprovado por | Bruno |
| Aprovado em | 2026-09-10T19:21:58.748Z |
| Propaga para parity_specs § Exceções | sim |

### DEV-006

| Campo | Valor |
|---|---|
| Tela afetada | CTAs / labels |
| Tipo | `correcao` |
| Descrição | Dois accents formalizados (content #788262 vs interactive #5c6450); sem unificar. |
| Motivo | Decisão humana + theme.css aliases. |
| Origem no legado | (ver target_screens) |
| Implicação para parity tests | Comparação semântica / copy; não pixel |
| Aprovação | `aprovado` |
| Aprovado por | Bruno |
| Aprovado em | 2026-09-10T19:21:58.748Z |
| Propaga para parity_specs § Exceções | sim |

### DEV-007

| Campo | Valor |
|---|---|
| Tela afetada | amenities, location-map |
| Tipo | `modernizacao` |
| Descrição | Unificar amenities/POIs em siteData (legado: array local / hardcoded no mapa). |
| Motivo | Curator BR-HUMANA-006. |
| Origem no legado | (ver target_screens) |
| Implicação para parity tests | Comparação semântica / copy; não pixel |
| Aprovação | `aprovado` |
| Aprovado por | Bruno |
| Aprovado em | 2026-09-10T19:21:58.748Z |
| Propaga para parity_specs § Exceções | sim |

### DEV-008

| Campo | Valor |
|---|---|
| Tela afetada | hero, landing-page / shell |
| Tipo | `modernizacao` |
| Descrição | Header estava dentro do Hero no legado (`src/App.tsx` → `Hero` monta `Header`); no Astro, Header é global/sticky em `features/shell`, fora do fluxo do Hero — mudança estrutural necessária pro comportamento sticky funcionar, não uma tradução literal nesse ponto específico. |
| Motivo | topology_decision shell slice + sticky/histerese do header (BR-MIGRAR-014) exigem Header no shell, não aninhado no Hero. |
| Origem no legado | `src/components/nature/Hero.tsx` (importa Header) / `src/App.tsx` |
| Implicação para parity tests | Não exigir Header como filho DOM do `#inicio`; paridade = sticky + CTAs + histerese 80/40 |
| Aprovação | `aprovado` |
| Aprovado por | Bruno |
| Aprovado em | 2026-09-10T19:21:58.748Z |
| Formalizado em | 2026-09-11 (texto explícito da decisão já implícita no shell) |
| Propaga para parity_specs § Exceções | sim |

### DEV-009

| Campo | Valor |
|---|---|
| Tela afetada | lead-modal |
| Tipo | `plataforma` |
| Descrição | Telefone BR-only (+55) no modal; lead internacional (+971) histórico fora do escopo da landing. |
| Motivo | Decisão humana APROVAR DEV-009 opção A: aceitar exclusão na landing v1; revisável; wa.me sem restrição. |
| Origem no legado | (ver target_screens) |
| Implicação para parity tests | Comparação semântica / copy; não pixel |
| Aprovação | `aprovado` |
| Aprovado por | Bruno |
| Aprovado em | 2026-09-10T19:27:56.179Z |
| Propaga para parity_specs § Exceções | sim |
| Decisão produto | **Opção A (v1):** exclusão consciente BR-only (+55 fixo) no formulário estruturado. Público-alvo da campanha = Teresópolis + RJ; sem avatar internacional. **REVISÁVEL** se campanha futura mirar comprador internacional. Canal wa.me no rodapé permanece sem restrição de país. |

## Telas com mais de uma deviation

| Tela | IDs |
|---|---|
| lead-modal | DEV-005, DEV-009 |
| amenities / location-map | DEV-007 |
| hero / landing-page | DEV-008 |
| (todas) | DEV-001, DEV-002 |

## Notas

DEV-009 **aprovado** (opção A, revisável): BR-only no modal v1; wa.me rodapé sem restrição de país.

