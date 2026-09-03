'use client';

import { Search } from 'lucide-react';
import { useId, useState } from 'react';

import { COVERED_COUNTRIES } from '@/lib/catalogue/institutions';

const TYPES = [
  { value: 'courses', label: 'Courses' },
  { value: 'universities', label: 'Universities' },
  { value: 'articles', label: 'Articles' },
] as const;

/**
 * Search entry point on the landing page.
 *
 * A real <form> with a GET action, so it submits to /explore and works before
 * hydration and with JavaScript off — the results page reads the same query
 * string it would have built itself.
 */
export function HomeSearch() {
  const id = useId();
  const [type, setType] = useState<string>('courses');

  const fieldClasses =
    'w-full rounded-md border border-border bg-surface px-4 py-3 text-base text-text focus-visible:outline-none focus-visible:ring focus-visible:ring-offset-2';

  return (
    <section aria-labelledby="home-search-heading" className="w-full bg-bg px-5 pb-4">
      <div className="mx-auto w-full max-w-content">
        <form
          role="search"
          action="/explore"
          method="get"
          className="rounded-xl border border-border bg-surface p-5 shadow-md md:p-6"
        >
          <h2 id="home-search-heading" className="font-heading text-lg font-semibold text-text">
            Start with a search
          </h2>
          <p className="mt-1 text-sm text-text-muted">
            Browse programmes, universities and guidance. No account needed.
          </p>

          <div className="mt-5 grid gap-4 lg:grid-cols-[1.6fr_1fr_1fr_auto]">
            <div className="flex flex-col gap-2">
              <label htmlFor={`${id}-q`} className="text-sm font-medium text-text">
                What are you looking for?
              </label>
              <input
                id={`${id}-q`}
                name="q"
                type="search"
                placeholder="Computer science, Toronto, scholarships…"
                className={fieldClasses}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor={`${id}-tab`} className="text-sm font-medium text-text">
                Type
              </label>
              <select
                id={`${id}-tab`}
                name="tab"
                value={type}
                onChange={(event) => setType(event.target.value)}
                className={fieldClasses}
              >
                {TYPES.map((entry) => (
                  <option key={entry.value} value={entry.value}>
                    {entry.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor={`${id}-country`} className="text-sm font-medium text-text">
                Destination
              </label>
              <select id={`${id}-country`} name="country" defaultValue="" className={fieldClasses}>
                <option value="">All countries</option>
                {COVERED_COUNTRIES.map((entry) => (
                  <option key={entry.code} value={entry.code}>
                    {entry.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-md bg-primary px-6 py-3 text-base font-semibold text-on-primary shadow-sm transition-colors duration-fast ease-standard hover:bg-primary-hover focus-visible:outline-none focus-visible:ring focus-visible:ring-offset-2 motion-reduce:transition-none"
              >
                <Search size={18} aria-hidden="true" focusable="false" />
                Search
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
