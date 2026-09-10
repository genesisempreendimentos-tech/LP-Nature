# Matriz de permissões — Nature Residencial

> Detective · 2026-09-10  
> `doc_level`: completo  
> O sistema **não possui RBAC, ACL, autenticação nem autorização de servidor**. 🟢

---

## 1. Modelo de acesso

| Aspecto | Situação | Confiança |
|---------|----------|-----------|
| Login / sessão de usuário | Ausente | 🟢 |
| Papéis (admin, corretor, editor CMS) | Ausentes | 🟢 |
| Rotas protegidas | SPA de uma página pública | 🟢 |
| Backend / API | Ausente; lead não sai do browser | 🟢 / 🔴 |
| Segredos / tokens | Nenhum `.env` de aplicação | 🟢 |

O único “papel” runtime é **visitante anônimo**.

---

## 2. Papéis

| Papel | Como entra | Confiança |
|-------|------------|-----------|
| `anonimo` | Qualquer request HTTP à SPA | 🟢 |
| `equipe_comercial` | Fora do sistema (WhatsApp, telefone, e-mail). Não autentica na página. | 🟡 ator de negócio |
| `leitor_assistivo` | Mesmo que `anonimo`, com skip-link / teclado / reduced-motion | 🟢 recorte de acessibilidade, não RBAC |
| `crawler` | Teoricamente público, mas `robots.index: false` pede para **não indexar** | 🟢 |

---

## 3. Matriz (visitante anônimo)

| Recurso / ação | `anonimo` | Notas | Confiança |
|----------------|-----------|-------|-----------|
| Ver seções da landing | ✅ | Sem paywall | 🟢 |
| Navegar por âncoras | ✅ | Header / footer | 🟢 |
| Abrir LeadModal | ✅ | Todos os CTAs de conversão | 🟢 |
| Enviar formulário de lead | ✅ (cliente) | Validação local; persistência 🔴 | 🟢 |
| Ver sucesso do lead | ✅ | Sem verificação de envio | 🟢 / 🔴 |
| Abrir WhatsApp (`wa.me`) | ✅ | Só no footer | 🟢 |
| Ligar / e-mail (`tel:`, `mailto:`) | ✅ | Footer | 🟢 |
| Abrir mapa OSM / POIs | ✅ | Após lazy-load | 🟢 |
| Ativar interação do mapa | ✅ | Clique no gate | 🟢 |
| Abrir Google Maps (`mapLinkUrl`) | ✅ | Link em `siteData.location` | 🟢 |
| Redes sociais Gênesis | ✅ | Instagram / Facebook / LinkedIn | 🟢 |
| Política de privacidade | ⚠️ | Link `#`, sem conteúdo | 🔴 |
| Dismiss da bubble | ✅ | `sessionStorage` na própria origem | 🟢 |
| Pular preloader | ✅ | Escape / botão / reduced-motion / hash | 🟢 |
| Editar `siteData` | ❌ | Só no build | 🟢 |
| Ver fila de leads / CRM | ❌ | Não existe | 🔴 |
| Autenticar-se | ❌ | Não existe | 🟢 |

---

## 4. Dados no cliente (não são ACL)

| Chave | Quem lê/escreve | Sensibilidade | Confiança |
|-------|----------------|---------------|-----------|
| `nature_bubble_dismissed` | visitante, mesma aba/sessão | preferência UX | 🟢 |
| `nature_bubble_shown` | idem | preferência UX | 🟢 |
| `nature_bubble_index` | idem | preferência UX | 🟢 |
| campos do LeadModal | memória do React até submit | PII em trânsito local | 🟢 |
| payload após submit | `console.log` (DevTools) | PII **não** transmitida a servidor | 🔴 |

Não há cookie de tracking, consent banner nem CMP. Brief pedia checkbox LGPD; código não implementa. 🔴

---

## 5. Superfície pública vs indexação

| Controle | Valor | Confiança |
|----------|-------|-----------|
| `.figma/make/site.json` → `robots.index` | `false` | 🟢 |
| Autenticação de preview Figma Make | Fora do código da SPA | 🔴 LACUNA (infra) |

`noindex` é decisão de **descoberta**, não permissão de uso: quem tem a URL ainda vê a página inteira. 🟢

---

## 6. Integrações e o que o visitante “pode” acionar

| Destino | Autenticação | Dados enviados | Confiança |
|---------|--------------|----------------|-----------|
| OpenStreetMap tiles | pública | posição/zoom | 🟢 |
| CDN WordPress (imagens) | pública | GET de assets | 🟢 |
| `wa.me/5521965484462` | WhatsApp do visitante | mensagem pré-preenchida | 🟢 |
| Google Maps search URL | pública | query do endereço | 🟢 |
| API de leads | — | **não existe** | 🔴 |

---

## 7. Conclusão

Não há matriz RBAC clássica para implementar. O “controle de acesso” real é:

1. **Tudo é público** para quem carrega a SPA.
2. **PII de lead não deveria ficar só no `console.log`** se a página for produção.
3. **LGPD / política de privacidade** estão formalmente abertos.

Qualquer evolução (CMS, painel da Gênesis, webhook) precisará introduzir papéis que hoje não existem.
