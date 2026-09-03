import { NextResponse } from 'next/server';

import { fetchArticles, fetchCourses } from '@/lib/catalogue/edvoy';
import {
  COVERED_COUNTRIES,
  fetchCountryCounts,
  fetchInstitutions,
} from '@/lib/catalogue/institutions';

/**
 * The catalogue as real HTTP endpoints.
 *
 * The pages fetch server-side, so those calls never appear in a browser's
 * network panel. These routes make the same data inspectable and callable —
 * useful for debugging, and required by any client-side search that wants
 * results without a full navigation.
 *
 *   GET /api/catalogue/universities?country=GB&q=oxford
 *   GET /api/catalogue/courses?country=GB
 *   GET /api/catalogue/articles?country=GB
 *   GET /api/catalogue/country-counts
 *
 * Upstream credentials and origins stay on the server; the browser only ever
 * talks to this origin.
 */

export const revalidate = 3600;

const RESOURCES = ['universities', 'courses', 'articles', 'country-counts'] as const;
type Resource = (typeof RESOURCES)[number];

const isResource = (value: string): value is Resource =>
  (RESOURCES as readonly string[]).includes(value);

/** Edvoy filters by country name; ROR by ISO-2 code. Accept the code for both. */
const countryName = (code: string) => COVERED_COUNTRIES.find((entry) => entry.code === code)?.name;

export async function GET(request: Request, { params }: { params: Promise<{ resource: string }> }) {
  const { resource } = await params;

  if (!isResource(resource)) {
    return NextResponse.json(
      { error: `Unknown resource. Try one of: ${RESOURCES.join(', ')}.` },
      { status: 404 },
    );
  }

  const url = new URL(request.url);
  const country = url.searchParams.get('country') ?? '';
  const query = url.searchParams.get('q') ?? '';

  const result = await (async () => {
    switch (resource) {
      case 'universities':
        return fetchInstitutions({ countryCode: country, search: query });
      case 'courses':
        return fetchCourses(countryName(country));
      case 'articles':
        return fetchArticles(countryName(country));
      case 'country-counts':
        return fetchCountryCounts();
    }
  })();

  // A provider failure is reported in the body, not as a 5xx: the caller gets
  // a usable shape either way and can render the reason.
  return NextResponse.json(result, {
    headers: { 'cache-control': 'public, s-maxage=3600, stale-while-revalidate=86400' },
  });
}
