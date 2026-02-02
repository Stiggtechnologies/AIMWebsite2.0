/*
  # Create Reviews System

  ## Description
  Creates a structured reviews system to support contextual display of Google reviews
  across service pages, personas, and AI assistant integration.

  ## New Tables
    - `reviews`
      - `id` (uuid, primary key)
      - `reviewer_name` (text) - Name of reviewer
      - `rating` (integer) - 1-5 star rating
      - `excerpt` (text) - Short version for display
      - `full_text` (text) - Complete review text
      - `source` (text) - 'Google', 'Direct', etc.
      - `source_url` (text) - Link to original review
      - `service_tags` (text[]) - Array of service types
      - `persona_tags` (text[]) - Array of persona types
      - `is_featured` (boolean) - Featured on homepage
      - `show_in_transparency` (boolean) - Use in transparency section
      - `published_at` (timestamptz) - Original review date
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  ## Security
    - Enable RLS on `reviews` table
    - Public read access (reviews are public)
    - Admin-only write access

  ## Notes
    - Reviews are publicly readable to support SEO and AI search
    - service_tags enable filtering by service page
    - persona_tags enable AI assistant contextual matching
    - Supports both positive and challenging reviews for transparency
*/

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reviewer_name text NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  excerpt text NOT NULL,
  full_text text,
  source text DEFAULT 'Google',
  source_url text,
  service_tags text[] DEFAULT '{}',
  persona_tags text[] DEFAULT '{}',
  is_featured boolean DEFAULT false,
  show_in_transparency boolean DEFAULT false,
  published_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Public read access (reviews are public content)
CREATE POLICY "Reviews are publicly readable"
  ON reviews
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Only authenticated service role can manage reviews
CREATE POLICY "Service role can manage reviews"
  ON reviews
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_reviews_service_tags ON reviews USING gin(service_tags);
CREATE INDEX IF NOT EXISTS idx_reviews_persona_tags ON reviews USING gin(persona_tags);
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON reviews(rating);
CREATE INDEX IF NOT EXISTS idx_reviews_featured ON reviews(is_featured) WHERE is_featured = true;
