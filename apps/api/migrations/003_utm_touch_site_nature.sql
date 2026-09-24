-- UTM first/last-touch em site_nature (Neon). Sem DEFAULT; tudo nullable.
ALTER TABLE site_nature
  ADD COLUMN IF NOT EXISTS utm_first_source text,
  ADD COLUMN IF NOT EXISTS utm_first_medium text,
  ADD COLUMN IF NOT EXISTS utm_first_campaign text,
  ADD COLUMN IF NOT EXISTS utm_first_term text,
  ADD COLUMN IF NOT EXISTS utm_first_content text,
  ADD COLUMN IF NOT EXISTS utm_first_landing_page text,
  ADD COLUMN IF NOT EXISTS utm_first_referrer text,
  ADD COLUMN IF NOT EXISTS utm_first_at timestamptz,
  ADD COLUMN IF NOT EXISTS utm_last_source text,
  ADD COLUMN IF NOT EXISTS utm_last_medium text,
  ADD COLUMN IF NOT EXISTS utm_last_campaign text,
  ADD COLUMN IF NOT EXISTS utm_last_term text,
  ADD COLUMN IF NOT EXISTS utm_last_content text,
  ADD COLUMN IF NOT EXISTS utm_last_landing_page text,
  ADD COLUMN IF NOT EXISTS utm_last_referrer text,
  ADD COLUMN IF NOT EXISTS utm_last_at timestamptz;
