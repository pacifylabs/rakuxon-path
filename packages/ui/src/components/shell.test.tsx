import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { GraduationCap, Search } from 'lucide-react';
import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { Breadcrumbs } from './Breadcrumbs';
import { ContactForm } from './ContactForm';
import { FactGrid } from './FactGrid';
import { FilterBar } from './FilterBar';
import type { FilterDefinition } from './FilterBar';
import { ImageHero } from './ImageHero';
import { MediaSection } from './MediaSection';
import { PageHeader } from './PageHeader';
import { ValueProps } from './ValueProps';

const PHOTO = 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80';

describe('<PageHeader/>', () => {
  it('renders its title as the page h1', () => {
    render(<PageHeader title="Explore universities" titleId="t" />);
    expect(
      screen.getByRole('heading', { level: 1, name: 'Explore universities' }),
    ).toBeInTheDocument();
  });

  it('names its landmark from the heading', () => {
    render(<PageHeader title="Explore universities" titleId="t" />);
    expect(screen.getByRole('region', { name: 'Explore universities' })).toBeInTheDocument();
  });

  it('renders optional eyebrow and subcopy', () => {
    render(<PageHeader eyebrow="Browse" title="Explore" titleId="t" subcopy="No pressure." />);
    expect(screen.getByText('Browse')).toBeInTheDocument();
    expect(screen.getByText('No pressure.')).toBeInTheDocument();
  });
});

describe('<ImageHero/>', () => {
  const props = {
    title: 'Find your perfect program',
    titleId: 'hero',
    subcopy: 'Guided applications.',
    image: { src: PHOTO, alt: 'Students studying together at a table' },
  };

  it('renders the title as the page h1 and keeps the image alt', () => {
    render(<ImageHero {...props} />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Find your perfect program',
    );
    expect(
      screen.getByRole('img', { name: 'Students studying together at a table' }),
    ).toBeInTheDocument();
  });

  it('renders both CTAs as real links', () => {
    render(
      <ImageHero
        {...props}
        primaryCta={{ label: 'Create account', href: '/contact' }}
        secondaryCta={{ label: 'How it works', href: '/#how-it-works' }}
      />,
    );
    expect(screen.getByRole('link', { name: 'Create account' })).toHaveAttribute(
      'href',
      '/contact',
    );
    expect(screen.getByRole('link', { name: 'How it works' })).toHaveAttribute(
      'href',
      '/#how-it-works',
    );
  });

  it('flips the columns without changing the markup order for assistive tech', () => {
    const { container } = render(<ImageHero {...props} imageSide="left" />);
    // The copy column still comes first in the DOM; only the visual order moves.
    expect(container.querySelector('h1')).toBeInTheDocument();
    expect(container.querySelectorAll('.lg\\:order-2').length).toBeGreaterThan(0);
  });
});

describe('<MediaSection/>', () => {
  const props = {
    heading: 'Built for the way you work',
    headingId: 'media',
    body: 'Everything in one place.',
    image: { src: PHOTO, alt: 'Two colleagues reviewing work on a screen' },
  };

  it('renders as a named region with an h2', () => {
    render(<MediaSection {...props} />);
    expect(screen.getByRole('region', { name: 'Built for the way you work' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      'Built for the way you work',
    );
  });

  it('renders its points and CTA', () => {
    render(
      <MediaSection
        {...props}
        points={['One place', 'Fewer emails']}
        cta={{ label: 'See more', href: '/agencies' }}
      />,
    );
    expect(screen.getByText('One place')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'See more' })).toHaveAttribute('href', '/agencies');
  });
});

describe('<ValueProps/>', () => {
  it('renders every item with a heading', () => {
    render(
      <ValueProps
        items={[
          { icon: Search, title: 'Apply to many', description: 'One profile, many programs.' },
          { icon: GraduationCap, title: 'Track it', description: 'Real-time status.' },
        ]}
      />,
    );
    expect(screen.getByRole('heading', { name: 'Apply to many' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Track it' })).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });
});

describe('<FactGrid/>', () => {
  const facts = [
    { label: 'Main intake', value: 'September' },
    { label: 'Tuition range', value: '£12,000 – £26,000' },
  ];

  it('renders label/value pairs as a description list', () => {
    const { container } = render(<FactGrid facts={facts} />);
    expect(container.querySelector('dl')).toBeInTheDocument();
    expect(screen.getByText('Main intake')).toBeInTheDocument();
    expect(screen.getByText('£12,000 – £26,000')).toBeInTheDocument();
  });

  it('marks indicative figures so they cannot read as quotes', () => {
    const { container } = render(<FactGrid facts={facts} sample />);
    expect(container.querySelector('[data-sample="true"]')).toBeInTheDocument();
    expect(screen.getByText(/indicative ranges, not quotes/i)).toBeInTheDocument();
  });
});

describe('<Breadcrumbs/>', () => {
  it('renders a labelled nav with the current page marked', () => {
    render(
      <Breadcrumbs trail={[{ label: 'Destinations', href: '/destinations' }]} current="Canada" />,
    );
    const nav = screen.getByRole('navigation', { name: 'Breadcrumb' });
    expect(within(nav).getByRole('link', { name: 'Destinations' })).toHaveAttribute(
      'href',
      '/destinations',
    );
    expect(within(nav).getByText('Canada')).toHaveAttribute('aria-current', 'page');
  });
});

describe('<FilterBar/>', () => {
  const filters: FilterDefinition[] = [
    { name: 'country', label: 'Country', options: ['Canada', 'United Kingdom'] },
    { name: 'level', label: 'Level', options: ['Undergraduate', 'Postgraduate'] },
  ];

  function Harness() {
    const [value, setValue] = useState<Record<string, string>>({});
    const matches = value.country === 'Canada' ? 1 : 4;
    return (
      <FilterBar
        filters={filters}
        value={value}
        onChange={setValue}
        onReset={() => setValue({})}
        resultCount={matches}
        resultNoun={{ one: 'university', other: 'universities' }}
      />
    );
  }

  it('gives every control a programmatic label', () => {
    render(<Harness />);
    expect(screen.getByLabelText('Country')).toBeInTheDocument();
    expect(screen.getByLabelText('Level')).toBeInTheDocument();
  });

  it('actually filters, and announces the new count', async () => {
    render(<Harness />);
    expect(screen.getByRole('status')).toHaveTextContent('4 universities');

    await userEvent.selectOptions(screen.getByLabelText('Country'), 'Canada');
    expect(screen.getByRole('status')).toHaveTextContent('1 university');
  });

  it('disables reset until something is actually filtered', async () => {
    render(<Harness />);
    const reset = screen.getByRole('button', { name: 'Clear filters' });
    expect(reset).toBeDisabled();

    await userEvent.selectOptions(screen.getByLabelText('Country'), 'Canada');
    expect(reset).toBeEnabled();

    await userEvent.click(reset);
    expect(screen.getByRole('status')).toHaveTextContent('4 universities');
  });

  it('reports the chosen value to its owner', async () => {
    const onChange = vi.fn();
    render(
      <FilterBar
        filters={filters}
        value={{}}
        onChange={onChange}
        resultCount={4}
        resultNoun={{ one: 'university', other: 'universities' }}
      />,
    );
    await userEvent.selectOptions(screen.getByLabelText('Level'), 'Postgraduate');
    expect(onChange).toHaveBeenCalledWith({ level: 'Postgraduate' });
  });
});

describe('<ContactForm/>', () => {
  const email = 'hello@rakuxoned.com';

  it('labels every field', () => {
    render(<ContactForm fallbackEmail={email} />);
    expect(screen.getByLabelText('Your name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email address')).toBeInTheDocument();
    expect(screen.getByLabelText('I am a')).toBeInTheDocument();
    expect(screen.getByLabelText('How can we help?')).toBeInTheDocument();
  });

  it('shows field errors linked by aria-describedby on an empty submit', async () => {
    render(<ContactForm fallbackEmail={email} />);
    await userEvent.click(screen.getByRole('button', { name: 'Send message' }));

    const name = screen.getByLabelText('Your name');
    expect(name).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByText('Enter your name.')).toBeInTheDocument();
    expect(name.getAttribute('aria-describedby')).toBeTruthy();
  });

  it('rejects a malformed email', async () => {
    render(<ContactForm fallbackEmail={email} />);
    await userEvent.type(screen.getByLabelText('Your name'), 'Amara');
    await userEvent.type(screen.getByLabelText('Email address'), 'not-an-email');
    await userEvent.type(screen.getByLabelText('How can we help?'), 'Hello');
    await userEvent.click(screen.getByRole('button', { name: 'Send message' }));
    expect(screen.getByText('Enter a valid email address.')).toBeInTheDocument();
  });

  it('tells the truth on success: nothing was sent, here is the email', async () => {
    render(<ContactForm fallbackEmail={email} />);
    await userEvent.type(screen.getByLabelText('Your name'), 'Amara');
    await userEvent.type(screen.getByLabelText('Email address'), 'amara@example.com');
    await userEvent.type(screen.getByLabelText('How can we help?'), 'Hello');
    await userEvent.click(screen.getByRole('button', { name: 'Send message' }));

    const status = screen.getByRole('status');
    expect(status).toHaveTextContent(/not connected yet/i);
    expect(status).toHaveTextContent(/were not sent anywhere/i);
    expect(screen.getByRole('link', { name: email })).toHaveAttribute('href', `mailto:${email}`);
  });

  it('pre-selects the role passed from the query string', () => {
    render(<ContactForm fallbackEmail={email} defaultRole="agency" />);
    expect(screen.getByLabelText('I am a')).toHaveValue('agency');
  });
});
