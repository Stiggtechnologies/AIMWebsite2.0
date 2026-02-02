'use client';

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import { PersonaEngine, getSessionId, PersonaType, PersonaScores } from '@/lib/persona';
import { EventDispatcher, initializeEventTracking, EventType } from '@/lib/events';

interface TrackingContextValue {
  sessionId: string;
  personaType: PersonaType;
  personaScores: PersonaScores;
  trackPageView: (path: string, title?: string) => void;
  trackCTAClick: (ctaId: string, ctaText: string, destination?: string) => void;
  trackScrollDepth: (page: string, depth: number) => void;
  trackAIMessage: (messageType: 'user' | 'assistant', content: string, intent?: string) => void;
  trackFormStart: (formId: string, formType: string) => void;
  trackFormSubmit: (formId: string, formType: string, success: boolean) => void;
}

const TrackingContext = createContext<TrackingContextValue | null>(null);

export function TrackingProvider({ children }: { children: ReactNode }) {
  const [sessionId] = useState(() => getSessionId());
  const [personaEngine] = useState(() => new PersonaEngine(sessionId));
  const [eventDispatcher] = useState(() => initializeEventTracking(sessionId));
  const [personaType, setPersonaType] = useState<PersonaType>('undetermined');
  const [personaScores, setPersonaScores] = useState<PersonaScores>({
    injured_worker: 0.1,
    mva: 0.1,
    athlete: 0.1,
    senior: 0.1,
    employer: 0.1,
    insurer: 0.1,
    referral_partner: 0.1,
    returning_patient: 0.1,
    undetermined: 0.2,
  });

  useEffect(() => {
    personaEngine.initialize().then((data) => {
      setPersonaType(data.persona_type);
      setPersonaScores(data.confidence_scores);
    });
  }, [personaEngine]);

  const updatePersona = useCallback(() => {
    const newPersonaType = personaEngine.getTopPersona();
    const newScores = personaEngine.getScores();
    setPersonaType(newPersonaType);
    setPersonaScores(newScores);
    personaEngine.save();
  }, [personaEngine]);

  const trackPageView = useCallback(
    (path: string, title?: string) => {
      personaEngine.trackPageView(path);
      eventDispatcher.trackPageView(path, title);
      updatePersona();
    },
    [personaEngine, eventDispatcher, updatePersona]
  );

  const trackCTAClick = useCallback(
    (ctaId: string, ctaText: string, destination?: string) => {
      personaEngine.trackCTAClick(ctaId);
      eventDispatcher.trackCTAClick(ctaId, ctaText, destination);
      updatePersona();
    },
    [personaEngine, eventDispatcher, updatePersona]
  );

  const trackScrollDepth = useCallback(
    (page: string, depth: number) => {
      personaEngine.trackScrollDepth(page, depth);
      eventDispatcher.trackScrollDepth(page, depth);
      updatePersona();
    },
    [personaEngine, eventDispatcher, updatePersona]
  );

  const trackAIMessage = useCallback(
    (messageType: 'user' | 'assistant', content: string, intent?: string) => {
      if (intent) {
        personaEngine.trackAIMessage(intent);
      }
      eventDispatcher.trackAIMessage(messageType, content, intent);
      updatePersona();
    },
    [personaEngine, eventDispatcher, updatePersona]
  );

  const trackFormStart = useCallback(
    (formId: string, formType: string) => {
      personaEngine.trackFormInteraction(formType);
      eventDispatcher.trackFormStart(formId, formType);
      updatePersona();
    },
    [personaEngine, eventDispatcher, updatePersona]
  );

  const trackFormSubmit = useCallback(
    (formId: string, formType: string, success: boolean) => {
      eventDispatcher.trackFormSubmit(formId, formType, success);
    },
    [eventDispatcher]
  );

  const value: TrackingContextValue = {
    sessionId,
    personaType,
    personaScores,
    trackPageView,
    trackCTAClick,
    trackScrollDepth,
    trackAIMessage,
    trackFormStart,
    trackFormSubmit,
  };

  return <TrackingContext.Provider value={value}>{children}</TrackingContext.Provider>;
}

export function useTracking() {
  const context = useContext(TrackingContext);
  if (!context) {
    throw new Error('useTracking must be used within TrackingProvider');
  }
  return context;
}
