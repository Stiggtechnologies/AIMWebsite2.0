import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, Star } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-aim-navy text-white" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-3">
                <Image
                  src="/aim-logo-28oct18-resized.jpg"
                  alt="Alberta Injury Management Logo"
                  width={150}
                  height={50}
                  className="h-12 w-auto"
                />
                <span className="font-semibold text-lg">Alberta Injury Management</span>
              </div>
              <p className="mt-4 text-sm leading-6 text-gray-300">
                Outcome-based physiotherapy and injury management for Alberta. Expert care for work injuries, MVA recovery, and athletic performance.
              </p>
              <div className="mt-4 flex items-center gap-2">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((position) => {
                    const rating = 4.9;
                    const fillPercentage = Math.min(Math.max(rating - (position - 1), 0), 1);

                    return (
                      <div key={position} className="relative">
                        <Star className="h-4 w-4 text-gray-500" />
                        <div
                          className="absolute inset-0 overflow-hidden"
                          style={{ width: `${fillPercentage * 100}%` }}
                        >
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        </div>
                      </div>
                    );
                  })}
                </div>
                <span className="text-sm text-gray-300">4.9/5 from 67 Google Reviews</span>
              </div>
            </div>
            <div className="flex space-x-6">
              <a
                href="tel:+17802508188"
                className="text-gray-300 hover:text-aim-teal transition-colors"
                aria-label="Call Alberta Injury Management"
              >
                <Phone className="h-6 w-6" aria-hidden="true" />
              </a>
              <a
                href="mailto:info@albertainjurymanagement.ca"
                className="text-gray-300 hover:text-aim-teal transition-colors"
                aria-label="Email Alberta Injury Management"
              >
                <Mail className="h-6 w-6" aria-hidden="true" />
              </a>
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">Get Care</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li>
                    <Link href="/book" className="text-sm leading-6 text-gray-300 hover:text-aim-teal transition-colors">
                      Book Appointment
                    </Link>
                  </li>
                  <li>
                    <Link href="/intake" className="text-sm leading-6 text-gray-300 hover:text-aim-teal transition-colors">
                      Start Intake
                    </Link>
                  </li>
                  <li>
                    <Link href="/locations" className="text-sm leading-6 text-gray-300 hover:text-aim-teal transition-colors">
                      Find Location
                    </Link>
                  </li>
                  <li>
                    <Link href="/get-care" className="text-sm leading-6 text-gray-300 hover:text-aim-teal transition-colors">
                      How It Works
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white">Programs</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li>
                    <Link href="/programs/wcb" className="text-sm leading-6 text-gray-300 hover:text-aim-teal transition-colors">
                      WCB Rehabilitation
                    </Link>
                  </li>
                  <li>
                    <Link href="/programs/mva" className="text-sm leading-6 text-gray-300 hover:text-aim-teal transition-colors">
                      MVA Recovery
                    </Link>
                  </li>
                  <li>
                    <Link href="/programs/athletic" className="text-sm leading-6 text-gray-300 hover:text-aim-teal transition-colors">
                      Athletic Performance
                    </Link>
                  </li>
                  <li>
                    <Link href="/programs/senior" className="text-sm leading-6 text-gray-300 hover:text-aim-teal transition-colors">
                      Senior Mobility
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">Company</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li>
                    <Link href="/about" className="text-sm leading-6 text-gray-300 hover:text-aim-teal transition-colors">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/employers" className="text-sm leading-6 text-gray-300 hover:text-aim-teal transition-colors">
                      For Employers
                    </Link>
                  </li>
                  <li>
                    <Link href="/insurers" className="text-sm leading-6 text-gray-300 hover:text-aim-teal transition-colors">
                      For Insurers
                    </Link>
                  </li>
                  <li>
                    <Link href="/resources" className="text-sm leading-6 text-gray-300 hover:text-aim-teal transition-colors">
                      Resources
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white">Legal</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li>
                    <Link href="/privacy" className="text-sm leading-6 text-gray-300 hover:text-aim-teal transition-colors">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/accessibility" className="text-sm leading-6 text-gray-300 hover:text-aim-teal transition-colors">
                      Accessibility
                    </Link>
                  </li>
                  <li>
                    <Link href="/ai-disclosure" className="text-sm leading-6 text-gray-300 hover:text-aim-teal transition-colors">
                      AI Disclosure
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="text-xs leading-5 text-gray-400">
              &copy; {new Date().getFullYear()} Alberta Injury Management. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              <span>Edmonton, Alberta</span>
            </div>
          </div>
          <p className="mt-4 text-xs leading-5 text-gray-500">
            Healthcare Disclaimer: Information on this website is for educational purposes only and does not constitute medical advice. Always consult with a qualified healthcare provider for diagnosis and treatment.
          </p>
        </div>
      </div>
    </footer>
  );
}
