---
schemaVersion: 1
generatedAt: 2026-09-10T18:07:39.696Z
reversa:
  version: "1.3.3"
kind: target_business_rules
producedBy: curator
hash: "sha256:196903b85e897cd71292056150c1288fb219c9ce9cab076c31b16a7d940146a4"
---

# Target Business Rules

> Catálogo das regras de negócio do legado com decisão de migração: MIGRAR, DESCARTAR ou DECISÃO HUMANA.
> Cada item rastreia para a origem em `_reversa_sdd/` e respeita o `paradigm_decision.md` (opção 3 híbrido / balanced).

## Resumo
- Total de regras analisadas: 48
- MIGRAR: 36
- DESCARTAR: 6 (3 vinculadas a paradigma/mecanismo)
- DECISÃO HUMANA: 6

## Regras MIGRAR

### BR-MIGRAR-001 — Tom de produto (evolução de endereço, sem urgência falsa)
- **Origem**: `domain.md` BR-01, BR-02, ADR-008
- **Confiança original**: 🟡/🟢
- **Descrição**: Copy vende evolução de endereço; sem luxo ostensivo, urgência falsa, promessas de rentabilidade.
- **Justificativa**: Regra de negócio/marketing; independente de Astro.
- **Compatibilidade com paradigma alvo**: Conteúdo em data/collections Astro.

### BR-MIGRAR-002 — Não inventar estoque/especificações
- **Origem**: `domain.md` BR-03, BR-04
- **Confiança original**: 🟢
- **Descrição**: Só metragem+imagem no seletor; não inventar suítes/vagas/preço; quartos só no copy geral.
- **Justificativa**: Compliance comercial.
- **Compatibilidade**: Mantém seletor por `area` (ADR-009).

### BR-MIGRAR-003 — Mídia oficial onde já existe + disclaimer
- **Origem**: `domain.md` BR-05, BR-09
- **Confiança original**: 🟢
- **Descrição**: Hero/plantas CDN oficial; disclaimer legal no rodapé.
- **Justificativa**: Obrigatório.
- **Compatibilidade**: URLs em siteData/content.

### BR-MIGRAR-004 — Provas institucionais e localização como produto
- **Origem**: `domain.md` BR-07, BR-08
- **Confiança original**: 🟢
- **Descrição**: Trust/selos permitidos; mapa/quotes sem atacar o Rio.
- **Justificativa**: Narrativa validada.

### BR-MIGRAR-005 — Conversão primária = modal de lead
- **Origem**: `domain.md` BR-10; `captura-lead/`
- **Confiança original**: 🟢
- **Descrição**: Header/Hero/SectionCta/FAB/bubble abrem modal (não wa.me).
- **Justificativa**: Funil core; zero regressão de captura (brief).
- **Compatibilidade**: Comportamento via **nanostores** + ilha React do modal (não React Context).

### BR-MIGRAR-006 — WhatsApp só no rodapé (wa.me intencional)
- **Origem**: `domain.md` BR-11; Reviewer P4
- **Confiança original**: 🟢
- **Descrição**: Único canal WhatsApp real; prefill `whatsappMessage`.
- **Justificativa**: Decisão humana confirmada.
- **Compatibilidade**: Link estático Astro no footer.

### BR-MIGRAR-007 — Validação lead (nome, e-mail, 11 dígitos)
- **Origem**: `domain.md` BR-12, BR-13; contracts
- **Confiança original**: 🟢
- **Descrição**: Validação client; telefone 11 dígitos.
- **Justificativa**: Contrato API usa telefone só dígitos.
- **Compatibilidade**: Adaptar payload para `{ nome, email, telefone }` (PT) sem +55 no POST.

### BR-MIGRAR-008 — Contrato POST/PATCH Neon
- **Origem**: `openapi/lead.yaml`, `modal-lead/contracts.md`; Reviewer P1
- **Confiança original**: 🟢 contrato / 🟡 impl.
- **Descrição**: POST cria lead+token+`pagina_origem`; PATCH allowlist 8 campos; auth visitante=token.
- **Justificativa**: Restrição técnica do brief.
- **Compatibilidade**: Express+Neon; fora de ilhas.

### BR-MIGRAR-009 — interesse_planta no POST
- **Origem**: `domain.md` BR-18; Reviewer P3; plantas/
- **Confiança original**: 🟢 intenção
- **Descrição**: Metragem do CTA planta no POST inicial.
- **Justificativa**: Corrige evento órfão.
- **Compatibilidade**: Store/nanostores seta metragem ao abrir modal a partir de plantas.

### BR-MIGRAR-010 — Reset do modal ao abrir
- **Origem**: `domain.md` BR-15
- **Confiança original**: 🟢
- **Descrição**: Limpar campos/sucesso ao reabrir.
- **Justificativa**: UX.

### BR-MIGRAR-011 — Sucesso após envio real
- **Origem**: adapta BR-14
- **Confiança original**: 🟢 UX / 🔴 era fake
- **Descrição**: Tela “Recebemos seu contato” **após** POST 2xx (não após console.log).
- **Justificativa**: Preserva UX; remove mentira de sucesso.
- **Compatibilidade**: Ilha lead chama API.

### BR-MIGRAR-012 — Bubble sem falsa urgência
- **Origem**: `domain.md` BR-17, BR-29, BR-30
- **Confiança original**: 🟡/🟢
- **Descrição**: Timings 10s/6s/52s, máx 3, dismiss session, após sair do hero; abre modal.
- **Justificativa**: Comportamento atual alinhado à decisão FAB→modal.
- **Compatibilidade**: Ilha + sessionStorage.

### BR-MIGRAR-013 — Preloader / reduced-motion / hash / timeouts / Escape
- **Origem**: `domain.md` BR-20–BR-25
- **Confiança original**: 🟢
- **Descrição**: Gate de intro, inert, 1800/2800ms, skip-link, deep-link.
- **Justificativa**: A11y e não prender visitante.
- **Compatibilidade**: Layout Astro + store `ready` (não App React monolítico).

### BR-MIGRAR-014 — Header histerese e menu a11y
- **Origem**: `domain.md` BR-26, BR-27
- **Confiança original**: 🟢
- **Descrição**: 80/40; Escape/click fora/≥761px.
- **Justificativa**: UX chrome.

### BR-MIGRAR-015 — Mapa lazy + gate interação + OSM
- **Origem**: `domain.md` BR-31–BR-33
- **Confiança original**: 🟢
- **Descrição**: IntersectionObserver 700px; gate clique; Leaflet/OSM; `mapLinkUrl` externo.
- **Justificativa**: Performance + UX.
- **Compatibilidade**: Ilha Leaflet `client:visible` ou equivalente.

### BR-MIGRAR-016 — Conteúdo no bundle / uma fonte siteData
- **Origem**: `domain.md` BR-34; Reviewer P7
- **Confiança original**: 🟢
- **Descrição**: Copy/mídia em data estática; POIs de siteData; lazer → consolidar amenities.
- **Justificativa**: Evitar duplicação na migração.
- **Compatibilidade**: Astro content/data modules.

### BR-MIGRAR-017 — Grafia Hidelgardo
- **Origem**: Reviewer P6; `domain.md` BR-37
- **Confiança original**: 🟢
- **Descrição**: Unificar para Hidelgardo.
- **Justificativa**: Decisão humana.

### BR-MIGRAR-018 — Motion com ready + reduced-motion; parallax ≥1024; GSAP/ScrollTrigger; sem Lenis
- **Origem**: `domain.md` BR-38–BR-41
- **Confiança original**: 🟢
- **Descrição**: Regras de motion de produto.
- **Justificativa**: Mantém GSAP no brief.
- **Compatibilidade**: Scripts/ilhas após `ready`.

### BR-MIGRAR-019 — Unsplash na Architecture (temporário)
- **Origem**: Reviewer P5; BR-06
- **Confiança original**: 🟢 decisão temporária
- **Descrição**: Manter Unsplash até foto oficial Gênesis.
- **Justificativa**: Decisão humana; pendência rastreada.

### BR-MIGRAR-020 — Seções narrativas e ordem da landing
- **Origem**: units secoes-marketing, hero, casca
- **Confiança original**: 🟢
- **Descrição**: Ordem Hero→…→contato→footer; âncoras.
- **Justificativa**: Escopo = landing inteira.
- **Compatibilidade**: Páginas/seções Astro estáticas + islands pontuais.

### BR-MIGRAR-021 — Checkbox LGPD obrigatório (requisito)
- **Origem**: `domain.md` BR-16; gaps G-02; Reviewer P2
- **Confiança original**: 🟢 requisito / 🔴 URL
- **Descrição**: Consentimento explícito antes de produção (dados sensíveis no PATCH).
- **Justificativa**: Regulatório no brief.
- **Compatibilidade**: Campo no form; bloquear go-live sem política (ver HUMANA).

### BR-MIGRAR-022..036 — Demais regras 🟢 de units
Inclui: skip-link; facts hero; rail amenities UX; selos Trust; quotes location; prefill wa.me; FAB após hero; nav âncoras; validação erros aria; etc. Detalhe fino nas units `*/requirements.md` — todas MIGRAR salvo se listadas em DESCARTAR/HUMANA.

## Regras DESCARTAR (resumo)

| ID | Origem | Motivo curto | Vínculo a paradigma? |
|---|---|---|---|
| BR-DESCARTAR-001 | LeadModalContext React | Mecanismo Context; comportamento migra via nanostores | sim |
| BR-DESCARTAR-002 | App monolítico como único root React | Shell vira Astro layout + islands | sim |
| BR-DESCARTAR-003 | Sucesso de lead só com console.log | Mentira de sucesso; substituído por POST real | não |
| BR-DESCARTAR-004 | mapEmbedUrl / iframe Google morto | Dead data; Leaflet é o mapa | não |
| BR-DESCARTAR-005 | noindex Figma Make (BR-35) | Alvo é VPS indexável para SEO/ads | não |
| BR-DESCARTAR-006 | points[] / amenities hardcoded duplicados | Substituídos por siteData único | não |

> Detalhe em `discard_log.md`.

## Regras DECISÃO HUMANA

### BR-HUMANA-001 — URL da política de privacidade
- **Origem**: gaps G-02; BR-36
- **Tipo**: 🔴 GAP / stakeholder Gênesis
- **Descrição**: Sem URL real, formulário estendido não pode ir ao ar.
- **Opções**: (a) obter URL Gênesis antes do go-live; (b) lançar só POST inicial sem PATCH/campos sensíveis até política existir; (c) adiar lançamento público.
- **Recomendação do Curator**: (b) se precisarem publicar cedo — lead básico + checkbox genérico só com política mínima; senão (a). Nunca produzir com `privacyHref=#` e PATCH sensível.
- **Status**: RESOLVIDA (Bruno): opção (b), condicional a BR-HUMANA-002=(a). Se PATCH entrar na v1 → rever para (a).

### BR-HUMANA-002 — Escopo v1 do cadastro estendido (PATCH)
- **Origem**: contracts.md allowlist 8 campos; brief regulatório
- **Tipo**: dependência de produto + LGPD
- **Descrição**: Os 8 campos (renda, nascimento, etc.) exigem consentimento forte.
- **Opções**: (a) v1 só POST nome/email/telefone(+interesse_planta); PATCH numa fase 2 pós-política; (b) v1 já com fluxo estendido completo bloqueado até política.
- **Recomendação do Curator**: (a) — alinha zero regressão de captura e reduz risco LGPD.
- **Status**: RESOLVIDA (Bruno): opção (a) — v1 POST-only; PATCH fase 2.

### BR-HUMANA-003 — Sequenciamento front Astro vs backend Express/Neon
- **Origem**: migration_brief riscos (b)
- **Tipo**: ⚠️ AMBÍGUA / arquitetura
- **Descrição**: Backend ainda não existe.
- **Opções**: (a) API+Neon primeiro com stub front; (b) Astro com mock/adapter e API em paralelo; (c) BFF mínimo no mesmo deploy Astro/Node.
- **Recomendação do Curator**: (a) ou (c) com contrato OpenAPI fixo — não lançar Astro “de verdade” só com console.log de novo.
- **Status**: RESOLVIDA (Bruno): opção (c) — BFF no mesmo deploy Astro/Node. (Strategist detalha após escolha)

### BR-HUMANA-004 — Metragem campanha 65,88 vs site 56,60
- **Origem**: brief risco (c); Gênesis
- **Tipo**: 🔴 conteúdo / stakeholder
- **Descrição**: Divergência documental.
- **Opções**: (a) Gênesis confirma lista oficial de m²; (b) manter site atual até confirmação.
- **Recomendação do Curator**: (b) na migração técnica; (a) como tarefa Gênesis fora do cutover de código.
- **Status**: RESOLVIDA (Bruno): opção (b) — manter site; Gênesis depois.

### BR-HUMANA-005 — Confirmar objetivo SEO/ads com o time
- **Origem**: migration_brief objetivo 🟡
- **Tipo**: dependência de stakeholder
- **Descrição**: Motivo da migração é hipótese do Bruno.
- **Opções**: (a) confirmar SEO/LCP/Quality Score; (b) reescrever objetivo (manutenção/stack).
- **Recomendação do Curator**: (a) se possível antes do Strategist priorizar; senão Strategist trata SEO como hipótese explícita.
- **Status**: RESOLVIDA (Bruno): opção (a) — confirmar SEO/ads com o time antes do Strategist se apoiar demais; até lá tratar como hipótese explícita não validada.

### BR-HUMANA-006 — Consolidar amenities no siteData agora ou depois
- **Origem**: Reviewer P7 🟡
- **Tipo**: ⚠️ AMBÍGUA
- **Descrição**: Rail pode estar hardcoded.
- **Opções**: (a) unificar na migração; (b) portar 1:1 e unificar depois.
- **Recomendação do Curator**: (a) — brief já lista risco de replicar duplicação.
- **Status**: RESOLVIDA (Bruno): opção (a) — unificar amenities na migração.

## Notas
- Apetite `balanced` / paradigma híbrido: preservar regras de negócio; trocar mecanismos React-root/Context.
- CVCRM sync e site institucional fora de escopo (brief).
- Itens PENDENTES espelhados em `ambiguity_log.md`.

## Decisões humanas resolvidas (2026-09-10)

> Bruno. Observação crítica: **1 e 2 são condicionais** — (1b) só vale enquanto v1 for POST-only (2a). Se PATCH estendido entrar na v1, revisar item 1 para (a) obter URL da política antes, sem exceção.
> Item 5: SEO/ads **não** deve ser tratado como hipótese aceita; confirmar com quem decide **antes** do Strategist ponderar demais content-first vs interatividade.

| ID | Escolha | Status |
|----|---------|--------|
| BR-HUMANA-001 | **(b)** Lançar v1 com POST básico (+ checkbox/política mínima se aplicável); PATCH sensível fora da v1 | RESOLVIDA — condicional a 2a |
| BR-HUMANA-002 | **(a)** v1 = só POST nome/email/telefone/interesse_planta; PATCH fase 2 | RESOLVIDA |
| BR-HUMANA-003 | **(c)** BFF mínimo no mesmo deploy Astro/Node | RESOLVIDA |
| BR-HUMANA-004 | **(b)** Manter metragens do site na migração; Gênesis confirma depois | RESOLVIDA |
| BR-HUMANA-005 | **(a)** Confirmar SEO/ads com o time **antes** do Strategist se apoiar demais nisso | RESOLVIDA (ação pendente de confirmação externa) |
| BR-HUMANA-006 | **(a)** Unificar amenities em siteData na migração | RESOLVIDA |

