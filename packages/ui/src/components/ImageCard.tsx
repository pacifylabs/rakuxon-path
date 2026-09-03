import clsx from 'clsx';
import Image from 'next/image';
import type { ReactNode } from 'react';

export interface ImageCardProps {
  src: string;
  alt: string;
  href?: string;
  /** Rendered over the image bottom when `overlay`, otherwise beneath it. */
  children: ReactNode;
  overlay?: boolean;
  aspect?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
}

/**
 * Shared photo-card shell behind DestinationCard / UniversityCard /
 * AudienceCard. Keeps image sizing, focus behaviour and the whole-card link
 * treatment in one place rather than three near-copies.
 */
export function ImageCard({
  src,
  alt,
  href,
  children,
  overlay = false,
  aspect = 'aspect-[4/3]',
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  priority = false,
  className,
}: ImageCardProps) {
  const body = (
    <>
      <div className={clsx('relative w-full overflow-hidden', aspect)}>
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
            */}
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-text to-transparent opacity-90"
            />
            <div className="absolute inset-x-0 bottom-0 p-4">{children}</div>
          </>
        )}
      </div>
      {!overlay && <div className="p-5">{children}</div>}
    </>
  );

  const shell = 'group block overflow-hidden rounded-lg border border-border bg-surface shadow-sm';

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
