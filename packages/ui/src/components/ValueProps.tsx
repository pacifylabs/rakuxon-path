import clsx from 'clsx';
import type { LucideIcon } from 'lucide-react';

import { IconBubble } from './IconBubble';
import type { IconBubbleTone } from './IconBubble';

export interface ValuePropItem {
  icon: LucideIcon;
  tone?: IconBubbleTone;
  title: string;
  description: string;
}

export interface ValuePropsProps {
  items: readonly ValuePropItem[];
  columns?: 2 | 3 | 4;
  className?: string;
}

const COLUMN_CLASSES: Record<2 | 3 | 4, string> = {
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-2 lg:grid-cols-3',
  4: 'sm:grid-cols-2 lg:grid-cols-4',
};

/**
 * Icon + title + line list, used for the "how we help" blocks on every
 * audience page (docs/04b § 4.2, § 5.2, § 6.2).
 */
export function ValueProps({ items, columns = 3, className }: ValuePropsProps) {
  return (
    <ul className={clsx('grid gap-8', COLUMN_CLASSES[columns], className)}>
      {items.map((item) => (
        <li key={item.title} className="flex flex-col gap-3">
          <IconBubble icon={item.icon} tone={item.tone ?? 'tone1'} size="lg" shape="square" />
          <h3 className="font-heading text-lg font-semibold text-text">{item.title}</h3>
          <p className="text-sm text-text-muted">{item.description}</p>
        </li>
      ))}
    </ul>
  );
}
