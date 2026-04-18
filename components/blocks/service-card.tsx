import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export type ServiceCardProps = {
  name: string;
  slug: string;
  shortDescription: string;
  icon?: React.ReactNode;
};

export function ServiceCard({ name, slug, shortDescription, icon }: ServiceCardProps) {
  return (
    <Link
      href={`/services/${slug}`}
      className="group flex h-full flex-col rounded-2xl border border-aim-divider-gray/50 bg-white p-6 transition hover:-translate-y-0.5 hover:border-aim-teal/50 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aim-teal focus-visible:ring-offset-2"
    >
      {icon && <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-aim-steel-blue text-aim-navy">{icon}</div>}
      <h3 className="text-lg font-semibold text-aim-navy">{name}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-aim-slate/80">{shortDescription}</p>
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-aim-teal transition group-hover:gap-2.5">
        Learn more <ArrowRight className="h-4 w-4" />
      </span>
    </Link>
  );
}
