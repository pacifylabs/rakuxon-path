import clsx from 'clsx';
import type { LucideIcon } from 'lucide-react';

import { IconChip } from './IconChip.js';

export interface CapabilityChipProps {
  icon: LucideIcon;
  label: string;
  className?: string;
}

/** Icon + label unit in the "one platform, many capabilities" strip. */
export function CapabilityChip({ icon, label, className }: CapabilityChipProps) {
  return (
    <li
      className={clsx(
        'flex min-w-0 flex-col items-center gap-3 rounded-lg bg-surface p-4 text-center shadow-sm',
        className,
      )}
    >
      <IconChip icon={icon} />
      <span className="text-sm font-medium text-text">{label}</span>
    </li>
  );
}
