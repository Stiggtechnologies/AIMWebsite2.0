import { ReactNode } from 'react';

export function Section({
  children,
  eyebrow,
  heading,
  subheading,
  muted,
  center,
  className = '',
  id,
}: {
  children: ReactNode;
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  muted?: boolean;
  center?: boolean;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`${muted ? 'bg-aim-off-white' : 'bg-white'} py-16 md:py-20 ${className}`}>
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        {(eyebrow || heading || subheading) && (
          <div className={`mb-12 ${center ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}`}>
            {eyebrow && (
              <div className="mb-3 text-sm font-semibold uppercase tracking-wider text-aim-teal">
                {eyebrow}
              </div>
            )}
            {heading && (
              <h2 className="text-3xl font-semibold tracking-tight text-aim-navy md:text-4xl">
                {heading}
              </h2>
            )}
            {subheading && (
              <p className="mt-4 text-lg leading-relaxed text-aim-slate/80">{subheading}</p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

export function FeatureList({ items, columns = 2 }: { items: string[]; columns?: 1 | 2 | 3 }) {
  const cols = columns === 3 ? 'md:grid-cols-3' : columns === 2 ? 'md:grid-cols-2' : '';
  return (
    <ul className={`grid grid-cols-1 gap-3 ${cols}`}>
      {items.map((item, i) => (
        <li
          key={i}
          className="flex items-start gap-3 rounded-xl bg-aim-steel-blue/50 px-4 py-3 text-[15px] text-aim-navy"
        >
          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-aim-teal" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-4 text-[17px] leading-relaxed text-aim-slate/85">{children}</div>
  );
}
