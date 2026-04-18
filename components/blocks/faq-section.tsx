'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export type FaqSectionProps = {
  heading?: string;
  subheading?: string;
  faqs: { q: string; a: string }[];
};

export function FaqSection({ heading = 'Frequently Asked Questions', subheading, faqs }: FaqSectionProps) {
  if (!faqs?.length) return null;
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-3xl px-6 md:px-8">
        <div className="mb-10">
          <h2 className="text-3xl font-semibold tracking-tight text-aim-navy md:text-4xl">{heading}</h2>
          {subheading && <p className="mt-3 text-lg text-aim-slate/80">{subheading}</p>}
        </div>
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((f, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="overflow-hidden rounded-2xl border border-aim-divider-gray/60 bg-aim-off-white px-5"
            >
              <AccordionTrigger className="py-5 text-left text-base font-semibold text-aim-navy hover:no-underline md:text-lg">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-aim-slate/85 md:text-[17px] md:leading-relaxed">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
