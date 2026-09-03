'use client';

import clsx from 'clsx';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

import { Button } from './Button';
import { Wordmark } from './Wordmark';

export interface NavLink {
  label: string;
  href: string;
}

export interface HeaderProps {
  navLinks: readonly NavLink[];
  logIn: NavLink;
  getStarted: NavLink;
  className?: string;
}

const NAV_LINK_CLASSES =
  'rounded-sm text-sm font-medium text-text-muted transition-colors duration-fast ease-standard hover:text-primary focus-visible:outline-none focus-visible:ring focus-visible:ring-offset-2 motion-reduce:transition-none';

/**
 * Sticky translucent global header (docs/04b § 2).
 *
 * Below `lg` the nav collapses behind a disclosure button rather than being
 * hidden outright, so every destination stays reachable on a phone.
 */
export function Header({ navLinks, logIn, getStarted, className }: HeaderProps) {
  const [open, setOpen] = useState(false);

  return (
    <header
      className={clsx(
        'sticky top-0 z-10 w-full border-b border-border bg-surface/85 backdrop-blur',
        className,
      )}
    >
      <div className="mx-auto flex w-full max-w-content items-center justify-between gap-4 px-5 py-3">
        <Wordmark href="/" />

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className={NAV_LINK_CLASSES}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Button href={logIn.href} variant="ghost" className="hidden sm:inline-flex">
            {logIn.label}
          </Button>
          <Button href={getStarted.href}>{getStarted.label}</Button>

          <button
            type="button"
            aria-expanded={open}
            aria-controls="header-mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((wasOpen) => !wasOpen)}
            className="grid h-10 w-10 place-items-center rounded-md border border-border text-text transition-colors duration-fast ease-standard hover:bg-accent-soft focus-visible:outline-none focus-visible:ring focus-visible:ring-offset-2 motion-reduce:transition-none lg:hidden"
          >
            {open ? (
              <X size={20} aria-hidden="true" focusable="false" />
            ) : (
              <Menu size={20} aria-hidden="true" focusable="false" />
            )}
          </button>
        </div>
      </div>

      <nav
        id="header-mobile-nav"
        aria-label="Primary mobile"
        hidden={!open}
        className="border-t border-border bg-surface px-5 py-4 lg:hidden"
      >
        <ul className="flex flex-col gap-4">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} className={NAV_LINK_CLASSES} onClick={() => setOpen(false)}>
                {link.label}
              </a>
            </li>
          ))}
          <li className="sm:hidden">
            <a href={logIn.href} className={NAV_LINK_CLASSES} onClick={() => setOpen(false)}>
              {logIn.label}
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
