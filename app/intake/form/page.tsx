'use client';

import { useState } from 'react';
import Link from 'next/link';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { useTracking } from '@/components/providers/tracking-provider';

const QuickIntakeSchema = z.object({
  full_name: z.string().min(3),
  phone: z.string().min(10),
  issue_type: z.enum(['work_injury', 'mva', 'sports', 'chronic_pain', 'other']),
  location: z.enum(['edmonton-main-hub', 'edmonton-west']),
  consent_privacy: z.literal(true),
  consent_communication: z.literal(true),
});

function issueTypeToInsurance(issueType: z.infer<typeof QuickIntakeSchema>['issue_type']) {
  if (issueType === 'work_injury') return 'wcb';
  if (issueType === 'mva') return 'mva';
  return 'private';
}

export default function QuickIntakeFormPage() {
  const { sessionId } = useTracking();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [issueType, setIssueType] = useState<z.infer<typeof QuickIntakeSchema>['issue_type']>('work_injury');
  const [location, setLocation] = useState<z.infer<typeof QuickIntakeSchema>['location']>('edmonton-main-hub');
  const [consentPrivacy, setConsentPrivacy] = useState(true);
  const [consentCommunication, setConsentCommunication] = useState(true);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async () => {
    setError(null);

    const parsed = QuickIntakeSchema.safeParse({
      full_name: fullName.trim(),
      phone: phone.trim(),
      issue_type: issueType,
      location,
      consent_privacy: consentPrivacy,
      consent_communication: consentCommunication,
    });

    if (!parsed.success) {
      setError('Please complete all required fields.');
      return;
    }

    if (!sessionId) {
      setError('Missing session. Please refresh and try again.');
      return;
    }

    setIsSubmitting(true);

    try {
      const names = fullName.trim().split(' ').filter(Boolean);
      const firstName = names[0] || '';
      const lastName = names.slice(1).join(' ') || '';

      const res = await fetch('/api/intake/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_id: sessionId,
          patient_data: { first_name: firstName, last_name: lastName, phone },
          injury_data: { injury_type: issueType },
          insurance_data: { insurance_type: issueTypeToInsurance(issueType) },
          medical_history: {}, // intentionally not collected here
          consent_data: {
            privacy_consent: true,
            treatment_consent: false, // collected later in secure workflow
            communication_consent: true,
          },
          status: 'submitted',
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to submit intake');
      }

      setSuccess(true);
    } catch (e) {
      setError('Something went wrong submitting your intake. Please call (780) 250-8188.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-aim-steel-blue to-white py-10">
        <div className="mx-auto max-w-2xl px-4">
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl text-aim-navy flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-aim-teal" />
                Intake Submitted
              </CardTitle>
              <CardDescription>
                Thanks — our team will contact you shortly to confirm next steps.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-aim-slate">
                If you want to book right now, you can also start a booking request here.
              </p>
              <div className="flex flex-col gap-2">
                <Button asChild className="bg-aim-cta-primary hover:bg-aim-cta-primary/90">
                  <Link href="/book">Book Appointment</Link>
                </Button>
                <Button asChild variant="outline" className="border-aim-navy text-aim-navy hover:bg-white">
                  <Link href="/ai-intake">Continue with Guided Intake</Link>
                </Button>
              </div>
              <p className="text-xs text-aim-slate/70">
                For urgent issues, call us at <a className="underline" href="tel:+17802508188">(780) 250-8188</a>.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-aim-steel-blue to-white py-10">
      <div className="mx-auto max-w-2xl px-4">
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl text-aim-navy">Quick Intake (2–3 minutes)</CardTitle>
            <CardDescription>
              Share the basics so our team can route you correctly. No medical history is collected here.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {error && (
              <Alert className="border-red-500 bg-red-50">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-900">{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="fullName">Full name</Label>
              <Input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="John Smith" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="780-250-8188" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="issueType">What brings you in?</Label>
              <select
                id="issueType"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={issueType}
                onChange={(e) => setIssueType(e.target.value as any)}
              >
                <option value="work_injury">Work injury (WCB)</option>
                <option value="mva">Motor vehicle accident (MVA)</option>
                <option value="sports">Sports / athletic</option>
                <option value="chronic_pain">Chronic pain</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Preferred location</Label>
              <select
                id="location"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={location}
                onChange={(e) => setLocation(e.target.value as any)}
              >
                <option value="edmonton-main-hub">Main Hub Clinic</option>
                <option value="edmonton-west">Performance West</option>
              </select>
            </div>

            <div className="space-y-3">
              <label className="flex items-start gap-2 text-sm">
                <input type="checkbox" checked={consentPrivacy} onChange={(e) => setConsentPrivacy(e.target.checked)} />
                <span>I agree to the Privacy Policy.</span>
              </label>
              <label className="flex items-start gap-2 text-sm">
                <input type="checkbox" checked={consentCommunication} onChange={(e) => setConsentCommunication(e.target.checked)} />
                <span>I agree to be contacted about scheduling and next steps.</span>
              </label>
              <p className="text-xs text-aim-slate/70">
                We will not collect medical history or medications on this quick intake. Those details are handled via secure workflows.
              </p>
            </div>

            <Button
              onClick={onSubmit}
              disabled={isSubmitting}
              className="w-full bg-aim-cta-primary hover:bg-aim-cta-primary/90"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Submitting…
                </span>
              ) : (
                'Submit'
              )}
            </Button>

            <div className="text-center text-sm text-aim-slate">
              Prefer guided help? <Link className="text-aim-teal underline" href="/ai-intake">Use AI-assisted intake</Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
