import clsx from 'clsx';
import type { ElementType, ReactNode } from 'react';

export type SectionBandTone = 'surface' | 'muted' | 'soft' | 'gradient';

const TONE_CLASSES: Record<SectionBandTone, string> = {
  surface: 'bg-surface',
  muted: 'bg-surface-muted',
  soft: 'bg-accent-soft',
  /* Closing CTA band: subtle lavender -> white, deliberately not loud. */
  gradient: 'bg-gradient-to-b from-accent-soft to-surface',
};

export interface SectionBandProps {
  tone?: SectionBandTone;
  /** Landmark element. Defaults to `section`; the accessible name comes from `labelledBy`. */
  as?: ElementType;
  id?: string;
  /** id of the heading that names this section, wired to aria-labelledby. */
  labelledBy?: string;
  className?: string;
  innerClassName?: string;
  children: ReactNode;
}

/**
 * Full-bleed section wrapper with a tinted background and a centred content
 * column. Keeps vertical rhythm and max-width consistent across the page.
 */
export function SectionBand({
  tone = 'surface',
  as: Element = 'section',
  id,
  labelledBy,
  className,
  innerClassName,
  children,
}: SectionBandProps) {
  return (
    <Element
      id={id}
      aria-labelledby={labelledBy}
      className={clsx('w-full px-5 py-16 md:py-20', TONE_CLASSES[tone], className)}
    >
      <div className={clsx('mx-auto w-full max-w-content', innerClassName)}>{children}</div>
    </Element>
  );
}
