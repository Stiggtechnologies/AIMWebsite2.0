'use client';

import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import { Menu, X, Phone, MapPin, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CENTRAL_PHONE_DISPLAY, CENTRAL_PHONE_TEL } from '@/lib/config';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-aim-divider-gray bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-x-6 p-4 lg:px-8" aria-label="Global navigation">
        <div className="flex flex-shrink-0">
          <Link href="/" className="-m-1.5 p-1.5 focus:outline-none focus:ring-2 focus:ring-aim-teal focus:ring-offset-2 rounded">
            <span className="sr-only">Alberta Injury Management</span>
            <Image
              src="/aim-logo-28oct18-resized.jpg"
              alt="Alberta Injury Management Logo"
              width={260}
              height={87}
              className="h-20 w-auto"
              priority
            />
          </Link>
        </div>

        <div className="flex lg:hidden">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 hover:bg-gray-100"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:items-center lg:gap-x-5 xl:gap-x-6">
          <Link
            href="/get-care"
            className="text-sm font-medium leading-6 text-aim-slate hover:text-aim-teal transition-colors whitespace-nowrap"
          >
            Get Care
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium leading-6 text-aim-slate hover:text-aim-teal transition-colors whitespace-nowrap">
              Services
              <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-64">
              <DropdownMenuItem asChild>
                <Link href="/services/physiotherapy" className="w-full cursor-pointer">
                  Physiotherapy
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/services/wcb-rehabilitation" className="w-full cursor-pointer">
                  WCB Rehabilitation
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/services/work-hardening" className="w-full cursor-pointer">
                  Work Hardening
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/services/work-conditioning" className="w-full cursor-pointer">
                  Work Conditioning
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/services/functional-capacity-evaluations" className="w-full cursor-pointer">
                  Functional Capacity Evaluations
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/services/return-to-work" className="w-full cursor-pointer">
                  Return to Work Programs
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/services/performance-rehabilitation" className="w-full cursor-pointer">
                  Performance Rehabilitation
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/services/manual-osteopathy" className="w-full cursor-pointer">
                  Manual Osteopathy
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/services/sports-injury-rehabilitation" className="w-full cursor-pointer">
                  Sports Injury Rehabilitation
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/services/concussion-rehabilitation" className="w-full cursor-pointer">
                  Concussion Rehabilitation
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/services/vestibular-rehabilitation" className="w-full cursor-pointer">
                  Vestibular Rehabilitation
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/services/pelvic-floor-physiotherapy" className="w-full cursor-pointer">
                  Pelvic Floor Physiotherapy
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/services/post-surgical-rehabilitation" className="w-full cursor-pointer">
                  Post-Surgical Rehabilitation
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/services/chronic-pain-rehabilitation" className="w-full cursor-pointer">
                  Chronic Pain Rehabilitation
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/services/mva-rehabilitation" className="w-full cursor-pointer">
                  MVA Rehabilitation
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/services/massage-therapy" className="w-full cursor-pointer">
                  Massage Therapy
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/services/chiropractic-care" className="w-full cursor-pointer">
                  Chiropractic Care
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/services/direct-billing" className="w-full cursor-pointer">
                  Direct Billing
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link
            href="/conditions"
            className="text-sm font-medium leading-6 text-aim-slate hover:text-aim-teal transition-colors whitespace-nowrap"
          >
            Conditions
          </Link>
          <Link
            href="/for-patients"
            className="text-sm font-medium leading-6 text-aim-slate hover:text-aim-teal transition-colors whitespace-nowrap"
          >
            For Patients
          </Link>
          <Link
            href="/programs"
            className="text-sm font-medium leading-6 text-aim-slate hover:text-aim-teal transition-colors whitespace-nowrap"
          >
            Programs
          </Link>
          <Link
            href="/who-we-help"
            className="text-sm font-medium leading-6 text-aim-slate hover:text-aim-teal transition-colors whitespace-nowrap"
          >
            Who We Help
          </Link>
          <Link
            href="/locations"
            className="text-sm font-medium leading-6 text-aim-slate hover:text-aim-teal transition-colors whitespace-nowrap"
          >
            Locations
          </Link>
          <Link
            href="/employers"
            className="text-sm font-medium leading-6 text-aim-slate hover:text-aim-teal transition-colors whitespace-nowrap"
          >
            For Employers
          </Link>
          <Link
            href="/resources"
            className="text-sm font-medium leading-6 text-aim-slate hover:text-aim-teal transition-colors whitespace-nowrap"
          >
            Resources
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium leading-6 text-aim-slate hover:text-aim-teal transition-colors whitespace-nowrap"
          >
            About
          </Link>
        </div>

        <div className="hidden lg:flex lg:items-center lg:justify-end lg:gap-x-3 lg:ml-6">
          <Button
            variant="outline"
            size="sm"
            asChild
            className="border-aim-navy text-aim-navy hover:bg-aim-steel-blue whitespace-nowrap"
          >
            <Link href={`tel:${CENTRAL_PHONE_TEL}`} className="flex items-center gap-1">
              <Phone className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only">Call us at </span>
              {CENTRAL_PHONE_DISPLAY}
            </Link>
          </Button>
          <Button
            size="sm"
            asChild
            className="bg-aim-cta-primary hover:bg-aim-cta-primary/90 text-white whitespace-nowrap"
          >
            <Link href="/book">Book Appointment</Link>
          </Button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="fixed inset-0 z-[60] bg-black/20" onClick={() => setMobileMenuOpen(false)} aria-hidden="true"></div>
          <div className="fixed inset-y-0 right-0 z-[70] w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5" onClick={() => setMobileMenuOpen(false)}>
                <span className="sr-only">Alberta Injury Management</span>
                <Image
                  src="/aim-logo-28oct18-resized.jpg"
                  alt="Alberta Injury Management Logo"
                  width={200}
                  height={67}
                  className="h-16 w-auto"
                />
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-1 py-6">
                  <Link
                    href="/get-care"
                    className="-mx-3 block rounded-lg px-3 py-3 text-base font-semibold leading-6 text-gray-900 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Get Care
                  </Link>
                  <div className="-mx-3">
                    <button
                      type="button"
                      className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-base font-semibold leading-6 text-gray-900 hover:bg-gray-50"
                      onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                    >
                      Services
                      <ChevronDown className={`h-5 w-5 flex-none transition-transform duration-200 ${mobileServicesOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
                    </button>
                    {mobileServicesOpen && (
                      <div className="space-y-1 pl-3 pb-2">
                        <Link
                          href="/services/physiotherapy"
                          className="block rounded-lg px-3 py-2 text-sm leading-6 text-gray-700 hover:bg-gray-50"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Physiotherapy
                        </Link>
                        <Link
                          href="/services/wcb-rehabilitation"
                          className="block rounded-lg px-3 py-2 text-sm leading-6 text-gray-700 hover:bg-gray-50"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          WCB Rehabilitation
                        </Link>
                        <Link
                          href="/services/work-hardening"
                          className="block rounded-lg px-3 py-2 text-sm leading-6 text-gray-700 hover:bg-gray-50"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Work Hardening
                        </Link>
                        <Link
                          href="/services/work-conditioning"
                          className="block rounded-lg px-3 py-2 text-sm leading-6 text-gray-700 hover:bg-gray-50"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Work Conditioning
                        </Link>
                        <Link
                          href="/services/functional-capacity-evaluations"
                          className="block rounded-lg px-3 py-2 text-sm leading-6 text-gray-700 hover:bg-gray-50"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Functional Capacity Evaluations
                        </Link>
                        <Link
                          href="/services/return-to-work"
                          className="block rounded-lg px-3 py-2 text-sm leading-6 text-gray-700 hover:bg-gray-50"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Return to Work Programs
                        </Link>
                        <Link
                          href="/services/performance-rehabilitation"
                          className="block rounded-lg px-3 py-2 text-sm leading-6 text-gray-700 hover:bg-gray-50"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Performance Rehabilitation
                        </Link>
                        <Link
                          href="/services/manual-osteopathy"
                          className="block rounded-lg px-3 py-2 text-sm leading-6 text-gray-700 hover:bg-gray-50"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Manual Osteopathy
                        </Link>
                        <Link
                          href="/services/sports-injury-rehabilitation"
                          className="block rounded-lg px-3 py-2 text-sm leading-6 text-gray-700 hover:bg-gray-50"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Sports Injury Rehabilitation
                        </Link>
                        <Link
                          href="/services/concussion-rehabilitation"
                          className="block rounded-lg px-3 py-2 text-sm leading-6 text-gray-700 hover:bg-gray-50"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Concussion Rehabilitation
                        </Link>
                        <Link
                          href="/services/vestibular-rehabilitation"
                          className="block rounded-lg px-3 py-2 text-sm leading-6 text-gray-700 hover:bg-gray-50"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Vestibular Rehabilitation
                        </Link>
                        <Link
                          href="/services/pelvic-floor-physiotherapy"
                          className="block rounded-lg px-3 py-2 text-sm leading-6 text-gray-700 hover:bg-gray-50"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Pelvic Floor Physiotherapy
                        </Link>
                        <Link
                          href="/services/post-surgical-rehabilitation"
                          className="block rounded-lg px-3 py-2 text-sm leading-6 text-gray-700 hover:bg-gray-50"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Post-Surgical Rehabilitation
                        </Link>
                        <Link
                          href="/services/chronic-pain-rehabilitation"
                          className="block rounded-lg px-3 py-2 text-sm leading-6 text-gray-700 hover:bg-gray-50"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Chronic Pain Rehabilitation
                        </Link>
                        <Link
                          href="/services/mva-rehabilitation"
                          className="block rounded-lg px-3 py-2 text-sm leading-6 text-gray-700 hover:bg-gray-50"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          MVA Rehabilitation
                        </Link>
                        <Link
                          href="/services/massage-therapy"
                          className="block rounded-lg px-3 py-2 text-sm leading-6 text-gray-700 hover:bg-gray-50"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Massage Therapy
                        </Link>
                        <Link
                          href="/services/chiropractic-care"
                          className="block rounded-lg px-3 py-2 text-sm leading-6 text-gray-700 hover:bg-gray-50"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Chiropractic Care
                        </Link>
                        <Link
                          href="/services/direct-billing"
                          className="block rounded-lg px-3 py-2 text-sm leading-6 text-gray-700 hover:bg-gray-50"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Direct Billing
                        </Link>
                      </div>
                    )}
                  </div>
                  <Link
                    href="/conditions"
                    className="-mx-3 block rounded-lg px-3 py-3 text-base font-semibold leading-6 text-gray-900 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Conditions
                  </Link>
                  <Link
                    href="/for-patients"
                    className="-mx-3 block rounded-lg px-3 py-3 text-base font-semibold leading-6 text-gray-900 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    For Patients
                  </Link>
                  <Link
                    href="/programs"
                    className="-mx-3 block rounded-lg px-3 py-3 text-base font-semibold leading-6 text-gray-900 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Programs
                  </Link>
                  <Link
                    href="/who-we-help"
                    className="-mx-3 block rounded-lg px-3 py-3 text-base font-semibold leading-6 text-gray-900 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Who We Help
                  </Link>
                  <Link
                    href="/locations"
                    className="-mx-3 block rounded-lg px-3 py-3 text-base font-semibold leading-6 text-gray-900 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Locations
                  </Link>
                  <Link
                    href="/employers"
                    className="-mx-3 block rounded-lg px-3 py-3 text-base font-semibold leading-6 text-gray-900 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    For Employers
                  </Link>
                  <Link
                    href="/resources"
                    className="-mx-3 block rounded-lg px-3 py-3 text-base font-semibold leading-6 text-gray-900 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Resources
                  </Link>
                  <Link
                    href="/about"
                    className="-mx-3 block rounded-lg px-3 py-3 text-base font-semibold leading-6 text-gray-900 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    About
                  </Link>
                </div>
                <div className="space-y-1 py-6">
                  <Link
                    href="/book"
                    className="-mx-3 block rounded-lg px-3 py-3 text-base font-semibold leading-6 text-gray-900 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Book Appointment
                  </Link>
                  <Link
                    href={`tel:${CENTRAL_PHONE_TEL}`}
                    className="-mx-3 block rounded-lg px-3 py-3 text-base font-semibold leading-6 text-gray-900 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Call {CENTRAL_PHONE_DISPLAY}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
