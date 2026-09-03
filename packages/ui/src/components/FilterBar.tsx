'use client';

import clsx from 'clsx';
import { useId } from 'react';

export interface FilterDefinition {
  /** Key the value is reported under. */
  name: string;
  label: string;
  options: readonly string[];
  /** Shown as the "no filter" choice. */
  anyLabel?: string;
}

export interface FilterBarProps {
  filters: readonly FilterDefinition[];
  value: Record<string, string>;
  onChange: (next: Record<string, string>) => void;
  /** Live count announced to assistive technology. */
  resultCount: number;
  /**
   * Both grammatical forms. Stripping a trailing "s" is not singularisation —
   * it turns "universities" into "universitie" — so callers supply each.
   */
  resultNoun?: { one: string; other: string };
  onReset?: () => void;
  className?: string;
}

/**
 * Filter controls for the universities browse page (docs/04b § 7).
 *
 * These really filter. A control that looks interactive but does nothing is
 * worse than no control: it strands keyboard and screen-reader users on a
 * dead end. The result count is a live region so the effect is announced.
 */
export function FilterBar({
  filters,
  value,
  onChange,
  resultCount,
  resultNoun = { one: 'result', other: 'results' },
  onReset,
  className,
}: FilterBarProps) {
  const id = useId();
  const hasActiveFilter = Object.values(value).some((v) => v !== '');

  return (
    <div className={clsx('rounded-lg border border-border bg-surface p-5 shadow-sm', className)}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {filters.map((filter) => (
          <div key={filter.name} className="flex flex-col gap-2">
            <label htmlFor={`${id}-${filter.name}`} className="text-sm font-medium text-text">
              {filter.label}
            </label>
            <select
              id={`${id}-${filter.name}`}
              value={value[filter.name] ?? ''}
              onChange={(event) => onChange({ ...value, [filter.name]: event.target.value })}
              className="rounded-md border border-border bg-surface px-4 py-3 text-sm text-text focus-visible:outline-none focus-visible:ring focus-visible:ring-offset-2"
            >
              <option value="">{filter.anyLabel ?? `All ${filter.label.toLowerCase()}`}</option>
              {filter.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        ))}

        <div className="flex items-end">
          {onReset && (
            <button
              type="button"
              onClick={onReset}
              disabled={!hasActiveFilter}
              className="rounded-md border border-border px-5 py-3 text-sm font-semibold text-primary transition-colors duration-fast ease-standard hover:bg-accent-soft focus-visible:outline-none focus-visible:ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:transition-none"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      <p role="status" aria-live="polite" className="mt-4 text-sm text-text-muted">
        {resultCount} {resultCount === 1 ? resultNoun.one : resultNoun.other}
      </p>
    </div>
  );
}
