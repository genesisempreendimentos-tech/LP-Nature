/**
 * Sanity: islands hidratam o suficiente para abrir o modal de lead.
 * Uso: node apps/web/scripts/e2e-hydrate-smoke.mjs
 */
import {
  WEB_ORIGIN,
  openLeadModal,
  withBrowser,
} from "./playwright-helpers.mjs"

await withBrowser(async (page) => {
  await page.goto(WEB_ORIGIN + "/", {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  })
  await openLeadModal(page)
  const open = await page.locator("[role=dialog] #lead-island-name").isVisible()
  console.log(JSON.stringify({ open, origin: WEB_ORIGIN }))
  if (!open) {
    console.error("HYDRATE_SMOKE_FAIL")
    process.exit(1)
  }
  console.log("HYDRATE_SMOKE_OK")
})
