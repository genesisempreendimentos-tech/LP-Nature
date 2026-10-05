const path = require("node:path");

module.exports = {
  apps: [
    {
      name: "nature-api",
      cwd: path.resolve(__dirname, ".."),
      script: "apps/api/server.ts",
      interpreter: "node",
      interpreter_args: "--experimental-strip-types --experimental-transform-types",
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      max_restarts: 20,
      min_uptime: "5s",
      watch: false,
      max_memory_restart: "300M",
      env: {
        NODE_ENV: "production",
        API_PORT: "3103",
        ALLOWED_ORIGIN: "https://lp.residencialnature.com.br",
        PAGINA_ORIGEM: "Página de Vendas",
      },
    },
  ],
};
