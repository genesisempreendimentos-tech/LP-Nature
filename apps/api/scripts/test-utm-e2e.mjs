import pg from "pg"
import { createClient } from "@supabase/supabase-js"
import { readFileSync } from "fs"
import { randomUUID } from "crypto"

const env = readFileSync(".env", "utf8")
const get = (k) => env.match(new RegExp(`^${k}=(.+)$`, "m"))?.[1]?.trim()

const utm_first = {
  source: "teste",
  medium: "cpc",
  campaign: "abc",
  term: null,
  content: null,
  landing_page: "/",
  referrer: null,
  captured_at: "2026-09-24T19:02:01.502Z",
}
const utm_last = {
  source: "outro",
  medium: "cpc",
  campaign: "xyz",
  term: null,
  content: null,
  landing_page: "/",
  referrer: null,
  captured_at: "2026-09-24T19:02:36.102Z",
}

const email = `utm.test.${Date.now()}@example.com`
const leadRes = await fetch("http://127.0.0.1:8787/api/leads", {
  method: "POST",
  headers: { "Content-Type": "application/json", Origin: "http://localhost:4321" },
  body: JSON.stringify({
    nome: "UTM Teste",
    email,
    telefone: "21999998888",
    utm_first,
    utm_last,
  }),
})
const leadBody = await leadRes.json()
console.log("lead status", leadRes.status, leadBody)

const pool = new pg.Pool({
  connectionString: get("DATABASE_URL"),
  ssl: { rejectUnauthorized: false },
})
const leadRow = await pool.query(
  `SELECT utm_first_source, utm_first_campaign, utm_last_source, utm_last_campaign, canal, parameter
   FROM site_nature WHERE id = $1`,
  [leadBody.id],
)
console.log("site_nature row", leadRow.rows[0])
await pool.end()

const trackRes = await fetch("http://127.0.0.1:8787/api/tracking", {
  method: "POST",
  headers: { "Content-Type": "application/json", Origin: "http://localhost:4321" },
  body: JSON.stringify({
    consentimento: "negado",
    sessao_id: randomUUID(),
    traffic_type: 9,
    origem_captura: "navegador",
    criado_em: new Date().toISOString(),
    pagina: "/",
    origem: "direto",
    utm_first,
    utm_last,
  }),
})
const trackBody = await trackRes.json()
console.log("tracking status", trackRes.status, trackBody)

const supabase = createClient(get("SUPABASE_URL"), get("SUPABASE_SERVICE_ROLE_KEY"))
const { data: acesso, error } = await supabase
  .from("acessos_nature")
  .select(
    "utm_first_source, utm_first_campaign, utm_last_source, utm_last_campaign",
  )
  .eq("id", trackBody.id)
  .single()
console.log("acessos_nature row", acesso, error)
