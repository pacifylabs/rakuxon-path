import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ThemeProvider } from './ThemeProvider';
import { cssVarName, mergeTokens, serializeCssVars, tokensToCssVars } from './cssVars';
import { baseTokens } from './tokens.base';
import { OVERRIDABLE_TOKENS } from './tokens.types';
import { useTheme } from './useTheme';

function ThemeProbe() {
  const theme = useTheme();
  return (
    <dl>
      <dt>primary</dt>
      <dd data-testid="primary">{theme.color.primary}</dd>
      <dt>danger</dt>
      <dd data-testid="danger">{theme.color.danger}</dd>
      <dt>brand</dt>
      <dd data-testid="brand">{theme.brand.name}</dd>
      <dt>heading</dt>
      <dd data-testid="heading">{theme.font.heading}</dd>
    </dl>
  );
}

describe('cssVarName', () => {
  it.each([
    ['color', 'primaryHover', '--color-primary-hover'],
    ['color', 'onPrimary', '--color-on-primary'],
    ['color', 'surfaceMuted', '--color-surface-muted'],
    ['color', 'focusRing', '--color-focus-ring'],
    ['text', '2xl', '--text-2xl'],
    ['space', '16', '--space-16'],
    ['radius', 'full', '--radius-full'],
    ['motion', 'easeStandard', '--ease-standard'],
    ['motion', 'durationBase', '--duration-base'],
    ['brand', 'name', '--brand-name'],
  ] as const)('maps %s.%s to %s', (group, key, expected) => {
    expect(cssVarName(group, key)).toBe(expected);
  });
});

describe('tokensToCssVars', () => {
  it('emits every declared token as a CSS variable', () => {
    const vars = tokensToCssVars(baseTokens);
    const declaredCount = Object.values(baseTokens).reduce(
      (total, group) => total + Object.keys(group).length,
      0,
    );
    expect(Object.keys(vars)).toHaveLength(declaredCount);
  });

  it('emits the exact palette from the design system spec', () => {
    const vars = tokensToCssVars(baseTokens);
    expect(vars['--color-primary']).toBe('#5B4BE1');
    expect(vars['--color-primary-hover']).toBe('#4A3BC7');
    expect(vars['--color-accent']).toBe('#8B7CF6');
    expect(vars['--color-accent-soft']).toBe('#EEEBFB');
    expect(vars['--color-surface-muted']).toBe('#F7F6FC');
    expect(vars['--color-text']).toBe('#1A1830');
    expect(vars['--color-border']).toBe('#E7E5F2');
    expect(vars['--shadow-md']).toBe('0 6px 20px rgba(26,24,48,.08)');
    expect(vars['--radius-lg']).toBe('20px');
    expect(vars['--space-16']).toBe('64px');
  });

  it('emits the decorative tints', () => {
    const vars = tokensToCssVars(baseTokens);
    expect(vars['--tint-indigo']).toBe('#5B4BE1');
    expect(vars['--tint-green-soft']).toBe('#E6F4EC');
    expect(vars['--tint-orange']).toBe('#C2560E');
    expect(vars['--tint-blue-soft']).toBe('#E8EEFC');
  });

  it('keeps decorative tints distinct from the state palette', () => {
    // A green capability square must not be --color-success: state colours
    // have to keep meaning what they say (docs/04-design-system § 5).
    expect(baseTokens.tint.green).not.toBe(baseTokens.color.success);
    expect(baseTokens.tint.orange).not.toBe(baseTokens.color.warning);
    expect(baseTokens.tint.blue).not.toBe(baseTokens.color.info);
  });

  it('gives every tint foreground AA contrast on white', () => {
    const srgb = (hex: string) =>
      [1, 3, 5].map((i) => {
        const v = parseInt(hex.slice(i, i + 2), 16) / 255;
        return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
      });
    const luminance = (hex: string) => {
      const [r, g, b] = srgb(hex) as [number, number, number];
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };

    for (const key of ['indigo', 'green', 'orange', 'blue'] as const) {
      const ratio = 1.05 / (luminance(baseTokens.tint[key]) + 0.05);
      expect(ratio, `tint.${key} on white`).toBeGreaterThanOrEqual(4.5);
    }
  });

  it('quotes the brand name so it is usable from CSS', () => {
    expect(tokensToCssVars(baseTokens)['--brand-name']).toBe('"Rakuxon Ed"');
  });
});

describe('mergeTokens', () => {
  it('returns the base theme when there are no overrides', () => {
    expect(mergeTokens(baseTokens, null)).toEqual(baseTokens);
  });

  it('lets a tenant override brand colours', () => {
    const merged = mergeTokens(baseTokens, { color: { primary: '#0F766E' } });
    expect(merged.color.primary).toBe('#0F766E');
  });

  it('lets a tenant override the brand name and the heading font', () => {
    const merged = mergeTokens(baseTokens, {
      brand: { name: 'Acme Study' },
      font: { heading: 'Georgia, serif' },
    });
    expect(merged.brand.name).toBe('Acme Study');
    expect(merged.font.heading).toBe('Georgia, serif');
  });

  it('ignores an attempt to override a state colour, so danger always reads as danger', () => {
    const merged = mergeTokens(baseTokens, {
      // @ts-expect-error state tokens are deliberately outside TenantTokenOverrides
      color: { danger: '#00FF00', success: '#00FF00' },
    });
    expect(merged.color.danger).toBe(baseTokens.color.danger);
    expect(merged.color.success).toBe(baseTokens.color.success);
  });

  it('ignores an attempt to override a neutral colour', () => {
    const merged = mergeTokens(baseTokens, {
      // @ts-expect-error neutral tokens are fixed
      color: { bg: '#000000', text: '#FF0000' },
    });
    expect(merged.color.bg).toBe(baseTokens.color.bg);
    expect(merged.color.text).toBe(baseTokens.color.text);
  });

  it('ignores the body font, which is not tenant-overridable', () => {
    const merged = mergeTokens(baseTokens, {
      // @ts-expect-error only font.heading is overridable
      font: { sans: 'Comic Sans MS' },
    });
    expect(merged.font.sans).toBe(baseTokens.font.sans);
  });

  it('ignores a blank override rather than blanking the brand', () => {
    const merged = mergeTokens(baseTokens, { color: { primary: '   ' } });
    expect(merged.color.primary).toBe(baseTokens.color.primary);
  });

  it('does not mutate the base theme', () => {
    const before = baseTokens.color.primary;
    mergeTokens(baseTokens, { color: { primary: '#123456' } });
    expect(baseTokens.color.primary).toBe(before);
  });

  it('declares only brand tokens as overridable', () => {
    expect(OVERRIDABLE_TOKENS.color).not.toContain('danger');
    expect(OVERRIDABLE_TOKENS.color).not.toContain('bg');
    expect(OVERRIDABLE_TOKENS.color).toContain('primary');
  });
});

describe('serializeCssVars', () => {
  it('produces a :root rule by default', () => {
    expect(serializeCssVars(baseTokens)).toMatch(/^:root\{--brand-name:/);
  });

  it('honours a custom selector', () => {
    expect(serializeCssVars(baseTokens, '.tenant')).toMatch(/^\.tenant\{/);
  });
});

describe('<ThemeProvider/>', () => {
  it('renders the resolved variables so first paint is already themed', () => {
    const { container } = render(
      <ThemeProvider>
        <p>hello</p>
      </ThemeProvider>,
    );
    const style = container.querySelector('style[data-rakuxon-theme]');
    expect(style?.textContent).toContain('--color-primary:#5B4BE1');
  });

  it('supplies the base theme to consumers', () => {
    render(
      <ThemeProvider>
        <ThemeProbe />
      </ThemeProvider>,
    );
    expect(screen.getByTestId('primary')).toHaveTextContent('#5B4BE1');
    expect(screen.getByTestId('brand')).toHaveTextContent('Rakuxon Ed');
  });

  it('applies a tenant brand override to consumers and to the emitted CSS', () => {
    const { container } = render(
      <ThemeProvider tokens={{ color: { primary: '#0F766E' }, brand: { name: 'Acme Study' } }}>
        <ThemeProbe />
      </ThemeProvider>,
    );
    expect(screen.getByTestId('primary')).toHaveTextContent('#0F766E');
    expect(screen.getByTestId('brand')).toHaveTextContent('Acme Study');
    expect(container.querySelector('style[data-rakuxon-theme]')?.textContent).toContain(
      '--color-primary:#0F766E',
    );
  });

  it('keeps state colours fixed even when a tenant tries to change them', () => {
    render(
      // @ts-expect-error state tokens are deliberately outside TenantTokenOverrides
      <ThemeProvider tokens={{ color: { danger: '#00FF00' } }}>
        <ThemeProbe />
      </ThemeProvider>,
    );
    expect(screen.getByTestId('danger')).toHaveTextContent('#E5484D');
  });

  it('falls back to the base theme outside a provider', () => {
    render(<ThemeProbe />);
    expect(screen.getByTestId('primary')).toHaveTextContent('#5B4BE1');
  });
});
