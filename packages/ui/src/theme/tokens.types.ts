/**
 * The token contract.
 *
 * Two layers (docs/04-design-system.md § 2): base tokens ship as the default
 * Rakuxon theme; a white-label tenant may override *only* the brand tokens
 * listed in `OVERRIDABLE_TOKENS`. State and neutral tokens are fixed on
 * purpose — a tenant must not be able to make "danger" look reassuring.
 */

export interface BrandTokens {
  /** Product name. Rendered by <Wordmark/>; swap here and nothing else changes. */
  name: string;
  /**
   * Trailing slice of `name` painted in the accent colour ("Ed" of "Rakuxon Ed").
   * When it is not a suffix of `name`, the wordmark renders undivided.
   */
  nameAccentSuffix: string;
}

export interface ColorTokens {
  primary: string;
  primaryHover: string;
  onPrimary: string;
  accent: string;
  accentSoft: string;
  bg: string;
  surface: string;
  surfaceMuted: string;
  text: string;
  textMuted: string;
  textInverse: string;
  border: string;
  success: string;
  warning: string;
  danger: string;
  info: string;
  focusRing: string;
}

export interface FontTokens {
  sans: string;
  heading: string;
}

export interface TextScaleTokens {
  xs: string;
  sm: string;
  base: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
  '4xl': string;
  hero: string;
}

export interface WeightTokens {
  regular: string;
  medium: string;
  semibold: string;
  bold: string;
}

export interface SpaceTokens {
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
  6: string;
  8: string;
  10: string;
  12: string;
  16: string;
  20: string;
}

export interface RadiusTokens {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  full: string;
}

export interface ShadowTokens {
  sm: string;
  md: string;
  lg: string;
}

export interface MotionTokens {
  easeStandard: string;
  durationFast: string;
  durationBase: string;
}

export interface ThemeTokens {
  brand: BrandTokens;
  color: ColorTokens;
  font: FontTokens;
  text: TextScaleTokens;
  weight: WeightTokens;
  space: SpaceTokens;
  radius: RadiusTokens;
  shadow: ShadowTokens;
  motion: MotionTokens;
}

/**
 * Exactly what a tenant may reskin. Anything absent from this map is ignored
 * when a tenant override is merged — see `mergeTokens`.
 */
export const OVERRIDABLE_TOKENS = {
  brand: ['name', 'nameAccentSuffix'],
  color: ['primary', 'primaryHover', 'onPrimary', 'accent', 'accentSoft'],
  font: ['heading'],
} as const satisfies Partial<Record<keyof ThemeTokens, readonly string[]>>;

export type OverridableGroup = keyof typeof OVERRIDABLE_TOKENS;

/** A tenant's partial override set, structurally limited to the brand tokens. */
export type TenantTokenOverrides = {
  [G in OverridableGroup]?: Partial<
    Pick<ThemeTokens[G], Extract<(typeof OVERRIDABLE_TOKENS)[G][number], keyof ThemeTokens[G]>>
  >;
};

/** CSS-variable prefix per token group. An empty prefix yields `--ease-standard`. */
export const GROUP_VAR_PREFIX: Record<keyof ThemeTokens, string> = {
  brand: 'brand',
  color: 'color',
  font: 'font',
  text: 'text',
  weight: 'weight',
  space: 'space',
  radius: 'radius',
  shadow: 'shadow',
  motion: '',
};
