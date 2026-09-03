/**
 * Tailwind preset mapping every utility onto the design-system CSS variables.
 *
 * Scales are *replaced* rather than extended: `bg-blue-500`, `p-7` and
 * `rounded-3xl` simply do not compile. That makes "no hard-coded colours or
 * spacing in app code" (docs/04-design-system.md § 9) a build-time guarantee
 * instead of a convention people have to remember.
 */

const color = (name) => `var(--color-${name})`;

/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      inherit: 'inherit',

      primary: color('primary'),
      'primary-hover': color('primary-hover'),
      'on-primary': color('on-primary'),
      accent: color('accent'),
      'accent-soft': color('accent-soft'),

      bg: color('bg'),
      surface: color('surface'),
      'surface-muted': color('surface-muted'),
      text: color('text'),
      'text-muted': color('text-muted'),
      'text-inverse': color('text-inverse'),
      border: color('border'),

      /* Decorative categorical tints (docs/04b § 3.3, § 3.4) — not state. */
      'tint-indigo': 'var(--tint-indigo)',
      'tint-indigo-soft': 'var(--tint-indigo-soft)',
      'tint-green': 'var(--tint-green)',
      'tint-green-soft': 'var(--tint-green-soft)',
      'tint-orange': 'var(--tint-orange)',
      'tint-orange-soft': 'var(--tint-orange-soft)',
      'tint-blue': 'var(--tint-blue)',
      'tint-blue-soft': 'var(--tint-blue-soft)',

      success: color('success'),
      warning: color('warning'),
      danger: color('danger'),
      info: color('info'),
      'focus-ring': color('focus-ring'),
    },

    spacing: {
      0: '0px',
      px: '1px',
      1: 'var(--space-1)',
      2: 'var(--space-2)',
      3: 'var(--space-3)',
      4: 'var(--space-4)',
      5: 'var(--space-5)',
      6: 'var(--space-6)',
      8: 'var(--space-8)',
      10: 'var(--space-10)',
      12: 'var(--space-12)',
      16: 'var(--space-16)',
      20: 'var(--space-20)',
    },

    borderRadius: {
      none: '0px',
      sm: 'var(--radius-sm)',
      md: 'var(--radius-md)',
      lg: 'var(--radius-lg)',
      xl: 'var(--radius-xl)',
      full: 'var(--radius-full)',
    },

    boxShadow: {
      none: 'none',
      sm: 'var(--shadow-sm)',
      md: 'var(--shadow-md)',
      lg: 'var(--shadow-lg)',
    },

    fontFamily: {
      sans: 'var(--font-sans)',
      heading: 'var(--font-heading)',
    },

    fontSize: {
      xs: ['var(--text-xs)', { lineHeight: '1.5' }],
      sm: ['var(--text-sm)', { lineHeight: '1.5' }],
      base: ['var(--text-base)', { lineHeight: '1.6' }],
      lg: ['var(--text-lg)', { lineHeight: '1.6' }],
      xl: ['var(--text-xl)', { lineHeight: '1.4' }],
      '2xl': ['var(--text-2xl)', { lineHeight: '1.3' }],
      '3xl': ['var(--text-3xl)', { lineHeight: '1.2' }],
      '4xl': ['var(--text-4xl)', { lineHeight: '1.1' }],
      hero: ['var(--text-hero)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
    },

    fontWeight: {
      regular: 'var(--weight-regular)',
      medium: 'var(--weight-medium)',
      semibold: 'var(--weight-semibold)',
      bold: 'var(--weight-bold)',
    },

    transitionTimingFunction: {
      standard: 'var(--ease-standard)',
    },

    transitionDuration: {
      fast: 'var(--duration-fast)',
      base: 'var(--duration-base)',
    },

    extend: {
      maxWidth: {
        content: '1200px',
        prose: '68ch',
      },
      width: {
        /* The floating hero cards. Derived from the space scale rather than a
           raw px value, so it moves with the tokens. */
        'card-float': 'calc(var(--space-20) * 3)',
      },
      ringColor: {
        DEFAULT: color('focus-ring'),
      },
      ringWidth: {
        DEFAULT: '3px',
      },
      ringOffsetWidth: {
        DEFAULT: '2px',
      },
    },
  },
};
