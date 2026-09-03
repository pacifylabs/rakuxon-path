import { SectionBand, TestimonialSlider } from '@rakuxon-path/ui';

import { TESTIMONIALS } from '@/content/home';

/** docs/04b § 3.8 — student quotes, rotating. */
export function Testimonials() {
  return (
    <SectionBand tone="muted" labelledBy="testimonials-heading">
      <h2
        id="testimonials-heading"
        className="text-center font-heading text-2xl font-bold text-text md:text-3xl"
      >
        Students who found their path
      </h2>

      <TestimonialSlider className="mt-12" testimonials={TESTIMONIALS} sample />
    </SectionBand>
  );
}
