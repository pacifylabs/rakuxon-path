import { Button, IconChip, SectionBand } from '@rakuxon-edu/ui';

import { CLOSING_CTA } from '@/content/landing';

/** Warm closing band — a subtle lavender tint, deliberately not a loud gradient. */
export function ClosingCta() {
  return (
    <SectionBand
      tone="gradient"
      id="get-started"
      labelledBy="closing-cta-heading"
      innerClassName="flex flex-col items-center text-center"
    >
      <IconChip icon={CLOSING_CTA.icon} />

      <h2
        id="closing-cta-heading"
        className="mt-6 font-heading text-2xl font-bold text-text md:text-3xl"
      >
        {CLOSING_CTA.headlinePrefix}
        <span className="text-primary">{CLOSING_CTA.headlineAccent}</span>
      </h2>

      <div className="mt-8">
        <Button href={CLOSING_CTA.cta.href} size="lg">
          {CLOSING_CTA.cta.label}
        </Button>
      </div>

      <p className="mt-6 text-sm text-text-muted">{CLOSING_CTA.reassurance}</p>
    </SectionBand>
  );
}
