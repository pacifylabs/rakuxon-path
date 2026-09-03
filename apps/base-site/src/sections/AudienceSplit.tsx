import { Check } from 'lucide-react';

import { Button, IconChip, SectionBand } from '@rakuxon-edu/ui';

import { AUDIENCES } from '@/content/landing';

/**
 * Two-audience split. Establishes that agencies and students both live here
 * without ever using the word "multi-tenant".
 */
export function AudienceSplit() {
  return (
    <SectionBand tone="muted" id="audiences" labelledBy="audiences-heading">
      <h2
        id="audiences-heading"
        className="text-center font-heading text-2xl font-bold text-text md:text-3xl"
      >
        Built for both sides of the journey
      </h2>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {AUDIENCES.map((audience) => (
          <article
            key={audience.title}
            className="flex h-full flex-col rounded-lg border border-border bg-surface p-8 shadow-sm"
          >
            <IconChip icon={audience.icon} />
            <h3 className="mt-5 font-heading text-xl font-semibold text-text">{audience.title}</h3>
            <p className="mt-2 text-base text-text-muted">{audience.summary}</p>

            <ul className="mt-6 flex flex-col gap-3">
              {audience.points.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <Check
                    size={18}
                    strokeWidth={2}
                    aria-hidden="true"
                    focusable="false"
                    className="mt-1 shrink-0 text-success"
                  />
                  <span className="text-sm text-text">{point}</span>
                </li>
              ))}
            </ul>

            {/* mt-auto pins both CTAs to the card bottom, so unequal copy
                length does not leave the two buttons misaligned. */}
            <div className="mt-auto pt-8">
              <Button href={audience.cta.href} variant="accent">
                {audience.cta.label}
              </Button>
            </div>
          </article>
        ))}
      </div>
    </SectionBand>
  );
}
