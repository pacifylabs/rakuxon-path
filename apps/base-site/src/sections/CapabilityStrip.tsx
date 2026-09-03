import { CapabilityChip, SectionBand } from '@rakuxon-edu/ui';

import { CAPABILITIES } from '@/content/landing';

/** "One platform. Endless possibilities." — breadth communicated in one glance. */
export function CapabilityStrip() {
  return (
    <SectionBand tone="muted" id="capabilities" labelledBy="capabilities-heading">
      <h2
        id="capabilities-heading"
        className="text-center font-heading text-2xl font-bold text-text md:text-3xl"
      >
        One platform. Endless possibilities.
      </h2>
      <p className="mx-auto mt-4 max-w-prose text-center text-base text-text-muted">
        Everything the journey needs, in one place — so nothing falls through the cracks.
      </p>

      <ul className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-7">
        {CAPABILITIES.map((capability) => (
          <CapabilityChip key={capability.label} icon={capability.icon} label={capability.label} />
        ))}
      </ul>
    </SectionBand>
  );
}
