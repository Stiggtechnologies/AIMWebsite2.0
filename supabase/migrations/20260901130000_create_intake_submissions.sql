-- Creates public.intake_submissions, the table app/api/intake/save/route.ts has
-- written to since this repository began and which has never existed in
-- production.
--
-- WHY THIS IS NEEDED
-- The table is already declared in 20260124002056_create_aim_database_schema.sql.
-- That migration is recorded as applied while none of its objects exist — the
-- same "ledger lies" drift seen in AIM OS, where deploy tooling skips a
-- migration forever because schema_migrations says it is done. Proof that the
-- whole migration is missing, not just this table: public.bookings and
-- public.leads are absent too (PostgREST answers PGRST205 for all three).
--
-- The user-visible effect was a hard failure, not silent loss: PostgREST returns
-- PGRST205, the route surfaces it, and every visitor who tried to complete an
-- intake got HTTP 500 "Failed to create intake". Verified against production on
-- 2026-09-01 before this migration.
--
-- WHY NOT booking_intake_submissions
-- A table by that name does exist here, but it belongs to AIM OS's native
-- booking engine (created by 20260223160000_create_native_booking_schema.sql in
-- the AIMOS repo), is empty, and has a different shape — no patient_data column.
-- Repointing the website at another system's table would couple two unrelated
-- flows and silently change what the column names mean. The website keeps its
-- own table.
--
-- DELIBERATE DIFFERENCES FROM THE 20260124002056 DECLARATION
--   * The `booking_id uuid REFERENCES bookings(id)` foreign key is created
--     WITHOUT the reference, because public.bookings does not exist. The column
--     is kept so the shape matches the original intent and a constraint can be
--     added later; inventing a FK to a missing table would just fail.
--   * No trigger on updated_at. The original attached one to the shared
--     update_updated_at_column() function; that function is used by other
--     tables, and CREATE OR REPLACE on it from here could change behaviour
--     elsewhere. The route already sets updated_at explicitly on update.
--   * The original's "Anyone can create intake submissions" policy
--     (TO anon, authenticated WITH CHECK (true)) is NOT recreated. It was
--     already revoked by 20260127091906_fix_security_issues.sql, and this table
--     holds patient names, injury detail and medical history.
--
-- Additive and idempotent: safe to re-run.

create table if not exists public.intake_submissions (
  id              uuid primary key default gen_random_uuid(),
  session_id      text not null,
  booking_id      uuid,
  patient_data    jsonb not null default '{}'::jsonb,
  injury_data     jsonb not null default '{}'::jsonb,
  insurance_data  jsonb not null default '{}'::jsonb,
  medical_history jsonb not null default '{}'::jsonb,
  consent_data    jsonb not null default '{}'::jsonb,
  status          text not null default 'draft',
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

comment on table public.intake_submissions is
  'Patient intake submitted from the public website (/intake/form). Written server-side by app/api/intake/save/route.ts using the service-role key. Contains PHI: patient details, injury data and medical history.';

create index if not exists idx_intake_session_id
  on public.intake_submissions (session_id);

create index if not exists idx_intake_status_created_at
  on public.intake_submissions (status, created_at desc);

alter table public.intake_submissions enable row level security;

-- RLS on with NO policies for anon or authenticated is the point, not an
-- oversight. The only writer is the server route, which uses the service-role
-- key and bypasses RLS. Anything reaching PostgREST with the public anon key
-- gets nothing — which is the correct posture for a table of medical history.
-- Do not add a permissive policy here to "make something work"; if a signed-in
-- app needs this data, give it a clinic-scoped policy deliberately.
