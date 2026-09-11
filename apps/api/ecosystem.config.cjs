/**
 * PM2 — Nature leads API (apps/api)
 *
 *   pnpm api:pm2:start && pnpm api:pm2:save
 *
 * VPS Linux: pm2 startup + comando sudo + pm2 save
 */
module.exports = {
  apps: [
    {
      name: "nature-api",
      script: "apps/api/server.ts",
      cwd: process.cwd(),
      interpreter: "node",
      interpreter_args:
        "--experimental-strip-types --experimental-transform-types",
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      max_restarts: 20,
      min_uptime: "5s",
      watch: false,
      env: {
        NODE_ENV: "production",
        LEADS_TABLE_NAME: "site_nature",
        PAGINA_ORIGEM: "Página de Vendas",
        ALLOWED_ORIGIN: "http://localhost:8443",
        API_PORT: "8787",
        REQUIRE_CONFIRMED_TABLE: "false",
      },
    },
  ],
}
