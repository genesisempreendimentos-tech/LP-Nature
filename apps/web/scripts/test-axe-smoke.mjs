/** axe via CDN — só reporta violações; não envia lead. */
import fs from "node:fs"
import http from "node:http"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { chromium } from "playwright"

const dist = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../dist-test-off")

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
    server.listen(4396, "127.0.0.1", () =>
      resolve({
        origin: "http://127.0.0.1:4396",
        close: () => new Promise((r) => server.close(r)),
      }),
    )
  })
}

const srv = await serve()
const browser = await chromium.launch({ headless: true })
const page = await browser.newPage()
const consoleErrors = []
page.on("pageerror", (e) => consoleErrors.push(String(e)))
page.on("console", (m) => {
  if (m.type() === "error") consoleErrors.push(m.text())
})
await page.goto(srv.origin + "/", { waitUntil: "networkidle" })
await page.addScriptTag({
  url: "https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.10.2/axe.min.js",
})
const results = await page.evaluate(async () => {
  // @ts-expect-error axe global
  return await axe.run(document, {
    runOnly: ["wcag2a", "wcag2aa"],
  })
})
const serious = results.violations.filter((v) =>
  ["critical", "serious"].includes(v.impact),
)
console.log(
  JSON.stringify(
    {
      ok: serious.length === 0,
      violations: results.violations.map((v) => ({
        id: v.id,
        impact: v.impact,
        nodes: v.nodes.length,
      })),
      consoleErrors,
    },
    null,
    2,
  ),
)
await browser.close()
await srv.close()
// Não falha o processo: baseline do site pode já ter contrast/scrollable;
// o relatório lista o que axe viu (meta = sem violações novas do formulário).
