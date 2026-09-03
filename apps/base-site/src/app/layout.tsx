import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';

import { Footer, Header, ThemeProvider, baseTokens } from '@rakuxon-path/ui';

import {
  FOOTER_COLUMNS,
  FOOTER_DOMAIN,
  FOOTER_TAGLINE,
  GET_STARTED_LINK,
  LOG_IN_LINK,
  NAV_LINKS,
  SOCIALS,
} from '@/content/site';

import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const description =
  'Research, plan, apply, and track your international education — all in one place. Apply with confidence and turn your goals into offers.';

export const metadata: Metadata = {
  title: {
    default: `${baseTokens.brand.name} — Study abroad, simplified`,
    template: `%s · ${baseTokens.brand.name}`,
  },
  description,
  openGraph: {
    title: `${baseTokens.brand.name} — Study abroad, simplified`,
    description,
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: baseTokens.color.primary,
};

/**
 * Global shell for every marketing page (docs/04b § 2). The header and footer
 * live here so a new page only supplies its own sections.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        {/* No tenant overrides on the public site — always the base theme. */}
        <ThemeProvider>
          <a className="skip-link" href="#main">
            Skip to main content
          </a>

          <Header navLinks={NAV_LINKS} logIn={LOG_IN_LINK} getStarted={GET_STARTED_LINK} />

          <main id="main">{children}</main>

          <Footer
            tagline={FOOTER_TAGLINE}
            domain={FOOTER_DOMAIN}
            columns={FOOTER_COLUMNS}
            socials={SOCIALS}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
