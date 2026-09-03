import { ImageCard } from './ImageCard';

export interface DestinationCardProps {
  country: string;
  src: string;
  alt: string;
  href: string;
  /** Short line under the photo. Kept inside the card so rows stay level. */
  description?: string;
  className?: string;
}

/** Country card in the popular-destinations grid (docs/04b § 3.6). */
export function DestinationCard({
  country,
  src,
  alt,
  href,
  description,
  className,
}: DestinationCardProps) {
  return (
    <ImageCard
      src={src}
      alt={alt}
      href={href}
      overlay
      className={className}
      footer={description ? <p className="text-sm text-text-muted">{description}</p> : undefined}
    >
      <h3 className="font-heading text-lg font-semibold text-text-inverse">{country}</h3>
    </ImageCard>
  );
}
