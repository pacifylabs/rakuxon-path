import clsx from 'clsx';

export interface StatBlockProps {
  /** The figure itself, pre-formatted (e.g. "12,000+"). */
  value: string;
  label: string;
  /**
   * Marks the figure as not-yet-real. Renders a visible badge and exposes
   * `data-placeholder`, so an unverified number can never quietly ship as
   * social proof (docs/04a § 4.6).
   */
  placeholder?: boolean;
  className?: string;
}

export function StatBlock({ value, label, placeholder = false, className }: StatBlockProps) {
  return (
    <div
      data-placeholder={placeholder ? 'true' : undefined}
      className={clsx('flex flex-col items-center gap-2 text-center', className)}
    >
      <span className="font-heading text-3xl font-bold text-primary md:text-4xl">{value}</span>
      <span className="text-sm text-text-muted">{label}</span>
      {placeholder && (
        <span className="rounded-full border border-warning px-2 py-1 text-xs font-medium text-warning">
          Placeholder — awaiting real figure
        </span>
      )}
    </div>
  );
}
