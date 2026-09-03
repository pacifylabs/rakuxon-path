'use client';

import clsx from 'clsx';

import { BrandName } from './BrandName';
import { Wordmark } from './Wordmark';
import { useBrand } from '../theme/useTheme';
import type { NavLink } from './Header';

export interface FooterColumn {
  heading: string;
  links: readonly NavLink[];
}

export interface FooterProps {
  /** Defaults to the brand tagline token. */
  tagline?: string;
  domain: string;
  columns: readonly FooterColumn[];
  socials: readonly NavLink[];
  className?: string;
}

const LINK_CLASSES =
  'rounded-sm text-sm text-text-muted transition-colors duration-fast ease-standard hover:text-primary focus-visible:outline-none focus-visible:ring focus-visible:ring-offset-2 motion-reduce:transition-none';

/**
 * Global four-column footer (docs/04b § 2). The legal column is not optional:
 * this is a document-handling product.
 */
export function Footer({ tagline, domain, columns, socials, className }: FooterProps) {
  const brand = useBrand();
  const strapline = tagline ?? brand.tagline;

  return (
    <footer
      className={clsx('w-full border-t border-border bg-surface px-5 py-12 md:py-16', className)}
    >
      <div className="mx-auto w-full max-w-content">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[2fr_repeat(4,1fr)]">
          <div>
            <Wordmark href="/" />
            <p className="mt-4 max-w-prose text-sm text-text-muted">{strapline}</p>
            <p className="mt-2 text-sm text-text-muted">{domain}</p>
          </div>

          {columns.map((column) => (
            <nav key={column.heading} aria-label={column.heading}>
              <h2 className="font-heading text-sm font-semibold text-text">{column.heading}</h2>
              <ul className="mt-4 flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className={LINK_CLASSES}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-text-muted">
            © {new Date().getFullYear()} <BrandName part="lead" />. All rights reserved.
          </p>
          <nav aria-label="Social">
            <ul className="flex gap-6">
              {socials.map((social) => (
                <li key={social.label}>
                  <a href={social.href} className={LINK_CLASSES}>
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
