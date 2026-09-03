'use client';

import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import type { ElementType, ReactNode } from 'react';

export interface RevealProps {
  children: ReactNode;
  /** Stagger within a group, in ms. Kept small — this is polish, not a show. */
  delay?: number;
  as?: ElementType;
  className?: string;
}

/**
 * Reveals its child once it scrolls into view.
 *
 * Content is visible from the start and the animation only *adds* motion, so
 * nothing depends on JavaScript to be readable — if the observer never fires,
 * or the browser lacks it, the card is simply there. Under
 * prefers-reduced-motion the animation is dropped entirely by the variant.
 */
export function Reveal({ children, delay = 0, as: Element = 'div', className }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    // No observer, or motion is unwelcome: show it and do nothing else.
    if (
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    ) {
      setShown(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShown(true);
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -10% 0px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Element
      ref={ref}
      data-revealed={shown ? 'true' : 'false'}
      className={clsx('h-full', shown && 'animate-reveal', 'motion-reduce:animate-none', className)}
      style={shown && delay ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Element>
  );
}
