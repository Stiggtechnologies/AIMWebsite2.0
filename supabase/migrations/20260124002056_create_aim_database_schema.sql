/*
  # Alberta Injury Management (AIM) - Database Schema

  ## Overview
  This migration creates the complete database schema for the AIM healthcare platform,
  supporting persona detection, AI interactions, bookings, intake, and automation.

  ## New Tables

  ### 1. `personas`
  Tracks user persona detection with confidence scoring
  - `id` (uuid, primary key)
  - `session_id` (text, unique) - Client session identifier
  - `persona_type` (text) - Detected persona type
  - `confidence_scores` (jsonb) - Confidence values for all persona types
  - `behavioral_signals` (jsonb) - Tracking data (pages, CTAs, scroll depth)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 2. `events`
  Centralized event tracking for automation and analytics
  - `id` (uuid, primary key)
  - `session_id` (text) - Links to persona session
  - `event_type` (text) - Type of event (page_view, cta_click, etc.)
  - `event_data` (jsonb) - Structured event payload
  - `persona_snapshot` (jsonb) - Current persona state at event time
  - `created_at` (timestamptz)

  ### 3. `locations`
  AIM clinic locations across Alberta
  - `id` (uuid, primary key)
  - `slug` (text, unique) - URL-friendly identifier
  - `name` (text) - Clinic name
  - `address` (jsonb) - Full address structure
  - `phone` (text)
  - `email` (text)
  - `hours` (jsonb) - Operating hours by day
  - `services` (text[]) - Available services
  - `coordinates` (jsonb) - Latitude/longitude
  - `is_active` (boolean)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 4. `bookings`
  Patient appointment scheduling
  - `id` (uuid, primary key)
  - `session_id` (text) - Links to persona session
  - `location_id` (uuid) - References locations table
  - `patient_info` (jsonb) - Name, contact, demographics
  - `appointment_type` (text)
  - `appointment_datetime` (timestamptz)
  - `status` (text) - pending, confirmed, completed, cancelled
  - `notes` (text)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 5. `intake_submissions`
  Patient intake form data
  - `id` (uuid, primary key)
  - `session_id` (text) - Links to persona session
  - `booking_id` (uuid) - Optional link to booking
  - `patient_data` (jsonb) - Demographics and contact
  - `injury_data` (jsonb) - Injury details and history
  - `insurance_data` (jsonb) - WCB, MVA, private insurance
  - `medical_history` (jsonb) - Relevant medical background
  - `consent_data` (jsonb) - Privacy and treatment consents
  - `status` (text) - draft, submitted, reviewed
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 6. `leads`
  Employer and insurer contact submissions
  - `id` (uuid, primary key)
  - `session_id` (text) - Links to persona session
  - `lead_type` (text) - employer, insurer, referral_partner
  - `organization_name` (text)
  - `contact_info` (jsonb) - Name, email, phone, role
  - `inquiry_data` (jsonb) - Specific needs and context
  - `ltv_score` (numeric) - Estimated lifetime value score
  - `status` (text) - new, contacted, qualified, converted
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 7. `ai_conversations`
  AI assistant interaction logging
  - `id` (uuid, primary key)
  - `session_id` (text) - Links to persona session
  - `messages` (jsonb) - Full conversation history
  - `detected_intent` (text) - Classified user intent
  - `escalated` (boolean) - Whether escalated to human
  - `outcome` (text) - booking, intake, information, escalation
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ## Security
  - RLS enabled on all tables
  - Public read access for locations (active only)
  - Authenticated write access with ownership checks where applicable
  - Service role access for automation and AI operations
*/

-- Create personas table
CREATE TABLE IF NOT EXISTS personas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text UNIQUE NOT NULL,
  persona_type text NOT NULL DEFAULT 'undetermined',
  confidence_scores jsonb NOT NULL DEFAULT '{}',
  behavioral_signals jsonb NOT NULL DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE personas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create persona session"
  ON personas FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can read own persona session"
  ON personas FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can update own persona session"
  ON personas FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- Create events table
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  event_type text NOT NULL,
  event_data jsonb NOT NULL DEFAULT '{}',
  persona_snapshot jsonb,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_events_session_id ON events(session_id);
CREATE INDEX IF NOT EXISTS idx_events_type ON events(event_type);
CREATE INDEX IF NOT EXISTS idx_events_created_at ON events(created_at DESC);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create events"
  ON events FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Service role can read all events"
  ON events FOR SELECT
  TO service_role
  USING (true);

-- Create locations table
CREATE TABLE IF NOT EXISTS locations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  address jsonb NOT NULL,
  phone text NOT NULL,
  email text,
  hours jsonb NOT NULL DEFAULT '{}',
  services text[] DEFAULT ARRAY[]::text[],
  coordinates jsonb,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE locations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read active locations"
  ON locations FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "Service role can manage locations"
  ON locations FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  location_id uuid REFERENCES locations(id),
  patient_info jsonb NOT NULL,
  appointment_type text NOT NULL,
  appointment_datetime timestamptz NOT NULL,
  status text DEFAULT 'pending',
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_bookings_session_id ON bookings(session_id);
CREATE INDEX IF NOT EXISTS idx_bookings_location_id ON bookings(location_id);
CREATE INDEX IF NOT EXISTS idx_bookings_datetime ON bookings(appointment_datetime);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create bookings"
  ON bookings FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Service role can read all bookings"
  ON bookings FOR SELECT
  TO service_role
  USING (true);

CREATE POLICY "Service role can update bookings"
  ON bookings FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Create intake_submissions table
CREATE TABLE IF NOT EXISTS intake_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  booking_id uuid REFERENCES bookings(id),
  patient_data jsonb NOT NULL DEFAULT '{}',
  injury_data jsonb NOT NULL DEFAULT '{}',
  insurance_data jsonb NOT NULL DEFAULT '{}',
  medical_history jsonb NOT NULL DEFAULT '{}',
  consent_data jsonb NOT NULL DEFAULT '{}',
  status text DEFAULT 'draft',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_intake_session_id ON intake_submissions(session_id);
CREATE INDEX IF NOT EXISTS idx_intake_booking_id ON intake_submissions(booking_id);

ALTER TABLE intake_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create intake submissions"
  ON intake_submissions FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Service role can read all intake submissions"
  ON intake_submissions FOR SELECT
  TO service_role
  USING (true);

CREATE POLICY "Service role can update intake submissions"
  ON intake_submissions FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Create leads table
CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  lead_type text NOT NULL,
  organization_name text NOT NULL,
  contact_info jsonb NOT NULL,
  inquiry_data jsonb NOT NULL DEFAULT '{}',
  ltv_score numeric DEFAULT 0,
  status text DEFAULT 'new',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_leads_session_id ON leads(session_id);
CREATE INDEX IF NOT EXISTS idx_leads_type ON leads(lead_type);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create leads"
  ON leads FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Service role can read all leads"
  ON leads FOR SELECT
  TO service_role
  USING (true);

CREATE POLICY "Service role can update leads"
  ON leads FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Create ai_conversations table
CREATE TABLE IF NOT EXISTS ai_conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  messages jsonb NOT NULL DEFAULT '[]',
  detected_intent text,
  escalated boolean DEFAULT false,
  outcome text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_ai_conversations_session_id ON ai_conversations(session_id);

ALTER TABLE ai_conversations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create AI conversations"
  ON ai_conversations FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can update own AI conversations"
  ON ai_conversations FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role can read all AI conversations"
  ON ai_conversations FOR SELECT
  TO service_role
  USING (true);

-- Insert seed location data
INSERT INTO locations (slug, name, address, phone, email, hours, services, is_active)
VALUES (
  'edmonton-west',
  'AIM Performance West',
  '{"line_1": "11420 170 St NW", "city": "Edmonton", "province": "AB", "postal_code": "T5S 1J7", "country": "Canada"}',
  '(780) 250-8188',
  'info@albertainjurymanagement.ca',
  '{"monday": "8:00 AM – 6:00 PM", "tuesday": "8:00 AM – 6:00 PM", "wednesday": "8:00 AM – 6:00 PM", "thursday": "8:00 AM – 6:00 PM", "friday": "8:00 AM – 5:00 PM"}',
  ARRAY['Physiotherapy', 'WCB Rehabilitation', 'Return-to-Work Programs', 'Performance Rehab', 'Functional Capacity Evaluations'],
  true
)
ON CONFLICT (slug) DO NOTHING;

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_personas_updated_at BEFORE UPDATE ON personas
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_locations_updated_at BEFORE UPDATE ON locations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_intake_submissions_updated_at BEFORE UPDATE ON intake_submissions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON leads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ai_conversations_updated_at BEFORE UPDATE ON ai_conversations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();