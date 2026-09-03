import clsx from 'clsx';
import type { LucideIcon } from 'lucide-react';

export type IconBubbleSize = 'sm' | 'md' | 'lg';

/**
 * Decorative tints from docs/04b § 3.3 / § 3.4, plus the default lavender.
 * `tone` never carries meaning — it exists for visual variety across a grid.
 */
export type IconBubbleTone = 'accent' | 'indigo' | 'green' | 'orange' | 'blue';

const SIZE_CLASSES: Record<IconBubbleSize, string> = {
  sm: 'h-8 w-8',
  md: 'h-10 w-10',
  lg: 'h-12 w-12',
};

const ICON_PX: Record<IconBubbleSize, number> = { sm: 16, md: 20, lg: 24 };

const TONE_CLASSES: Record<IconBubbleTone, string> = {
  accent: 'bg-accent-soft text-primary',
  indigo: 'bg-tint-indigo-soft text-tint-indigo',
  green: 'bg-tint-green-soft text-tint-green',
  orange: 'bg-tint-orange-soft text-tint-orange',
  blue: 'bg-tint-blue-soft text-tint-blue',
};

export type IconBubbleShape = 'circle' | 'square';

const SHAPE_CLASSES: Record<IconBubbleShape, string> = {
  circle: 'rounded-full',
  square: 'rounded-md',
};

export interface IconBubbleProps {
  icon: LucideIcon;
  size?: IconBubbleSize;
  tone?: IconBubbleTone;
  shape?: IconBubbleShape;
  className?: string;
}

/**
 * Soft tinted bubble holding a line icon — the rounded icon badge used across
 * cards, chips, steps and the hero (docs/04a § 6, docs/04b § 11).
 */
export function IconBubble({
  icon: Icon,
  size = 'md',
  tone = 'accent',
  shape = 'circle',
  className,
}: IconBubbleProps) {
  return (
    <span
      aria-hidden="true"
      className={clsx(
        'grid shrink-0 place-items-center',
        SIZE_CLASSES[size],
        TONE_CLASSES[tone],
        SHAPE_CLASSES[shape],
        className,
      )}
    >
      <Icon size={ICON_PX[size]} strokeWidth={2} aria-hidden="true" focusable="false" />
    </span>
  );
}
