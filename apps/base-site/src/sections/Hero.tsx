import { Button, FeatureCard, IconChip } from '@rakuxon-edu/ui';

import { HERO, HERO_FEATURE_CARDS, HERO_PILLARS } from '@/content/landing';

/**
 * Hero visual placeholder.
 *
 * No brand photography exists yet and this public page may not touch
 * Cloudinary, so the slot is a token-styled block that is obvious about being
 * unfinished. Swap it for an <Image> when art direction lands.
 */
function HeroVisualPlaceholder() {
  return (
    <div
      data-placeholder="true"
      role="img"
      aria-label="Placeholder for the hero image: a student working on a laptop."
      className="grid aspect-[4/3] w-full items-start justify-items-center rounded-xl border border-dashed border-accent bg-accent-soft p-6 pt-10 text-center lg:aspect-[4/5]"
    >
      <span className="text-sm font-medium text-primary">
        Hero image placeholder
        <span className="mt-1 block text-xs font-regular text-text-muted">
          Awaiting brand photography
        </span>
      </span>
    </div>
  );
}

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="w-full bg-bg px-5 pb-16 pt-12 md:pt-20">
      <div className="mx-auto grid w-full max-w-content gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <h1
            id="hero-heading"
            className="font-heading text-3xl font-bold leading-tight text-text sm:text-4xl lg:text-hero"
          >
            {HERO.headlinePrefix}
            <span className="text-accent">{HERO.headlineAccent}</span>.
          </h1>

          <p className="mt-6 max-w-prose text-lg text-text-muted">{HERO.subcopy}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href={HERO.primaryCta.href} size="lg">
              {HERO.primaryCta.label}
            </Button>
            <Button href={HERO.secondaryCta.href} size="lg" variant="ghost">
              {HERO.secondaryCta.label}
            </Button>
          </div>

          <p className="mt-6 text-sm text-text-muted">{HERO.trustLine}</p>
        </div>

        {/*
          The floating cards overlap the visual on large screens only. Below that
          they stack underneath it, per the mobile-first rule in docs/04a § 8.
        */}
        <div className="relative">
          <HeroVisualPlaceholder />

          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:absolute lg:-left-8 lg:bottom-8 lg:mt-0 lg:w-[62%] lg:grid-cols-1 lg:gap-4">
            {HERO_FEATURE_CARDS.map((card) => (
              <li key={card.title}>
                <FeatureCard icon={card.icon} title={card.title} description={card.description} />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <ul className="mx-auto mt-16 grid w-full max-w-content gap-8 sm:grid-cols-3">
        {HERO_PILLARS.map((pillar) => (
          <li key={pillar.title} className="flex items-start gap-3">
            <IconChip icon={pillar.icon} />
            <div>
              <h2 className="font-heading text-lg font-semibold text-text">{pillar.title}</h2>
              <p className="mt-1 text-sm text-text-muted">{pillar.line}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
