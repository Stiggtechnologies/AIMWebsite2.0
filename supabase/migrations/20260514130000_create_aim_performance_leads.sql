/*
  # Create aim_performance_leads table

  ## Description
  Stores lead-form submissions from the AIM Performance South Common landing
  page (path: /aim-performance-south-common).

  ## New Tables
    - `aim_performance_leads`
      - `id` (uuid, primary key)
      - `created_at` (timestamptz)
      - `first_name` (text, NOT NULL)
      - `last_name` (text)
      - `email` (text, NOT NULL)
      - `phone` (text)
      - `is_evolve_member` (text)
      - `interests` (text[], NOT NULL, default `'{}'`)
      - `preferred_contact_method` (text)
      - `message` (text)
      - `consent_given` (boolean, NOT NULL, default false)
      - `source` (text, default
        `'aim-performance-south-common-landing-page'`)
      - `utm_source` (text)
      - `utm_medium` (text)
      - `utm_campaign` (text)
      - `utm_content` (text)
      - `utm_term` (text)
      - `status` (text, default `'new'`)
      - `notes` (text)

  ## Security
    - RLS enabled.
    - No anon/authenticated policies. All client writes must go through
      `POST /api/aim-performance/leads`, which uses the service role on
      the server. This matches the security model established in
      `20260127091906_fix_security_issues.sql`.
    - Service role bypasses RLS automatically; explicit service role
      policies are added for clarity/auditability.

  ## Notes
    - `consent_given` defaults to `false` so a missing value is never
      treated as consent; the API enforces `consent_given = true` before
      insert.
    - `interests` is an array so a single lead can express multiple
      areas of interest in one submission.
    - `status` is a free-form text column today; values are
      `'new' | 'contacted' | 'qualified' | 'won' | 'lost'` by convention.
*/

-- Create the table
CREATE TABLE IF NOT EXISTS aim_performance_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  first_name text NOT NULL,
  last_name text,
  email text NOT NULL,
  phone text,
  is_evolve_member text,
  interests text[] NOT NULL DEFAULT '{}',
  preferred_contact_method text,
  message text,
  consent_given boolean NOT NULL DEFAULT false,
  source text DEFAULT 'aim-performance-south-common-landing-page',
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  utm_term text,
  status text NOT NULL DEFAULT 'new',
  notes text
);

-- Indexes for the queries an admin / ops dashboard is most likely to run.
-- Keeping these minimal per the lesson in 20260127091906_fix_security_issues.sql
-- (unused indexes are storage / write cost without benefit).
CREATE INDEX IF NOT EXISTS idx_aim_performance_leads_created_at
  ON aim_performance_leads (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_aim_performance_leads_status
  ON aim_performance_leads (status);

-- Enable RLS
ALTER TABLE aim_performance_leads ENABLE ROW LEVEL SECURITY;

-- No anon / authenticated policies. All client operations route through
-- /api/aim-performance/leads using the service role on the server.

-- Explicit service_role policies (service_role bypasses RLS automatically,
-- but we declare them here so the security posture is greppable).
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'aim_performance_leads'
      AND policyname = 'Service role can manage AIM Performance leads'
  ) THEN
    CREATE POLICY "Service role can manage AIM Performance leads"
      ON aim_performance_leads
      FOR ALL
      TO service_role
      USING (true)
      WITH CHECK (true);
  END IF;
END $$;
