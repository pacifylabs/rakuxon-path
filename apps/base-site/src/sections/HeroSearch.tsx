'use client';

import { Search } from 'lucide-react';
import { useId } from 'react';

import { COVERED_COUNTRIES } from '@/lib/catalogue/institutions';

const TYPES = [
  { value: 'courses', label: 'Courses' },
  { value: 'universities', label: 'Universities' },
  { value: 'articles', label: 'Articles' },
] as const;

/**
 * Search, inside the hero.
 *
 * A real GET form pointing at /explore, so it works before hydration and with
 * JavaScript off, and the results page reproduces from the query string alone.
 */
export function HeroSearch() {
  const id = useId();

  const fieldClasses =
    'w-full rounded-md border border-border bg-surface px-4 py-3 text-base text-text focus-visible:outline-none focus-visible:ring focus-visible:ring-offset-2';

  return (
    <form
      role="search"
      action="/explore"
      method="get"
      className="rounded-lg border border-border bg-surface p-4 shadow-md"
    >
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <label htmlFor={`${id}-q`} className="text-sm font-medium text-text">
            Search courses, universities and guidance
          </label>
          <input
            id={`${id}-q`}
            name="q"
            type="search"
            placeholder="Computer science, Toronto, scholarships…"
            className={fieldClasses}
          />
        </div>

        <div className="grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
          <div className="flex flex-col gap-2">
            <label htmlFor={`${id}-tab`} className="text-sm font-medium text-text">
              Type
            </label>
            <select id={`${id}-tab`} name="tab" defaultValue="courses" className={fieldClasses}>
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
      </div>
    </form>
  );
}
