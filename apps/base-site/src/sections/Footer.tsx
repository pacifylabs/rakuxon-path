import { BrandName, SectionBand, Wordmark } from '@rakuxon-edu/ui';

import { FOOTER } from '@/content/landing';

const LINK_CLASSES =
  'rounded-sm text-sm text-text-muted transition-colors duration-fast ease-standard hover:text-primary focus-visible:outline-none focus-visible:ring focus-visible:ring-offset-2 motion-reduce:transition-none';

export function Footer() {
  return (
    <SectionBand as="footer" tone="surface" className="border-t border-border py-12 md:py-16">
      <div className="grid gap-10 md:grid-cols-[2fr_repeat(3,1fr)]">
        <div>
          <Wordmark href="#top" />
          <p className="mt-4 max-w-prose text-sm text-text-muted">{FOOTER.tagline}</p>
          <p className="mt-2 text-sm text-text-muted">{FOOTER.domain}</p>
        </div>

        {FOOTER.columns.map((column) => (
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
            {FOOTER.socials.map((social) => (
              <li key={social.label}>
                <a href={social.href} className={LINK_CLASSES}>
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </SectionBand>
  );
}
