import type { ThemeTokens } from './tokens.types';

/**
 * The base Rakuxon Ed theme — the single place a raw value may appear.
 * Values transcribed from docs/04a-landing-and-design-system.md § 3.
 */
export const baseTokens: ThemeTokens = {
  brand: {
    name: 'Rakuxon Ed',
    nameAccentSuffix: 'Ed',
  },

  color: {
    /* Brand */
    primary: '#5B4BE1',
    primaryHover: '#4A3BC7',
    onPrimary: '#FFFFFF',
    accent: '#8B7CF6',
    accentSoft: '#EEEBFB',

    /* Neutrals */
    bg: '#FFFFFF',
    surface: '#FFFFFF',
    surfaceMuted: '#F7F6FC',
    text: '#1A1830',
    textMuted: '#5B5870',
    textInverse: '#FFFFFF',
    border: '#E7E5F2',

    /* State — not tenant-overridable */
    success: '#2FA36B',
    warning: '#E6A23C',
    danger: '#E5484D',
    info: '#4A7DE1',
    focusRing: '#8B7CF6',
  },

  font: {
    sans: 'var(--font-inter), "Inter", system-ui, -apple-system, "Segoe UI", sans-serif',
    heading: 'var(--font-inter), "Inter", system-ui, -apple-system, "Segoe UI", sans-serif',
  },

  text: {
    xs: '12px',
    sm: '14px',
    base: '16px',
    lg: '18px',
    xl: '22px',
    '2xl': '28px',
    '3xl': '36px',
    '4xl': '48px',
    hero: '60px',
  },

  weight: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },

  /* 4px base scale */
  space: {
    1: '4px',
    2: '8px',
    3: '12px',
    4: '16px',
    5: '20px',
    6: '24px',
    8: '32px',
    10: '40px',
    12: '48px',
    16: '64px',
    20: '80px',
  },

  radius: {
    sm: '8px',
    md: '14px',
    lg: '20px',
    xl: '28px',
    full: '9999px',
  },

  shadow: {
    sm: '0 1px 2px rgba(26,24,48,.06)',
    md: '0 6px 20px rgba(26,24,48,.08)',
    lg: '0 16px 40px rgba(26,24,48,.10)',
  },

  motion: {
    easeStandard: 'cubic-bezier(.4,0,.2,1)',
    durationFast: '150ms',
    durationBase: '250ms',
  },

  /*
   * Decorative categorical tints. Not state colours — see TintTokens.
   * Foregrounds are chosen dark enough to clear AA (>= 4.5:1) on white, so the
   * same value works for an icon, a number, or a small label.
   */
  tint: {
    indigo: '#5B4BE1',
    indigoSoft: '#EEEBFB',
    green: '#17784B',
    greenSoft: '#E6F4EC',
    orange: '#C2560E',
    orangeSoft: '#FDF0E6',
    blue: '#1D4ED8',
    blueSoft: '#E8EEFC',
  },
};
