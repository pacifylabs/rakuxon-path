import { ImageCard } from './ImageCard';

export interface UniversityCardProps {
  name: string;
  country?: string;
  src: string;
  alt: string;
  href?: string;
  className?: string;
}

/** Campus card in the institutions row (docs/04b § 3.7). */
export function UniversityCard({ name, country, src, alt, href, className }: UniversityCardProps) {
  return (
    <ImageCard src={src} alt={alt} href={href} aspect="aspect-[3/2]" className={className}>
      <h3 className="font-heading text-base font-semibold text-text">{name}</h3>
      {country && <p className="mt-1 text-sm text-text-muted">{country}</p>}
    </ImageCard>
  );
}
