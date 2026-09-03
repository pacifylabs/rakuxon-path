import { ImageCard } from './ImageCard';

export interface AudienceCardProps {
  title: string;
  description: string;
  cta: { label: string; href: string };
  src: string;
  alt: string;
  className?: string;
}

/**
 * One of the three cards in "Start your journey with us" (docs/04b § 3.9).
 *
 * The CTA is the real link; the card itself is not also a link, so there is
 * exactly one tab stop and no nested-interactive markup.
 */
export function AudienceCard({ title, description, cta, src, alt, className }: AudienceCardProps) {
  return (
    <ImageCard src={src} alt={alt} aspect="aspect-[3/2]" className={className}>
      <h3 className="font-heading text-lg font-semibold text-text">{title}</h3>
      <p className="mt-2 text-sm text-text-muted">{description}</p>
      <a
        href={cta.href}
        className="mt-4 inline-flex items-center gap-1 rounded-sm text-sm font-semibold text-primary transition-colors duration-fast ease-standard hover:text-primary-hover focus-visible:outline-none focus-visible:ring focus-visible:ring-offset-2 motion-reduce:transition-none"
      >
        {cta.label}
        <span aria-hidden="true">→</span>
      </a>
    </ImageCard>
  );
}
