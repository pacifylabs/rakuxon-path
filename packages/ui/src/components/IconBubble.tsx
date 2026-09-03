import clsx from 'clsx';
import type { LucideIcon } from 'lucide-react';

export type IconBubbleSize = 'sm' | 'md' | 'lg';

/**
 * Tints from docs/04b § 3.3 / § 3.4, plus the default accent.
 *
 * tone1–tone4 carry no meaning; they exist for visual variety across a grid.
 * `urgent` is the exception and is reserved for deadlines and time pressure.
 */
export type IconBubbleTone = 'accent' | 'tone1' | 'tone2' | 'tone3' | 'tone4' | 'urgent';

const SIZE_CLASSES: Record<IconBubbleSize, string> = {
  sm: 'h-8 w-8',
  md: 'h-10 w-10',
  lg: 'h-12 w-12',
};

const ICON_PX: Record<IconBubbleSize, number> = { sm: 16, md: 20, lg: 24 };

const TONE_CLASSES: Record<IconBubbleTone, string> = {
  accent: 'bg-accent-soft text-primary',
  tone1: 'bg-tint-tone1-soft text-tint-tone1',
  tone2: 'bg-tint-tone2-soft text-tint-tone2',
  tone3: 'bg-tint-tone3-soft text-tint-tone3',
  tone4: 'bg-tint-tone4-soft text-tint-tone4',
  urgent: 'bg-tint-urgent-soft text-tint-urgent',
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
