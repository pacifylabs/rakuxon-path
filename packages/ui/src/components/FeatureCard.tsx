import clsx from 'clsx';
import type { LucideIcon } from 'lucide-react';

import { IconChip } from './IconChip';

export interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

/**
 * The floating card that overlaps the hero visual: icon chip, title, one line.
 * Soft shadow + large radius are what create the calm "floating" feel.
 */
export function FeatureCard({ icon, title, description, className }: FeatureCardProps) {
  return (
    <article
      className={clsx(
        'flex items-start gap-3 rounded-lg border border-border bg-surface p-4 shadow-md',
        className,
      )}
    >
      <IconChip icon={icon} />
      <div className="min-w-0">
        <h3 className="font-heading text-sm font-semibold text-text">{title}</h3>
        <p className="mt-1 text-xs text-text-muted">{description}</p>
      </div>
    </article>
  );
}
