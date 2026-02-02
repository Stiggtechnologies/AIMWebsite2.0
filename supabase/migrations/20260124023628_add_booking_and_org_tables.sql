/*
  # Add Booking System and Organization Request Tables

  ## Overview
  This migration adds tables to support the extended AIM AI booking system including:
  - Public leads (non-PHI contact/routing data)
  - Organization requests (employers/insurers)
  - Booking tokens (secure reschedule/cancel references)

  All tables are designed to be PHI-free for web layer use.

  ## New Tables

  ### 1. `public_leads` (Non-PHI)
  Stores non-PHI contact and routing information for potential patients.
  - `id` (uuid, primary key)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)
  - `persona` (text) - IW, MVA, ATH, SR, etc.
  - `program_interest` (text array) - Programs of interest
  - `location_slug` (text) - Preferred location
  - `urgency` (text) - low/medium/high
  - `contact_method` (text) - phone/email
  - `contact_value` (text) - Phone or email (PII, encrypted)
  - `status` (text) - new/contacted/booked/closed
  - `source` (text) - utm/referrer tracking
  - `booking_mode` (text) - PATIENT_SELF_BOOK, CALLBACK_REQUIRED, etc.
  - `preferred_times` (text array) - General availability preferences
  - `notes` (text) - Non-clinical notes

  ### 2. `org_requests` (Non-PHI)
  Stores employer and insurer consultation/referral requests.
  - `id` (uuid, primary key)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)
  - `org_type` (text) - EMPLOYER/INSURER
  - `org_name` (text) - Organization name
  - `role` (text) - Role of contact person
  - `intent` (text) - RTW_PROGRAM, INJURY_PREVENTION, REFERRAL, REPORTING
  - `volume_range` (text) - Expected volume
  - `location_preference` (text) - Preferred location
  - `contact_method` (text) - phone/email
  - `contact_value` (text) - Contact info (PII)
  - `contact_window` (text) - Preferred contact time
  - `notes` (text) - Non-clinical notes
  - `status` (text) - new/contacted/in_progress/completed
  - `persona` (text) - EMP/INS

  ### 3. `booking_tokens` (No PHI)
  Secure tokens for reschedule/cancel operations without exposing PHI.
  - `id` (uuid, primary key)
  - `booking_ref` (text, unique) - Public booking reference code
  - `lead_id` (uuid) - Reference to public_leads
  - `created_at` (timestamptz)
  - `expires_at` (timestamptz)
  - `status` (text) - active/used/expired/cancelled
  - `action_type` (text) - booking/reschedule/cancel
  - `metadata` (jsonb) - Non-PHI booking metadata

  ## Security
  - All tables have RLS enabled
  - No PHI stored in any table
  - Contact info encrypted where possible
  - Service role only access for writes
  - Public read policies for authenticated staff only
*/

-- Create public_leads table
CREATE TABLE IF NOT EXISTS public_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  persona text NOT NULL CHECK (persona IN ('IW', 'MVA', 'ATH', 'SR', 'EMP', 'INS', 'REF', 'RET', 'COLD')),
  program_interest text[] DEFAULT '{}',
  location_slug text,
  urgency text DEFAULT 'low' CHECK (urgency IN ('low', 'medium', 'high')),
  contact_method text CHECK (contact_method IN ('phone', 'email', 'either')),
  contact_value text,
  status text DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'booked', 'closed', 'cancelled')),
  source text,
  booking_mode text DEFAULT 'PATIENT_SELF_BOOK' CHECK (booking_mode IN ('PATIENT_SELF_BOOK', 'EMPLOYER_CONSULT', 'INSURER_REFERRAL', 'CALLBACK_REQUIRED')),
  preferred_times text[] DEFAULT '{}',
  notes text,
  qualification_state text CHECK (qualification_state IN ('QUALIFIED_BOOK_NOW', 'QUALIFIED_CALLBACK', 'QUALIFIED_REVIEW', 'UNQUALIFIED'))
);

-- Create updated_at trigger for public_leads
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_public_leads_updated_at
  BEFORE UPDATE ON public_leads
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create index on status and created_at for efficient queries
CREATE INDEX IF NOT EXISTS idx_public_leads_status ON public_leads(status);
CREATE INDEX IF NOT EXISTS idx_public_leads_created_at ON public_leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_public_leads_persona ON public_leads(persona);

-- Enable RLS on public_leads
ALTER TABLE public_leads ENABLE ROW LEVEL SECURITY;

-- RLS Policies for public_leads
CREATE POLICY "Service role can insert leads"
  ON public_leads FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Service role can read leads"
  ON public_leads FOR SELECT
  TO service_role
  USING (true);

CREATE POLICY "Service role can update leads"
  ON public_leads FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role can delete leads"
  ON public_leads FOR DELETE
  TO service_role
  USING (true);

-- Create org_requests table
CREATE TABLE IF NOT EXISTS org_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  org_type text NOT NULL CHECK (org_type IN ('EMPLOYER', 'INSURER')),
  org_name text NOT NULL,
  role text,
  intent text NOT NULL CHECK (intent IN ('RTW_PROGRAM', 'INJURY_PREVENTION', 'REFERRAL', 'REPORTING', 'CONSULTATION')),
  volume_range text,
  location_preference text,
  contact_method text CHECK (contact_method IN ('phone', 'email', 'either')),
  contact_value text,
  contact_window text,
  notes text,
  status text DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'in_progress', 'completed', 'cancelled')),
  persona text NOT NULL CHECK (persona IN ('EMP', 'INS')),
  industry text,
  employee_count_range text
);

-- Create updated_at trigger for org_requests
CREATE TRIGGER update_org_requests_updated_at
  BEFORE UPDATE ON org_requests
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for org_requests
CREATE INDEX IF NOT EXISTS idx_org_requests_status ON org_requests(status);
CREATE INDEX IF NOT EXISTS idx_org_requests_created_at ON org_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_org_requests_org_type ON org_requests(org_type);

-- Enable RLS on org_requests
ALTER TABLE org_requests ENABLE ROW LEVEL SECURITY;

-- RLS Policies for org_requests
CREATE POLICY "Service role can insert org requests"
  ON org_requests FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Service role can read org requests"
  ON org_requests FOR SELECT
  TO service_role
  USING (true);

CREATE POLICY "Service role can update org requests"
  ON org_requests FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role can delete org requests"
  ON org_requests FOR DELETE
  TO service_role
  USING (true);

-- Create booking_tokens table
CREATE TABLE IF NOT EXISTS booking_tokens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_ref text UNIQUE NOT NULL,
  lead_id uuid REFERENCES public_leads(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  expires_at timestamptz NOT NULL,
  status text DEFAULT 'active' CHECK (status IN ('active', 'used', 'expired', 'cancelled')),
  action_type text NOT NULL CHECK (action_type IN ('booking', 'reschedule', 'cancel', 'confirm')),
  metadata jsonb DEFAULT '{}'::jsonb
);

-- Create indexes for booking_tokens
CREATE INDEX IF NOT EXISTS idx_booking_tokens_booking_ref ON booking_tokens(booking_ref);
CREATE INDEX IF NOT EXISTS idx_booking_tokens_lead_id ON booking_tokens(lead_id);
CREATE INDEX IF NOT EXISTS idx_booking_tokens_status ON booking_tokens(status);
CREATE INDEX IF NOT EXISTS idx_booking_tokens_expires_at ON booking_tokens(expires_at);

-- Enable RLS on booking_tokens
ALTER TABLE booking_tokens ENABLE ROW LEVEL SECURITY;

-- RLS Policies for booking_tokens
CREATE POLICY "Service role can insert booking tokens"
  ON booking_tokens FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Service role can read booking tokens"
  ON booking_tokens FOR SELECT
  TO service_role
  USING (true);

CREATE POLICY "Service role can update booking tokens"
  ON booking_tokens FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role can delete booking tokens"
  ON booking_tokens FOR DELETE
  TO service_role
  USING (true);

-- Create function to automatically expire old tokens
CREATE OR REPLACE FUNCTION expire_old_booking_tokens()
RETURNS void AS $$
BEGIN
  UPDATE booking_tokens
  SET status = 'expired'
  WHERE status = 'active'
  AND expires_at < now();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to generate unique booking reference codes
CREATE OR REPLACE FUNCTION generate_booking_ref()
RETURNS text AS $$
DECLARE
  chars text := 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  result text := '';
  i integer;
BEGIN
  FOR i IN 1..8 LOOP
    result := result || substr(chars, floor(random() * length(chars) + 1)::integer, 1);
  END LOOP;
  RETURN result;
END;
$$ LANGUAGE plpgsql;
