/**
 * Cliente Supabase REST via fetch — sem @supabase/supabase-js.
 * Env lido em runtime: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY.
 */

function getConfig(): { url: string; key: string } {
  const url = process.env.SUPABASE_URL?.trim()
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()
  if (!url || !key) {
    throw new Error(
      "SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY ausentes — tracking sem persistência.",
    )
  }
  return { url: url.replace(/\/$/, ""), key }
}

function headers(prefer?: string): Record<string, string> {
  const { key } = getConfig()
  const h: Record<string, string> = {
    apikey: key,
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
  }
  if (prefer) h.Prefer = prefer
  return h
}

async function throwIfNotOk(res: Response, label: string): Promise<void> {
  if (res.ok) return
  const body = await res.text().catch(() => "")
  throw new Error(`${label} falhou: ${res.status} ${body}`)
}

export async function supabaseInsert(
  table: string,
  row: Record<string, unknown>,
): Promise<void> {
  const { url } = getConfig()
  const res = await fetch(`${url}/rest/v1/${table}`, {
    method: "POST",
    headers: headers("return=minimal"),
    body: JSON.stringify(row),
  })
  await throwIfNotOk(res, `INSERT ${table}`)
}

export async function supabaseUpdateById(
  table: string,
  id: string,
  patch: Record<string, unknown>,
  filtro?: string,
): Promise<void> {
  const { url } = getConfig()
  let qs = `id=eq.${encodeURIComponent(id)}`
  if (filtro) qs += `&${filtro}`
  const res = await fetch(`${url}/rest/v1/${table}?${qs}`, {
    method: "PATCH",
    headers: headers("return=minimal"),
    body: JSON.stringify(patch),
  })
  await throwIfNotOk(res, `PATCH ${table}`)
}

export async function supabaseSelect<T>(
  table: string,
  query: string,
): Promise<T[]> {
  const { url } = getConfig()
  const q = query.startsWith("?") ? query.slice(1) : query
  const res = await fetch(`${url}/rest/v1/${table}?${q}`, {
    method: "GET",
    headers: headers(),
  })
  await throwIfNotOk(res, `SELECT ${table}`)
  const data = (await res.json()) as T[]
  return Array.isArray(data) ? data : []
}

export async function supabaseRpc(
  funcao: string,
  params: Record<string, unknown>,
): Promise<void> {
  const { url } = getConfig()
  const res = await fetch(`${url}/rest/v1/rpc/${funcao}`, {
    method: "POST",
    headers: headers("return=minimal"),
    body: JSON.stringify(params),
  })
  await throwIfNotOk(res, `RPC ${funcao}`)
}
