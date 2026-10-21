/** CTAs abrem widget mock (não o modal nativo). Sem enviar lead. */
import assert from "node:assert/strict"
import fs from "node:fs"
import http from "node:http"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { chromium } from "playwright"

const dist = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../dist-test-on")

function contentType(filePath) {
  if (filePath.endsWith(".html")) return "text/html; charset=utf-8"
  if (filePath.endsWith(".js")) return "text/javascript; charset=utf-8"
  if (filePath.endsWith(".css")) return "text/css; charset=utf-8"
  if (filePath.endsWith(".svg")) return "image/svg+xml"
  return "application/octet-stream"
}

function serve() {
  const server = http.createServer((req, res) => {
    const u = decodeURIComponent((req.url || "/").split("?")[0])
    const rel = u === "/" ? "/index.html" : u
    const fp = path.join(dist, rel)
    if (!fp.startsWith(dist) || !fs.existsSync(fp) || fs.statSync(fp).isDirectory()) {
      res.writeHead(404)
      res.end()
      return
    }
    res.writeHead(200, { "Content-Type": contentType(fp) })
    fs.createReadStream(fp).pipe(res)
  })
  return new Promise((resolve) => {
    server.listen(4395, "127.0.0.1", () =>
      resolve({
        origin: "http://127.0.0.1:4395",
        close: () => new Promise((r) => server.close(r)),
      }),
    )
  })
}

const srv = await serve()
const browser = await chromium.launch({ headless: true })
const page = await browser.newPage()
await page.goto(srv.origin + "/", { waitUntil: "networkidle" })
await page.waitForSelector(".nature-preloader", { state: "hidden", timeout: 60000 }).catch(() => {})
await page.evaluate(() => {
  document.querySelectorAll(".nature-preloader").forEach((el) => el.remove())
  window.GenesisForm = {
    init() {},
    isReady: () => true,
    open: () => {
      window.__opened = true
      return true
    },
  }
})
await page.evaluate(() => window.scrollTo(0, 2500))
await page.waitForTimeout(1000)

const selectors = [
  "button[data-hero-cta]",
  "button[data-section-cta]",
]
const results = []
for (const sel of selectors) {
  const loc = page.locator(sel).first()
  if ((await loc.count()) === 0) {
    results.push({ sel, skip: true })
    continue
  }
  await page.evaluate(() => {
    window.__opened = false
  })
  await loc.click()
  await page.waitForTimeout(250)
  const opened = await page.evaluate(() => window.__opened === true)
  const dialog = await page.locator("[role=dialog] #lead-island-name").isVisible()
  results.push({ sel, opened, dialog })
  assert.equal(opened, true, `${sel} deve abrir widget`)
  assert.equal(dialog, false, `${sel} não deve abrir modal nativo`)
  await page.keyboard.press("Escape")
}

const fabBtn = page.locator("button.lead-fab-button").first()
if ((await fabBtn.count()) > 0) {
  await page.evaluate(() => {
    window.__opened = false
  })
  await fabBtn.click()
  const opened = await page.evaluate(() => window.__opened === true)
  const dialog = await page.locator("[role=dialog] #lead-island-name").isVisible()
  results.push({ sel: "fab", opened, dialog })
  assert.equal(opened, true)
  assert.equal(dialog, false)
}

const headerCta = page.locator("header button.header-cta").first()
if ((await headerCta.count()) > 0) {
  await page.setViewportSize({ width: 1280, height: 800 })
  await page.evaluate(() => {
    window.__opened = false
  })
  await headerCta.click({ force: true })
  const opened = await page.evaluate(() => window.__opened === true)
  const dialog = await page.locator("[role=dialog] #lead-island-name").isVisible()
  results.push({ sel: "header-cta", opened, dialog })
  assert.equal(opened, true)
  assert.equal(dialog, false)
}

console.log(JSON.stringify({ ok: true, results }, null, 2))
await browser.close()
await srv.close()
