import { emptyResult } from './types';
import type { Article, CatalogueResult, Course } from './types';

/**
 * Courses and articles, proxied from Edvoy.
 *
 * ⚠️  Read before relying on this.
 *
 * These are Edvoy's *internal* Next.js data routes, not a public API. Two
 * consequences you are choosing to accept:
 *
 *  1. `/_next/data/<buildId>/…` embeds Edvoy's build ID, which changes on
 *     every deploy of theirs. When it does, these requests 404 with no notice.
 *     The ID is therefore configurable — set EDVOY_BUILD_ID — and every
 *     failure degrades to an empty result with a message, never a broken page.
 *
 *  2. Edvoy is the competitor this site is modelled on, and this republishes
 *     their catalogue. That is a licensing and terms question, not a technical
 *     one, and it is not resolved by this code.
 *
 * Everything here is behind the CatalogueResult contract, so swapping this for
 * the BE catalogue is a one-file change. Requests run server-side only: the
 * browser never sees Edvoy, and responses are cached.
 */

const EDVOY_ORIGIN = process.env.EDVOY_ORIGIN ?? 'https://edvoy.com';
const EDVOY_BUILD_ID = process.env.EDVOY_BUILD_ID ?? '';

/** Short cache: this is a volatile upstream, but we must not hammer it. */
const REVALIDATE_SECONDS = 3_600;

const LOCATION_FILTER = (country: string) =>
  encodeURIComponent(JSON.stringify([{ key: country, values: [] }]));

function dataUrl(resource: string, country?: string) {
  if (!EDVOY_BUILD_ID) return null;
  const base = `${EDVOY_ORIGIN}/_next/data/${EDVOY_BUILD_ID}/en/${resource}.json`;
  return country ? `${base}?locations=${LOCATION_FILTER(country)}` : base;
}

const MISSING_BUILD_ID =
  'Course and article data is not configured. Set EDVOY_BUILD_ID, or point this provider at the backend catalogue.';

async function load(resource: string, country?: string) {
  const url = dataUrl(resource, country);
  if (!url) return { ok: false as const, error: MISSING_BUILD_ID };

  try {
    const response = await fetch(url, {
      headers: { accept: 'application/json' },
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!response.ok) {
      // A 404 here almost always means the build ID has rotated.
      return {
        ok: false as const,
        error:
          response.status === 404
            ? 'Upstream build id looks stale — refresh EDVOY_BUILD_ID.'
            : `Upstream returned ${response.status}.`,
      };
    }

    return { ok: true as const, json: (await response.json()) as Record<string, unknown> };
  } catch {
    return { ok: false as const, error: 'Could not reach the upstream catalogue.' };
  }
}

/** Digs the page props out of a Next data payload without assuming its shape. */
function pageProps(json: Record<string, unknown>): Record<string, unknown> {
  const page = json.pageProps;
  return typeof page === 'object' && page !== null ? (page as Record<string, unknown>) : {};
}

function firstArray(source: Record<string, unknown>, keys: readonly string[]): unknown[] {
  for (const key of keys) {
    const value = source[key];
    if (Array.isArray(value)) return value;
  }
  return [];
}

const str = (value: unknown): string | undefined =>
  typeof value === 'string' && value.trim() ? value : undefined;

export async function fetchCourses(country?: string): Promise<CatalogueResult<Course>> {
  const result = await load('courses', country);
  if (!result.ok) return emptyResult('unavailable', result.error);

  const props = pageProps(result.json);
  const raw = firstArray(props, ['courses', 'results', 'items', 'data']);

  const items = raw.flatMap((entry, index): Course[] => {
    if (typeof entry !== 'object' || entry === null) return [];
    const record = entry as Record<string, unknown>;
    const title = str(record.name) ?? str(record.title);
    if (!title) return [];

    const institution = record.institution as Record<string, unknown> | undefined;
    return [
      {
        id: str(record.id) ?? str(record.slug) ?? `course-${index}`,
        title,
        institution: str(institution?.name) ?? str(record.institutionName) ?? 'Unknown institution',
        country: str(record.country) ?? country ?? 'Unknown',
        level: str(record.level) ?? str(record.studyLevel),
        subject: str(record.subject) ?? str(record.discipline),
      },
    ];
  });

  if (items.length === 0) {
    return emptyResult('unavailable', 'Upstream returned no courses in a shape we recognise.');
  }
  return { items, total: items.length, source: 'edvoy' };
}

export async function fetchArticles(country?: string): Promise<CatalogueResult<Article>> {
  const result = await load('search/articles', country);
  if (!result.ok) return emptyResult('unavailable', result.error);

  const props = pageProps(result.json);
  const raw = firstArray(props, ['articles', 'results', 'items', 'data']);

  const items = raw.flatMap((entry, index): Article[] => {
    if (typeof entry !== 'object' || entry === null) return [];
    const record = entry as Record<string, unknown>;
    const title = str(record.title) ?? str(record.name);
    if (!title) return [];

    return [
      {
        id: str(record.id) ?? str(record.slug) ?? `article-${index}`,
        title,
        excerpt: str(record.excerpt) ?? str(record.description) ?? str(record.summary),
        publishedAt: str(record.publishedAt) ?? str(record.date),
      },
    ];
  });

  if (items.length === 0) {
    return emptyResult('unavailable', 'Upstream returned no articles in a shape we recognise.');
  }
  return { items, total: items.length, source: 'edvoy' };
}
