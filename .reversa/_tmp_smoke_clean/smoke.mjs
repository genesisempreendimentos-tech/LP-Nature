import { chromium } from "playwright"
import fs from "node:fs"
import path from "node:path"

const OUT = path.resolve(
  "C:/Users/bs902/Downloads/Landing Pages/Nature - Pagina de Vendas/.reversa/_tmp_smoke_clean/shots",
)
fs.mkdirSync(OUT, { recursive: true })

const browser = await chromium.launch({ headless: true })
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
const errors = []

page.on("pageerror", (e) => errors.push(`pageerror: ${e.message}`))
page.on("console", (msg) => {
  if (msg.type() === "error") errors.push(`console: ${msg.text()}`)
})
page.on("requestfailed", (req) => {
  const url = req.url()
  // ignore noisy analytics/fonts third-party flakes; keep local failures
  if (url.includes("localhost") || url.includes("/brand/") || url.includes("/_astro/")) {
    errors.push(`requestfailed: ${url} :: ${req.failure()?.errorText || ""}`)
  }
})

await page.goto("http://localhost:4321/", { waitUntil: "networkidle", timeout: 60000 })
await page.waitForSelector("main#conteudo", { timeout: 15000 })

const appReady = await page.evaluate(() => document.documentElement.dataset.appReady)

async function shot(name, sel) {
  if (sel) {
    const el = page.locator(sel).first()
    await el.waitFor({ state: "attached", timeout: 10000 })
    await el.scrollIntoViewIfNeeded()
    await page.waitForTimeout(700)
  }
  await page.screenshot({ path: path.join(OUT, `${name}.png`) })
}

await shot("01-hero")
await shot("02-plantas", "#plantas")
await shot("03-localizacao", "#localizacao")
await shot("04-arquitetura", "[data-section='arquitetura']")
await shot("05-contato", "#contato")
await shot("06-footer", "footer.site-footer")

const brandOk = await page.evaluate(async () => {
  const urls = ["/brand/nature-symbol.svg", "/brand/nature-wordmark.svg"]
  const results = []
  for (const u of urls) {
    const r = await fetch(u)
    results.push({ u, ok: r.ok, status: r.status })
  }
  return results
})

const sections = await page.evaluate(() => {
  const checks = [
    ["hero", "#inicio, [data-section='inicio'], .hero-stage, .hero-section"],
    ["nature", "#nature"],
    ["plantas", "#plantas"],
    ["localizacao", "#localizacao"],
    ["lazer", "#lazer"],
    ["arquitetura", "[data-section='arquitetura']"],
    ["contato", "#contato"],
    ["footer", "footer.site-footer"],
  ]
  return checks.map(([name, sel]) => ({
    name,
    present: !!document.querySelector(sel),
  }))
})

const report = {
  ok: true,
  appReady,
  brandOk,
  sections,
  errors,
  shots: fs.readdirSync(OUT).filter((f) => f.endsWith(".png")),
}

fs.writeFileSync(path.join(OUT, "report.json"), JSON.stringify(report, null, 2))
console.log(JSON.stringify(report, null, 2))

await browser.close()

const missing = sections.filter((s) => !s.present)
const brandFail = brandOk.filter((b) => !b.ok)
const fatal = errors.filter(
  (e) => e.includes("/brand/") || e.includes("pageerror") || e.includes("/_astro/"),
)
if (missing.length || brandFail.length || fatal.length) {
  console.error("SMOKE FAIL", { missing, brandFail, fatal })
  process.exit(1)
}
