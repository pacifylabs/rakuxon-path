'use client';

import clsx from 'clsx';
import { Pause, Play } from 'lucide-react';
import { useState } from 'react';

import { TestimonialCard } from './TestimonialCard';
import type { SliderTestimonial } from './TestimonialSlider';

export interface TestimonialMarqueeProps {
  testimonials: readonly SliderTestimonial[];
  /** Seconds for one full pass. Longer reads calmer. */
  duration?: number;
  sample?: boolean;
  className?: string;
}

/**
 * Continuously scrolling testimonial strip with no visible start or end.
 *
 * The list is rendered twice and the track animates to -50%, so the second
 * copy is exactly where the first began when the animation restarts — that is
 * what makes the loop seamless. The duplicate is `aria-hidden`, so screen
 * readers hear each quote once.
 *
 * Motion stops on hover, on keyboard focus, on an explicit control, and
 * permanently under prefers-reduced-motion — WCAG 2.2.2 requires any moving
 * content that starts automatically to be pausable.
 */
export function TestimonialMarquee({
  testimonials,
  duration = 60,
  sample = false,
  className,
}: TestimonialMarqueeProps) {
  const [playing, setPlaying] = useState(true);

  if (testimonials.length === 0) return null;

  const card = (testimonial: SliderTestimonial) => (
    <TestimonialCard
      quote={testimonial.quote}
      name={testimonial.name}
      detail={testimonial.detail}
      src={testimonial.src}
      alt={testimonial.alt}
      className="h-full"
    />
  );

  return (
    <div
      className={clsx('group flex flex-col gap-6', className)}
      data-sample={sample ? 'true' : undefined}
      data-playing={playing ? 'true' : 'false'}
      data-testimonial-marquee=""
    >
      <div className="overflow-hidden">
        <div
          /* Paused by the group on hover/focus, by the control, and by the
             reduced-motion variant — three independent brakes. */
          className={clsx(
            'flex w-max items-stretch gap-6 animate-marquee',
            'group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused]',
            'motion-reduce:animate-none',
            !playing && '[animation-play-state:paused]',
          )}
          style={{ ['--marquee-duration' as string]: `${duration}s` }}
        >
          <ul className="flex items-stretch gap-6" aria-label="Student testimonials">
            {testimonials.map((testimonial) => (
              <li key={testimonial.name} className="w-card-quote shrink-0 sm:w-card-quote-lg">
                {card(testimonial)}
              </li>
            ))}
          </ul>

          {/* The seam. Hidden from assistive tech so quotes are not repeated. */}
          <ul className="flex items-stretch gap-6" aria-hidden="true">
            {testimonials.map((testimonial) => (
              <li
                key={`${testimonial.name}-loop`}
                className="w-card-quote shrink-0 sm:w-card-quote-lg"
              >
                {card(testimonial)}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          type="button"
          onClick={() => setPlaying((was) => !was)}
          aria-label={playing ? 'Pause testimonials' : 'Play testimonials'}
          className="inline-grid h-10 w-10 place-items-center rounded-full border border-border bg-surface text-primary transition-colors duration-fast ease-standard hover:bg-accent-soft focus-visible:outline-none focus-visible:ring focus-visible:ring-offset-2 motion-reduce:transition-none"
        >
          {playing ? (
            <Pause size={16} aria-hidden="true" focusable="false" />
          ) : (
            <Play size={16} aria-hidden="true" focusable="false" />
          )}
        </button>
      </div>
    </div>
  );
}
