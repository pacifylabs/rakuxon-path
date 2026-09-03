import clsx from 'clsx';
import type { LucideIcon } from 'lucide-react';

import { IconBubble } from './IconBubble';
import type { IconBubbleTone } from './IconBubble';

export interface CapabilityCardProps {
  icon: LucideIcon;
  tone?: IconBubbleTone;
  title: string;
  description: string;
  action: { label: string; href: string };
  className?: string;
}

/**
 * A card in the "Everything you need" grid (docs/04b § 3.3): tinted icon
 * square, title, two-line description, and an arrow text link.
 */
export function CapabilityCard({
  icon,
  tone = 'indigo',
  title,
  description,
  action,
  className,
}: CapabilityCardProps) {
  return (
    <article
      className={clsx(
        'flex h-full flex-col rounded-lg border border-border bg-surface p-6 shadow-sm',
        className,
      )}
    >
      <IconBubble icon={icon} tone={tone} size="lg" shape="square" />

      <h3 className="mt-5 font-heading text-lg font-semibold text-text">{title}</h3>
      <p className="mt-2 text-sm text-text-muted">{description}</p>

      <a
        href={action.href}
        className="mt-auto inline-flex items-center gap-1 pt-6 text-sm font-semibold text-primary transition-colors duration-fast ease-standard hover:text-primary-hover focus-visible:outline-none focus-visible:ring focus-visible:ring-offset-2 motion-reduce:transition-none"
      >
        {action.label}
        <span aria-hidden="true">→</span>
      </a>
    </article>
  );
}
