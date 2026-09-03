import { CheckCircle2, Globe2, Inbox, ShieldCheck } from 'lucide-react';

import type { ImageSlot } from './home';
import { ROUTES, SIGN_UP } from './routes';

/** /institutions — docs/04b § 6. Angle: applicant quality and less manual work. */

export const INSTITUTIONS_HERO = {
  eyebrow: 'For institutions',
  title: 'Reach qualified students, worldwide.',
  subcopy:
    'Volume is not the problem. Sorting genuine, complete, eligible applications out of everything else is. Applications reach you already checked, from agencies we have vetted.',
  primaryCta: { label: 'Partner with us', href: SIGN_UP },
  secondaryCta: { label: 'Speak to our team', href: ROUTES.contact },
  image: {
    src: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1400&q=80',
    alt: 'University graduates at commencement',
    searchTerm: 'university graduation',
  } satisfies ImageSlot,
} as const;

export const INSTITUTION_VALUE_PROPS = [
  {
    icon: Globe2,
    tone: 'tone1' as const,
    title: 'Diversify enrolment across nationalities',
    description:
      'Reach markets your current partners do not cover, without opening an office in each one.',
  },
  {
    icon: CheckCircle2,
    tone: 'tone2' as const,
    title: 'Higher-quality applications',
    description:
      'Documents are checked for completeness and consistency before submission, so fewer files come back to you incomplete.',
  },
  {
    icon: Inbox,
    tone: 'tone3' as const,
    title: 'Less manual processing',
    description:
      'One inbox, structured records, and a consistent format across every partner agency instead of forty different email threads.',
  },
  {
    icon: ShieldCheck,
    tone: 'tone4' as const,
    title: 'A vetted partner network',
    description:
      'Agencies are approved before they can route applications to you, and can be suspended if standards slip.',
  },
];

export const INSTITUTION_TRUST = {
  eyebrow: 'How we work with you',
  heading: 'Your admissions rules, applied before submission',
  body: 'Tell us your entry requirements, document standards and intake dates once. Applications that reach your inbox already reflect them, and the ones that do not are held back with the agency rather than landing on your desk.',
  points: [
    'Programme and requirement data you control',
    'Request more information without leaving the record',
    'Issue offers and see them acknowledged',
  ],
  image: {
    src: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=1200&q=80',
    alt: 'Students walking on a university campus',
    searchTerm: 'campus students walking',
  } satisfies ImageSlot,
} as const;

export const INSTITUTION_STEPS = [
  {
    title: 'List your programmes',
    description: 'Requirements, intakes and deadlines, in your own words.',
  },
  {
    title: 'Receive checked applications',
    description: 'Complete files from agencies we have already vetted.',
  },
  {
    title: 'Decide and issue offers',
    description: 'Request information or make an offer without leaving the record.',
  },
];

export const INSTITUTIONS_CTA = {
  heading: 'Become a partner institution',
  subline:
    'Tell us your intake priorities and we will show you the applicant pipeline behind them.',
  cta: { label: 'Partner with us', href: SIGN_UP },
  reassurance: 'No listing fee while we build the network.',
} as const;

export const INSTITUTIONS_IMAGE_SLOTS: readonly (ImageSlot & { slot: string })[] = [
  { slot: '/institutions hero', ...INSTITUTIONS_HERO.image },
  { slot: '/institutions campus', ...INSTITUTION_TRUST.image },
];
