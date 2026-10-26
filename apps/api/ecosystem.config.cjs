/**
 * PM2 — Nature leads API (apps/api)
 *
 *   pnpm api:pm2:start && pnpm api:pm2:save
 *
 * VPS Linux: pm2 startup + comando sudo + pm2 save
 *
 * Segredos (SUPABASE_*, DATABASE_URL, ALLOWED_ORIGIN, API_PORT) vêm do .env —
 * nunca versionar chaves aqui. Só defaults não-secretos de tracking.
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
        SITE_ID: "11",
        TRUST_PROXY: "true",
      },
    },
  ],
}
