import { baseTokens } from './tokens.base';
import type { ThemeTokens } from './tokens.types';

/**
 * The dark scheme.
 *
 * Only colour, tint and shadow move — type, space, radius and motion are one
 * system in both schemes. Every foreground here clears 4.5:1 against all three
 * dark surfaces (bg, surface and surface-muted), asserted in theme.test.tsx
 * rather than eyeballed.
 *
 * Note `onPrimary` inverts: the dark primary is light enough that white on it
 * is only 2.2:1, so text on a primary button becomes near-black. That is
 * exactly what the token is for.
 */
export const darkTokens: ThemeTokens = {
  ...baseTokens,

  color: {
    /* Brand */
    primary: '#5BC08C',
    primaryHover: '#77CDA1',
    onPrimary: '#08130E',
    accent: '#6FA8FF',
    accentSoft: '#16243A',

    /* Neutrals */
    bg: '#0C1512',
    surface: '#121E19',
    surfaceMuted: '#1B2C24',
    text: '#E9F1EB',
    textMuted: '#A7BCAF',
    textInverse: '#0C1512',
    border: '#2A3B33',

    /* State */
    success: '#4ECB86',
    warning: '#F0B45C',
    danger: '#FF7B80',
    info: '#4FBEDC',
    focusRing: '#6FA8FF',
  },

  tint: {
    tone1: '#6FCB99',
    tone1Soft: '#16281F',
    tone2: '#7FB2FF',
    tone2Soft: '#17243A',
    tone3: '#5CC8BC',
    tone3Soft: '#12292B',
    tone4: '#9AA6E0',
    tone4Soft: '#1E2338',
    urgent: '#F5A25E',
    urgentSoft: '#2E2118',
  },

  /* Shadows carry less weight on dark ground; borders do the separating. */
  shadow: {
    sm: '0 1px 2px rgba(0,0,0,.4)',
    md: '0 6px 20px rgba(0,0,0,.45)',
    lg: '0 16px 40px rgba(0,0,0,.5)',
  },
};
