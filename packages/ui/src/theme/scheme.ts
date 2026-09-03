export const THEME_COOKIE = 'rakuxon-theme';
export const THEME_ORDER = ['system', 'light', 'dark'] as const;
export type ThemePreference = (typeof THEME_ORDER)[number];

/**
 * Runs before first paint, inline in <head>, so the document is already in the
 * right scheme when it renders. Without it the page paints light, then flips —
 * the flash every cookie-based theme switcher has to solve.
 *
 * Kept to one statement and wrapped in try/catch: it runs before anything else,
 * so it must not be able to throw and block rendering.
 */
export const themeScript = `(function(){try{var m=document.cookie.match(/(?:^|;\\s*)${THEME_COOKIE}=(light|dark)/);if(m)document.documentElement.setAttribute('data-theme',m[1]);}catch(e){}})();`;
