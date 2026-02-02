/*
  # Fix Critical Security Issues

  ## Overview
  This migration addresses critical security vulnerabilities identified in the database:
  1. RLS policies that bypass security with USING (true) or WITH CHECK (true)
  2. Functions with mutable search paths
  3. Unused database indexes

  ## Changes

  ### 1. RLS Policy Security Fixes
  
  **Problem**: Multiple tables had RLS policies using `USING (true)` which bypasses all security.
  
  **Solution**: Since this is an anonymous booking system without user authentication, we:
  - Remove overly permissive anon/authenticated policies
  - Keep only service_role policies (backend operations via API routes)
  - All client operations must go through API routes that validate session IDs
  
  Tables fixed:
  - `personas` - Removed anon/authenticated policies
  - `events` - Removed anon/authenticated INSERT policy
  - `bookings` - Removed anon/authenticated INSERT policy
  - `intake_submissions` - Removed anon/authenticated INSERT policy
  - `leads` - Removed anon/authenticated INSERT policy
  - `ai_conversations` - Removed anon/authenticated INSERT/UPDATE/SELECT policies

  ### 2. Function Security Fixes
  
  **Problem**: Functions had role mutable search_path which could be exploited.
  
  **Solution**: Recreate functions with explicit `SET search_path = public` to prevent schema injection.
  
  Functions fixed:
  - `update_updated_at_column()`
  - `expire_old_booking_tokens()`
  - `generate_booking_ref()`

  ### 3. Performance Optimization
  
  **Problem**: Multiple unused indexes consuming storage and slowing writes.
  
  **Solution**: Remove indexes that are not being used by queries.
  
  Indexes removed:
  - `idx_events_session_id`, `idx_events_type`, `idx_events_created_at`
  - `idx_bookings_session_id`, `idx_bookings_location_id`, `idx_bookings_datetime`
  - `idx_intake_session_id`, `idx_intake_booking_id`
  - `idx_leads_session_id`, `idx_leads_type`, `idx_leads_status`
  - `idx_public_leads_status`, `idx_public_leads_created_at`, `idx_public_leads_persona`
  - `idx_org_requests_status`, `idx_org_requests_created_at`, `idx_org_requests_org_type`
  - `idx_booking_tokens_booking_ref`, `idx_booking_tokens_lead_id`, `idx_booking_tokens_status`, `idx_booking_tokens_expires_at`

  Note: Keep only `idx_ai_conversations_session_id` as it may be used for AI queries.

  ## Security Notes
  
  - All client-side database operations must now go through API routes
  - API routes must validate session IDs and implement business logic
  - Service role credentials must be kept secure (environment variables only)
  - This change enforces proper security architecture
*/

-- ============================================================================
-- 1. DROP INSECURE RLS POLICIES
-- ============================================================================

-- Drop insecure policies on personas
DROP POLICY IF EXISTS "Anyone can create persona session" ON personas;
DROP POLICY IF EXISTS "Anyone can read own persona session" ON personas;
DROP POLICY IF EXISTS "Anyone can update own persona session" ON personas;

-- Add secure service role policies for personas
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
    AND tablename = 'personas' 
    AND policyname = 'Service role can manage personas'
  ) THEN
    CREATE POLICY "Service role can manage personas"
      ON personas FOR ALL
      TO service_role
      USING (true)
      WITH CHECK (true);
  END IF;
END $$;

-- Drop insecure policies on events
DROP POLICY IF EXISTS "Anyone can create events" ON events;
DROP POLICY IF EXISTS "Anyone can read events" ON events;

-- Service role policy for events already exists from initial migration

-- Drop insecure policies on bookings
DROP POLICY IF EXISTS "Anyone can create bookings" ON bookings;

-- Service role policies for bookings already exist from initial migration

-- Drop insecure policies on intake_submissions
DROP POLICY IF EXISTS "Anyone can create intake submissions" ON intake_submissions;

-- Service role policies for intake_submissions already exist from initial migration

-- Drop insecure policies on leads
DROP POLICY IF EXISTS "Anyone can create leads" ON leads;

-- Service role policies for leads already exist from initial migration

-- Drop insecure policies on ai_conversations
DROP POLICY IF EXISTS "Anyone can create AI conversations" ON ai_conversations;
DROP POLICY IF EXISTS "Anyone can update own AI conversations" ON ai_conversations;
DROP POLICY IF EXISTS "Anyone can read AI conversations" ON ai_conversations;

-- Add secure service role policy for ai_conversations
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
    AND tablename = 'ai_conversations' 
    AND policyname = 'Service role can manage AI conversations'
  ) THEN
    CREATE POLICY "Service role can manage AI conversations"
      ON ai_conversations FOR ALL
      TO service_role
      USING (true)
      WITH CHECK (true);
  END IF;
END $$;

-- ============================================================================
-- 2. FIX FUNCTION SEARCH PATH VULNERABILITIES
-- ============================================================================

-- Recreate update_updated_at_column with secure search_path
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Recreate expire_old_booking_tokens with secure search_path
CREATE OR REPLACE FUNCTION expire_old_booking_tokens()
RETURNS void AS $$
BEGIN
  UPDATE booking_tokens
  SET status = 'expired'
  WHERE status = 'active'
  AND expires_at < now();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Recreate generate_booking_ref with secure search_path
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
$$ LANGUAGE plpgsql SET search_path = public;

-- ============================================================================
-- 3. DROP UNUSED INDEXES
-- ============================================================================

-- Drop unused indexes on events
DROP INDEX IF EXISTS idx_events_session_id;
DROP INDEX IF EXISTS idx_events_type;
DROP INDEX IF EXISTS idx_events_created_at;

-- Drop unused indexes on bookings
DROP INDEX IF EXISTS idx_bookings_session_id;
DROP INDEX IF EXISTS idx_bookings_location_id;
DROP INDEX IF EXISTS idx_bookings_datetime;

-- Drop unused indexes on intake_submissions
DROP INDEX IF EXISTS idx_intake_session_id;
DROP INDEX IF EXISTS idx_intake_booking_id;

-- Drop unused indexes on leads
DROP INDEX IF EXISTS idx_leads_session_id;
DROP INDEX IF EXISTS idx_leads_type;
DROP INDEX IF EXISTS idx_leads_status;

-- Drop unused indexes on public_leads
DROP INDEX IF EXISTS idx_public_leads_status;
DROP INDEX IF EXISTS idx_public_leads_created_at;
DROP INDEX IF EXISTS idx_public_leads_persona;

-- Drop unused indexes on org_requests
DROP INDEX IF EXISTS idx_org_requests_status;
DROP INDEX IF EXISTS idx_org_requests_created_at;
DROP INDEX IF EXISTS idx_org_requests_org_type;

-- Drop unused indexes on booking_tokens
DROP INDEX IF EXISTS idx_booking_tokens_booking_ref;
DROP INDEX IF EXISTS idx_booking_tokens_lead_id;
DROP INDEX IF EXISTS idx_booking_tokens_status;
DROP INDEX IF EXISTS idx_booking_tokens_expires_at;

-- Keep idx_ai_conversations_session_id as it may be used for AI lookups