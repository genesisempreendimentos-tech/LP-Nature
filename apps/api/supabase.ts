import { createClient, type SupabaseClient } from "@supabase/supabase-js"

let client: SupabaseClient | null = null

/**
 * Client admin (service role) — somente apps/api.
 * Nunca importar este módulo em apps/web.
 */
export function getSupabaseAdmin(): SupabaseClient | null {
  const url = process.env.SUPABASE_URL?.trim()
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()
  if (!url || !key) {
    console.warn(
      "[nature-api] SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY ausentes — tracking sem persistência.",
    )
    return null
  }
  if (!client) {
    client = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
    })
  }
  return client
}
