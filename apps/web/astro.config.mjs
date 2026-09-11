import path from "node:path"
import { fileURLToPath } from "node:url"
import { defineConfig } from "astro/config"
import react from "@astrojs/react"

const rootDir = path.dirname(fileURLToPath(import.meta.url))

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
