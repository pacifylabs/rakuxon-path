import type { FooterColumn, NavLink } from '@rakuxon-edu/ui';

import { LOG_IN, ROUTES, SIGN_UP, countryRoute } from './routes';

/** Global shell content (docs/04b § 2), shared by every page. */

export const NAV_LINKS: readonly NavLink[] = [
  { label: 'Students', href: ROUTES.students },
  { label: 'Agencies', href: ROUTES.agencies },
  { label: 'Institutions', href: ROUTES.institutions },
  { label: 'Universities', href: ROUTES.universities },
  { label: 'Destinations', href: ROUTES.destinations },
  { label: 'About', href: ROUTES.about },
];

export const LOG_IN_LINK: NavLink = { label: 'Log in', href: LOG_IN };
export const GET_STARTED_LINK: NavLink = { label: 'Get started', href: SIGN_UP };

export const CONTACT_EMAIL = 'hello@rakuxoned.com';

export const FOOTER_COLUMNS: readonly FooterColumn[] = [
  {
    heading: 'Get to know us',
    links: [
      { label: 'About', href: ROUTES.about },
      { label: 'How we work', href: `${ROUTES.about}#how-we-work` },
      { label: 'Contact', href: ROUTES.contact },
      { label: 'Careers', href: `${ROUTES.about}#careers` },
    ],
  },
  {
    heading: 'For',
    links: [
      { label: 'Students', href: ROUTES.students },
      { label: 'Agencies', href: ROUTES.agencies },
      { label: 'Institutions', href: ROUTES.institutions },
    ],
  },
  {
    heading: 'Destinations',
    links: [
      { label: 'United Kingdom', href: countryRoute('uk') },
      { label: 'Canada', href: countryRoute('canada') },
      { label: 'United States', href: countryRoute('usa') },
      { label: 'Australia', href: countryRoute('australia') },
      { label: 'All destinations', href: ROUTES.destinations },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Privacy policy', href: ROUTES.privacy },
      { label: 'Terms of service', href: ROUTES.terms },
    ],
  },
];

export const SOCIALS: readonly NavLink[] = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com' },
  { label: 'Instagram', href: 'https://www.instagram.com' },
  { label: 'X', href: 'https://x.com' },
];

export const FOOTER_TAGLINE = 'Your study abroad journey, simplified.';
export const FOOTER_DOMAIN = 'rakuxoned.com';
