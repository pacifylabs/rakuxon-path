import { SectionBand, TestimonialCard } from '@rakuxon-edu/ui';

import { TESTIMONIALS } from '@/content/home';

/**
 * docs/04b § 3.8 — student quotes.
 *
 * These are illustrative until real students consent to be quoted, so the
 * group carries `data-sample`.
 */
export function Testimonials() {
  return (
    <SectionBand tone="muted" labelledBy="testimonials-heading">
      <h2
        id="testimonials-heading"
        className="text-center font-heading text-2xl font-bold text-text md:text-3xl"
      >
        Students who found their path
      </h2>

      <ul data-sample="true" className="mt-12 grid gap-6 md:grid-cols-2">
        <li className="sr-only">Sample testimonials, shown for illustration.</li>
        {TESTIMONIALS.map((testimonial) => (
          <li key={testimonial.name}>
            <TestimonialCard
              quote={testimonial.quote}
              name={testimonial.name}
              detail={testimonial.detail}
              src={testimonial.src}
              alt={testimonial.alt}
            />
          </li>
        ))}
      </ul>
    </SectionBand>
  );
}
