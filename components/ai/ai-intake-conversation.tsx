'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useTracking } from '@/components/providers/tracking-provider';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface IntakeData {
  patient_data: {
    first_name?: string;
    last_name?: string;
    date_of_birth?: string;
    phone?: string;
    email?: string;
    address?: string;
  };
  injury_data: {
    injury_type?: string;
    injury_date?: string;
    area_affected?: string;
    how_occurred?: string;
    limitations?: string;
  };
  insurance_data: {
    insurance_type?: string;
    wcb_claim?: string;
    mva_claim?: string;
    employer_name?: string;
    insurance_company?: string;
  };
  // NOTE: We intentionally do not collect medical history via AI-assisted intake.
  // Full intake (medical history, medications, etc.) should be collected via a secure form/workflow.
  medical_history: {
    current_medications?: string;
    previous_injuries?: string;
    medical_conditions?: string;
    previous_treatments?: string;
  };
  consent_data: {
    privacy_consent?: boolean;
    treatment_consent?: boolean;
    communication_consent?: boolean;
  };
}

type IntakeStep =
  | 'welcome'
  | 'patient_name'
  | 'patient_contact'
  | 'injury_type'
  | 'injury_details'
  | 'insurance_type'
  | 'insurance_details'
  | 'consent'
  | 'review'
  | 'booking_location'
  | 'booking_confirmation'
  | 'complete';

const stepProgress: Record<IntakeStep, number> = {
  welcome: 0,
  patient_name: 15,
  patient_contact: 30,
  injury_type: 45,
  injury_details: 60,
  insurance_type: 70,
  insurance_details: 80,
  consent: 90,
  review: 92,
  booking_location: 95,
  booking_confirmation: 98,
  complete: 100,
};

const LOCATIONS = [
  { slug: 'edmonton-main-hub', name: 'Main Hub Clinic' },
  { slug: 'edmonton-west', name: 'Performance West' },
];

export function AIIntakeConversation() {
  const { sessionId } = useTracking();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hello! I\'m your AIM intake assistant. I\'ll guide you through our intake process step by step. This should take about 10-15 minutes. Ready to get started?',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState<IntakeStep>('welcome');
  const [intakeData, setIntakeData] = useState<IntakeData>({
    patient_data: {},
    injury_data: {},
    insurance_data: {},
    medical_history: {},
    consent_data: {},
  });
  const [submissionId, setSubmissionId] = useState<string | null>(null);
  const [bookingRef, setBookingRef] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [messages]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  const addMessage = (role: 'user' | 'assistant', content: string) => {
    const newMessage: Message = {
      role,
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const updateIntakeData = (category: keyof IntakeData, field: string, value: any) => {
    setIntakeData((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value,
      },
    }));
  };

  const saveProgress = async (status: 'draft' | 'submitted' = 'draft') => {
    try {
      const response = await fetch('/api/intake/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          session_id: sessionId,
          submission_id: submissionId,
          ...intakeData,
          status,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save progress');
      }

      const data = await response.json();
      if (data.id && !submissionId) {
        setSubmissionId(data.id);
      }
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  };

  const processUserResponse = async (userInput: string) => {
    const normalizedInput = userInput.toLowerCase().trim();

    switch (currentStep) {
      case 'welcome':
        if (normalizedInput.includes('yes') || normalizedInput.includes('ready') || normalizedInput.includes('start')) {
          setCurrentStep('patient_name');
          addMessage('assistant', 'Great! Let\'s start with your basic information. What is your full name? (First and Last)');
        } else {
          addMessage('assistant', 'No problem! Take your time. When you\'re ready, just type "yes" or "start" to begin.');
        }
        break;

      case 'patient_name':
        const names = userInput.split(' ').filter(n => n.length > 0);
        if (names.length >= 2) {
          updateIntakeData('patient_data', 'first_name', names[0]);
          updateIntakeData('patient_data', 'last_name', names.slice(1).join(' '));
          setCurrentStep('patient_contact');
          addMessage('assistant', `Thank you, ${names[0]}. What is the best phone number to reach you?`);
          await saveProgress();
        } else {
          addMessage('assistant', 'Please provide both your first and last name (e.g., "John Smith").');
        }
        break;

      case 'patient_contact':
        const phonePattern = /[\d\s\-\(\)]+/;
        if (phonePattern.test(userInput) && userInput.replace(/\D/g, '').length >= 10) {
          updateIntakeData('patient_data', 'phone', userInput);
          setCurrentStep('injury_type');
          addMessage('assistant', 'Perfect! Now, what type of injury or issue brings you to AIM today? (e.g., work injury, car accident, sports injury, chronic pain)');
          await saveProgress();
        } else {
          addMessage('assistant', 'Please provide a valid phone number (e.g., 780-250-8188 or 7805550100).');
        }
        break;

      case 'injury_type':
        updateIntakeData('injury_data', 'injury_type', userInput);

        if (normalizedInput.includes('work') || normalizedInput.includes('wcb') || normalizedInput.includes('workplace')) {
          updateIntakeData('insurance_data', 'insurance_type', 'wcb');
          setCurrentStep('injury_details');
          addMessage('assistant', 'I understand this is a work-related injury. When did this injury occur? (approximate date is fine)');
        } else if (normalizedInput.includes('car') || normalizedInput.includes('mva') || normalizedInput.includes('accident') || normalizedInput.includes('vehicle')) {
          updateIntakeData('insurance_data', 'insurance_type', 'mva');
          setCurrentStep('injury_details');
          addMessage('assistant', 'I understand this is from a motor vehicle accident. When did the accident occur? (approximate date is fine)');
        } else {
          updateIntakeData('insurance_data', 'insurance_type', 'private');
          setCurrentStep('injury_details');
          addMessage('assistant', 'Thank you for sharing. When did this injury or issue begin? (approximate date is fine)');
        }
        await saveProgress();
        break;

      case 'injury_details':
        updateIntakeData('injury_data', 'injury_date', userInput);
        setCurrentStep('insurance_details');

        if (intakeData.insurance_data.insurance_type === 'wcb') {
          addMessage('assistant', 'What is your WCB claim number? (If you don\'t have it yet, type "pending")');
        } else if (intakeData.insurance_data.insurance_type === 'mva') {
          addMessage('assistant', 'What is your insurance claim number? (If you don\'t have it yet, type "pending")');
        } else {
          addMessage('assistant', 'Do you have private health insurance that covers physiotherapy? (yes/no)');
        }
        await saveProgress();
        break;

      case 'insurance_details':
        if (intakeData.insurance_data.insurance_type === 'wcb') {
          updateIntakeData('insurance_data', 'wcb_claim', userInput);
        } else if (intakeData.insurance_data.insurance_type === 'mva') {
          updateIntakeData('insurance_data', 'mva_claim', userInput);
        } else {
          // For private/other cases, keep it simple in the AI-assisted flow.
          // Full insurance details can be collected via secure intake form / AIMOS.
          if (normalizedInput.includes('yes')) {
            updateIntakeData('insurance_data', 'insurance_company', 'pending');
          }
        }

        // Per policy: do NOT collect medications/medical history via AI-assisted intake.
        setCurrentStep('consent');
        addMessage(
          'assistant',
          'Almost done! I need your consent for two things:\n\n1. Privacy: We will handle your information according to privacy regulations\n2. Communication: We can contact you with appointment reminders\n\nDo you consent to the above? (Type "yes" to consent)'
        );
        await saveProgress();
        break;

      case 'consent':
        if (normalizedInput.includes('yes') || normalizedInput.includes('consent') || normalizedInput.includes('agree')) {
          updateIntakeData('consent_data', 'privacy_consent', true);
          // We do not collect treatment consent via AI-assisted intake.
          updateIntakeData('consent_data', 'treatment_consent', false); // collected later in secure workflow
          updateIntakeData('consent_data', 'communication_consent', true);
          setCurrentStep('review');

          const reviewMessage = `Perfect! Let me review what we have:\n\nName: ${intakeData.patient_data.first_name} ${intakeData.patient_data.last_name}\nPhone: ${intakeData.patient_data.phone}\nInjury Type: ${intakeData.injury_data.injury_type}\nDate: ${intakeData.injury_data.injury_date}\nInsurance: ${intakeData.insurance_data.insurance_type?.toUpperCase()}\n\nIs this information correct? (Type "yes" to submit, or "no" to start over)`;
          addMessage('assistant', reviewMessage);
        } else {
          addMessage('assistant', 'We need your consent to proceed. Please type "yes" if you agree, or "no" if you have questions.');
        }
        break;

      case 'review':
        if (normalizedInput.includes('yes')) {
          setIsLoading(true);
          try {
            await saveProgress('submitted');
            setCurrentStep('booking_location');
            addMessage('assistant', `✅ Your intake form has been submitted!\n\nNow, would you like to book your first appointment? We have the following locations:\n\n${LOCATIONS.map(loc => `• ${loc.name}`).join('\n')}\n\nWhich location would you prefer? (Type the location name or "skip" to skip booking)`);
          } catch (err) {
            setError('Failed to submit intake. Please try again or call us at (780) 250-8188.');
            addMessage('assistant', 'I\'m sorry, there was an error submitting your intake. Please call us at (780) 250-8188 for assistance.');
          } finally {
            setIsLoading(false);
          }
        } else {
          setCurrentStep('welcome');
          setIntakeData({
            patient_data: {},
            injury_data: {},
            insurance_data: {},
            medical_history: {},
            consent_data: {},
          });
          addMessage('assistant', 'No problem! Let\'s start fresh. Ready to begin?');
        }
        break;

      case 'booking_location':
        const matchedLocation = LOCATIONS.find(loc =>
          normalizedInput.includes(loc.name.toLowerCase()) || normalizedInput.includes(loc.slug)
        );

        if (matchedLocation) {
          setSelectedLocation(matchedLocation.slug);
          setCurrentStep('booking_confirmation');
          addMessage('assistant', `Great! I\'ll book your appointment at ${matchedLocation.name}.\n\nConfirming your booking with:\n• Name: ${intakeData.patient_data.first_name} ${intakeData.patient_data.last_name}\n• Phone: ${intakeData.patient_data.phone}\n• Location: ${matchedLocation.name}\n• For: ${intakeData.injury_data.injury_type}\n\nProceed with booking? (Type "yes" to confirm, or "no" to cancel)`);
        } else if (normalizedInput.includes('skip')) {
          setCurrentStep('complete');
          addMessage('assistant', `✅ Your intake form has been submitted successfully!\n\nOur team will contact you at ${intakeData.patient_data.phone} within 24 hours to schedule your first appointment.\n\nThank you for choosing Alberta Injury Management!`);
        } else {
          addMessage('assistant', `Please select a valid location:\n${LOCATIONS.map(loc => `• ${loc.name}`).join('\n')}\n\nOr type "skip" to skip booking and have our team call you.`);
        }
        break;

      case 'booking_confirmation':
        if (normalizedInput.includes('yes')) {
          setIsLoading(true);
          try {
            const bookingResponse = await fetch('/api/booking/confirm', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                persona: intakeData.insurance_data.insurance_type === 'wcb' ? 'IW' : 'MVA',
                location: selectedLocation,
                contact_method: 'phone',
                contact_value: intakeData.patient_data.phone,
                booking_mode: 'PATIENT_SELF_BOOK',
                urgency: 'medium',
                notes: `AI Intake - ${intakeData.injury_data.injury_type}`,
              }),
            });

            if (!bookingResponse.ok) {
              throw new Error('Booking failed');
            }

            const bookingData = await bookingResponse.json();
            setBookingRef(bookingData.booking_ref);
            setCurrentStep('complete');
            addMessage('assistant', `🎉 Your appointment has been booked!\n\nBooking Reference: ${bookingData.booking_ref}\nLocation: ${LOCATIONS.find(l => l.slug === selectedLocation)?.name}\n\nYou'll receive a confirmation call or text within 24 hours.\n\nThank you for choosing Alberta Injury Management!`);
          } catch (err) {
            console.error('Booking error:', err);
            setError('Booking failed. Our team will contact you to schedule.');
            addMessage('assistant', 'I encountered an issue booking your appointment. No worries - our team will contact you within 24 hours to schedule your first visit.');
            setCurrentStep('complete');
          } finally {
            setIsLoading(false);
          }
        } else {
          setCurrentStep('complete');
          addMessage('assistant', `✅ Your intake form has been submitted!\n\nOur team will contact you at ${intakeData.patient_data.phone} within 24 hours to schedule your appointment.\n\nThank you for choosing Alberta Injury Management!`);
        }
        break;

      case 'complete':
        addMessage('assistant', 'Your intake is complete! If you need to make changes, please call us at (780) 250-8188.');
        break;
    }
  };

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading || currentStep === 'complete') return;

    const userMessage = inputValue;
    addMessage('user', userMessage);
    setInputValue('');
    setIsLoading(true);

    try {
      await processUserResponse(userMessage);
    } catch (error) {
      console.error('Error processing response:', error);
      addMessage('assistant', 'I\'m sorry, I encountered an error. Please try again or call us at (780) 250-8188.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {error && (
        <Alert className="mb-4 border-red-500 bg-red-50">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-900">{error}</AlertDescription>
        </Alert>
      )}

      <div className="mb-4">
        <div className="flex items-center justify-between mb-2 p-3 bg-white rounded-lg shadow-sm">
          <span className="text-sm font-medium text-aim-slate">Progress</span>
          <span className="text-sm font-medium text-aim-navy">{stepProgress[currentStep]}% Complete</span>
        </div>
        <div className="w-full bg-aim-steel-blue rounded-full h-2">
          <div
            className="bg-aim-teal h-2 rounded-full transition-all duration-300"
            style={{ width: `${stepProgress[currentStep]}%` }}
          />
        </div>
      </div>

      <Card className="shadow-xl">
        <div className="flex items-center justify-between border-b bg-aim-navy px-6 py-4 text-white rounded-t-lg">
          <div className="flex items-center gap-2">
            {currentStep === 'complete' ? (
              <CheckCircle className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Loader2 className="h-6 w-6 animate-pulse" aria-hidden="true" />
            )}
            <h2 className="font-semibold text-lg">AIM Intake Assistant</h2>
          </div>
          <span className="text-sm text-aim-steel-blue">Secure & Confidential</span>
        </div>

        <ScrollArea className="h-[500px] p-6" ref={scrollAreaRef}>
          <div className="space-y-4" role="log" aria-live="polite" aria-atomic="false">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-lg px-4 py-3 ${
                    message.role === 'user'
                      ? 'bg-aim-cta-primary text-white'
                      : 'bg-aim-steel-blue text-aim-slate'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
                  <p className="mt-2 text-xs opacity-70">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-aim-steel-blue rounded-lg px-4 py-3">
                  <Loader2 className="h-5 w-5 animate-spin text-aim-teal" aria-label="Processing" />
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="border-t p-6">
          <div className="flex gap-3">
            <Input
              ref={inputRef}
              type="text"
              placeholder={currentStep === 'complete' ? 'Intake complete!' : 'Type your response...'}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading || currentStep === 'complete'}
              className="flex-1"
              aria-label="Your response"
            />
            <Button
              onClick={handleSend}
              disabled={isLoading || !inputValue.trim() || currentStep === 'complete'}
              size="icon"
              className="bg-aim-teal hover:bg-aim-teal/90"
              aria-label="Send response"
            >
              <Send className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
          <p className="mt-3 text-xs text-aim-slate/60 text-center">
            Your information is encrypted and secure. We follow HIPAA and PIPEDA regulations.
          </p>
        </div>
      </Card>
    </div>
  );
}
