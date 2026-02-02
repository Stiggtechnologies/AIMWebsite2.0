import Link from 'next/link';
import { MapPin, Phone, Clock, Mail, Car } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { LazyChatWidget } from '@/components/ai/lazy-chat-widget';
import { generateMedicalBusinessSchema, injectSchema } from '@/lib/schema';

export const metadata = {
  title: 'AIM Performance West - Edmonton | Alberta Injury Management',
  description: 'AIM Performance West in Edmonton. Expert physiotherapy, WCB rehabilitation, and injury management services. Book your appointment today.',
};

export default function EdmontonWestLocationPage() {
  const location = {
    name: 'AIM Performance West',
    address: {
      line_1: '11420 170 St NW',
      city: 'Edmonton',
      province: 'AB',
      postal_code: 'T5S 1J7',
      country: 'Canada',
    },
    phone: '(780) 250-8188',
    email: 'info@albertainjurymanagement.ca',
    hours: {
      monday: '8:00 AM – 6:00 PM',
      tuesday: '8:00 AM – 6:00 PM',
      wednesday: '8:00 AM – 6:00 PM',
      thursday: '8:00 AM – 6:00 PM',
      friday: '8:00 AM – 5:00 PM',
    },
  };

  const schema = generateMedicalBusinessSchema(location, {
    description: 'Expert physiotherapy and injury management in West Edmonton',
    services: ['Physiotherapy', 'WCB Rehabilitation', 'MVA Recovery', 'Sports Rehabilitation'],
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: injectSchema(schema) }}
      />

      <div className="bg-gradient-to-b from-aim-steel-blue to-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight text-aim-navy sm:text-5xl">
              AIM Performance West
            </h1>
            <p className="mt-6 text-lg leading-8 text-aim-slate">
              Your trusted partner for physiotherapy and injury management in West Edmonton.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Button asChild size="lg" className="bg-aim-cta-primary hover:bg-aim-cta-primary/90 w-full sm:w-auto">
                <Link href="/book">Book Appointment</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-aim-navy text-aim-navy hover:bg-aim-steel-blue w-full sm:w-auto">
                <Link href="tel:+17802508188">
                  <Phone className="h-5 w-5 mr-2" aria-hidden="true" />
                  (780) 250-8188
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-8">
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-bold text-aim-navy mb-6">Location Details</h2>
                  <div className="space-y-6">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-6 w-6 flex-none text-aim-teal mt-1" aria-hidden="true" />
                      <div>
                        <p className="font-semibold text-aim-navy">Address</p>
                        <p className="text-aim-slate">
                          11420 170 St NW<br />
                          Edmonton, AB T5S 1J7
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Phone className="h-6 w-6 flex-none text-aim-teal mt-1" aria-hidden="true" />
                      <div>
                        <p className="font-semibold text-aim-navy">Phone</p>
                        <a href="tel:+17802508188" className="text-aim-teal hover:underline">
                          (780) 250-8188
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Mail className="h-6 w-6 flex-none text-aim-teal mt-1" aria-hidden="true" />
                      <div>
                        <p className="font-semibold text-aim-navy">Email</p>
                        <a href="mailto:info@albertainjurymanagement.ca" className="text-aim-teal hover:underline">
                          info@albertainjurymanagement.ca
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Clock className="h-6 w-6 flex-none text-aim-teal mt-1" aria-hidden="true" />
                      <div>
                        <p className="font-semibold text-aim-navy mb-2">Hours of Operation</p>
                        <div className="space-y-1 text-aim-slate">
                          <p>Monday: 8:00 AM - 6:00 PM</p>
                          <p>Tuesday: 8:00 AM - 6:00 PM</p>
                          <p>Wednesday: 8:00 AM - 6:00 PM</p>
                          <p>Thursday: 8:00 AM - 6:00 PM</p>
                          <p>Friday: 8:00 AM - 5:00 PM</p>
                          <p>Saturday - Sunday: Closed</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Car className="h-6 w-6 flex-none text-aim-teal mt-1" aria-hidden="true" />
                      <div>
                        <p className="font-semibold text-aim-navy">Parking & Accessibility</p>
                        <p className="text-aim-slate">
                          Free parking available on-site. Wheelchair accessible entrance and facilities.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold text-aim-navy mb-4">Services Offered</h3>
                  <ul className="space-y-2">
                    {[
                      'Physiotherapy',
                      'WCB Rehabilitation',
                      'MVA Recovery',
                      'Return-to-Work Programs',
                      'Performance Rehab',
                      'Functional Capacity Evaluations',
                      'Athletic Training',
                      'Senior Mobility Programs',
                    ].map((service) => (
                      <li key={service} className="text-aim-slate flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-aim-teal" aria-hidden="true" />
                        {service}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-aim-navy text-white">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-4">Book Your Visit</h3>
                  <p className="mb-6 text-gray-300">
                    Ready to start your recovery? Book your appointment today.
                  </p>
                  <Button asChild size="lg" className="w-full bg-aim-teal hover:bg-aim-teal/90">
                    <Link href="/book">Book Now</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <LazyChatWidget />
    </>
  );
}
