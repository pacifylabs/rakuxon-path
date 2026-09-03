import clsx from 'clsx';
import type { LucideIcon } from 'lucide-react';

import { IconBubble } from './IconBubble';
import type { IconBubbleTone } from './IconBubble';

export interface StatChipProps {
  icon: LucideIcon;
  tone?: IconBubbleTone;
  /** Pre-formatted figure, e.g. "100,000+". */
  value: string;
  label: string;
  /**
   * Marks the figure as illustrative rather than measured (docs/04b § 3.4).
   * Adds `data-sample` and an assistive-technology note.
   */
  sample?: boolean;
  className?: string;
}

/** Coloured icon chip + big number + label, for the stat bar (docs/04b § 3.4). */
export function StatChip({
  icon,
  tone = 'indigo',
  value,
  label,
  sample = false,
  className,
}: StatChipProps) {
  return (
    <div
      data-sample={sample ? 'true' : undefined}
      className={clsx('flex items-center gap-4', className)}
    >
      <IconBubble icon={icon} tone={tone} size="lg" />
      <div className="min-w-0">
        <p className="font-heading text-2xl font-bold text-text">{value}</p>
        <p className="text-sm text-text-muted">
          {label}
          {sample && <span className="sr-only"> (sample data)</span>}
        </p>
      </div>
    </div>
  );
}
