-- Store the Google click identifier on a website lead, so a booking verified
-- in AIM OS can be reported back to Google Ads against the click that caused it.
--
-- WHY THIS IS THE MISSING PIECE
-- crm_leads already carries utm_source/medium/campaign. UTMs tell you a lead
-- came from a paid campaign; they cannot tell Google WHICH CLICK produced it.
-- Google's bidding only learns from a conversion reported against the click id
-- it issued, so without these columns every web booking is invisible to the
-- optimiser and the campaign tunes itself toward clicks rather than patients.
--
-- The phone path already has this: call_tracking_calls.gclid feeds
-- supabase/functions/google-ads-conversion when the front desk tags a call
-- 'booked'. Web bookings had no equivalent, because the click id was never
-- captured. This is the web half of the same loop.
--
-- gbraid / wbraid are not optional extras: on iOS, app<->web journeys are
-- issued those INSTEAD of a gclid. Storing only gclid silently discards them,
-- and mobile is the majority of this clinic's paid traffic.

alter table public.crm_leads add column if not exists gclid  text;
alter table public.crm_leads add column if not exists gbraid text;
alter table public.crm_leads add column if not exists wbraid text;

comment on column public.crm_leads.gclid  is 'Google Ads click id captured on the website at landing. Used to upload an offline conversion once the lead is verified as booked in AIM OS.';
comment on column public.crm_leads.gbraid is 'Google Ads click id for iOS app-to-web journeys, issued instead of gclid.';
comment on column public.crm_leads.wbraid is 'Google Ads click id for iOS web-to-app journeys, issued instead of gclid.';

-- Conversion upload bookkeeping, mirroring call_tracking_calls so the retry
-- and failure semantics are identical on both paths rather than two dialects.
alter table public.crm_leads add column if not exists conversion_uploaded_at  timestamptz;
alter table public.crm_leads add column if not exists conversion_upload_error text;
alter table public.crm_leads add column if not exists conversion_attempts     integer not null default 0;

comment on column public.crm_leads.conversion_uploaded_at is 'When this lead''s conversion was accepted by Google Ads. NULL = not yet uploaded.';
comment on column public.crm_leads.conversion_upload_error is 'Last upload failure. Non-null with conversion_uploaded_at NULL means it needs a retry — never that the patient did not book.';

-- Partial index: the retry sweep only ever asks for leads that have a click id
-- and have not been uploaded yet. Keeping it partial keeps it small as
-- crm_leads grows, since the overwhelming majority of rows are already done.
create index if not exists idx_crm_leads_conversion_pending
  on public.crm_leads (created_at)
  where gclid is not null and conversion_uploaded_at is null;
