import type { ImageSlot } from './home';
import { SIGN_UP } from './routes';

/**
 * /universities — docs/04b § 7.
 *
 * A marketing-side browse. The real catalogue lives in the product, so this
 * list is illustrative and flagged as such; the filters operate on it for real.
 */

export interface UniversityEntry extends ImageSlot {
  name: string;
  country: string;
  level: string;
  subject: string;
}

export const UNIVERSITIES_HEADER = {
  eyebrow: 'Explore universities',
  title: 'Browse before you commit to anything',
  subcopy:
    'No account, no counsellor call, no pressure. Get a feel for what is out there, then narrow it down when you are ready.',
} as const;

export const UNIVERSITY_FILTERS = [
  {
    name: 'country',
    label: 'Country',
    options: ['Australia', 'Canada', 'Germany', 'Ireland', 'United Kingdom', 'United States'],
  },
  {
    name: 'level',
    label: 'Level',
    options: ['Undergraduate', 'Postgraduate'],
  },
  {
    name: 'subject',
    label: 'Subject',
    options: ['Business', 'Computing', 'Engineering', 'Health', 'Law'],
  },
] as const;

export const UNIVERSITIES: readonly UniversityEntry[] = [
  {
    name: 'Northfield University',
    country: 'United Kingdom',
    level: 'Postgraduate',
    subject: 'Computing',
    src: 'https://images.unsplash.com/photo-1584467735815-f778f274e296?w=800&q=80',
    alt: 'University library interior',
    searchTerm: 'university library',
  },
  {
    name: 'Westbrook College',
    country: 'Canada',
    level: 'Undergraduate',
    subject: 'Business',
    src: 'https://images.unsplash.com/photo-1568792923760-d70635a89fdc?w=800&q=80',
    alt: 'College campus green',
    searchTerm: 'college campus green',
  },
  {
    name: 'Lakeside Institute',
    country: 'Australia',
    level: 'Postgraduate',
    subject: 'Engineering',
    src: 'https://images.unsplash.com/photo-1622397333309-3056849bc70b?w=800&q=80',
    alt: 'Campus building exterior',
    searchTerm: 'campus building',
  },
  {
    name: 'Kingsbridge University',
    country: 'Germany',
    level: 'Postgraduate',
    subject: 'Engineering',
    src: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80',
    alt: 'University campus building',
    searchTerm: 'university campus',
  },
  {
    name: 'Ardenmoor College',
    country: 'Ireland',
    level: 'Undergraduate',
    subject: 'Health',
    src: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=800&q=80',
    alt: 'Historic university hall',
    searchTerm: 'university hall',
  },
  {
    name: 'Fairhaven University',
    country: 'United States',
    level: 'Postgraduate',
    subject: 'Law',
    src: 'https://images.unsplash.com/photo-1607013251379-e6eecfffe234?w=800&q=80',
    alt: 'Modern campus courtyard',
    searchTerm: 'campus courtyard',
  },
];

export const UNIVERSITIES_CTA = {
  heading: 'Ready to see what you would actually get into?',
  subline: 'Add your grades and budget, and we will match you against the full catalogue.',
  cta: { label: 'Get matched', href: SIGN_UP },
  reassurance: 'Free, and you can stop at any point.',
} as const;

export const UNIVERSITIES_IMAGE_SLOTS: readonly (ImageSlot & { slot: string })[] = UNIVERSITIES.map(
  (university) => ({
    slot: `/universities ${university.name}`,
    ...university,
  }),
);
