export type AIMOSEventType =
  | 'page_view'
  | 'cta_click'
  | 'ai_message'
  | 'form_submit'
  | 'booking_confirmed';

export type PersonaCode = 'IW' | 'ATH' | 'EMP' | 'INS' | 'SR' | 'COLD';

export type UrgencyLevel = 'low' | 'medium' | 'high';

export type ContactPreference = 'phone' | 'email';

export type IntakeNextStep = 'schedule' | 'callback' | 'clinic_review';

export type IntakeStatus = 'assigned' | 'scheduled' | 'completed';

export interface AIMOSEvent {
  event_id: string;
  timestamp: string;
  session_id: string;
  event_type: AIMOSEventType;
  persona: PersonaCode;
  confidence: number;
  program_interest?: string[];
  location_slug?: string;
  urgency?: UrgencyLevel;
  source?: string;
  metadata?: Record<string, any>;
}

export interface IntakeHandoff {
  handoff_token: string;
  persona: PersonaCode;
  program?: string;
  location?: string;
  urgency: UrgencyLevel;
  contact_pref: ContactPreference;
  notes?: string;
}

export interface IntakeResponse {
  intake_id: string;
  next_step: IntakeNextStep;
}

export interface BookingConfirmation {
  booking_id: string;
  location: string;
  time: string;
  handoff_token: string;
}

export interface AIContextRequest {
  persona: PersonaCode;
  program?: string;
}

export interface AIContextResponse {
  allowed_programs: string[];
  eligibility_notes: string;
  escalation_rules: string[];
}

export interface WebhookPayload {
  type: 'intake_status_update';
  intake_id: string;
  status: IntakeStatus;
}

export class AIMOSClient {
  private apiBase: string;
  private apiKey: string;
  private timeout: number;

  constructor() {
    this.apiBase = process.env.AIM_OS_API_BASE || 'https://api.aimos.ca';
    this.apiKey = process.env.AIM_OS_API_KEY || '';
    this.timeout = parseInt(process.env.EVENT_TIMEOUT_MS || '5000', 10);
  }

  private async request<T>(
    endpoint: string,
    method: 'GET' | 'POST' = 'POST',
    body?: any
  ): Promise<T> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(`${this.apiBase}${endpoint}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: body ? JSON.stringify(body) : undefined,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`AIM OS API error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      clearTimeout(timeoutId);
      console.error('AIM OS request failed:', error);
      throw error;
    }
  }

  async sendEvent(event: AIMOSEvent): Promise<{ status: string }> {
    if (!this.apiKey) {
      console.warn('AIM OS API key not configured, skipping event send');
      return { status: 'skipped' };
    }

    try {
      return await this.request<{ status: string }>('/events', 'POST', event);
    } catch (error) {
      console.error('Failed to send event to AIM OS:', error);
      return { status: 'error' };
    }
  }

  async sendEventBatch(events: AIMOSEvent[]): Promise<{ status: string }> {
    if (!this.apiKey) {
      console.warn('AIM OS API key not configured, skipping batch send');
      return { status: 'skipped' };
    }

    try {
      return await this.request<{ status: string }>('/events/batch', 'POST', { events });
    } catch (error) {
      console.error('Failed to send event batch to AIM OS:', error);
      return { status: 'error' };
    }
  }

  async initiateIntake(handoff: IntakeHandoff): Promise<IntakeResponse> {
    return await this.request<IntakeResponse>('/intake/init', 'POST', handoff);
  }

  async confirmBooking(confirmation: BookingConfirmation): Promise<{ status: string }> {
    return await this.request<{ status: string }>('/booking/confirm', 'POST', confirmation);
  }

  async getAIContext(request: AIContextRequest): Promise<AIContextResponse> {
    const params = new URLSearchParams();
    params.set('persona', request.persona);
    if (request.program) {
      params.set('program', request.program);
    }

    return await this.request<AIContextResponse>(
      `/ai/context?${params.toString()}`,
      'GET'
    );
  }
}

export const aimOS = new AIMOSClient();
