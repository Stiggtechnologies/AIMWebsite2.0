import { supabase } from './supabase';

export type PersonaType =
  | 'injured_worker'
  | 'mva'
  | 'athlete'
  | 'senior'
  | 'employer'
  | 'insurer'
  | 'referral_partner'
  | 'returning_patient'
  | 'undetermined';

export interface PersonaScores {
  injured_worker: number;
  mva: number;
  athlete: number;
  senior: number;
  employer: number;
  insurer: number;
  referral_partner: number;
  returning_patient: number;
  undetermined: number;
}

export interface BehavioralSignals {
  pages_viewed: string[];
  ctas_clicked: string[];
  scroll_depth: Record<string, number>;
  time_on_site: number;
  ai_messages: number;
  form_interactions: string[];
}

export interface PersonaData {
  session_id: string;
  persona_type: PersonaType;
  confidence_scores: PersonaScores;
  behavioral_signals: BehavioralSignals;
}

const initialScores: PersonaScores = {
  injured_worker: 0.1,
  mva: 0.1,
  athlete: 0.1,
  senior: 0.1,
  employer: 0.1,
  insurer: 0.1,
  referral_partner: 0.1,
  returning_patient: 0.1,
  undetermined: 0.2,
};

export class PersonaEngine {
  private sessionId: string;
  private scores: PersonaScores;
  private signals: BehavioralSignals;

  constructor(sessionId: string) {
    this.sessionId = sessionId;
    this.scores = { ...initialScores };
    this.signals = {
      pages_viewed: [],
      ctas_clicked: [],
      scroll_depth: {},
      time_on_site: 0,
      ai_messages: 0,
      form_interactions: [],
    };
  }

  async initialize(): Promise<PersonaData> {
    const { data, error } = await supabase
      .from('personas')
      .select('*')
      .eq('session_id', this.sessionId)
      .maybeSingle();

    if (data) {
      this.scores = data.confidence_scores as PersonaScores;
      this.signals = data.behavioral_signals as BehavioralSignals;
      return {
        session_id: this.sessionId,
        persona_type: data.persona_type as PersonaType,
        confidence_scores: this.scores,
        behavioral_signals: this.signals,
      };
    }

    const newPersona = {
      session_id: this.sessionId,
      persona_type: 'undetermined' as PersonaType,
      confidence_scores: this.scores,
      behavioral_signals: this.signals,
    };

    const { error: insertError } = await supabase
      .from('personas')
      .insert(newPersona);

    if (insertError) {
      console.error('Error creating persona:', insertError);
    }

    return newPersona;
  }

  trackPageView(path: string): void {
    if (!this.signals.pages_viewed.includes(path)) {
      this.signals.pages_viewed.push(path);
    }

    if (path.includes('/programs/wcb')) {
      this.adjustScore('injured_worker', 0.3);
    } else if (path.includes('/programs/mva')) {
      this.adjustScore('mva', 0.3);
    } else if (path.includes('/programs/athletic')) {
      this.adjustScore('athlete', 0.3);
    } else if (path.includes('/programs/senior')) {
      this.adjustScore('senior', 0.3);
    } else if (path.includes('/employers')) {
      this.adjustScore('employer', 0.4);
    } else if (path.includes('/insurers')) {
      this.adjustScore('insurer', 0.4);
    } else if (path.includes('/book')) {
      this.adjustScore('undetermined', -0.1);
    }
  }

  trackCTAClick(ctaId: string): void {
    this.signals.ctas_clicked.push(ctaId);

    if (ctaId.includes('wcb')) {
      this.adjustScore('injured_worker', 0.25);
    } else if (ctaId.includes('mva')) {
      this.adjustScore('mva', 0.25);
    } else if (ctaId.includes('athlete')) {
      this.adjustScore('athlete', 0.25);
    } else if (ctaId.includes('senior')) {
      this.adjustScore('senior', 0.25);
    } else if (ctaId.includes('employer')) {
      this.adjustScore('employer', 0.3);
    } else if (ctaId.includes('insurer')) {
      this.adjustScore('insurer', 0.3);
    } else if (ctaId.includes('book-now')) {
      this.adjustScore('undetermined', -0.15);
    }
  }

  trackAIMessage(intent: string | null): void {
    this.signals.ai_messages += 1;

    if (intent?.includes('wcb') || intent?.includes('work injury')) {
      this.adjustScore('injured_worker', 0.2);
    } else if (intent?.includes('mva') || intent?.includes('car accident')) {
      this.adjustScore('mva', 0.2);
    } else if (intent?.includes('sport') || intent?.includes('athletic')) {
      this.adjustScore('athlete', 0.2);
    } else if (intent?.includes('employer') || intent?.includes('workplace')) {
      this.adjustScore('employer', 0.25);
    }
  }

  trackScrollDepth(page: string, depth: number): void {
    this.signals.scroll_depth[page] = Math.max(
      this.signals.scroll_depth[page] || 0,
      depth
    );
  }

  trackFormInteraction(formType: string): void {
    if (!this.signals.form_interactions.includes(formType)) {
      this.signals.form_interactions.push(formType);
    }
  }

  private adjustScore(persona: keyof PersonaScores, amount: number): void {
    this.scores[persona] = Math.max(
      0,
      Math.min(1, this.scores[persona] + amount)
    );
    this.normalizeScores();
  }

  private normalizeScores(): void {
    const sum = Object.values(this.scores).reduce((a, b) => a + b, 0);
    if (sum > 0) {
      Object.keys(this.scores).forEach((key) => {
        this.scores[key as keyof PersonaScores] /= sum;
      });
    }
  }

  getTopPersona(): PersonaType {
    let maxScore = 0;
    let topPersona: PersonaType = 'undetermined';

    Object.entries(this.scores).forEach(([persona, score]) => {
      if (score > maxScore) {
        maxScore = score;
        topPersona = persona as PersonaType;
      }
    });

    return maxScore > 0.25 ? topPersona : 'undetermined';
  }

  getScores(): PersonaScores {
    return { ...this.scores };
  }

  getSignals(): BehavioralSignals {
    return { ...this.signals };
  }

  async save(): Promise<void> {
    const topPersona = this.getTopPersona();

    const { error } = await supabase
      .from('personas')
      .update({
        persona_type: topPersona,
        confidence_scores: this.scores,
        behavioral_signals: this.signals,
      })
      .eq('session_id', this.sessionId);

    if (error) {
      console.error('Error saving persona:', error);
    }
  }
}

export function getSessionId(): string {
  if (typeof window === 'undefined') {
    return 'server-session';
  }

  let sessionId = sessionStorage.getItem('aim_session_id');

  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('aim_session_id', sessionId);
  }

  return sessionId;
}
