import Link from 'next/link';
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

      <section id="anand-jim-john-sylem" aria-labelledby="persistent-pain-clinician" className="bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-aim-slate">Clinician profile</p>
          <h2 id="persistent-pain-clinician" className="mt-2 text-3xl font-bold text-aim-navy">Anand Jim John Sylem, PT</h2>
          <h3 className="mt-6 text-2xl font-semibold text-aim-navy">Persistent Pain Physiotherapy</h3>
          <p className="mt-2 font-medium text-aim-navy">Helping You Understand Your Pain, Build Confidence, and Improve Your Quality of Life</p>
          <p className="mt-4 leading-7 text-aim-slate">Are you living with persistent musculoskeletal pain that has not improved despite trying different treatments? Perhaps pain is affecting your sleep, work, mood, or ability to enjoy everyday activities.</p>
          <p className="mt-4 leading-7 text-aim-slate">I provide individualized physiotherapy for people experiencing ongoing pain who feel frustrated, uncertain, or limited in what they can do. My goal is to help you better understand your pain, build confidence in movement, and improve your ability to participate in activities that matter most to you.</p>
          <h3 className="mt-8 text-xl font-semibold text-aim-navy">My Approach</h3>
          <p className="mt-4 leading-7 text-aim-slate">I have completed formal training in Cognitive Functional Therapy (CFT), a person-centred approach used in the management of persistent musculoskeletal pain.</p>
          <p className="mt-4 leading-7 text-aim-slate">CFT recognizes that pain is complex and can be influenced by physical, psychological, and lifestyle factors. Rather than focusing solely on where you hurt, we explore your pain experience, movement patterns, daily activities, and factors that may be contributing to ongoing symptoms and limitations.</p>
          <p className="mt-4 leading-7 text-aim-slate">Your care begins with a comprehensive assessment to understand your pain history, previous treatments, functional abilities, and personal goals.</p>
          <p className="mt-4 leading-7 text-aim-slate">Together, we develop an individualized treatment plan that may include:</p>
          <ul className="mt-4 list-disc space-y-3 pl-6 leading-7 text-aim-slate">
            <li><strong>Pain Education:</strong> Understanding your symptoms and factors that may influence your pain.</li>
            <li><strong>Movement Retraining:</strong> Gradually building confidence in movements and activities that have become painful or difficult.</li>
            <li><strong>Personalized Exercise:</strong> Improving strength, movement, and tolerance for everyday activities.</li>
            <li><strong>Self-Management Strategies:</strong> Learning practical approaches to managing flare-ups, pacing activities, and supporting ongoing participation in daily life.</li>
          </ul>
          <h3 className="mt-8 text-xl font-semibold text-aim-navy">Take the Next Step</h3>
          <p className="mt-4 leading-7 text-aim-slate">My focus is on helping you develop the understanding, confidence, and practical skills to manage persistent pain and improve your daily function.</p>
          <p className="mt-4 leading-7 text-aim-slate">If ongoing pain is limiting your activities, I welcome the opportunity to work with you to explore strategies that support your individual goals.</p>
          <p className="mt-4 leading-7 text-aim-slate">Ready to take the next step? <Link href="/book" className="font-semibold text-aim-navy underline underline-offset-4">Book a Persistent Pain Physiotherapy Assessment</Link> at Alberta Injury Management (AIM) to discuss your concerns, explore your treatment options, and develop a plan tailored to your needs.</p>
        </div>
      </section>

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
