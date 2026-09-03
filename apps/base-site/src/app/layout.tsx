import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';

import { ThemeProvider, baseTokens } from '@rakuxon-edu/ui';

import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const description =
  'Everything you need to research, plan, apply, and track your study abroad journey — in one place.';

export const metadata: Metadata = {
  title: {
    default: `${baseTokens.brand.name} — Your study abroad journey, simplified`,
    template: `%s · ${baseTokens.brand.name}`,
  },
  description,
  openGraph: {
    title: `${baseTokens.brand.name} — Your study abroad journey, simplified`,
    description,
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: baseTokens.color.primary,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        {/*
          No tenant overrides on the public marketing page — it is always the
          base Rakuxon theme (docs/04a § 2.1).
        */}
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
