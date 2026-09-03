import clsx from 'clsx';
import type { ReactElement } from 'react';

export type InstitutionEmblem = 'shield' | 'book' | 'tower' | 'leaf' | 'arch' | 'compass';

export interface InstitutionLogoProps {
  name: string;
  emblem: InstitutionEmblem;
  className?: string;
}

/**
 * A partner lockup: emblem + wordmark, drawn as SVG so it sits at the same
 * optical weight as its neighbours in the trust bar.
 *
 * These are marks for our own example institutions. Real university logos are
 * trademarks and are not reproduced here without permission — swap these for
 * licensed artwork once partnerships are signed.
 */
const EMBLEMS: Record<InstitutionEmblem, ReactElement> = {
  shield: <path d="M12 2.5 20.5 6v6.5c0 5-3.6 8.2-8.5 9.5-4.9-1.3-8.5-4.5-8.5-9.5V6Z" />,
  book: (
    <path d="M3.5 4.5h6a3 3 0 0 1 2.5 1.3A3 3 0 0 1 14.5 4.5h6v14h-6a3 3 0 0 0-2.5 1.3A3 3 0 0 0 9.5 18.5h-6Z" />
  ),
  tower: <path d="M12 1.5 15 6v3h2.5v13h-11V9H9V6Zm-1.5 12h3v6h-3Z" />,
  leaf: (
    <path d="M20.5 3.5C10 3.5 3.5 8 3.5 15.5c0 2.4.8 4.3 2 5.5C7 17 10.5 13.5 16 11.5c-4 2.8-6.6 6.2-8 10.5 8.5 1 12.5-6 12.5-18.5Z" />
  ),
  arch: <path d="M4 21.5V11a8 8 0 0 1 16 0v10.5h-5.5V12a2.5 2.5 0 0 0-5 0v9.5Z" />,
  compass: (
    <path d="M12 1.8a10.2 10.2 0 1 0 0 20.4 10.2 10.2 0 0 0 0-20.4Zm4.6 5.6-2.4 6.6-6.8 2.4 2.4-6.6ZM12 10.6a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8Z" />
  ),
};

export function InstitutionLogo({ name, emblem, className }: InstitutionLogoProps) {
  return (
    <span
      className={clsx('inline-flex items-center gap-2 text-text-muted', className)}
      /* One element, one accessible name: the emblem is decorative. */
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        focusable="false"
      >
        {EMBLEMS[emblem]}
      </svg>
      <span className="font-heading text-base font-bold uppercase tracking-tight">{name}</span>
    </span>
  );
}
