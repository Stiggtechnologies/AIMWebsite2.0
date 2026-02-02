import { LazyChatWidget } from '@/components/ai/lazy-chat-widget';
import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle, Star } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export const metadata = {
  title: 'About Us | Alberta Injury Management',
  description: 'Learn about AIM mission, values, and commitment to outcome-based rehabilitation in Alberta.',
};

async function getTransparencyReview() {
  const { data: reviews } = await supabase
    .from('reviews')
    .select('*')
    .eq('show_in_transparency', true)
    .limit(1);

  return reviews?.[0] || null;
}

export default async function AboutPage() {
  const transparencyReview = await getTransparencyReview();
  return (
    <>
      <div className="bg-aim-navy py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              About AIM
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Alberta's trusted partner for outcome-based injury management and rehabilitation.
            </p>
          </div>
        </div>
      </div>

      <div className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-aim-navy mb-6">Our Mission</h2>
            <p className="text-lg text-aim-slate mb-8">
              Alberta Injury Management provides evidence-based physiotherapy and rehabilitation services focused on measurable outcomes and lasting results. We specialize in helping Albertans recover from workplace injuries, motor vehicle accidents, and sports injuries through personalized, goal-oriented care.
            </p>

            <h2 className="text-3xl font-bold text-aim-navy mb-6">Our Approach</h2>
            <p className="text-lg text-aim-slate mb-8">
              We combine the latest research with hands-on clinical expertise to deliver treatment that works. Every patient receives a customized care plan with clear goals, regular progress tracking, and adjustments based on outcomes. Our team works collaboratively with employers, insurance providers, and other healthcare professionals to ensure comprehensive, coordinated care.
            </p>

            <h2 className="text-3xl font-bold text-aim-navy mb-6">Why Choose AIM</h2>
            <p className="text-lg text-aim-slate">
              With fast access to care, direct insurance billing, and a commitment to getting you back to what matters most, AIM is your partner in recovery. We serve communities across Alberta with convenient locations and flexible scheduling to fit your life.
            </p>
          </div>
        </div>
      </div>

      {transparencyReview && (
        <div className="bg-aim-steel-blue py-16 sm:py-24">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-2 mb-4">
                <AlertTriangle className="h-8 w-8 text-aim-navy" />
              </div>
              <h2 className="text-3xl font-bold text-aim-navy mb-4">
                We're Not Perfect — But We're Accountable
              </h2>
              <p className="text-lg text-aim-slate max-w-2xl mx-auto">
                Healing is personal, and not every experience is perfect. When concerns are raised, we respond thoughtfully, respectfully, and with accountability — because trust matters more than appearances.
              </p>
            </div>

            <Card className="bg-white shadow-lg">
              <CardContent className="p-8">
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-5 w-5 ${
                        star <= transparencyReview.rating
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <blockquote className="text-gray-700 mb-4 text-lg">
                  "{transparencyReview.full_text || transparencyReview.excerpt}"
                </blockquote>
                <p className="text-sm font-medium text-gray-900 mb-6">
                  — {transparencyReview.reviewer_name}
                </p>

                <div className="border-t pt-6">
                  <p className="text-sm font-semibold text-aim-navy mb-3">
                    Our Response:
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    We took time to think before responding to this review. It is never positive to respond from a defensive posture. We fully respect your right to comment and review our services, and we thank you for making this post because it humbles our team and helps us realize we are not all things for all people.
                  </p>
                  <p className="text-gray-700 leading-relaxed mt-4">
                    On behalf of our team, we apologize for the experience that triggered this response. We are measured in our approach and always committed to improvement. We wish you the best with your next healthcare team and hope they will be able to meet your needs.
                  </p>
                </div>
              </CardContent>
            </Card>

            <p className="text-center text-aim-slate mt-8 text-sm">
              We share this to demonstrate our commitment to transparency, accountability, and continuous improvement.
            </p>
          </div>
        </div>
      )}

      <LazyChatWidget />
    </>
  );
}
