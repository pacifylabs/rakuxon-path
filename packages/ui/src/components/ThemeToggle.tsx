'use client';

import clsx from 'clsx';
import { Monitor, Moon, Sun } from 'lucide-react';
import { useSyncExternalStore } from 'react';

import { THEME_COOKIE, THEME_ORDER } from '../theme/scheme';
import type { ThemePreference } from '../theme/scheme';

const META: Record<ThemePreference, { icon: typeof Sun; label: string; next: ThemePreference }> = {
  system: { icon: Monitor, label: 'System theme', next: 'light' },
  light: { icon: Sun, label: 'Light theme', next: 'dark' },
  dark: { icon: Moon, label: 'Dark theme', next: 'system' },
};

/*
 * The preference lives in a cookie — state outside React. useSyncExternalStore
 * is the supported way to read that: the server gets a stable snapshot and the
 * client corrects itself on hydration, with no setState-in-effect.
 */
const listeners = new Set<() => void>();

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

function getSnapshot(): ThemePreference {
  const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${THEME_COOKIE}=(light|dark|system)`));
  return (match?.[1] as ThemePreference) ?? 'system';
}

/** The server cannot read the cookie; the pre-paint script already applied it. */
const getServerSnapshot = (): ThemePreference => 'system';

function apply(preference: ThemePreference) {
  // A display preference, not tracking: one year, lax, no other scope.
  document.cookie = `${THEME_COOKIE}=${preference};path=/;max-age=31536000;samesite=lax`;

  if (preference === 'system') {
    document.documentElement.removeAttribute('data-theme');
  } else {
    document.documentElement.setAttribute('data-theme', preference);
  }

  listeners.forEach((listener) => listener());
}

/** Cycles system → light → dark. */
export function ThemeToggle({ className }: { className?: string }) {
  const preference = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const { icon: Icon, label, next } = META[preference];

  return (
    <button
      type="button"
      onClick={() => {
        const index = THEME_ORDER.indexOf(preference);
        apply(THEME_ORDER[(index + 1) % THEME_ORDER.length] as ThemePreference);
      }}
      aria-label={`${label}. Switch to ${META[next].label.toLowerCase()}.`}
      title={label}
      className={clsx(
        'grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border text-text transition-colors duration-fast ease-standard hover:bg-accent-soft focus-visible:outline-none focus-visible:ring focus-visible:ring-offset-2 motion-reduce:transition-none',
        className,
      )}
    >
      {/* The icon depends on a cookie the server cannot see, so the first
          client render legitimately differs from the server's. */}
      <span suppressHydrationWarning>
        <Icon size={18} strokeWidth={2} aria-hidden="true" focusable="false" />
      </span>
    </button>
  );
}
