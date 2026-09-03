import { GROUP_VAR_PREFIX, OVERRIDABLE_TOKENS } from './tokens.types';
import type { TenantTokenOverrides, ThemeTokens } from './tokens.types';

/** `primaryHover` -> `primary-hover`; leaves `2xl` and `sm` untouched. */
export function camelToKebab(key: string): string {
  return key.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

/** `('color', 'primaryHover')` -> `--color-primary-hover`. */
export function cssVarName(group: keyof ThemeTokens, key: string): string {
  const prefix = GROUP_VAR_PREFIX[group];
  return `--${prefix ? `${prefix}-` : ''}${camelToKebab(key)}`;
}

/**
 * Groups whose values are human text rather than CSS keywords. They are quoted
 * so that `content: var(--brand-name)` works in a stylesheet. The unquoted value
 * stays available in JS via the token object, which is what <Wordmark/> reads —
 * a pseudo-element would be invisible to search engines and screen readers.
 */
const CSS_STRING_GROUPS: ReadonlySet<keyof ThemeTokens> = new Set(['brand']);

function cssValue(group: keyof ThemeTokens, value: string): string {
  if (!CSS_STRING_GROUPS.has(group)) return value;
  return `"${value.replace(/["\\]/g, '\\$&')}"`;
}

/** Flattens a token set into the CSS custom properties components read. */
export function tokensToCssVars(tokens: ThemeTokens): Record<string, string> {
  const vars: Record<string, string> = {};
  for (const group of Object.keys(tokens) as (keyof ThemeTokens)[]) {
    const groupTokens: Record<string, string> = tokens[group];
    for (const [key, value] of Object.entries(groupTokens)) {
      vars[cssVarName(group, key)] = cssValue(group, value);
    }
  }
  return vars;
}

/**
 * Merges tenant overrides over the base theme, discarding any key not declared
 * overridable in `OVERRIDABLE_TOKENS`. State and neutral tokens therefore stay
 * consistent across every tenant, which is the point (docs/04-design-system.md § 2).
 */
export function mergeTokens(
  base: ThemeTokens,
  overrides?: TenantTokenOverrides | null,
): ThemeTokens {
  if (!overrides) return base;

  const merged: ThemeTokens = {
    ...base,
    brand: { ...base.brand },
    color: { ...base.color },
    font: { ...base.font },
    text: { ...base.text },
    weight: { ...base.weight },
    space: { ...base.space },
    radius: { ...base.radius },
    shadow: { ...base.shadow },
    motion: { ...base.motion },
  };

  for (const [group, allowedKeys] of Object.entries(OVERRIDABLE_TOKENS) as [
    keyof typeof OVERRIDABLE_TOKENS,
    readonly string[],
  ][]) {
    const groupOverrides = overrides[group] as Record<string, string> | undefined;
    if (!groupOverrides) continue;

    const target: Record<string, string> = merged[group];
    for (const key of allowedKeys) {
      const value = groupOverrides[key];
      if (typeof value === 'string' && value.trim() !== '') {
        target[key] = value;
      }
    }
  }

  return merged;
}

/** Serialises a token set into a `:root { ... }` rule for server-rendered output. */
export function serializeCssVars(tokens: ThemeTokens, selector = ':root'): string {
  const declarations = Object.entries(tokensToCssVars(tokens))
    .map(([name, value]) => `${name}:${value};`)
    .join('');
  return `${selector}{${declarations}}`;
}
