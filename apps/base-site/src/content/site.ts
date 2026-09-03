import type { FooterColumn, NavLink } from '@rakuxon-edu/ui';

/** Global shell content (docs/04b § 2), shared by every marketing page. */

export const NAV_LINKS: readonly NavLink[] = [
  { label: 'Students', href: '/students' },
  { label: 'Agencies', href: '/agencies' },
  { label: 'Institutions', href: '/institutions' },
  { label: 'Universities', href: '/universities' },
  { label: 'Destinations', href: '/destinations' },
  { label: 'About', href: '/about' },
];

export const LOG_IN: NavLink = { label: 'Log in', href: '/login' };
export const GET_STARTED: NavLink = { label: 'Get started', href: '/register' };

export const FOOTER_COLUMNS: readonly FooterColumn[] = [
  {
    heading: 'Get to know us',
    links: [
      { label: 'About', href: '/about' },
      { label: 'How we work', href: '/about#how-we-work' },
      { label: 'Contact', href: '/contact' },
      { label: 'Careers', href: '/about#careers' },
    ],
  },
  {
    heading: 'For',
    links: [
      { label: 'Students', href: '/students' },
      { label: 'Agencies', href: '/agencies' },
      { label: 'Institutions', href: '/institutions' },
    ],
  },
  {
    heading: 'Destinations',
    links: [
      { label: 'United Kingdom', href: '/destinations/uk' },
      { label: 'Canada', href: '/destinations/canada' },
      { label: 'United States', href: '/destinations/usa' },
      { label: 'Australia', href: '/destinations/australia' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Privacy policy', href: '/privacy' },
      { label: 'Terms of service', href: '/terms' },
    ],
  },
];

export const SOCIALS: readonly NavLink[] = [
  { label: 'LinkedIn', href: '#linkedin' },
  { label: 'Instagram', href: '#instagram' },
  { label: 'X', href: '#x' },
];

export const FOOTER_TAGLINE = 'Your study abroad journey, simplified.';
export const FOOTER_DOMAIN = 'rakuxoned.com';
