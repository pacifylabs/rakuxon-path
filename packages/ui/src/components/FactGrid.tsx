import clsx from 'clsx';

export interface FactItem {
  label: string;
  value: string;
  hint?: string;
}

export interface FactGridProps {
  facts: readonly FactItem[];
  /** Marks the whole grid as indicative rather than quoted figures. */
  sample?: boolean;
  columns?: 2 | 3 | 4;
  className?: string;
}

const COLUMN_CLASSES: Record<2 | 3 | 4, string> = {
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-2 lg:grid-cols-3',
  4: 'sm:grid-cols-2 lg:grid-cols-4',
};

/**
 * Label/value pairs for the country pages — intakes, cost bands, deadlines
 * (docs/04b § 8.2). A description list, because that is what this is.
 */
export function FactGrid({ facts, sample = false, columns = 3, className }: FactGridProps) {
  return (
    <dl
      data-sample={sample ? 'true' : undefined}
      className={clsx('grid gap-6', COLUMN_CLASSES[columns], className)}
    >
      {facts.map((fact) => (
        <div key={fact.label} className="rounded-lg border border-border bg-surface p-5 shadow-sm">
          <dt className="text-sm text-text-muted">{fact.label}</dt>
          <dd className="mt-2 font-heading text-xl font-bold text-text">{fact.value}</dd>
          {fact.hint && <dd className="mt-2 text-sm text-text-muted">{fact.hint}</dd>}
        </div>
      ))}
    </dl>
  );
}
