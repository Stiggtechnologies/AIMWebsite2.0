import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function ConditionCard({
  name,
  slug,
  shortDescription,
}: {
  name: string;
  slug: string;
  shortDescription: string;
}) {
  return (
    <Link
      href={`/conditions/${slug}`}
      className="group flex flex-col rounded-2xl border border-aim-divider-gray/50 bg-white p-5 transition hover:-translate-y-0.5 hover:border-aim-teal/50 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aim-teal focus-visible:ring-offset-2"
    >
      <h3 className="text-base font-semibold text-aim-navy">{name}</h3>
      <p className="mt-1.5 flex-1 text-sm leading-relaxed text-aim-slate/75">{shortDescription}</p>
      <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-aim-teal transition group-hover:gap-2">
        Learn more <ArrowRight className="h-3.5 w-3.5" />
      </span>
    </Link>
  );
}
