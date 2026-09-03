import clsx from 'clsx';
import Image from 'next/image';
import type { ReactNode } from 'react';

import { Button } from './Button';
import { EyebrowPill } from './EyebrowPill';

export interface ImageHeroProps {
  eyebrow?: string;
  /** Rendered as the page's single h1. */
  title: ReactNode;
  titleId: string;
  subcopy: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  image: { src: string; alt: string };
  /** Flips the photo to the other column — the main lever for page-to-page rhythm. */
  imageSide?: 'left' | 'right';
  tone?: 'surface' | 'muted';
  children?: ReactNode;
  className?: string;
}

/**
 * Photo hero shared by the audience, destination and about pages
 * (docs/04b § 4.1, § 5.1, § 6.1, § 8.2, § 9).
 *
 * Page variety comes from `imageSide` and `tone` rather than from bespoke
 * heroes, so every page keeps the same h1 and CTA treatment.
 */
export function ImageHero({
  eyebrow,
  title,
  titleId,
  subcopy,
  primaryCta,
  secondaryCta,
  image,
  imageSide = 'right',
  tone = 'surface',
  children,
  className,
}: ImageHeroProps) {
  return (
    <section
      aria-labelledby={titleId}
      className={clsx(
        'w-full px-5 py-16 md:py-20',
        tone === 'muted' ? 'bg-surface-muted' : 'bg-surface',
        className,
      )}
    >
      {/*
        Columns stretch rather than centre: a centred media column leaves a gap
        above and below the photograph whenever the copy is taller, which reads
        as a misalignment. The image fills its column and is floored by
        `min-h-media` so short copy cannot squash it.
      */}
      <div className="mx-auto grid w-full max-w-content gap-12 lg:grid-cols-2 lg:items-stretch lg:gap-16">
        <div className={clsx('flex flex-col justify-center', imageSide === 'left' && 'lg:order-2')}>
          {eyebrow && <EyebrowPill>{eyebrow}</EyebrowPill>}

          <h1
            id={titleId}
            className={clsx(
              'font-heading text-3xl font-bold leading-tight text-text sm:text-4xl lg:text-hero',
              eyebrow && 'mt-6',
            )}
          >
            {title}
          </h1>

          <p className="mt-6 max-w-prose text-lg text-text-muted">{subcopy}</p>

          {(primaryCta || secondaryCta) && (
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {primaryCta && (
                <Button href={primaryCta.href} size="lg">
                  {primaryCta.label}
                </Button>
              )}
              {secondaryCta && (
                <Button href={secondaryCta.href} size="lg" variant="ghost">
                  {secondaryCta.label}
                </Button>
              )}
            </div>
          )}

          {children && <div className="mt-8">{children}</div>}
        </div>

        <div className={clsx('relative lg:flex', imageSide === 'left' && 'lg:order-1')}>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl lg:aspect-auto lg:h-full lg:min-h-media">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
