/**
 * Normalised catalogue shapes.
 *
 * Every provider maps into these, so the UI never sees a provider's own
 * payload. When the BE catalogue lands (CONTEXT.md keeps `institutions` and
 * `programs` as global tables), only the provider changes — these types and
 * every component stay put.
 */

export interface Institution {
  id: string;
  name: string;
  country: string;
  countryCode: string;
  city?: string;
  website?: string;
}

export interface Course {
  id: string;
  title: string;
  institution: string;
  country: string;
  level?: string;
  subject?: string;
  durationMonths?: number;
  tuitionFrom?: string;
}

export interface Article {
  id: string;
  title: string;
  excerpt?: string;
  url?: string;
  publishedAt?: string;
  readMinutes?: number;
}

export interface CountryCount {
  country: string;
  countryCode: string;
  institutions: number;
}

/**
 * Providers never throw at the page. A marketing page must render when a
 * third party is down, so failures come back as data.
 */
export interface CatalogueResult<T> {
  items: readonly T[];
  total: number;
  /** Present when the upstream source failed or returned nothing usable. */
  error?: string;
  /** Which provider answered, so the UI can be honest about provenance. */
  source: 'ror' | 'edvoy' | 'unavailable';
}

export const emptyResult = <T>(source: CatalogueResult<T>['source'], error?: string) =>
  ({ items: [], total: 0, error, source }) satisfies CatalogueResult<T>;
