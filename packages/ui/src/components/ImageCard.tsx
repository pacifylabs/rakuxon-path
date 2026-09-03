import clsx from 'clsx';
import Image from 'next/image';
import type { ReactNode } from 'react';

export interface ImageCardProps {
  src: string;
  alt: string;
  href?: string;
  /** Rendered over the image bottom when `overlay`, otherwise beneath it. */
  children: ReactNode;
  /** Extra body under the image. Works alongside `overlay`. */
  footer?: ReactNode;
  overlay?: boolean;
  aspect?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
}

/**
 * Shared photo-card shell behind DestinationCard / UniversityCard /
 * AudienceCard.
 *
 * The card is a full-height flex column and the image is `shrink-0`, so every
 * card in a grid row ends at the same height and every image in that row is
 * the same size regardless of how much text sits beneath it. Body content
 * flexes, which lets a CTA sit on `mt-auto` and line up across the row.
 */
export function ImageCard({
  src,
  alt,
  href,
  children,
  footer,
  overlay = false,
  aspect = 'aspect-[4/3]',
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  priority = false,
  className,
}: ImageCardProps) {
  const body = (
    <>
      <div className={clsx('relative w-full shrink-0 overflow-hidden', aspect)}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          loading={priority ? undefined : 'lazy'}
          className="object-cover"
        />
        {overlay && (
          <>
            {/*
              Scrim so the caption stays legible whatever the photo does. At 70%
              a bright photograph left white 18px text around 3.5:1, under the
              4.5 AA needs at that size and weight; 90% holds it above 7:1 in the
              worst case while the top of the image stays clear.

              `scrim` does not invert with the scheme — it was `from-text`,
              which turned the fade white in dark mode.
            */}
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-scrim to-transparent opacity-90"
            />
            <div className="absolute inset-x-0 bottom-0 p-4">{children}</div>
          </>
        )}
      </div>

      {!overlay && <div className="flex flex-1 flex-col p-5">{children}</div>}
      {overlay && footer && <div className="flex flex-1 flex-col p-5">{footer}</div>}
      {!overlay && footer && <div className="flex flex-col px-5 pb-5">{footer}</div>}
    </>
  );

  const shell =
    'flex h-full flex-col overflow-hidden rounded-lg border border-border bg-surface shadow-sm transition-[transform,box-shadow] duration-base ease-standard hover:-translate-y-1 hover:shadow-md motion-reduce:transition-none motion-reduce:hover:translate-y-0';

  if (href) {
    return (
      <a
        href={href}
        className={clsx(
          shell,
          'transition-shadow duration-base ease-standard hover:shadow-md',
          'focus-visible:outline-none focus-visible:ring focus-visible:ring-offset-2',
          'motion-reduce:transition-none',
          className,
        )}
      >
        {body}
      </a>
    );
  }

  return <div className={clsx(shell, className)}>{body}</div>;
}
