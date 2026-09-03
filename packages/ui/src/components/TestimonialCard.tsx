import clsx from 'clsx';
import Image from 'next/image';

export interface TestimonialCardProps {
  quote: string;
  name: string;
  detail: string;
  src: string;
  alt: string;
  className?: string;
}

/** Student quote with a face (docs/04b § 3.8). */
export function TestimonialCard({
  quote,
  name,
  detail,
  src,
  alt,
  className,
}: TestimonialCardProps) {
  return (
    <figure
      className={clsx(
        'flex h-full flex-col rounded-lg border border-border bg-surface p-6 shadow-sm',
        className,
      )}
    >
      <blockquote className="text-base text-text">
        <p>{quote}</p>
      </blockquote>

      <figcaption className="mt-auto flex items-center gap-3 pt-6">
        <Image
          src={src}
          alt={alt}
          width={48}
          height={48}
          loading="lazy"
          className="h-12 w-12 rounded-full object-cover"
        />
        <div>
          <p className="text-sm font-semibold text-text">{name}</p>
          <p className="text-sm text-text-muted">{detail}</p>
        </div>
      </figcaption>
    </figure>
  );
}
