import clsx from 'clsx';
import type { ReactNode } from 'react';

export interface HeroFloatingCardProps {
  title: string;
  children: ReactNode;
  /** Optional "View details →" style link at the card foot. */
  action?: { label: string; href: string };
  /**
   * Marks the card as illustrative UI rather than live data (docs/04b § 3.1).
   * Adds `data-sample` for grepping before launch and an assistive-technology
   * note, without putting a badge on the hero art.
   */
  sample?: boolean;
  className?: string;
}

/**
 * The white "live data" card that floats over the hero figure — Match Score
 * and Application Deadline (docs/04b § 3.1).
 */
export function HeroFloatingCard({
  title,
  children,
  action,
  sample = false,
  className,
}: HeroFloatingCardProps) {
  return (
    <article
      // Labelled, not headed. These cards float beside the page h1 as
      // illustrative product UI; making the title a heading skipped the
      // document outline from h1 straight to h3.
      aria-label={sample ? `${title} (sample data)` : title}
      data-sample={sample ? 'true' : undefined}
      className={clsx('w-full rounded-lg border border-border bg-surface p-4 shadow-md', className)}
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">{title}</p>

      <div className="mt-3">{children}</div>

      {action && (
        <a
          href={action.href}
          className="mt-3 inline-flex items-center gap-1 rounded-sm text-xs font-semibold text-primary transition-colors duration-fast ease-standard hover:text-primary-hover focus-visible:outline-none focus-visible:ring focus-visible:ring-offset-2 motion-reduce:transition-none"
        >
          {action.label}
          <span aria-hidden="true">→</span>
        </a>
      )}
    </article>
  );
}
