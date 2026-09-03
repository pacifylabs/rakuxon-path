'use client';

import { useContext } from 'react';

import { ThemeContext } from './ThemeProvider';
import type { ThemeTokens } from './tokens.types';

/**
 * The resolved token set. Falls back to the base theme outside a provider so a
 * component is never left unthemed — matching the white-label fallback rule in
 * docs/04-design-system.md § 6.
 */
export function useTheme(): ThemeTokens {
  return useContext(ThemeContext);
}

/** Convenience accessor for the swappable brand name and its accent split. */
export function useBrand() {
  return useTheme().brand;
}
