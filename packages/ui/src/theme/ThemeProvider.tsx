'use client';

import { createContext, useMemo } from 'react';
import type { ReactNode } from 'react';

import { mergeTokens, serializeCssVars } from './cssVars';
import { baseTokens } from './tokens.base';
import type { TenantTokenOverrides, ThemeTokens } from './tokens.types';

export const ThemeContext = createContext<ThemeTokens>(baseTokens);

export interface ThemeProviderProps {
  /**
   * White-label overrides for the current tenant. Keys outside the brand set
   * are ignored. Omit entirely for the base Rakuxon theme (the landing page).
   */
  tokens?: TenantTokenOverrides | null;
  /** Selector the variables are written to. Scope it for tests or nested previews. */
  selector?: string;
  children: ReactNode;
}

/**
 * Resolves base + tenant tokens and publishes them as CSS custom properties.
 *
 * The variables are emitted as a server-rendered <style> element rather than
 * assigned in an effect, so the first paint is already themed — no flash of
 * unthemed content on a statically generated page.
 */
export function ThemeProvider({ tokens, selector = ':root', children }: ThemeProviderProps) {
  const resolved = useMemo(() => mergeTokens(baseTokens, tokens), [tokens]);
  const css = useMemo(() => serializeCssVars(resolved, selector), [resolved, selector]);

  return (
    <ThemeContext.Provider value={resolved}>
      <style data-rakuxon-theme="" dangerouslySetInnerHTML={{ __html: css }} />
      {children}
    </ThemeContext.Provider>
  );
}
