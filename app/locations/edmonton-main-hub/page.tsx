import { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Phone, Mail, Clock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Main Hub Clinic - Edmonton | Alberta Injury Management',
  description: 'Visit our Main Hub Clinic in Edmonton. Central intake and administrative headquarters providing comprehensive injury management and rehabilitation services.',
};

export default function MainHubLocationPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "Alberta Injury Management – Main Hub Clinic",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Unit 100, 4936 87 Street NW",
      "addressLocality": "Edmonton",
      "addressRegion": "AB",
      "postalCode": "T6E 5W3",
      "addressCountry": "CA"
    },
    "telephone": "780-250-8188",
    "email": "info@albertainjurymanagement.ca",
    "areaServed": "Alberta",
    "medicalSpecialty": "Physiotherapy"
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="bg-gradient-to-b from-aim-bg-light to-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-aim-deep-blue sm:text-5xl mb-4">
              Main Hub Clinic
            </h1>
            <p className="text-xl text-aim-text-gray max-w-2xl mx-auto">
              Central intake and administrative headquarters for Alberta Injury Management
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-aim-teal" />
                  Location & Contact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-semibold text-aim-deep-blue mb-1">Address</p>
                  <p className="text-aim-text-gray">
                    Unit 100, 4936 87 Street NW<br />
                    Edmonton, AB T6E 5W3
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-aim-deep-blue mb-1 flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Phone
                  </p>
                  <a href="tel:+17802508188" className="text-aim-teal hover:underline">
                    (780) 250-8188
                  </a>
                  <p className="text-sm text-aim-text-gray mt-1">
                    Central intake for all AIM locations
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-aim-deep-blue mb-1 flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email
                  </p>
                  <a href="mailto:info@albertainjurymanagement.ca" className="text-aim-teal hover:underline">
                    info@albertainjurymanagement.ca
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-aim-teal" />
                  Hours of Operation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-aim-text-gray">Monday</span>
                    <span className="font-medium text-aim-deep-blue">8:00 AM – 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-aim-text-gray">Tuesday</span>
                    <span className="font-medium text-aim-deep-blue">8:00 AM – 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-aim-text-gray">Wednesday</span>
                    <span className="font-medium text-aim-deep-blue">8:00 AM – 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-aim-text-gray">Thursday</span>
                    <span className="font-medium text-aim-deep-blue">8:00 AM – 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-aim-text-gray">Friday</span>
                    <span className="font-medium text-aim-deep-blue">8:00 AM – 5:00 PM</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-12">
            <CardHeader>
              <CardTitle>Services Offered</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  'Physiotherapy',
                  'WCB Rehabilitation',
                  'Return-to-Work Programs',
                  'Chronic Pain Management',
                  'Functional Capacity Evaluations',
                  'Work Conditioning',
                  'Work Hardening',
                  'Employer Injury Management Programs'
                ].map((service) => (
                  <div key={service} className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-aim-teal flex-shrink-0 mt-0.5" />
                    <span className="text-aim-text-gray">{service}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-aim-teal to-aim-deep-blue text-white">
            <CardContent className="py-8">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">Central Intake Hub</h2>
                <p className="text-lg mb-6 max-w-2xl mx-auto opacity-90">
                  Our Main Hub Clinic serves as the central coordination point for all AIM services.
                  Whether you need care at this location or one of our satellite clinics, our team
                  will ensure you receive the right treatment at the right location.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Button asChild size="lg" variant="secondary">
                    <Link href="/book">Book Appointment</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="bg-white/10 border-white text-white hover:bg-white/20">
                    <a href="tel:+17802508188">Call (780) 250-8188</a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
