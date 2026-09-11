import pg from "pg"

const { Pool } = pg

const globalForPg = globalThis

/**
 * Lê DATABASE_URL de process.env.
 * Corrige cola acidental `DATABASE_URL=DATABASE_URL=postgresql://...`
 * (prefixo duplicado da chave no valor) sem logar o segredo.
 */
function resolveDatabaseUrl() {
  let connectionString = process.env.DATABASE_URL
  if (!connectionString) return null
  if (connectionString.startsWith("DATABASE_URL=")) {
    connectionString = connectionString.slice("DATABASE_URL=".length)
  }
  return connectionString
}

/** Pool Postgres — só process.env (nunca import.meta.env). */
export function getPool() {
  const connectionString = resolveDatabaseUrl()
  if (!connectionString) {
    throw new Error(
      "[nature-api] DATABASE_URL não definido. Copie .env.example → .env (dev local).",
    )
  }

  if (!globalForPg.__naturePgPool) {
    globalForPg.__naturePgPool = new Pool({
      connectionString,
      ssl: connectionString.includes("localhost")
        ? false
        : { rejectUnauthorized: false },
      max: 10,
    })
  }

  return globalForPg.__naturePgPool
}

export function getLeadsTableName() {
  const name = process.env.LEADS_TABLE_NAME?.trim()
  if (!name) {
    throw new Error("[nature-api] LEADS_TABLE_NAME não definido.")
  }
  if (
    process.env.REQUIRE_CONFIRMED_TABLE === "true" &&
    /SUBSTITUIR|PLACEHOLDER|TODO/i.test(name)
  ) {
    throw new Error(
      "[nature-api] LEADS_TABLE_NAME ainda é placeholder. Admin Neon deve confirmar o nome.",
    )
  }
  if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(name)) {
    throw new Error(
      "[nature-api] LEADS_TABLE_NAME inválido (use apenas [a-zA-Z0-9_]).",
    )
  }
  return name
}
