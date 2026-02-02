import { supabase } from './supabase';
import { PersonaScores, BehavioralSignals } from './persona';

export type EventType =
  | 'page_view'
  | 'scroll_depth'
  | 'cta_click'
  | 'ai_message'
  | 'form_start'
  | 'form_submit'
  | 'booking_confirm'
  | 'exit_intent'
  | 'video_play'
  | 'download'
  | 'phone_click'
  | 'email_click';

export interface EventData {
  event_type: EventType;
  session_id: string;
  event_data: Record<string, any>;
  persona_snapshot?: {
    persona_type: string;
    confidence_scores: PersonaScores;
    behavioral_signals: BehavioralSignals;
  };
}

export class EventDispatcher {
  private sessionId: string;
  private webhookUrl?: string;

  constructor(sessionId: string, webhookUrl?: string) {
    this.sessionId = sessionId;
    this.webhookUrl = webhookUrl;
  }

  async dispatch(
    eventType: EventType,
    eventData: Record<string, any>,
    personaSnapshot?: any
  ): Promise<void> {
    const event: EventData = {
      event_type: eventType,
      session_id: this.sessionId,
      event_data: {
        ...eventData,
        timestamp: new Date().toISOString(),
        url: typeof window !== 'undefined' ? window.location.href : '',
        user_agent:
          typeof navigator !== 'undefined' ? navigator.userAgent : '',
      },
      persona_snapshot: personaSnapshot,
    };

    await Promise.all([
      this.saveToDatabase(event),
      this.sendToAPI(event),
      this.sendToWebhook(event),
    ]);
  }

  private async saveToDatabase(event: EventData): Promise<void> {
    try {
      const { error } = await supabase.from('events').insert({
        session_id: event.session_id,
        event_type: event.event_type,
        event_data: event.event_data,
        persona_snapshot: event.persona_snapshot || null,
      });

      if (error) {
        console.error('Error saving event to database:', error);
      }
    } catch (error) {
      console.error('Event database save failed:', error);
    }
  }

  private async sendToAPI(event: EventData): Promise<void> {
    try {
      if (typeof window === 'undefined') return;

      await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      });
    } catch (error) {
      console.error('Event API send failed:', error);
    }
  }

  private async sendToWebhook(event: EventData): Promise<void> {
    if (!this.webhookUrl) return;

    try {
      await fetch(this.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      });
    } catch (error) {
      console.error('Event webhook send failed:', error);
    }
  }

  async trackPageView(path: string, title?: string): Promise<void> {
    await this.dispatch('page_view', {
      path,
      title: title || document.title,
      referrer: document.referrer,
    });
  }

  async trackCTAClick(
    ctaId: string,
    ctaText: string,
    destination?: string
  ): Promise<void> {
    await this.dispatch('cta_click', {
      cta_id: ctaId,
      cta_text: ctaText,
      destination,
    });
  }

  async trackScrollDepth(page: string, depth: number): Promise<void> {
    await this.dispatch('scroll_depth', {
      page,
      depth,
      max_depth: document.documentElement.scrollHeight,
    });
  }

  async trackAIMessage(
    messageType: 'user' | 'assistant',
    content: string,
    intent?: string
  ): Promise<void> {
    await this.dispatch('ai_message', {
      message_type: messageType,
      content,
      intent,
    });
  }

  async trackFormStart(formId: string, formType: string): Promise<void> {
    await this.dispatch('form_start', {
      form_id: formId,
      form_type: formType,
    });
  }

  async trackFormSubmit(
    formId: string,
    formType: string,
    success: boolean
  ): Promise<void> {
    await this.dispatch('form_submit', {
      form_id: formId,
      form_type: formType,
      success,
    });
  }

  async trackBookingConfirmation(
    bookingId: string,
    appointmentType: string,
    location: string
  ): Promise<void> {
    await this.dispatch('booking_confirm', {
      booking_id: bookingId,
      appointment_type: appointmentType,
      location,
    });
  }

  async trackExitIntent(): Promise<void> {
    await this.dispatch('exit_intent', {
      time_on_site: performance.now() / 1000,
    });
  }
}

export function initializeEventTracking(sessionId: string): EventDispatcher {
  return new EventDispatcher(sessionId);
}
