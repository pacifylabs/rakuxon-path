import { ROUTES } from './routes';

/**
 * Structure only. The body of every section below is deliberately a
 * placeholder: privacy policies and terms of service are legally binding
 * documents that must be drafted and reviewed by a lawyer, and this product
 * handles minors' identity documents. Nothing here should be mistaken for a
 * real policy, so every section renders with visible placeholder marking.
 */

export interface LegalSection {
  heading: string;
  /** What the real section must cover, so counsel has a brief to work from. */
  brief: string;
}

export interface LegalPageContent {
  title: string;
  intro: string;
  sections: readonly LegalSection[];
  contactHref: string;
}

export const PRIVACY: LegalPageContent = {
  title: 'Privacy policy',
  intro:
    'This page is not yet a privacy policy. The structure below records what the finished document must cover, so it can be drafted properly rather than approximated.',
  sections: [
    {
      heading: 'What we collect',
      brief:
        'Identity and contact details, academic records, uploaded documents including passports and transcripts, and usage data. Must distinguish data provided by the student from data provided by an agency on their behalf.',
    },
    {
      heading: 'Why we collect it',
      brief:
        'Lawful basis for each category, separating contractual necessity from consent. Must address the processing of special-category and minors’ data explicitly.',
    },
    {
      heading: 'Who we share it with',
      brief:
        'Partner agencies, institutions receiving an application, and named sub-processors, including the storage provider. Must state what leaves the platform and when.',
    },
    {
      heading: 'International transfers',
      brief:
        'Where data is stored and processed, and the transfer mechanism relied on for each destination.',
    },
    {
      heading: 'How long we keep it',
      brief:
        'Retention period per data category, and what happens to uploaded documents after an application concludes.',
    },
    {
      heading: 'Your rights',
      brief:
        'Access, correction, erasure, portability and objection, with the route to exercise each and the response window.',
    },
    {
      heading: 'Security',
      brief:
        'Access controls, encryption in transit and at rest, tenant isolation, and the breach-notification commitment.',
    },
  ],
  contactHref: ROUTES.contact,
};

export const TERMS: LegalPageContent = {
  title: 'Terms of service',
  intro:
    'This page is not yet a set of terms. The structure below records what the finished document must cover, so it can be drafted properly rather than approximated.',
  sections: [
    {
      heading: 'Who may use the service',
      brief:
        'Eligibility, age thresholds, and the position where a student is a minor and an agency acts for them.',
    },
    {
      heading: 'Accounts and access',
      brief:
        'Account creation, tokenised student links, permitted use, and grounds for suspension.',
    },
    {
      heading: 'What we do and do not promise',
      brief:
        'Explicitly: we do not guarantee admission, visa outcomes, or scholarship awards. Automated document checks are decision support, not a verdict.',
    },
    {
      heading: 'Your content',
      brief:
        'Ownership of uploaded documents, the licence granted to process them, and accuracy warranties.',
    },
    {
      heading: 'Fees and commissions',
      brief:
        'What is free, what is charged, and how partner commissions are calculated and settled.',
    },
    {
      heading: 'Liability',
      brief:
        'Limitations and exclusions, drafted against the jurisdictions the service actually operates in.',
    },
    {
      heading: 'Governing law and disputes',
      brief: 'Applicable law, venue, and the complaints route before formal escalation.',
    },
  ],
  contactHref: ROUTES.contact,
};
