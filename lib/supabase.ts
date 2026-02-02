import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export function createServerSupabaseClient(): SupabaseClient {
  if (supabaseServiceRoleKey) {
    return createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
  }
  return supabase;
}

export type Database = {
  public: {
    Tables: {
      personas: {
        Row: {
          id: string;
          session_id: string;
          persona_type: string;
          confidence_scores: Record<string, number>;
          behavioral_signals: Record<string, any>;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          session_id: string;
          persona_type?: string;
          confidence_scores?: Record<string, number>;
          behavioral_signals?: Record<string, any>;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          session_id?: string;
          persona_type?: string;
          confidence_scores?: Record<string, number>;
          behavioral_signals?: Record<string, any>;
          updated_at?: string;
        };
      };
      events: {
        Row: {
          id: string;
          session_id: string;
          event_type: string;
          event_data: Record<string, any>;
          persona_snapshot: Record<string, any> | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          session_id: string;
          event_type: string;
          event_data: Record<string, any>;
          persona_snapshot?: Record<string, any> | null;
          created_at?: string;
        };
      };
      locations: {
        Row: {
          id: string;
          slug: string;
          name: string;
          address: {
            line_1: string;
            city: string;
            province: string;
            postal_code: string;
            country: string;
          };
          phone: string;
          email: string | null;
          hours: Record<string, string>;
          services: string[];
          coordinates: { latitude: number; longitude: number } | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
      };
      bookings: {
        Row: {
          id: string;
          session_id: string;
          location_id: string | null;
          patient_info: Record<string, any>;
          appointment_type: string;
          appointment_datetime: string;
          status: string;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          session_id: string;
          location_id?: string | null;
          patient_info: Record<string, any>;
          appointment_type: string;
          appointment_datetime: string;
          status?: string;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      intake_submissions: {
        Row: {
          id: string;
          session_id: string;
          booking_id: string | null;
          patient_data: Record<string, any>;
          injury_data: Record<string, any>;
          insurance_data: Record<string, any>;
          medical_history: Record<string, any>;
          consent_data: Record<string, any>;
          status: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          session_id: string;
          booking_id?: string | null;
          patient_data?: Record<string, any>;
          injury_data?: Record<string, any>;
          insurance_data?: Record<string, any>;
          medical_history?: Record<string, any>;
          consent_data?: Record<string, any>;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      leads: {
        Row: {
          id: string;
          session_id: string;
          lead_type: string;
          organization_name: string;
          contact_info: Record<string, any>;
          inquiry_data: Record<string, any>;
          ltv_score: number;
          status: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          session_id: string;
          lead_type: string;
          organization_name: string;
          contact_info: Record<string, any>;
          inquiry_data?: Record<string, any>;
          ltv_score?: number;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      ai_conversations: {
        Row: {
          id: string;
          session_id: string;
          messages: Array<any>;
          detected_intent: string | null;
          escalated: boolean;
          outcome: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          session_id: string;
          messages?: Array<any>;
          detected_intent?: string | null;
          escalated?: boolean;
          outcome?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          messages?: Array<any>;
          detected_intent?: string | null;
          escalated?: boolean;
          outcome?: string | null;
          updated_at?: string;
        };
      };
    };
  };
};
