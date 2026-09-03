import clsx from 'clsx';
import type { LucideIcon } from 'lucide-react';

export type IconChipSize = 'sm' | 'md';

const SIZE_CLASSES: Record<IconChipSize, string> = {
  sm: 'h-8 w-8',
  md: 'h-10 w-10',
};

const ICON_PX: Record<IconChipSize, number> = { sm: 16, md: 20 };

export interface IconChipProps {
  icon: LucideIcon;
  size?: IconChipSize;
  className?: string;
}

/**
 * Soft lavender circle holding an indigo line icon — the rounded icon badge
 * used across cards, chips and steps (docs/04a § 6).
 */
export function IconChip({ icon: Icon, size = 'md', className }: IconChipProps) {
  return (
    <span
      aria-hidden="true"
      className={clsx(
        'grid shrink-0 place-items-center rounded-full bg-accent-soft text-primary',
        SIZE_CLASSES[size],
        className,
      )}
    >
      <Icon size={ICON_PX[size]} strokeWidth={2} aria-hidden="true" focusable="false" />
    </span>
  );
}
