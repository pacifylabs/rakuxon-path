'use client';

import { useEffect, useRef, useState } from 'react';

export interface CountUpProps {
  /** Pre-formatted figure, e.g. "100,000+", "1,200+", "4.8" or "150+". */
  value: string;
  /** Milliseconds for the full count. */
  duration?: number;
  className?: string;
}

/** Splits "1,200+" into its lead-in, its number, and its trailing text. */
export function parseFigure(value: string): { prefix: string; target: number; suffix: string } {
  const match = /^(\D*?)([\d][\d,.\s]*)(.*)$/.exec(value.trim());
  if (!match) return { prefix: '', target: Number.NaN, suffix: value };

  const [, prefix = '', digits = '', suffix = ''] = match;
  const target = Number(digits.replace(/[,\s]/g, ''));
  return { prefix, target, suffix };
}

/** Decimal places in the source, so 4.8 does not animate to 5. */
function precisionOf(digits: string): number {
  const dot = digits.indexOf('.');
  return dot === -1 ? 0 : digits.length - dot - 1;
}

/* Decelerating curve: fast at first, settling onto the number. */
const easeOut = (t: number) => 1 - (1 - t) ** 3;

/**
 * Counts a statistic up from zero when it scrolls into view.
 *
 * The real figure is always in the DOM for assistive technology; only a
 * decorative, aria-hidden copy animates. Without that split a screen reader
 * could read a half-counted number, or announce every frame.
 *
 * Under prefers-reduced-motion, and if IntersectionObserver is missing, the
 * final value is shown immediately — the number is content, so it can never
 * depend on the animation running.
 */
export function CountUp({ value, duration = 1600, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState<string | null>(null);

  useEffect(() => {
    const node = ref.current;
    const { prefix, target, suffix } = parseFigure(value);
    const digits = /[\d][\d,.\s]*/.exec(value)?.[0] ?? '';
    const decimals = precisionOf(digits);

    // Nothing numeric, no observer, or motion is unwelcome: show it as given.
    if (
      !node ||
      Number.isNaN(target) ||
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    ) {
      setDisplay(value);
      return undefined;
    }

    const format = (n: number) =>
      `${prefix}${n.toLocaleString('en-GB', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}${suffix}`;

    setDisplay(format(0));

    let frame = 0;
    let settle = 0;

    const run = () => {
      /*
       * Timed from performance.now(), not the rAF argument: that argument can
       * legitimately be 0 on the first callback, and treating 0 as "not yet
       * started" made the next frame compute a full duration and snap straight
       * to the final value instead of counting.
       */
      const startedAt = performance.now();

      const step = () => {
        const progress = Math.min(1, (performance.now() - startedAt) / duration);
        setDisplay(format(target * easeOut(progress)));
        if (progress < 1) frame = requestAnimationFrame(step);
      };

      frame = requestAnimationFrame(step);

      /*
       * Backstop. requestAnimationFrame is throttled in background tabs and in
       * some embedded views, and a figure frozen at zero reads as broken data
       * rather than as an animation. If it has not landed shortly after it
       * should have, show the real number.
       */
      settle = window.setTimeout(() => {
        cancelAnimationFrame(frame);
        setDisplay(format(target));
      }, duration + 400);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer.disconnect();
          run();
        }
      },
      { rootMargin: '0px 0px -15% 0px' },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.clearTimeout(settle);
    };
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      {/* The figure of record — never animated, so it is always correct. */}
      <span className="sr-only">{value}</span>
      <span aria-hidden="true">{display ?? value}</span>
    </span>
  );
}
