import clsx from 'clsx';
import type { ReactNode } from 'react';

export interface EyebrowPillProps {
  children: ReactNode;
  className?: string;
}

/**
 * Small uppercase lavender pill that sits above a heading
 * (docs/04b § 3.1, § 3.3). Presentational only — the heading carries the
 * document structure, so this must never be a heading itself.
 */
export function EyebrowPill({ children, className }: EyebrowPillProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full bg-accent-soft px-4 py-2',
        'text-xs font-semibold uppercase tracking-wide text-primary',
        className,
      )}
    >
      {children}
    </span>
  );
}
