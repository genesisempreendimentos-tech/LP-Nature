# Rodapé Institucional

> Caso de uso · `casca-aplicacao/rodape` · Writer · 2026-09-10  
> Fonte: `src/components/nature/Footer.tsx`, `src/data/nature.ts` (footer/contact)

## Visão Geral

Rodapé institucional da landing: marca, navegação por âncoras, canais de atendimento (telefone, WhatsApp, e-mail, endereço), redes sociais, disclaimer legal e link de privacidade. É o canal outbound de WhatsApp (`wa.me`) — exceção aos CTAs da página que abrem o modal.

## Responsabilidades

- Exibir blurb da Gênesis e logo com link `#inicio`.
- Listar âncoras: Nature, Plantas, Lazer, Localização, Contato.
- Expor telefone (`tel:`), WhatsApp (`wa.me`), e-mail (`mailto:`) e endereço.
- Links sociais Instagram / Facebook / LinkedIn com `target="_blank"` + `rel="noreferrer"`.
- Rodapé inferior: política de privacidade, copyright com ano corrente, disclaimer.

## Regras de Negócio

- Dados de copy/contato vêm de `siteData.footer` e `siteData.contact`. 🟢
- WhatsApp do rodapé é link externo `https://wa.me/{contact.whatsapp}` (não abre LeadModal). 🟢
- `navLinks` (âncoras/labels) estão hardcoded no componente, não em `siteData`. 🟢
- `privacyHref` atual é `"#`" — política real ausente. 🔴
- Ano do copyright = `new Date().getFullYear()`. 🟢
- Disclaimer afirma imagens ilustrativas e alterações possíveis — texto comercial/legal embutido. 🟢
- Grafia do endereço no footer (`Hildegardo`) diverge da seção location (`Hidelgardo`). 🟢 / 🟡

## Requisitos Funcionais

| ID | Requisito | Prioridade | Critério de Aceite |
|----|-----------|------------|-------------------|
| RF-01 | Brand + blurb da Gênesis | Must | Logo e texto de `footer.blurb` visíveis |
| RF-02 | Nav do rodapé com 5 âncoras incluindo Contato | Must | Links `#nature` … `#contato` |
| RF-03 | Telefone clicável `tel:` só com dígitos | Must | `href` sem máscara |
| RF-04 | WhatsApp abre wa.me em nova aba | Must | URL com número E.164 sem `+` |
| RF-05 | E-mail `mailto:` e endereço textual | Must | Valores de `siteData` |
| RF-06 | Ícones sociais com aria-label Gênesis | Must | Instagram/Facebook/LinkedIn |
| RF-07 | CTA “Seguir no Instagram” | Should | Mesmo URL do Instagram |
| RF-08 | Disclaimer + © ano + privacidade | Must | Disclaimer legível; privacidade com href real 🔴 hoje |

## Requisitos Não Funcionais

| Tipo | Requisito inferido | Evidência no código | Confiança |
|------|--------------------|---------------------|-----------|
| Segurança | Links externos com `rel="noreferrer"` | `Footer.tsx:81`, `103` etc. | 🟢 |
| Acessibilidade | `aria-label` em brand e sociais; nav nomeada | `Footer.tsx:51`, `58`, `104+` | 🟢 |

## Critérios de Aceitação

```gherkin
Dado o rodapé renderizado
Quando o visitante clica em WhatsApp
Então abre wa.me com o número de contact.whatsapp em nova aba

Dado o rodapé renderizado
Quando o visitante clica em Telefone
Então o href tel: contém apenas dígitos derivados de footer.phone

Dado o rodapé renderizado
Quando o visitante clica em Política de Privacidade
Então hoje navega para # 🔴
E no aceite de produto deve abrir URL de política real

Dado o ano civil atual
Quando o rodapé renderiza
Então o copyright exibe esse ano
```

## Prioridade (MoSCoW)

| Requisito | MoSCoW | Justificativa |
|-----------|--------|---------------|
| Contatos + disclaimer | Must | Compliance e atendimento |
| wa.me no footer | Must | Único WhatsApp real da página |
| Sociais | Should | Tráfego institucional |
| Privacy href real | Must (produto) / Won't (código atual) | Lacuna 🔴 |

## Rastreabilidade de Código

| Arquivo | Função / Classe | Cobertura |
|---------|-----------------|-----------|
| `src/components/nature/Footer.tsx` | `Footer` | 🟢 |
| `src/data/nature.ts` | `siteData.footer`, `siteData.contact` | 🟢 |
| `src/components/nature/NatureLogo.tsx` | logo light | 🟢 |
| `src/App.tsx` | monta `<Footer />` | 🟢 |

## Adendo de revisao (2026-09-10)

- wa.me no rodape e o unico canal WhatsApp intencional (nao resquicio). Nao unificar com modal. 🟢
- Prefill com siteData.contact.whatsappMessage ("Ola, tenho interesse no Nature Residencial"). 🟢
- privacyHref ainda "#": URL inexistente; checkbox LGPD obrigatorio antes do ar. 🔴 bloqueia producao
