import clsx from 'clsx';
import type { ReactNode } from 'react';

import { EyebrowPill } from './EyebrowPill';

export interface PageHeaderProps {
  eyebrow?: string;
  /** Rendered as the page's single h1. */
  title: ReactNode;
  titleId: string;
  subcopy?: string;
  children?: ReactNode;
  className?: string;
}

/**
 * Heading band for pages that open with words rather than a photograph.
 * Keeps the h1 treatment identical to the photo heroes.
 */
export function PageHeader({
  eyebrow,
  title,
  titleId,
  subcopy,
  children,
  className,
}: PageHeaderProps) {
  return (
    <section
      aria-labelledby={titleId}
      className={clsx('w-full bg-surface-muted px-5 py-16 md:py-20', className)}
    >
      <div className="mx-auto w-full max-w-content">
        {eyebrow && <EyebrowPill>{eyebrow}</EyebrowPill>}
        <h1
          id={titleId}
          className={clsx(
            'font-heading text-3xl font-bold leading-tight text-text sm:text-4xl',
            eyebrow && 'mt-6',
          )}
        >
          {title}
        </h1>
        {subcopy && <p className="mt-6 max-w-prose text-lg text-text-muted">{subcopy}</p>}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
