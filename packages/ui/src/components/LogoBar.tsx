import clsx from 'clsx';

export interface LogoBarProps {
  label: string;
  /** Partner names. Rendered as neutral wordmarks until real logos are licensed. */
  logos: readonly string[];
  className?: string;
}

/**
 * The trust bar that straddles the hero and the section beneath it
 * (docs/04b § 3.2).
 *
 * Real university and partner logos need permission we do not have, so these
 * are neutral placeholder marks — flagged with `data-placeholder-logo` and
 * labelled in the visible caption so nobody mistakes them for endorsements.
 */
export function LogoBar({ label, logos, className }: LogoBarProps) {
  return (
    <div
      className={clsx('rounded-lg border border-border bg-surface px-6 py-8 shadow-lg', className)}
    >
      <p className="text-center text-sm text-text-muted">
        {label} <span className="text-text-muted">(placeholder marks)</span>
      </p>

      <ul className="mt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-8">
        {logos.map((name) => (
          <li
            key={name}
            data-placeholder-logo="true"
            className="rounded-sm border border-border px-4 py-2 text-sm font-semibold uppercase tracking-wide text-text-muted"
          >
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
}
