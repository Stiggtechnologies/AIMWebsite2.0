'use client';

import { AIIntakeConversation } from '@/components/ai/ai-intake-conversation';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, Clock, MessageCircle } from 'lucide-react';

export default function AIIntakePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-aim-steel-blue to-white py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-aim-navy sm:text-4xl mb-3">
            AI-Assisted Intake
          </h1>
          <p className="text-base text-aim-slate max-w-2xl mx-auto">
            Complete your intake through a guided conversation with our AI assistant.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 max-w-4xl mx-auto">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-aim-steel-blue">
            <MessageCircle className="h-6 w-6 text-aim-teal mb-2" />
            <h3 className="font-semibold text-sm text-aim-navy mb-1">Conversational</h3>
            <p className="text-xs text-aim-slate">Answer questions naturally, one at a time</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-aim-steel-blue">
            <Clock className="h-6 w-6 text-aim-teal mb-2" />
            <h3 className="font-semibold text-sm text-aim-navy mb-1">10-15 Minutes</h3>
            <p className="text-xs text-aim-slate">Progress is saved as you go</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-aim-steel-blue">
            <Shield className="h-6 w-6 text-aim-teal mb-2" />
            <h3 className="font-semibold text-sm text-aim-navy mb-1">Secure & Private</h3>
            <p className="text-xs text-aim-slate">HIPAA & PIPEDA compliant</p>
          </div>
        </div>

        <Alert className="mb-6 border-aim-teal bg-white max-w-4xl mx-auto">
          <AlertDescription className="text-sm">
            This AI assistant will collect your information for intake purposes only. For questions about services or booking, use the chat widget in the bottom-right corner instead.
          </AlertDescription>
        </Alert>

        <AIIntakeConversation />

        <div className="mt-8 text-center max-w-4xl mx-auto">
          <p className="text-sm text-aim-slate mb-4">
            Prefer to speak with someone? Call us at{' '}
            <a href="tel:+17802508188" className="text-aim-teal hover:underline font-medium">
              (780) 250-8188
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
