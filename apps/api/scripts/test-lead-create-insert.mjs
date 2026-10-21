/**
 * Teste sem banco: INSERT de cadastro com pool SQL simulado.
 * Não abre HTTP nem toca DATABASE_URL.
 */
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import {
  buildLeadCreateQuery,
  insertLeadCreate,
  ORIGEM_DETALHE,
  ORIGEM_EMPREENDIMENTO,
  ORIGEM_TIPO,
} from "../leadCreateQuery.ts"

const __dirname = dirname(fileURLToPath(import.meta.url))
const serverSrc = readFileSync(join(__dirname, "../server.ts"), "utf8")

const utm_first = {
  source: "google",
  medium: "cpc",
  campaign: "nature",
  term: "apto",
  content: "ad1",
  landing_page: "/",
  referrer: "https://google.com/",
  captured_at: "2026-09-24T19:02:01.502Z",
}
const utm_last = {
  source: "meta",
  medium: "paid",
  campaign: "retarget",
  term: null,
  content: null,
  landing_page: "/contato",
  referrer: null,
  captured_at: "2026-09-24T19:02:36.102Z",
}

const payload = {
  nome: "Teste",
  email: "teste@example.com",
  telefone: "21999998888",
  utm_first,
  utm_last,
}

const { text, values } = buildLeadCreateQuery(payload)

assert.equal(
  text.includes("origem_empreendimento_interesse"),
  false,
  "INSERT não deve citar a coluna removida",
)
assert.match(text, /empreendimento_interesse/)
assert.match(text, /origem_tipo/)
assert.match(text, /origem_detalhe/)
assert.equal(ORIGEM_DETALHE, "lpe")
assert.equal(values[3], ORIGEM_EMPREENDIMENTO)
assert.equal(values[3], "Nature")
assert.equal(values[4], ORIGEM_TIPO)
assert.equal(values[4], "site")
assert.equal(values[5], "lpe")
assert.equal(values[6], "google")
assert.equal(values[7], "cpc")
assert.equal(values[8], "nature")
assert.equal(values[9], "apto")
assert.equal(values[10], "ad1")
assert.equal(values[11], "/")
assert.equal(values[12], "https://google.com/")
assert.equal(values[13], "2026-09-24T19:02:01.502Z")
assert.equal(values[14], "meta")
assert.equal(values[15], "paid")
assert.equal(values[16], "retarget")
assert.equal(values[17], null)
assert.equal(values[18], null)
assert.equal(values[19], "/contato")
assert.equal(values[20], null)
assert.equal(values[21], "2026-09-24T19:02:36.102Z")
assert.equal(values.length, 22)

const fakeId = "11111111-2222-4333-8444-555555555555"
const okPool = {
  async query(sql, vals) {
    assert.equal(sql.includes("origem_empreendimento_interesse"), false)
    assert.equal(vals[5], "lpe")
    assert.equal(vals[3], "Nature")
    return { rows: [{ id: fakeId }] }
  },
}
const ok = await insertLeadCreate(okPool, payload)
assert.deepEqual(ok, { id: fakeId })

const errPool = {
  async query() {
    throw Object.assign(new Error("simulated"), { code: "42703" })
  },
}
const err = await insertLeadCreate(errPool, payload)
assert.equal(err.status, 500)
assert.match(err.error, /Erro ao salvar/)

const emptyPool = {
  async query() {
    return { rows: [{}] }
  },
}
const empty = await insertLeadCreate(emptyPool, payload)
assert.equal(empty.status, 500)

assert.match(
  serverSrc,
  /origem_detalhe = \$\$\{i \+ 2\}/,
  "PATCH wizard ainda filtra por origem_detalhe",
)
assert.match(serverSrc, /values\.push\(id, ORIGEM_TIPO, ORIGEM_DETALHE\)/)
assert.match(serverSrc, /insertLeadCreate/)
assert.equal(
  serverSrc.includes("origem_empreendimento_interesse"),
  false,
  "server.ts não deve citar a coluna removida",
)
assert.match(serverSrc, /ORIGEM_DETALHE/)

console.log("test-lead-create-insert: ok")
