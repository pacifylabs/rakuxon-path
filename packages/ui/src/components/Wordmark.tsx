'use client';

import clsx from 'clsx';

import { useBrand } from '../theme/useTheme';
import { LogoMark } from './LogoMark';

export interface WordmarkProps {
  /** Renders inside an existing link or heading when false. Defaults to a link home. */
  href?: string;
  className?: string;
  /** Hides the mark glyph, leaving just the name. */
  hideMark?: boolean;
  /** Shows the strapline beneath the name, as in the full logo lockup. */
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const NAME_SIZE = {
  sm: 'text-base',
  md: 'text-xl',
  lg: 'text-2xl',
} as const;

const MARK_SIZE = { sm: 24, md: 30, lg: 40 } as const;

/**
 * The brand lockup: mark + name, with the trailing slice of the name in the
 * accent colour ("Rakuxon" + "Path"). Reads the `brand` tokens, so renaming the
 * product is a token change — nothing here hard-codes it.
 */
export function Wordmark({
  href = '/',
  className,
  hideMark = false,
  showTagline = false,
  size = 'md',
}: WordmarkProps) {
  const { name, nameAccentSuffix, tagline } = useBrand();

  const hasAccent =
    nameAccentSuffix.length > 0 &&
    nameAccentSuffix.length < name.length &&
    name.endsWith(nameAccentSuffix);

  const lead = hasAccent ? name.slice(0, name.length - nameAccentSuffix.length) : name;
  const accent = hasAccent ? nameAccentSuffix : '';

  const content = (
    <>
      {!hideMark && <LogoMark size={MARK_SIZE[size]} />}
      <span className="flex flex-col">
        <span
          className={clsx(
            'whitespace-nowrap font-heading font-bold tracking-tight text-primary',
            NAME_SIZE[size],
          )}
        >
          {lead}
          {accent && <span className="text-accent">{accent}</span>}
        </span>
        {showTagline && <span className="mt-1 text-sm text-text-muted">{tagline}</span>}
      </span>
    </>
  );

  const classes = clsx(
    'inline-flex items-center gap-2 rounded-sm',
    'focus-visible:outline-none focus-visible:ring focus-visible:ring-offset-2',
    className,
  );

  if (href) {
    return (
      <a href={href} className={classes} aria-label={name}>
        {content}
      </a>
    );
  }

  return <span className={classes}>{content}</span>;
}
