'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Calendar, Clock, MapPin, Phone, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { LazyChatWidget } from '@/components/ai/lazy-chat-widget';
import { supabase } from '@/lib/supabase';
import { useTracking } from '@/components/providers/tracking-provider';
import { SERVICE_BOOKING_RULES, canSelfBook, getBookingRestrictionMessage, type ServiceSlug } from '@/lib/config';

interface Location {
  id: string;
  name: string;
  slug: string;
  address: {
    line_1: string;
    city: string;
    province: string;
    postal_code: string;
    country: string;
  };
  phone: string;
  email: string | null;
  hours: any;
  services: string[];
  is_active: boolean;
}

function formatHours(hours: any): { weekdays: string; friday?: string } {
  if (!hours || typeof hours !== 'object') {
    return { weekdays: 'By appointment' };
  }

  const monday = hours.monday || '';
  const friday = hours.friday || '';

  return {
    weekdays: monday,
    friday: friday !== monday ? friday : undefined,
  };
}

export default function BookPage() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const { personaType } = useTracking();
  const searchParams = useSearchParams();
  const serviceInterest = searchParams.get('service');

  useEffect(() => {
    async function fetchLocations() {
      const { data, error } = await supabase
        .from('locations')
        .select('*')
        .eq('is_active', true)
        .order('name');

      if (error) {
        console.error('Error fetching locations:', error);
      } else {
        setLocations(data || []);
      }
      setLoading(false);
    }

    fetchLocations();
  }, []);

  const hasServiceRestriction = serviceInterest && SERVICE_BOOKING_RULES[serviceInterest as ServiceSlug];
  const canBook = !serviceInterest || canSelfBook(serviceInterest as ServiceSlug, personaType);
  const restrictionMessage = serviceInterest ? getBookingRestrictionMessage(serviceInterest as ServiceSlug) : null;

  const showBookingRestriction = hasServiceRestriction && !canBook && restrictionMessage;

  return (
    <>
      <div className="bg-gradient-to-b from-aim-steel-blue to-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-aim-navy sm:text-5xl">
              Book Your Appointment
            </h1>
            <p className="mt-6 text-lg leading-8 text-aim-slate">
              Get expert care when you need it. Most appointments available within 24-48 hours.
            </p>
          </div>
        </div>
      </div>

      {showBookingRestriction && (
        <div className="py-8">
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            <Alert className="border-aim-navy bg-aim-steel-blue">
              <AlertCircle className="h-5 w-5 text-aim-navy" />
              <AlertDescription className="text-aim-navy font-medium">
                {restrictionMessage}
              </AlertDescription>
            </Alert>
          </div>
        </div>
      )}

      <div className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-aim-navy sm:text-4xl">
              {showBookingRestriction ? 'Contact Our Team' : 'Choose How to Book'}
            </h2>
            {showBookingRestriction && (
              <p className="mt-4 text-aim-slate">
                Please call us to discuss your needs and we'll coordinate the appropriate service for you.
              </p>
            )}
          </div>

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
            <Card className="flex flex-col">
              <CardHeader>
                <Phone className="h-10 w-10 text-aim-teal mb-4" />
                <CardTitle>Call to Book</CardTitle>
                <CardDescription>
                  Speak directly with our team to schedule your appointment and answer any questions.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-end">
                <Button asChild size="lg" className="w-full bg-aim-cta-primary hover:bg-aim-cta-primary/90">
                  <Link href="tel:+17802508188">
                    <Phone className="h-5 w-5 mr-2" />
                    (780) 250-8188
                  </Link>
                </Button>
                <p className="mt-4 text-sm text-center text-aim-slate/60">
                  Mon-Fri: 8:00 AM - 6:00 PM
                </p>
              </CardContent>
            </Card>

            {!showBookingRestriction && (
              <Card className="flex flex-col">
                <CardHeader>
                  <Calendar className="h-10 w-10 text-aim-teal mb-4" />
                  <CardTitle>Complete Intake First</CardTitle>
                  <CardDescription>
                    For faster processing, complete your intake form before booking. We'll have everything ready for your first visit.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-end">
                  <Button asChild size="lg" variant="outline" className="w-full border-aim-navy text-aim-navy hover:bg-aim-steel-blue">
                    <Link href="/intake">Start Intake Form</Link>
                  </Button>
                </CardContent>
              </Card>
            )}

            {showBookingRestriction && (
              <Card className="flex flex-col">
                <CardHeader>
                  <Calendar className="h-10 w-10 text-aim-teal mb-4" />
                  <CardTitle>Employer or Case Manager Inquiry</CardTitle>
                  <CardDescription>
                    If you're an employer or case manager, use our specialized contact form to coordinate services.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-end">
                  <Button asChild size="lg" variant="outline" className="w-full border-aim-navy text-aim-navy hover:bg-aim-steel-blue">
                    <Link href="/employers">Contact for Employers</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      <div className="bg-aim-steel-blue py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-aim-navy sm:text-4xl">
              {locations.length > 1 ? 'Our Locations' : 'Our Location'}
            </h2>
          </div>

          {loading ? (
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-aim-slate">Loading locations...</p>
            </div>
          ) : locations.length > 0 ? (
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
              {locations.map((location) => {
                const hours = formatHours(location.hours);
                return (
                  <Card key={location.id}>
                    <CardHeader>
                      <CardTitle>{location.name}</CardTitle>
                      <CardDescription className="flex items-start gap-2 text-base">
                        <MapPin className="h-5 w-5 flex-none text-aim-teal mt-0.5" />
                        <div>
                          {location.address.line_1}<br />
                          {location.address.city}, {location.address.province} {location.address.postal_code}
                        </div>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-start gap-2">
                          <Phone className="h-5 w-5 flex-none text-aim-teal mt-0.5" />
                          <div>
                            <p className="font-medium">Phone</p>
                            <a href={`tel:${location.phone}`} className="text-sm text-aim-slate/80 hover:text-aim-teal">
                              {location.phone}
                            </a>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Clock className="h-5 w-5 flex-none text-aim-teal mt-0.5" />
                          <div>
                            <p className="font-medium">Hours</p>
                            <p className="text-sm text-aim-slate/80">Mon-Thu: {hours.weekdays}</p>
                            {hours.friday && (
                              <p className="text-sm text-aim-slate/80">Fri: {hours.friday}</p>
                            )}
                          </div>
                        </div>
                        <Button asChild className="w-full bg-aim-navy hover:bg-aim-navy/90">
                          <Link href={`/locations/${location.slug}`}>View Location Details</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-aim-slate">
                Please call us at{' '}
                <a href="tel:+17802508188" className="font-semibold text-aim-teal hover:underline">
                  (780) 250-8188
                </a>{' '}
                to book your appointment.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-aim-navy sm:text-4xl">
            What to Bring to Your First Appointment
          </h2>
          <div className="mx-auto mt-10 max-w-2xl">
            <ul className="text-left space-y-3">
              {[
                'Government-issued photo ID',
                'Insurance information (WCB claim number, MVA insurance details, or private insurance card)',
                'Referral letter if you have one (not required)',
                'List of current medications',
                'Comfortable clothing suitable for physical assessment',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Calendar className="h-6 w-6 flex-none text-aim-teal mt-0.5" />
                  <span className="text-aim-slate">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <LazyChatWidget />
    </>
  );
}
