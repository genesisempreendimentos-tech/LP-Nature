# Rodapé Institucional, Tarefas de Implementação

> Caso de uso · `casca-aplicacao/rodape` · Writer · 2026-09-10

## Pré-requisitos
- [ ] `siteData.footer` e `siteData.contact` disponíveis
- [ ] `NatureLogo` light e estilos `.site-footer`

## Tarefas
- [ ] T-01, Implementar grid brand + nav + atendimento + social
  - Origem: `src/components/nature/Footer.tsx:43-135`
  - Critério: quatro colunas com dados de siteData
  - Confiança: 🟢
- [ ] T-02, Links tel (só dígitos), mailto, wa.me com target/_blank + noreferrer
  - Origem: `Footer.tsx:72-88`
  - Critério: hrefs corretos; WhatsApp NÃO abre modal
  - Confiança: 🟢
- [ ] T-03, Nav hardcoded com 5 âncoras incluindo #contato
  - Origem: `Footer.tsx:5-11`, `58-66`
  - Critério: links batem com ids de seção
  - Confiança: 🟢
- [ ] T-04, Sociais + CTA Instagram + handle
  - Origem: `Footer.tsx:97-134`
  - Critério: aria-labels Gênesis; ícones SVG
  - Confiança: 🟢
- [ ] T-05, Bottom: privacyHref, © getFullYear(), disclaimer
  - Origem: `Footer.tsx:137-144`, `nature.ts` footer
  - Critério: disclaimer visível; privacy hoje # 🔴
  - Confiança: 🟢

## Tarefas de Teste
- [ ] TT-01, wa.me abre número correto
- [ ] TT-02, tel: só dígitos
- [ ] TT-03, sociais em nova aba
- [ ] TT-04, ano do copyright = ano corrente

## Tarefas de Migração de Dados
- N/A 🟢

## Ordem Sugerida
1. T-01 → T-02 → T-03 → T-04 → T-05 → TT-*

## Lacunas Pendentes (🔴)
- URL real de Política de Privacidade
- Unificar grafia do endereço com location
