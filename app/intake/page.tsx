import Link from 'next/link';
import { FileText, Clock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

export const metadata = {
  title: 'Patient Intake | Alberta Injury Management',
  description: 'Complete your patient intake form online for faster processing. Get started with your rehabilitation journey at AIM.',
};

export default function IntakePage() {
  return (
    <>
      <div className="bg-gradient-to-b from-aim-steel-blue to-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-aim-navy sm:text-5xl">
              Patient Intake Form
            </h1>
            <p className="mt-6 text-lg leading-8 text-aim-slate">
              Complete your intake online to expedite your first appointment. Takes about 10-15 minutes.
            </p>
          </div>
        </div>
      </div>

      <div className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Alert className="mx-auto max-w-3xl mb-12 border-aim-teal bg-aim-steel-blue">
            <CheckCircle className="h-4 w-4 text-aim-teal" />
            <AlertDescription>
              Completing your intake form in advance allows us to prepare for your visit and spend more time focused on your recovery during your first appointment.
            </AlertDescription>
          </Alert>

          <div className="mx-auto max-w-3xl">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Before You Begin</CardTitle>
                <CardDescription className="text-base">
                  Please have the following information ready:
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {[
                    'Personal contact information',
                    'Insurance details (WCB/MVA/private, if applicable)',
                    'Emergency contact information (optional)',
                    'Basic details about your injury or issue',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <FileText className="h-5 w-5 flex-none text-aim-teal mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 p-4 bg-aim-steel-blue rounded-lg">
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 flex-none text-aim-teal mt-0.5" />
                    <div>
                      <p className="font-medium text-aim-navy">Estimated Time: 10-15 minutes</p>
                      <p className="text-sm text-aim-slate mt-1">
                        You can save your progress and return later if needed.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 space-y-3">
                  <Button asChild size="lg" className="w-full bg-aim-cta-primary hover:bg-aim-cta-primary/90">
                    <Link href="/intake/form">Start Quick Intake Form (2–3 min)</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="w-full border-aim-navy text-aim-navy hover:bg-white">
                    <Link href="/ai-intake">Start Guided Intake (AI-assisted)</Link>
                  </Button>
                  <p className="text-sm text-center text-aim-slate/60">
                    Choose quick form if you want the fastest route. Choose guided intake if you prefer step-by-step help.
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="mt-12 text-center">
              <h3 className="text-xl font-semibold text-aim-navy mb-4">Privacy & Security</h3>
              <p className="text-aim-slate mb-6">
                Your information is protected by industry-standard encryption and handled in accordance with HIPAA and PIPEDA regulations.
              </p>
              <Button asChild variant="link" className="text-aim-teal">
                <Link href="/privacy">Read our Privacy Policy</Link>
              </Button>
            </div>

            <div className="mt-12 bg-aim-steel-blue p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-aim-navy mb-4">Need Help?</h3>
              <p className="text-aim-slate mb-4">
                Prefer to complete your intake over the phone or have questions? Our team is here to help.
              </p>
              <Button asChild variant="outline" className="border-aim-navy text-aim-navy hover:bg-white">
                <Link href="tel:+17802508188">Call (780) 250-8188</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
