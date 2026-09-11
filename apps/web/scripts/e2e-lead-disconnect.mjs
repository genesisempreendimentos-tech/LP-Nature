/**
 * E2E: após cadastro rápido, sucesso sem caminho para o LeadWizard.
 * Uso: node apps/web/scripts/e2e-lead-disconnect.mjs
 */
import {
  WEB_ORIGIN,
  openLeadModal,
  withBrowser,
} from "./playwright-helpers.mjs"

const email = `lgpd-disconnect-${Date.now()}@example.com`

const result = await withBrowser(async (page) => {
  const errors = []
  page.on("pageerror", (e) => errors.push(e.message))

  await page.goto(WEB_ORIGIN + "/", { waitUntil: "domcontentloaded", timeout: 60000 })
  await openLeadModal(page)

  await page.fill("#lead-island-name", "Teste LGPD Disconnect")
  await page.fill("#lead-island-email", email)
  await page.fill("#lead-island-phone", "21 98765-4321")
  await page.click("[role=dialog] button[type=submit]")

  // Espera tela de sucesso (não o form)
  await page.waitForFunction(() => {
    const dialog = document.querySelector("[role=dialog]")
    return Boolean(
      dialog && /Recebemos seu contato/i.test(dialog.innerText || ""),
    )
  }, null, { timeout: 20000 })

  const dialog = page.locator("[role=dialog]")
  const text = await dialog.innerText()

  const labels = []
  const clickables = dialog.locator("button, a, [role=button]")
  const n = await clickables.count()
  for (let i = 0; i < n; i++) {
    const el = clickables.nth(i)
    const label = (
      (await el.innerText().catch(() => "")) ||
      (await el.getAttribute("aria-label")) ||
      ""
    )
      .replace(/\s+/g, " ")
      .trim()
    labels.push(label)
  }

  // Clica tudo exceto Fechar primeiro; Fechar por último (fecha o dialog).
  for (let i = 0; i < n; i++) {
    const el = clickables.nth(i)
    const label = labels[i] || ""
    if (/^fechar$/i.test(label)) continue
    await el.click({ timeout: 3000 }).catch(() => {})
    await page.waitForTimeout(500)
    if ((await page.locator(".lead-wizard").count()) > 0) {
      throw new Error("Wizard apareceu após clicar: " + label)
    }
  }

  const fechar = dialog.getByRole("button", { name: /^Fechar$/i })
  if ((await fechar.count()) > 0) {
    await fechar.click()
    await page.waitForTimeout(400)
  }

  const wizardVisible = await page.locator(".lead-wizard").count()
  const passoVisible = await page.getByText(/PASSO \d+ DE 8/i).count()
  const comecar = /Começar agora/i.test(text)
  const pesquisa = /Continuar com a pesquisa|Caminho principal/i.test(text)

  return {
    text: text.replace(/\s+/g, " ").slice(0, 320),
    labels,
    hasRecebemos: /Recebemos seu contato/i.test(text),
    hasFechar: /Fechar/i.test(text),
    comecar,
    pesquisa,
    wizardVisible,
    passoVisible,
    pageErrors: errors.slice(0, 5),
  }
})

const ok =
  result.hasRecebemos &&
  result.hasFechar &&
  !result.comecar &&
  !result.pesquisa &&
  result.wizardVisible === 0 &&
  result.passoVisible === 0

console.log(JSON.stringify(result, null, 2))
console.log(ok ? "DISCONNECT_E2E_OK" : "DISCONNECT_E2E_FAIL")
process.exit(ok ? 0 : 1)
