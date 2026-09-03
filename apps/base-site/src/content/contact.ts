import { Building2, GraduationCap, Users } from 'lucide-react';

import type { ImageSlot } from './home';

/** /contact — docs/04b § 10. Angle: tell us which side you are on. */

export const CONTACT_HEADER = {
  eyebrow: 'Contact',
  title: 'Tell us which side you are on',
  subcopy:
    'Students, agencies and institutions need different things from us. Pick your role and the right person will pick it up.',
} as const;

export const CONTACT_IMAGE: ImageSlot = {
  src: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&q=80',
  alt: 'People collaborating at a table',
  searchTerm: 'contact team table',
};

export const CONTACT_ROUTES = [
  {
    icon: GraduationCap,
    tone: 'tone1' as const,
    title: 'Students',
    description: 'Questions about applying, documents, costs or deadlines.',
  },
  {
    icon: Users,
    tone: 'tone2' as const,
    title: 'Agencies',
    description: 'Partnership, onboarding your team, or moving an existing desk across.',
  },
  {
    icon: Building2,
    tone: 'tone3' as const,
    title: 'Institutions',
    description: 'Listing programmes, receiving applications, or reviewing our partner standards.',
  },
];

/** Maps ?intent= on the contact URL to a pre-selected role. */
export const INTENT_TO_ROLE: Record<string, string> = {
  signup: 'student',
  login: 'student',
  agency: 'agency',
  institution: 'institution',
};

export const CONTACT_IMAGE_SLOTS: readonly (ImageSlot & { slot: string })[] = [
  { slot: '/contact supporting image', ...CONTACT_IMAGE },
];
