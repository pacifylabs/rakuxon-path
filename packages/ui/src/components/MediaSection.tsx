import clsx from 'clsx';
import Image from 'next/image';
import { Check } from 'lucide-react';

import { Button } from './Button';
import { EyebrowPill } from './EyebrowPill';

export interface MediaSectionProps {
  eyebrow?: string;
  heading: string;
  headingId: string;
  body: string;
  points?: readonly string[];
  cta?: { label: string; href: string };
  image: { src: string; alt: string };
  imageSide?: 'left' | 'right';
  tone?: 'surface' | 'muted';
  className?: string;
}

/**
 * Alternating image-and-copy row (docs/04b § 4.3, § 5.3, § 6.3).
 * Alternate `imageSide` down a page to create rhythm without new components.
 */
export function MediaSection({
  eyebrow,
  heading,
  headingId,
  body,
  points,
  cta,
  image,
  imageSide = 'right',
  tone = 'surface',
  className,
}: MediaSectionProps) {
  return (
    <section
      aria-labelledby={headingId}
      className={clsx(
        'w-full px-5 py-16 md:py-20',
        tone === 'muted' ? 'bg-surface-muted' : 'bg-surface',
        className,
      )}
    >
      <div className="mx-auto grid w-full max-w-content gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div className={clsx(imageSide === 'left' && 'lg:order-2')}>
          {eyebrow && <EyebrowPill>{eyebrow}</EyebrowPill>}
          <h2
            id={headingId}
            className={clsx(
              'font-heading text-2xl font-bold text-text md:text-3xl',
              eyebrow && 'mt-6',
            )}
          >
            {heading}
          </h2>
          <p className="mt-4 max-w-prose text-base text-text-muted">{body}</p>

          {points && points.length > 0 && (
            <ul className="mt-6 flex flex-col gap-3">
              {points.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <Check
                    size={18}
                    strokeWidth={2}
                    aria-hidden="true"
                    focusable="false"
                    className="mt-1 shrink-0 text-success"
                  />
                  <span className="text-sm text-text">{point}</span>
                </li>
              ))}
            </ul>
          )}

          {cta && (
            <div className="mt-8">
              <Button href={cta.href} variant="accent">
                {cta.label}
              </Button>
            </div>
          )}
        </div>

        <div className={clsx('relative', imageSide === 'left' && 'lg:order-1')}>
          <div className="relative aspect-[3/2] w-full overflow-hidden rounded-xl">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              loading="lazy"
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
