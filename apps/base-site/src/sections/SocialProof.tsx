import { SectionBand, StatBlock, TrustBadge } from '@rakuxon-edu/ui';

import { STATS, TRUST_BADGES } from '@/content/landing';

/**
 * Stat block + trust badges.
 *
 * Every figure is a marked placeholder until real data exists — an invented
 * number on a page about trust would be the worst possible first impression.
 */
export function SocialProof() {
  return (
    <SectionBand id="about" labelledBy="social-proof-heading">
      <h2
        id="social-proof-heading"
        className="text-center font-heading text-2xl font-bold text-text md:text-3xl"
      >
        Students trust us with the big decision
      </h2>

      <div className="mt-12 grid grid-cols-2 gap-8 rounded-lg bg-surface-muted p-8 md:grid-cols-4">
        {STATS.map((stat) => (
          <StatBlock
            key={stat.label}
            value={stat.value}
            label={stat.label}
            placeholder={stat.placeholder}
          />
        ))}
      </div>

      <ul className="mt-10 flex flex-wrap justify-center gap-3">
        {TRUST_BADGES.map((badge) => (
          <TrustBadge key={badge.label} icon={badge.icon} label={badge.label} />
        ))}
      </ul>
    </SectionBand>
  );
}
