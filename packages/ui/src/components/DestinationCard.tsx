import { ImageCard } from './ImageCard';

export interface DestinationCardProps {
  country: string;
  src: string;
  alt: string;
  href: string;
  className?: string;
}

/** Country card in the popular-destinations grid (docs/04b § 3.6). */
export function DestinationCard({ country, src, alt, href, className }: DestinationCardProps) {
  return (
    <ImageCard src={src} alt={alt} href={href} overlay className={className}>
      <h3 className="font-heading text-lg font-semibold text-text-inverse">{country}</h3>
    </ImageCard>
  );
}
