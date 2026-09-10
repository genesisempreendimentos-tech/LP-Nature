# Domínio — Nature Residencial

> Detective · 2026-09-10  
> `doc_level`: completo  
> Fonte: código em `src/`, briefs em `src/imports/pasted_text/`, `PRODUCT.md`, `.figma/make/site.json`  
> Arqueologia Git: **indisponível** — o diretório do projeto não contém `.git` 🔴

---

## 1. O que este sistema é

Landing page de **conversão comercial** do empreendimento **Nature Residencial**, da construtora **Gênesis Empreendimentos**, no bairro Alto, Teresópolis — RJ.

Não é um portal institucional com múltiplas rotas, CMS, autenticação ou backend. É uma SPA de uma página cuja narrativa conduz o visitante até um único ato comercial: **deixar nome, e-mail e telefone** para a equipe comercial retornar.

Conceito central (brief + copy):

> **Nature. O essencial em um novo padrão.**

---

## 2. Glossário

| Termo | Significado | Confiança |
|-------|-------------|-----------|
| **Nature Residencial** | Empreendimento residencial de alto padrão no Alto, Teresópolis. | 🟢 |
| **Gênesis Empreendimentos** | Construtora/incorporadora responsável; aparece em Trust, footer e mensagem de sucesso do lead. | 🟢 |
| **Alto** | Bairro de Teresópolis onde o empreendimento está. | 🟢 |
| **Lead** | Visitante que envia nome, e-mail e telefone no modal. | 🟢 |
| **Unidade / configuração** | Tipologia de apartamento identificada pela **metragem** (não por quartos/vagas no código). | 🟢 |
| **Planta** | Imagem oficial da planta associada a uma metragem. | 🟢 |
| **Consultar unidades** | Ato comercial de pedir contato sobre disponibilidade — no código, abre o **LeadModal**, não uma listagem. | 🟢 |
| **Preloader / intro** | Overlay de marca exibido antes da página ficar interativa. | 🟢 |
| **FAB / bubble** | Botão flutuante + balão de copy; nome de arquivo `WhatsAppFab` é legado — o clique abre o modal, não o WhatsApp. | 🟢 |
| **POI** | Ponto de interesse no mapa Leaflet (comércio, natureza, rodovia, faculdade, saúde, acessos). | 🟢 |
| **siteData** | Objeto estático `src/data/nature.ts` com copy e mídia comercial. | 🟢 |
| **nature:plan** | `CustomEvent` disparado ao CTA de plantas, com `detail` = metragem ativa. Sem consumidor. | 🟢 / 🔴 |
| **Reduced motion** | Preferência `prefers-reduced-motion: reduce`; pula intro, encurta animações e simplifica scroll. | 🟢 |
| **Nível A / PBQP-H / ISO 9001** | Provas institucionais de qualidade da Gênesis. | 🟢 |
| **residencialnature.com.br** | Site institucional existente; brief manda usá-lo como fonte de verdade visual, não reinventar marca. | 🟡 |

---

## 3. Atores

| Ator | Papel | Confiança |
|-------|-------|-----------|
| **Visitante / comprador-alvo** | Pessoa em momento de vida de “novo padrão”; único usuário runtime. Sem login. | 🟢 |
| **Equipe comercial Gênesis** | Destinatária implícita do lead. Não há tela, fila ou CRM no sistema. | 🟢 / 🔴 |
| **Leitor de tela / teclado** | Visitante com skip-link, Dialog Radix, Escape no menu/preloader, gate de mapa. | 🟢 |
| **Visitante com reduced-motion** | Recebe página já `ready`, sem preloader de motion. | 🟢 |
| **Visitante com deep-link (`#hash`)** | Pula preloader para ir direto à âncora. | 🟢 |

Não existem papéis autenticados (admin, corretor, CMS editor). 🟢

---

## 4. Entidades de negócio

### 4.1 Empreendimento (implícito)

Atributos confirmados no copy/dados:

| Atributo | Valor no código | Confiança |
|----------|-----------------|-----------|
| Endereço | Rua Hidelgardo / Hildegardo de Noronha, 1516 — Alto, Teresópolis — RJ | 🟢 / 🟡 grafia divergente |
| Tipologias | Apartamentos de **2 e 3 quartos** | 🟢 |
| Metragens (`siteData.floorPlans`) | 56,60 · 66,68 · 128,28 · 292,49 m² | 🟢 |
| Coordenadas do mapa | `[-22.4372, -42.9822]` | 🟢 |
| Telefone fixo | `(21) 2642-1203` | 🟢 |
| WhatsApp | `5521965484462` | 🟢 |
| E-mail comercial | `comercial@genesisempreendimentos.com.br` | 🟢 |

Preço, vagas, suítes, posição solar e disponibilidade **não** existem no modelo. O brief proíbe inventá-los. 🟢 (regra) / 🔴 (dados reais de estoque)

### 4.2 LeadPayload

| Campo | Regra | Confiança |
|-------|--------|-----------|
| `name` | trim ≠ vazio | 🟢 |
| `email` | regex `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` | 🟢 |
| `phone` | exatamente 11 dígitos nacionais; payload `+55` + dígitos | 🟢 |

Persistência: apenas `console.log`. Sem API, webhook, e-mail transacional ou CRM. 🔴

### 4.3 Planta (`FloorPlanOption`)

Identidade comercial = **metragem**. Imagem oficial no CDN WordPress `wp.residencialnature.com.br`. 🟢

### 4.4 Amenity / espaço de lazer

Rail visual em `Amenities.tsx` (nomes + imagens). Categorias textuais em `siteData.amenities` (VIVER / REUNIR / FACILITAR / COMPARTILHAR) — fontes paralelas. 🟡

### 4.5 Proximidade vs POI do mapa

Mesma intenção comercial (provar que o Alto não isola), duas fontes:

- Painel: `siteData.location.proximity`
- Mapa: constante `points[]` em `LocationMap.tsx`

Distâncias coincidem nos seis itens; nomes no mapa são mais específicos. 🟡 duplicação.

---

## 5. Regras de negócio

Numeração `BR-NN`. Rigor: 🟢 só com evidência direta no código ou no brief explicitamente implementado.

### 5.1 Narrativa e produto

| ID | Regra | Evidência | Confiança |
|----|-------|-----------|-----------|
| BR-01 | A página vende **evolução de endereço**, não luxo ostensivo. Copy evita “mansão”, “luxo ao seu alcance”, urgência falsa. | brief `nature-residencial-brief.md`; copy em `siteData` e componentes | 🟡 (brief) / 🟢 (copy atual não usa esses termos) |
| BR-02 | Não prometer valorização, rentabilidade ou retorno de investimento. | brief | 🟡 |
| BR-03 | Não inventar suítes, vagas, banheiros, posição solar, preços ou estoque. | brief § Plantas; código só expõe metragem + imagem | 🟢 |
| BR-04 | Não associar quantidade de quartos a uma metragem específica sem dado confirmado. O copy diz “2 e 3 quartos” no geral; o seletor só mostra m². | brief + `FloorPlans.tsx` | 🟢 |
| BR-05 | Imagens do edifício devem ser materiais reais (renders/plantas oficiais). Hero e plantas usam CDN WordPress Gênesis/Nature. | `Hero.tsx`, `nature.ts` | 🟢 |
| BR-06 | Arquitetura (galeria) ainda usa Unsplash, não fachadas oficiais. | `siteData.architecture.images` | 🟡 desvio do brief |
| BR-07 | Provas institucionais permitidas: Gênesis, ISO 9001, PBQP-H Nível A, Caixa, Região Serrana, assistência pós-entrega. Sem métricas inventadas (“15+ anos”, “80% vendido”). | brief + `Trust` / `siteData.trust.proofs` | 🟢 |
| BR-08 | Localização deve parecer **parte do produto**, não mapa solto. Discurso de Teresópolis vs Rio **não ataca** o Rio e **não** fala em fuga da cidade. | quotes em `siteData.location.quotes` | 🟢 |
| BR-09 | Disclaimer legal: imagens ilustrativas; plantas, acabamentos e condições podem mudar; disponibilidade real só com a equipe comercial. | `siteData.footer.disclaimer` | 🟢 |

### 5.2 Funil de conversão

| ID | Regra | Evidência | Confiança |
|----|-------|-----------|-----------|
| BR-10 | Conversão primária = **LeadModal** (não formulário inline, não WhatsApp). Header, Hero, `SectionCta`, FAB e bubble chamam `openLeadModal()`. | `LeadModalContext`, `SectionCta`, `Hero`, `Header`, `WhatsAppFab` | 🟢 |
| BR-11 | Exceção: footer WhatsApp continua `wa.me` com número e mensagem pré-preenchida. Canal paralelo ao modal. | `Footer.tsx` + `contact.whatsapp` | 🟢 |
| BR-12 | Telefone do lead é **celular brasileiro de 11 dígitos** (DDD + 9 dígitos). Prefixo visual `+55` fixo; não há seletor de país. | `LeadModal.tsx` | 🟢 |
| BR-13 | Nome e e-mail obrigatórios; e-mail com validação superficial (não RFC completa). | `LeadModal.validate` | 🟢 |
| BR-14 | Submit válido mostra sucesso local (“Recebemos seu contato”) **mesmo sem envio real**. | `console.log` + `submitted=true` | 🟢 / 🔴 |
| BR-15 | Ao reabrir o modal, o formulário é zerado (inclusive o estado de sucesso). | `useEffect` em `isOpen` | 🟢 |
| BR-16 | Brief pede checkbox LGPD; **não está implementado**. | brief § CTA vs `LeadModal.tsx` | 🔴 |
| BR-17 | Brief proíbe popups de falsa urgência. A bubble de copy existe, mas: máx. 3 shows, dismissível, só depois de sair do hero, não auto-abre o modal. | `WhatsAppFab.tsx` vs brief “Não abrir popups automaticamente” | 🟡 tensão brief vs código |
| BR-18 | Evento `nature:plan` deveria levar a metragem escolhida ao funil. Hoje dispara e ninguém escuta — o modal não sabe qual planta o visitante consultava. | `FloorPlans.tsx` vs `LeadForm.tsx` | 🔴 |
| BR-19 | `siteData.cta` (copy de CTA final) praticamente não alimenta os botões atuais. | `nature.ts` vs `LeadForm`/`SectionCta` | 🟡 legado |

### 5.3 Experiência de entrada e acessibilidade

| ID | Regra | Evidência | Confiança |
|----|-------|-----------|-----------|
| BR-20 | Se `prefers-reduced-motion: reduce` **ou** URL com hash → `ready=true` e **sem** preloader. | `App.tsx:20-24` | 🟢 |
| BR-21 | Durante o preloader a página fica `inert` e `body.overflow=hidden`. | `App.tsx`, `Preloader.tsx` | 🟢 |
| BR-22 | Assets lentos não podem prender o visitante: exit forçado em **1800ms**; `finish` de segurança em **2800ms**. | comentário + timeouts no Preloader | 🟢 |
| BR-23 | Escape, botão “Pular introdução” e mudança para reduced-motion disparam saída do preloader. | `Preloader.tsx` | 🟢 |
| BR-24 | Deep-link (`#plantas`, `#contato`, etc.) prioriza a âncora em vez da intro. | `Boolean(window.location.hash)` | 🟢 |
| BR-25 | Skip-link `#conteudo` existe; após o preloader, foco vai para `.skip-link` se o overlay tinha o foco. | `App.tsx`, `Preloader.finish` | 🟢 |

### 5.4 Navegação e chrome

| ID | Regra | Evidência | Confiança |
|----|-------|-----------|-----------|
| BR-26 | Header fica sólido após `scrollY > 80` e só volta transparente com `scrollY ≤ 40` (histerese anti-flicker). Menu aberto também força visual sólido. | `Header.tsx` | 🟢 |
| BR-27 | Menu mobile fecha com Escape (devolve foco ao toggle), clique fora, ou viewport ≥ 761px. | `Header.tsx` | 🟢 |
| BR-28 | Nav atual: O Nature, Plantas, Lazer, Localização (+ Contato no footer). Brief original citava “Experiência” e “Gênesis” — **não** estão no nav. | `Header.tsx` vs brief | 🟡 |
| BR-29 | FAB só aparece depois que `#inicio` sai da viewport (`ScrollTrigger start: bottom top`) e some ao voltar ao hero. | `WhatsAppFab.tsx` | 🟢 |
| BR-30 | Bubble: 1ª aparição 10s após mount (se FAB visível); visível 6s; reaparece 52s; máx. 3 por sessão; dismiss em `sessionStorage`. Modal aberto pausa o ciclo. | constantes `FIRST_DELAY_MS` etc. | 🟢 |

### 5.5 Mapa

| ID | Regra | Evidência | Confiança |
|----|-------|-----------|-----------|
| BR-31 | Leaflet só carrega após o mapa entrar em ~700px do viewport (IntersectionObserver). | `LocationMapLazy.tsx` | 🟢 |
| BR-32 | Interação (drag/zoom/scroll/teclado) começa **desligada** até o visitante clicar “Clique para navegar”. | `LocationMap.tsx` `active=false` | 🟢 |
| BR-33 | `siteData.location.mapEmbedUrl` (Google embed) **não** é usado; o mapa é OSM/Leaflet. `mapLinkUrl` permanece como link externo. | `nature.ts` vs `LocationMap.tsx` | 🟢 |

### 5.6 Conteúdo e publicação

| ID | Regra | Evidência | Confiança |
|----|-------|-----------|-----------|
| BR-34 | Conteúdo comercial vive no bundle (`siteData`). Sem CMS, i18n ou preview. | `nature.ts` | 🟢 |
| BR-35 | Site Figma Make está com `robots.index: false` (noindex). | `.figma/make/site.json` | 🟢 |
| BR-36 | Política de privacidade aponta para `#`. | `privacyHref: "#"` | 🔴 |
| BR-37 | Grafia do logradouro diverge: Location/mapa **Hidelgardo**; footer **Hildegardo**. | `nature.ts:52` vs `182` | 🟢 inconsistência |

### 5.7 Motion (regras de produto, não só técnicas)

| ID | Regra | Evidência | Confiança |
|----|-------|-----------|-----------|
| BR-38 | Animações de página só com `ready=true` e `prefers-reduced-motion: no-preference`. | `usePageMotion.ts`, Hero | 🟢 |
| BR-39 | Parallax do hero só em desktop ≥1024px. | `Hero.tsx` matchMedia | 🟢 |
| BR-40 | Brief original pedia ScrollMagic; documento posterior manda **não instalar** ScrollMagic e usar ScrollTrigger. Código segue o segundo. | `animation-architecture.md` + `package.json` | 🟢 |
| BR-41 | Lenis **não** está instalado (fase 1: scroll nativo). | `engineering-rules.md` + lockfiles | 🟢 |

---

## 6. Arqueologia Git

| Item | Resultado | Confiança |
|------|-----------|-----------|
| `git log` | Falha: `not a git repository` | 🟢 |
| Commits de fix/hotfix | Indisponíveis | 🔴 |
| Reverts / refactors nomeados | Indisponíveis | 🔴 |
| ADRs retroativos | Reconstruídos por **briefs + código + desvios brief→implementação**, não por mensagens de commit | 🟡 |

Hipótese: o projeto nasceu no **Figma Make** e/ou foi copiado como pasta de trabalho, sem histórico versionado neste workspace. 🟡

Evidências de “histórico de decisão” substitutas:

1. Briefs colados em `src/imports/pasted_text/` (não são runtime).
2. Comentários pontuais no código (histerese do header; timeout do preloader; bubble vs modal).
3. Nomes legados (`WhatsAppFab`, `LeadForm` sem form, `mapEmbedUrl` morto, evento `nature:plan` órfão).
4. Locks duplicados (`package-lock.json` + `pnpm-lock.yaml`) sugerindo troca de toolchain. 🟡

---

## 7. Análise de logs

Nenhum arquivo de log de aplicação, APM ou analytics no repositório.

Único “evento de negócio” instrumentado: `console.log` do payload de lead no browser. 🟢 / 🔴

---

## 8. Lacunas 🔴

1. **Envio real de leads** (API/CRM/e-mail) — o sucesso é local.
2. **Consentimento LGPD** no formulário (pedido no brief, ausente).
3. **Política de privacidade** (`privacyHref: "#"`).
4. **Histórico Git** para ADRs factuais de commit.
5. **Consumidor de `nature:plan`** — metragem escolhida não chega ao lead.
6. **Estoque / disponibilidade / preço** — o funil promete consultar unidades sem dados.
7. **Grafia canônica do logradouro** (Hidelgardo vs Hildegardo).
8. **Metragens canônicas**: brief original listava 65,88 / 76,40 / 146,19 / 292,49; o código usa 56,60 / 66,68 / 128,28 / 292,49. Qual conjunto é o oficial? 🔴 (precisa validação humana com o material da Gênesis)

---

## 9. Desvios brief → código (úteis para ADRs)

| Brief | Código | Interpretação |
|------|--------|----------------|
| “Sem preloader longo” | Preloader com marca, 1,8s/2,8s | Intro curta boundada — ADR-006 |
| CTA “Conhecer o Nature” / “Ver plantas” | Hero: “Encontre o seu espaço” → modal; âncora `#nature` | 🟡 copy evoluiu |
| Formulário na seção final + checkbox LGPD | Seção `#contato` só com CTA; form no modal, sem LGPD | ADR-003 |
| Sticky CTA aos 35% / barra mobile | FAB após sair do hero + bubble | ADR-003 |
| Mapa Google sofisticado, sem iframe solto | Leaflet OSM + gate de clique | ADR-002 |
| Galeria imersiva + lightbox | **Não implementada** | 🔴 omissão |
| ScrollMagic | Explicitamente abandonado | ADR-001 |
| Lenis opcional | Não instalado | ADR-005 |
| `robots` não mencionado | `noindex` | ADR-007 |
