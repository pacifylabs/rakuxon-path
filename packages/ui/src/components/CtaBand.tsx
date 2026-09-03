import clsx from 'clsx';
import type { LucideIcon } from 'lucide-react';

export interface CtaBandProps {
  icon?: LucideIcon;
  headingId: string;
  heading: string;
  subline: string;
  cta: { label: string; href: string };
  /** Reassurance line under the button, e.g. "No credit card required." */
  reassurance?: string;
  className?: string;
}

/**
 * The bold deep-indigo closing block (docs/04b § 3.10) — the one high-contrast
 * moment on an otherwise calm page. White text and a white button on primary.
 */
export function CtaBand({
  icon: Icon,
  headingId,
  heading,
  subline,
  cta,
  reassurance,
  className,
}: CtaBandProps) {
  return (
    <div
      className={clsx(
        'flex flex-col gap-8 rounded-xl bg-primary p-8 md:flex-row md:items-center md:justify-between md:p-12',
        className,
      )}
    >
      <div className="flex items-start gap-5">
        {Icon && (
          <span
            aria-hidden="true"
            /* A translucent white bubble keeps this readable on indigo without
               introducing a colour that is not in the token set. */
            className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-on-primary text-primary"
          >
            <Icon size={24} strokeWidth={2} aria-hidden="true" focusable="false" />
          </span>
        )}
        <div>
          <h2
            id={headingId}
            className="font-heading text-2xl font-bold text-on-primary md:text-3xl"
          >
            {heading}
          </h2>
          <p className="mt-3 max-w-prose text-base text-on-primary">{subline}</p>
        </div>
      </div>

      <div className="shrink-0 md:text-center">
        <a
          href={cta.href}
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md bg-on-primary px-6 py-4 text-base font-semibold text-primary shadow-sm transition-colors duration-fast ease-standard hover:bg-accent-soft focus-visible:outline-none focus-visible:ring focus-visible:ring-offset-2 motion-reduce:transition-none"
        >
          {cta.label}
        </a>
        {reassurance && <p className="mt-3 text-sm text-on-primary">{reassurance}</p>}
      </div>
    </div>
  );
}
