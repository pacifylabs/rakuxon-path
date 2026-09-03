import clsx from 'clsx';
import type { LucideIcon } from 'lucide-react';

import { IconChip } from './IconChip';

export interface StepItemProps {
  /** 1-based position, rendered in the badge. */
  step: number;
  title: string;
  description: string;
  icon?: LucideIcon;
  className?: string;
}

/** Numbered step in the "how it works" stepper. */
export function StepItem({ step, title, description, icon, className }: StepItemProps) {
  return (
    <li className={clsx('flex flex-col gap-3', className)}>
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary text-base font-bold text-on-primary">
          {step}
        </span>
        {icon && <IconChip icon={icon} size="sm" />}
      </div>
      <h3 className="font-heading text-lg font-semibold text-text">{title}</h3>
      <p className="text-sm text-text-muted">{description}</p>
    </li>
  );
}
