import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { defineConfig } from "astro/config"
import react from "@astrojs/react"

const rootDir = path.dirname(fileURLToPath(import.meta.url))

/**
 * Lê chave do process.env; se ausente, tenta apps/web/.env (e .env.local).
 * No VPS as PUBLIC_* vêm do ambiente do comando de build.
 */
function readEnvFileValue(filePath, key) {
  try {
    const raw = fs.readFileSync(filePath, "utf8")
    const re = new RegExp(`^${key}=(.*)$`, "m")
    const m = raw.match(re)
    if (!m) return undefined
    let v = m[1].trim()
    if (
      (v.startsWith('"') && v.endsWith('"')) ||
      (v.startsWith("'") && v.endsWith("'"))
    ) {
      v = v.slice(1, -1)
    }
    return v
  } catch {
    return undefined
  }
}

function resolvePublicEnv(key) {
  const fromProcess = process.env[key]
  if (fromProcess !== undefined && fromProcess !== "") return fromProcess
  for (const name of [".env", ".env.local"]) {
    const v = readEnvFileValue(path.join(rootDir, name), key)
    if (v !== undefined && v !== "") return v
  }
  return undefined
}

const isBuild = process.argv.includes("build")
if (isBuild && resolvePublicEnv("PUBLIC_FORMULARIO_GLOBAL") === "1") {
  const base = resolvePublicEnv("PUBLIC_FORMS_WIDGET_BASE") || ""
  if (!base.startsWith("https://") || base.includes("localhost")) {
    throw new Error(
      `[astro] Com PUBLIC_FORMULARIO_GLOBAL=1 em build de produção, PUBLIC_FORMS_WIDGET_BASE deve começar com https:// e não conter localhost (recebido: ${JSON.stringify(base)}).`,
    )
  }
}

// Ilhas lead + mapa; shell/marketing entram depois.
export default defineConfig({
  srcDir: "src",
  integrations: [react()],
  server: {
    port: 4321,
    // Windows: sem host, Astro fica só em ::1 e Playwright/curl em 127.0.0.1 falham.
    host: true,
  },
  vite: {
    server: {
      proxy: {
        "/api": {
          target: process.env.VITE_API_PROXY_TARGET || "http://127.0.0.1:8787",
          changeOrigin: true,
        },
      },
    },
    resolve: {
      alias: {
        "@nature/shared": path.resolve(
          rootDir,
          "../../packages/shared/src/index.ts",
        ),
      },
    },
  },
})
