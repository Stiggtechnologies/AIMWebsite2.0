/*
  # Fix RLS Policies for Anonymous Access

  ## Changes
  - Add SELECT policy for anonymous users on `events` table
  - Add SELECT policy for anonymous users on `ai_conversations` table
  
  This fixes the "table not found" errors which are actually RLS blocking access.
*/

-- Allow anonymous users to read events (needed for frontend event tracking)
CREATE POLICY "Anyone can read events"
  ON events FOR SELECT
  TO anon, authenticated
  USING (true);

-- Allow anonymous users to read AI conversations (needed for chat widget)
CREATE POLICY "Anyone can read AI conversations"
  ON ai_conversations FOR SELECT
  TO anon, authenticated
  USING (true);
