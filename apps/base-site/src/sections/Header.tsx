import { Wordmark } from '@rakuxon-edu/ui';
import { Button } from '@rakuxon-edu/ui';

import { HERO, NAV_LINKS } from '@/content/landing';

/**
 * Sticky, translucent header. The nav collapses to the CTAs on small screens
 * rather than hiding behind a menu button that would need client JS — every
 * destination on this page is also reachable by scrolling.
 */
export function Header() {
  return (
    <header className="sticky top-0 z-10 w-full border-b border-border bg-surface/85 backdrop-blur">
      <div className="mx-auto flex w-full max-w-content items-center justify-between gap-4 px-5 py-3">
        <Wordmark href="#top" />

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="rounded-sm text-sm font-medium text-text-muted transition-colors duration-fast ease-standard hover:text-primary focus-visible:outline-none focus-visible:ring focus-visible:ring-offset-2 motion-reduce:transition-none"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <span className="hidden rounded-full bg-accent-soft px-4 py-2 text-xs font-medium text-primary lg:inline">
            {HERO.pill}
          </span>
          <Button href="#get-started" variant="ghost" className="hidden sm:inline-flex">
            Log in
          </Button>
          <Button href="#get-started">Get started</Button>
        </div>
      </div>
    </header>
  );
}
