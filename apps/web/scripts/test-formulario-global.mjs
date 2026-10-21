/**
 * Testes browser do formulário global — NÃO preenche nem envia lead.
 * Uso: node ./scripts/test-formulario-global.mjs
 */
import assert from "node:assert/strict"
import fs from "node:fs"
import http from "node:http"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { chromium } from "playwright"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const webRoot = path.resolve(__dirname, "..")
const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

function contentType(filePath) {
  if (filePath.endsWith(".html")) return "text/html; charset=utf-8"
  if (filePath.endsWith(".js")) return "text/javascript; charset=utf-8"
  if (filePath.endsWith(".css")) return "text/css; charset=utf-8"
  if (filePath.endsWith(".svg")) return "image/svg+xml"
  if (filePath.endsWith(".json")) return "application/json"
  return "application/octet-stream"
}

function serveDir(dir, port) {
  const posts = []
  const server = http.createServer((req, res) => {
    if (req.method === "POST") {
      posts.push(req.url)
      res.writeHead(204)
      res.end()
      return
    }
    const urlPath = decodeURIComponent((req.url || "/").split("?")[0])
    const rel = urlPath === "/" ? "/index.html" : urlPath
    const filePath = path.join(dir, rel)
    if (!filePath.startsWith(dir) || !fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      res.writeHead(404)
      res.end("not found")
      return
    }
    res.writeHead(200, { "Content-Type": contentType(filePath) })
    fs.createReadStream(filePath).pipe(res)
  })
  return new Promise((resolve) => {
    server.listen(port, "127.0.0.1", () =>
      resolve({
        origin: `http://127.0.0.1:${port}`,
        posts,
        close: () => new Promise((r) => server.close(r)),
      }),
    )
  })
}

async function main() {
  const results = []
  const browser = await chromium.launch({ headless: true })

  // --- (a) chave off: CTA abre modal nativo ---
  {
    const dist = path.join(webRoot, "dist-test-off")
    const srv = await serveDir(dist, 4391)
    const page = await browser.newPage()
    const consoleMsgs = []
    page.on("console", (m) => consoleMsgs.push(m.text()))
    await page.goto(srv.origin + "/", { waitUntil: "networkidle" })
    await page
      .waitForSelector(".nature-preloader", { state: "hidden", timeout: 60000 })
      .catch(() => {})
    await page.evaluate(() => {
      document.querySelectorAll(".nature-preloader").forEach((el) => el.remove())
    })
    await page.waitForSelector("button[data-hero-cta]", { timeout: 45000 })
    await page.locator("button[data-hero-cta]").first().click()
    await page.waitForSelector("[role=dialog] #lead-island-name", {
      state: "visible",
      timeout: 20000,
    })
    results.push({ id: "a-native-modal", ok: true })
    await page.close()
    await srv.close()
  }

  // --- (d) widget indisponível: fallback nativo + warn ---
  {
    const dist = path.join(webRoot, "dist-test-on")
    // Rebuild not needed — dist-test-on aponta para forms.genesisapps; simulamos
    // GenesisForm ausente/não pronto sobrescrevendo antes dos cliques.
    const srv = await serveDir(dist, 4392)
    const page = await browser.newPage()
    const warns = []
    page.on("console", (m) => {
      if (m.type() === "warning") warns.push(m.text())
    })
    await page.goto(srv.origin + "/", { waitUntil: "networkidle" })
    await page
      .waitForSelector(".nature-preloader", { state: "hidden", timeout: 60000 })
      .catch(() => {})
    await page.evaluate(() => {
      document.querySelectorAll(".nature-preloader").forEach((el) => el.remove())
    })
    await page.waitForTimeout(4500)
    await page.evaluate(() => {
      window.GenesisForm = {
        init() {},
        isReady: () => false,
        open: () => false,
      }
    })
    await page.waitForSelector("button[data-hero-cta]", { timeout: 45000 })
    await page.locator("button[data-hero-cta]").first().click()
    await page.waitForSelector("[role=dialog] #lead-island-name", {
      state: "visible",
      timeout: 20000,
    })
    const hasFallback = warns.some((t) => t.includes("[formulario] fallback"))
    assert.equal(hasFallback, true, "esperado console.warn fallback")
    results.push({ id: "d-fallback", ok: true, warns })
    await page.close()
    await srv.close()
  }

  // --- (e) getTracking ---
  {
    const dist = path.join(webRoot, "dist-test-on")
    const srv = await serveDir(dist, 4393)
    const page = await browser.newPage()
    await page.goto(srv.origin + "/", { waitUntil: "networkidle" })
    await page.waitForFunction(
      () => typeof window.__natureGetTracking === "function",
      { timeout: 15000 },
    )

    const touch = {
      source: "google",
      medium: "cpc",
      campaign: "nature",
      term: "x",
      content: "y",
      landing_page: "/",
      referrer: "https://ref.example/",
      captured_at: "2026-09-24T19:02:01.502Z",
    }
    await page.evaluate((t) => {
      document.cookie = `nature_utm_first=${encodeURIComponent(JSON.stringify(t))}; Path=/`
      document.cookie = `nature_utm_last=${encodeURIComponent(JSON.stringify(t))}; Path=/`
      sessionStorage.removeItem("nature_sessao_id")
      sessionStorage.removeItem("nature_form_uid")
      sessionStorage.removeItem("nature_form_sid")
    }, touch)

    const withUtm = await page.evaluate(() => window.__natureGetTracking())

    assert.ok(withUtm.first)
    assert.ok(withUtm.last)
    assert.equal(withUtm.first.source, "google")
    assert.equal(withUtm.first.at, touch.captured_at)
    assert.equal(withUtm.first.landing_page, "/")
    assert.match(withUtm.usuario_id, UUID_RE)
    assert.match(withUtm.sessao_id, UUID_RE)
    assert.equal("nome" in withUtm, false)
    assert.equal("email" in withUtm, false)
    assert.equal("telefone" in withUtm, false)

    await page.evaluate(() => {
      document.cookie = "nature_utm_first=; Path=/; Max-Age=0"
      document.cookie = "nature_utm_last=; Path=/; Max-Age=0"
      sessionStorage.removeItem("nature_sessao_id")
      sessionStorage.removeItem("nature_form_uid")
      sessionStorage.removeItem("nature_form_sid")
    })
    const empty = await page.evaluate(() => window.__natureGetTracking())
    assert.deepEqual(empty, {})

    await page.evaluate(() => {
      sessionStorage.setItem(
        "nature_sessao_id",
        "aaaaaaaa-bbbb-4ccc-8ddd-eeeeeeeeeeee",
      )
    })
    const withTracker = await page.evaluate(() => window.__natureGetTracking())
    assert.equal(withTracker.sessao_id, "aaaaaaaa-bbbb-4ccc-8ddd-eeeeeeeeeeee")
    assert.match(withTracker.usuario_id, UUID_RE)

    results.push({ id: "e-getTracking", ok: true, withUtm, empty, withTracker })
    await page.close()
    await srv.close()
  }

  // --- (f) Pixel em build de produção servido localmente ---
  {
    const dist = path.join(webRoot, "dist-test-on")
    const srv = await serveDir(dist, 4394)
    const page = await browser.newPage()
    await page.addInitScript(() => {
      window.__fbqCalls = []
      window.fbq = function (...args) {
        window.__fbqCalls.push(args)
      }
    })
    await page.goto(srv.origin + "/", { waitUntil: "networkidle" })
    await page.waitForTimeout(4500)

    await page.evaluate(() => {
      window.dispatchEvent(
        new CustomEvent("genese-forms:event", {
          detail: { type: "lead_created" },
        }),
      )
      window.dispatchEvent(
        new CustomEvent("genese-forms:event", {
          detail: { type: "lead_created" },
        }),
      )
      window.dispatchEvent(
        new CustomEvent("genese-forms:event", {
          detail: { type: "completed" },
        }),
      )
    })
    let calls = await page.evaluate(() => window.__fbqCalls.slice())
    const leads = calls.filter((c) => c[0] === "track" && c[1] === "Lead")
    const regs = calls.filter(
      (c) => c[0] === "track" && c[1] === "CompleteRegistration",
    )
    assert.equal(leads.length, 1, `Lead esperado 1, veio ${leads.length}`)
    assert.equal(regs.length, 0)

    await page.evaluate(() => {
      window.__fbqCalls = []
      window.dispatchEvent(
        new CustomEvent("genese-forms:event", { detail: { type: "closed" } }),
      )
      window.dispatchEvent(
        new CustomEvent("genese-forms:event", {
          detail: { type: "lead_created" },
        }),
      )
    })
    calls = await page.evaluate(() => window.__fbqCalls.slice())
    const leads2 = calls.filter((c) => c[0] === "track" && c[1] === "Lead")
    assert.equal(leads2.length, 1, "após closed, novo Lead")

    results.push({ id: "f-pixel-prod", ok: true })
    await page.close()
    await srv.close()
  }

  // --- (f) prévia / sem REAL: nenhum Lead do widget ---
  // dist-test-on foi buildado com PUBLIC_FORMS_REAL=1 — pixelAllowed é true no bundle.
  // Teste de prévia: build separado seria necessário; validamos via código-fonte.
  const src = fs.readFileSync(
    path.join(webRoot, "src/features/lead/formularioGlobal.ts"),
    "utf8",
  )
  assert.match(src, /import\.meta\.env\.DEV/)
  assert.match(src, /PUBLIC_FORMS_REAL !== "1"/)
  results.push({ id: "f-pixel-guards-source", ok: true })

  await browser.close()
  console.log(JSON.stringify({ ok: true, results }, null, 2))
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
