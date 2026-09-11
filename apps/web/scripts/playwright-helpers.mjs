/**
 * Helpers Playwright para Astro + React islands (client:load / client:only).
 *
 * Armadilhas conhecidas neste projeto:
 * - Em Windows, Astro sem `server.host` escuta só ::1 → use 127.0.0.1 com host:true
 *   (já configurado em astro.config.mjs) ou `http://localhost:4321`.
 * - LeadFab começa com `return null` até scroll passar do hero → não esperar
 *   `.lead-fab-button` no load; abrir modal via CTA ou scroll+FAB.
 * - LeadModal (Radix Dialog) porta para `document.body` → a island fica com
 *   children=0 mesmo hidratada; esperar `[role=dialog]`, não filhos da island.
 */
import { chromium } from "playwright"

export const WEB_ORIGIN =
  process.env.PLAYWRIGHT_BASE_URL || "http://127.0.0.1:4321"

export async function waitForIslandAttached(
  page,
  componentUrlIncludes,
  timeout = 45000,
) {
  const islandSel = `astro-island[component-url*="${componentUrlIncludes}"]`
  await page.waitForSelector(islandSel, { timeout, state: "attached" })
}

/**
 * Espera um seletor de UI que só existe após o React montar (não use o
 * custom element vazio da island quando o conteúdo vai para Portal).
 */
export async function waitForHydratedSelector(page, selector, timeout = 45000) {
  await page.waitForSelector(selector, { timeout, state: "visible" })
}

/** CTAs que chamam openLeadModal (Hero / seções). */
export async function waitForLeadTriggers(page, timeout = 45000) {
  await waitForIslandAttached(page, "LeadModal", timeout)
  await waitForIslandAttached(page, "HeroCta", timeout)
  await waitForHydratedSelector(
    page,
    "button[data-hero-cta], button[data-section-cta]",
    timeout,
  )
}

export async function openLeadModal(page) {
  await waitForLeadTriggers(page)

  // Preferir CTA estável; FAB só aparece após scroll do hero.
  const heroCta = page.locator("button[data-hero-cta]").first()
  if ((await heroCta.count()) > 0) {
    await heroCta.click()
  } else {
    await page.locator("button[data-section-cta]").first().click()
  }

  await page.waitForSelector("[role=dialog] #lead-island-name", {
    state: "visible",
    timeout: 20000,
  })
}

export async function withBrowser(run) {
  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage()
  try {
    return await run(page)
  } finally {
    await browser.close()
  }
}
