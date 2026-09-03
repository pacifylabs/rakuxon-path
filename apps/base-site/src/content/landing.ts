import {
  Award,
  BadgeCheck,
  BarChart3,
  BookOpenCheck,
  Building2,
  ClipboardList,
  Compass,
  FileSearch,
  GraduationCap,
  Lock,
  Map,
  PiggyBank,
  Rocket,
  ScrollText,
  Send,
  Sparkles,
  Star,
  Trophy,
  UserRoundCheck,
  Users,
  Wallet,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

/**
 * All landing copy in one place, so wording changes never require touching a
 * component. Copy direction follows docs/04a-landing-and-design-system.md § 4.
 */

export const NAV_LINKS = [
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Features', href: '#capabilities' },
  { label: 'For Agencies', href: '#audiences' },
  { label: 'About', href: '#about' },
] as const;

export const HERO = {
  headlinePrefix: 'Your study abroad journey, ',
  headlineAccent: 'simplified',
  subcopy: 'Everything you need to research, plan, apply, and track — in one place.',
  primaryCta: { label: 'Start your journey', href: '#get-started' },
  secondaryCta: { label: 'Explore universities', href: '#capabilities' },
  trustLine: 'Trusted by students worldwide · Transparent · Confidential',
  pill: 'Built for students, guided by experts.',
} as const;

export interface FeatureCardContent {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const HERO_FEATURE_CARDS: readonly FeatureCardContent[] = [
  { icon: GraduationCap, title: 'Find Universities', description: 'Search a growing catalogue.' },
  { icon: Award, title: 'Scholarships', description: 'Funding you actually qualify for.' },
  { icon: Wallet, title: 'Budget Predictor', description: 'Know the real cost up front.' },
  { icon: ClipboardList, title: 'Application Tracker', description: 'Every deadline in one view.' },
];

export interface PillarContent {
  icon: LucideIcon;
  title: string;
  line: string;
}

export const HERO_PILLARS: readonly PillarContent[] = [
  { icon: Compass, title: 'Explore', line: 'Compare universities and programs side by side.' },
  { icon: Map, title: 'Plan', line: 'Build a shortlist that fits your grades and budget.' },
  { icon: Send, title: 'Apply', line: 'Submit, track, and hear back — without the guesswork.' },
];

export interface CapabilityContent {
  icon: LucideIcon;
  label: string;
}

export const CAPABILITIES: readonly CapabilityContent[] = [
  { icon: FileSearch, label: 'University Search' },
  { icon: BarChart3, label: 'Compare Programs' },
  { icon: Star, label: 'Rankings & Reviews' },
  { icon: ScrollText, label: 'SOP Analyzer' },
  { icon: PiggyBank, label: 'Scholarship Finder' },
  { icon: ClipboardList, label: 'Application Tracker' },
  { icon: UserRoundCheck, label: 'Expert Mentorship' },
];

export interface StepContent {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const STEPS: readonly StepContent[] = [
  {
    title: 'Build your profile',
    description: 'Add your grades, budget and goals once. We reuse them everywhere.',
    icon: BookOpenCheck,
  },
  {
    title: 'Shortlist & apply',
    description: 'Pick the universities that fit, then apply with your documents in order.',
    icon: Send,
  },
  {
    title: 'Track your admission',
    description: 'Watch every application move, from submitted to offer, in real time.',
    icon: Trophy,
  },
];

export interface AudienceContent {
  icon: LucideIcon;
  title: string;
  summary: string;
  points: readonly string[];
  cta: { label: string; href: string };
}

export const AUDIENCES: readonly AudienceContent[] = [
  {
    icon: GraduationCap,
    title: 'For Students',
    summary: 'Guided when you want it, self-serve when you do not.',
    points: [
      'A guided profile you fill in once',
      'Upload documents securely, see what is still missing',
      'Track every application in one place',
    ],
    cta: { label: 'Start your journey', href: '#get-started' },
  },
  {
    icon: Building2,
    title: 'For Agencies & Partners',
    summary: 'Run your whole student pipeline without the spreadsheet sprawl.',
    points: [
      'Onboard students with a single invite link',
      'Review documents with checks that flag problems early',
      'See every application status across your team',
    ],
    cta: { label: 'Talk to us', href: '#get-started' },
  },
];

export interface StatContent {
  value: string;
  label: string;
  /** Every figure here is unverified until we have real data to put behind it. */
  placeholder: boolean;
}

export const STATS: readonly StatContent[] = [
  { value: '—', label: 'Students guided', placeholder: true },
  { value: '—', label: 'Average rating', placeholder: true },
  { value: '—', label: 'Universities', placeholder: true },
  { value: '—', label: 'Countries', placeholder: true },
];

export interface TrustBadgeContent {
  icon: LucideIcon;
  label: string;
}

export const TRUST_BADGES: readonly TrustBadgeContent[] = [
  { icon: Sparkles, label: 'Personalized guidance' },
  { icon: BadgeCheck, label: 'University-specific advice' },
  { icon: Lock, label: 'Confidential & trusted' },
  { icon: Users, label: 'Transparent pricing' },
];

export const CLOSING_CTA = {
  headlinePrefix: 'Stop searching. ',
  headlineAccent: 'Start achieving.',
  cta: { label: 'Get started', href: '#get-started' },
  reassurance: "We're with you, every step of the way.",
  icon: Rocket,
} as const;

export const FOOTER = {
  tagline: 'Your study abroad journey, simplified.',
  domain: 'rakuxoned.com',
  columns: [
    {
      heading: 'Platform',
      links: [
        { label: 'How it works', href: '#how-it-works' },
        { label: 'Features', href: '#capabilities' },
        { label: 'For Agencies', href: '#audiences' },
      ],
    },
    {
      heading: 'Company',
      links: [
        { label: 'About', href: '#about' },
        { label: 'Contact', href: '#get-started' },
      ],
    },
    {
      heading: 'Legal',
      links: [
        { label: 'Privacy policy', href: '#privacy' },
        { label: 'Terms of service', href: '#terms' },
      ],
    },
  ],
  socials: [
    { label: 'LinkedIn', href: '#linkedin' },
    { label: 'Instagram', href: '#instagram' },
    { label: 'X', href: '#x' },
  ],
} as const;
