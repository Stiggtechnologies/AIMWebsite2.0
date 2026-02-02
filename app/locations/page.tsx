import Link from 'next/link';
import { MapPin, Phone, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LazyChatWidget } from '@/components/ai/lazy-chat-widget';
import { supabase } from '@/lib/supabase';

export const metadata = {
  title: 'Locations | Alberta Injury Management',
  description: 'Find AIM clinic locations across Alberta. Convenient access to expert physiotherapy and injury management services.',
};

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

async function getLocations(): Promise<Location[]> {
  const { data, error } = await supabase
    .from('locations')
    .select('*')
    .eq('is_active', true)
    .order('name');

  if (error) {
    console.error('Error fetching locations:', error);
    return [];
  }

  return data || [];
}

function formatHours(hours: any): string[] {
  if (!hours || typeof hours !== 'object') {
    return ['Hours: By appointment'];
  }

  const daysOrder = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const formattedHours: string[] = [];

  for (const day of daysOrder) {
    if (hours[day]) {
      const dayName = day.charAt(0).toUpperCase() + day.slice(1);
      formattedHours.push(`${dayName}: ${hours[day]}`);
    }
  }

  return formattedHours.length > 0 ? formattedHours : ['Hours: By appointment'];
}

export default async function LocationsPage() {
  const locations = await getLocations();

  return (
    <>
      <div className="bg-aim-navy py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Our Locations
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Convenient clinic locations across Alberta with flexible scheduling.
            </p>
          </div>
        </div>
      </div>

      <div className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8">
            {locations.map((location) => (
              <Card key={location.id}>
                <CardHeader>
                  <CardTitle className="text-2xl">{location.name}</CardTitle>
                  <CardDescription className="text-base">
                    {location.address.city}, {location.address.province}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 flex-none text-aim-teal mt-1" aria-hidden="true" />
                      <div>
                        <p className="font-medium text-aim-navy">Address</p>
                        <p className="text-aim-slate">
                          {location.address.line_1}<br />
                          {location.address.city}, {location.address.province} {location.address.postal_code}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 flex-none text-aim-teal mt-1" aria-hidden="true" />
                      <div>
                        <p className="font-medium text-aim-navy">Phone</p>
                        <a href={`tel:${location.phone.replace(/\D/g, '')}`} className="text-aim-teal hover:underline">
                          {location.phone}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 flex-none text-aim-teal mt-1" aria-hidden="true" />
                      <div>
                        <p className="font-medium text-aim-navy">Hours</p>
                        <div className="text-aim-slate space-y-1">
                          {formatHours(location.hours).map((hour, idx) => (
                            <p key={idx}>{hour}</p>
                          ))}
                        </div>
                      </div>
                    </div>

                    {location.services && location.services.length > 0 && (
                      <div className="pt-4 border-t border-aim-divider-gray">
                        <p className="font-medium text-aim-navy mb-3">Services</p>
                        <div className="flex flex-wrap gap-2">
                          {location.services.map((service) => (
                            <span key={service} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-aim-steel-blue text-aim-navy">
                              {service}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="pt-4 flex gap-3">
                      <Button asChild className="flex-1 bg-aim-cta-primary hover:bg-aim-cta-primary/90">
                        <Link href="/book">Book Appointment</Link>
                      </Button>
                      <Button asChild variant="outline" className="flex-1 border-aim-navy text-aim-navy hover:bg-aim-steel-blue">
                        <Link href={`/locations/${location.slug}`} className="flex items-center justify-center gap-2">
                          View Details <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {locations.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-aim-slate">No locations available at this time.</p>
            </div>
          )}

          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold text-aim-navy mb-4">Expanding Across Alberta</h2>
            <p className="text-lg text-aim-slate max-w-2xl mx-auto">
              We're growing to serve more communities across Alberta. Additional locations coming soon to better serve your rehabilitation needs.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-aim-steel-blue py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-aim-navy sm:text-4xl mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-aim-slate mb-8">
            Book your appointment or contact us to learn more about our services.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="bg-aim-cta-primary hover:bg-aim-cta-primary/90">
              <Link href="/book">Book Appointment</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-aim-navy text-aim-navy hover:bg-white">
              <Link href="tel:+17802508188">Call (780) 250-8188</Link>
            </Button>
          </div>
        </div>
      </div>

      <LazyChatWidget />
    </>
  );
}
