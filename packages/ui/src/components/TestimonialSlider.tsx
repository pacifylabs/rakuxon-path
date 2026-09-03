'use client';

import clsx from 'clsx';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { useCallback, useEffect, useId, useRef, useState } from 'react';

import { TestimonialCard } from './TestimonialCard';

export interface SliderTestimonial {
  quote: string;
  name: string;
  detail: string;
  src: string;
  alt: string;
}

export interface TestimonialSliderProps {
  testimonials: readonly SliderTestimonial[];
  /** Milliseconds each slide is held. */
  interval?: number;
  /** Marks the quotes as illustrative in the markup, without a visible caveat. */
  sample?: boolean;
  className?: string;
}

/**
 * Auto-advancing testimonial carousel.
 *
 * Autoplay stops on hover, on keyboard focus, and on an explicit pause button,
 * because WCAG 2.2.2 requires any auto-updating content to be pausable. It also
 * never starts when the visitor has asked for reduced motion. Slides stay in
 * the DOM and are hidden with `inert`-style attributes rather than unmounted,
 * so the height does not jump between quotes of different lengths.
 */
export function TestimonialSlider({
  testimonials,
  interval = 6000,
  sample = false,
  className,
}: TestimonialSliderProps) {
  const id = useId();
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [interacting, setInteracting] = useState(false);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true;
    if (reducedMotion.current) setPlaying(false);
  }, []);

  const count = testimonials.length;
  const go = useCallback((next: number) => setIndex(((next % count) + count) % count), [count]);

  useEffect(() => {
    if (!playing || interacting || count < 2) return undefined;
    const timer = window.setInterval(() => setIndex((i) => (i + 1) % count), interval);
    return () => window.clearInterval(timer);
  }, [playing, interacting, count, interval]);

  if (count === 0) return null;

  const controlClasses =
    'grid h-10 w-10 place-items-center rounded-full border border-border bg-surface text-primary transition-colors duration-fast ease-standard hover:bg-accent-soft focus-visible:outline-none focus-visible:ring focus-visible:ring-offset-2 motion-reduce:transition-none';

  return (
    <div
      data-sample={sample ? 'true' : undefined}
      className={clsx('flex flex-col gap-6', className)}
      role="group"
      aria-roledescription="carousel"
      aria-label="Student testimonials"
      onMouseEnter={() => setInteracting(true)}
      onMouseLeave={() => setInteracting(false)}
      onFocusCapture={() => setInteracting(true)}
      onBlurCapture={() => setInteracting(false)}
    >
      {/*
        Every slide is rendered and the track slides horizontally, so the
        container height is the tallest quote and never jumps mid-rotation.
      */}
      <div className="overflow-hidden">
        <ul
          className="flex items-stretch transition-transform duration-base ease-standard motion-reduce:transition-none"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {testimonials.map((testimonial, slide) => (
            <li
              key={testimonial.name}
              id={`${id}-slide-${slide}`}
              role="group"
              aria-roledescription="slide"
              aria-label={`${slide + 1} of ${count}`}
              aria-hidden={slide === index ? undefined : true}
              className="w-full shrink-0 px-1"
            >
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
      </div>

      <div className="flex items-center justify-center gap-3">
        <button
          type="button"
          className={controlClasses}
          onClick={() => go(index - 1)}
          aria-label="Previous testimonial"
        >
          <ChevronLeft size={18} aria-hidden="true" focusable="false" />
        </button>

        <button
          type="button"
          className={controlClasses}
          onClick={() => setPlaying((was) => !was)}
          aria-label={playing ? 'Pause testimonials' : 'Play testimonials'}
        >
          {playing ? (
            <Pause size={16} aria-hidden="true" focusable="false" />
          ) : (
            <Play size={16} aria-hidden="true" focusable="false" />
          )}
        </button>

        <ul className="flex items-center gap-2">
          {testimonials.map((testimonial, slide) => (
            <li key={testimonial.name}>
              <button
                type="button"
                aria-label={`Show testimonial ${slide + 1}`}
                aria-current={slide === index ? 'true' : undefined}
                onClick={() => go(slide)}
                className={clsx(
                  'h-2 w-2 rounded-full transition-colors duration-fast ease-standard focus-visible:outline-none focus-visible:ring focus-visible:ring-offset-2 motion-reduce:transition-none',
                  slide === index ? 'bg-primary' : 'bg-border',
                )}
              />
            </li>
          ))}
        </ul>

        <button
          type="button"
          className={controlClasses}
          onClick={() => go(index + 1)}
          aria-label="Next testimonial"
        >
          <ChevronRight size={18} aria-hidden="true" focusable="false" />
        </button>
      </div>

      <p aria-live="polite" className="sr-only">
        Testimonial {index + 1} of {count}
      </p>
    </div>
  );
}
