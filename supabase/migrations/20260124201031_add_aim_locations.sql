/*
  # Add AIM Official Locations

  1. Purpose
    - Insert official AIM location data with geo-coordinates
    - Establish Main Hub Clinic as central intake coordinator
    - Add AIM Performance West as satellite clinic

  2. Locations Added
    - AIM Main Hub Clinic (edmonton-main-hub) - Central intake + admin HQ
    - AIM Performance West (edmonton-west) - Performance + rehab satellite

  3. Key Fields
    - All locations use central phone: 780-250-8188
    - Main Hub flagged as central contact coordinator
    - Geo-coordinates included for mapping
    - Operating hours and service offerings defined

  4. Notes
    - Main Hub is default for all routing (AI, booking, events)
    - Satellite clinics use central intake for coordination
    - Future locations follow same pattern (no local phones)
*/

DO $$ 
DECLARE
  main_hub_id uuid;
  perf_west_id uuid;
BEGIN
  main_hub_id := 'aim-main-hub-edmonton'::uuid;
  perf_west_id := 'aim-edmonton-west'::uuid;
EXCEPTION WHEN invalid_text_representation THEN
  main_hub_id := gen_random_uuid();
  perf_west_id := gen_random_uuid();
END $$;

INSERT INTO locations (
  slug,
  name,
  address,
  phone,
  email,
  hours,
  services,
  coordinates,
  is_active
) VALUES
(
  'edmonton-main-hub',
  'Alberta Injury Management – Main Hub Clinic',
  '{
    "line_1": "Unit 100, 4936 87 Street NW",
    "city": "Edmonton",
    "province": "AB",
    "postal_code": "T6E 5W3",
    "country": "Canada"
  }'::jsonb,
  '780-250-8188',
  'info@albertainjurymanagement.ca',
  '{
    "monday": "8:00 AM – 6:00 PM",
    "tuesday": "8:00 AM – 6:00 PM",
    "wednesday": "8:00 AM – 6:00 PM",
    "thursday": "8:00 AM – 6:00 PM",
    "friday": "8:00 AM – 5:00 PM"
  }'::jsonb,
  ARRAY[
    'Physiotherapy',
    'WCB Rehabilitation',
    'Return-to-Work Programs',
    'Chronic Pain Management',
    'Functional Capacity Evaluations',
    'Work Conditioning',
    'Work Hardening',
    'Employer Injury Management Programs'
  ],
  '{
    "latitude": 53.5212,
    "longitude": -113.4696,
    "is_main_hub": true,
    "central_contact": true,
    "role": "Central hub clinic + administrative HQ"
  }'::jsonb,
  true
),
(
  'edmonton-west',
  'AIM Performance West',
  '{
    "line_1": "11420 170 St NW",
    "city": "Edmonton",
    "province": "AB",
    "postal_code": "T5S 1J7",
    "country": "Canada"
  }'::jsonb,
  '780-250-8188',
  'info@albertainjurymanagement.ca',
  '{
    "monday": "8:00 AM – 6:00 PM",
    "tuesday": "8:00 AM – 6:00 PM",
    "wednesday": "8:00 AM – 6:00 PM",
    "thursday": "8:00 AM – 6:00 PM",
    "friday": "8:00 AM – 5:00 PM"
  }'::jsonb,
  ARRAY[
    'Physiotherapy',
    'Performance Rehabilitation',
    'Sports Injury Rehab',
    'WCB Rehabilitation',
    'Return-to-Work Programs'
  ],
  '{
    "latitude": 53.5866,
    "longitude": -113.6243,
    "is_main_hub": false,
    "central_contact": true,
    "role": "Performance + rehab satellite clinic"
  }'::jsonb,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  email = EXCLUDED.email,
  hours = EXCLUDED.hours,
  services = EXCLUDED.services,
  coordinates = EXCLUDED.coordinates,
  is_active = EXCLUDED.is_active,
  updated_at = now();
