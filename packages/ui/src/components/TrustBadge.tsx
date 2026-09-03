import clsx from 'clsx';
import type { LucideIcon } from 'lucide-react';

export interface TrustBadgeProps {
  icon: LucideIcon;
  label: string;
  className?: string;
}

/** Small reassurance pill: icon + short label. */
export function TrustBadge({ icon: Icon, label, className }: TrustBadgeProps) {
  return (
    <li
      className={clsx(
        'inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2',
        className,
      )}
    >
      <Icon
        size={16}
        strokeWidth={2}
        aria-hidden="true"
        focusable="false"
        className="text-primary"
      />
      <span className="text-sm font-medium text-text">{label}</span>
    </li>
  );
}
