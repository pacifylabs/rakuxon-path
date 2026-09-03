'use client';

import clsx from 'clsx';

import { useBrand } from '../theme/useTheme';

export interface WordmarkProps {
  /** Renders inside an existing link or heading when false. Defaults to a link home. */
  href?: string;
  className?: string;
  /** Hides the mark glyph, leaving just the name. */
  hideMark?: boolean;
}

/**
 * The brand lockup: name in primary with its trailing slice in accent
 * ("Rakuxon" + "Ed"). Reads the `brand` tokens, so renaming the product is a
 * token change — nothing here hard-codes it.
 */
export function Wordmark({ href = '/', className, hideMark = false }: WordmarkProps) {
  const { name, nameAccentSuffix } = useBrand();

  const hasAccent =
    nameAccentSuffix.length > 0 &&
    nameAccentSuffix.length < name.length &&
    name.endsWith(nameAccentSuffix);

  const lead = hasAccent ? name.slice(0, name.length - nameAccentSuffix.length) : name;
  const accent = hasAccent ? nameAccentSuffix : '';

  const content = (
    <>
      {!hideMark && (
        <span
          aria-hidden="true"
          className="grid h-6 w-6 place-items-center rounded-sm bg-primary text-xs font-bold text-on-primary"
        >
          {name.trim().charAt(0)}
        </span>
      )}
      <span className="whitespace-nowrap font-heading text-xl font-bold tracking-tight text-primary">
        {lead}
        {accent && <span className="text-accent">{accent}</span>}
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
