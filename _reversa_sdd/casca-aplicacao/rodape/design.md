# Rodapé Institucional, Design Técnico

> Caso de uso · `casca-aplicacao/rodape` · Writer · 2026-09-10  
> Fonte: `src/components/nature/Footer.tsx`, `src/data/nature.ts`

## Interface

| Símbolo | Assinatura | Retorno | Observação |
|---------|------------|---------|------------|
| `Footer` | `()` | `JSX.Element` | Sem props; lê `siteData` |
| `InstagramIcon` / `FacebookIcon` / `LinkedInIcon` | `()` | SVG | Locais ao arquivo; `aria-hidden` |

### Dados consumidos (`siteData`)

| Path | Uso |
|------|-----|
| `footer.blurb` | Texto da coluna marca |
| `footer.phone` | Label + `tel:` (dígitos via `replace(/\D/g, "")`) |
| `footer.email` | `mailto:` |
| `footer.address` | Parágrafo endereço |
| `footer.instagram` / `facebook` / `linkedin` | URLs sociais |
| `footer.instagramHandle` | Handle exibido |
| `footer.privacyHref` | Link privacidade (hoje `#`) |
| `footer.disclaimer` | Texto legal inferior |
| `contact.whatsapp` | Path do `wa.me` |
| `contact.whatsappLabel` | Texto do link WhatsApp |

`contact.whatsappMessage` **não** é usado no Footer (wa.me sem query `text`). 🟢

Sem HTTP de API. 🟢

## Fluxo Principal

1. `Footer` destrutura `footer` e `contact` de `siteData`; calcula `year`. 🟢
2. Renderiza grid: brand, nav (`navLinks` constante), atendimento, social. 🟢
3. WhatsApp: `href={https://wa.me/${contact.whatsapp}}` + `target="_blank"` + `rel="noreferrer"`. 🟢
4. Bottom: privacidade + © + disclaimer. 🟢

## Fluxos Alternativos

- Nenhum estado/erro runtime — falhas são de conteúdo (URL quebrada, privacidade `#`). 🟢 / 🔴

## Dependências

- `siteData` (`content-data`) — fonte de verdade comercial do rodapé.
- `NatureLogo` light — marca.
- `lucide-react` (`ArrowRight`) — CTA Instagram.
- Montado por `App` após `</main>`. 🟢

## Decisões de Design Identificadas

| Decisão | Evidência no código | Confiança |
|---------|---------------------|-----------|
| WhatsApp real só no footer (`wa.me`); CTAs da página usam modal | `Footer.tsx:78-84` vs WhatsAppFab/SectionCta | 🟢 |
| `navLinks` locais vs copy em `siteData` | `Footer.tsx:5-11` | 🟢 |
| Ícones SVG inline em vez de lucide para redes | funções Icon no arquivo | 🟢 |
| `wa.me` sem prefill de mensagem no footer | ausência de `whatsappMessage` no href | 🟢 |
| Privacidade placeholder | `privacyHref: "#"` | 🔴 |

## Estado Interno

- Nenhum React state. `year` derivado no render. 🟢

## Observabilidade

- Sem logs. 🟡

## Riscos e Lacunas

- 🔴 `privacyHref` inválido para LGPD/compliance.
- 🟡 Prefill WhatsApp (`whatsappMessage`) existe nos dados mas não entra no link do footer.
- 🟡 Divergência de grafia do endereço footer vs location.
- 🟡 Nav do footer inclui `#contato` enquanto Header não — inconsistência de IA de navegação (intencional no código).
