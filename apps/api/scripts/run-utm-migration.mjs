import pg from "pg"
import { readFileSync } from "fs"

const env = readFileSync(".env", "utf8")
const url = env.match(/^DATABASE_URL=(.+)$/m)?.[1]?.trim()
const sql = readFileSync("apps/api/migrations/003_utm_touch_site_nature.sql", "utf8")
const pool = new pg.Pool({ connectionString: url, ssl: { rejectUnauthorized: false } })
await pool.query(sql)
const cols = await pool.query(
  `SELECT column_name FROM information_schema.columns
   WHERE table_name = 'site_nature' AND column_name LIKE 'utm_%'
   ORDER BY 1`,
)
console.log(
  "site_nature utm cols:",
  cols.rows.map((r) => r.column_name).join(", "),
)
await pool.end()
