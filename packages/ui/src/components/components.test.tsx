import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { GraduationCap, ShieldCheck } from 'lucide-react';
import { describe, expect, it, vi } from 'vitest';

import { ThemeProvider } from '../theme/ThemeProvider';
import { Button } from './Button';
import { CapabilityChip } from './CapabilityChip';
import { FeatureCard } from './FeatureCard';
import { SectionBand } from './SectionBand';
import { StatBlock } from './StatBlock';
import { StepItem } from './StepItem';
import { TrustBadge } from './TrustBadge';
import { Wordmark } from './Wordmark';

describe('<Wordmark/>', () => {
  it('renders the brand name from tokens', () => {
    render(<Wordmark />);
    expect(screen.getByRole('link', { name: 'Rakuxon Ed' })).toBeInTheDocument();
  });

  it('splits the accent suffix so "Ed" can be styled separately', () => {
    render(<Wordmark />);
    expect(screen.getByText('Rakuxon')).toBeInTheDocument();
    expect(screen.getByText('Ed')).toBeInTheDocument();
  });

  it('follows a tenant brand-name override without any code change', () => {
    render(
      <ThemeProvider tokens={{ brand: { name: 'Acme Study', nameAccentSuffix: 'Study' } }}>
        <Wordmark />
      </ThemeProvider>,
    );
    expect(screen.getByRole('link', { name: 'Acme Study' })).toBeInTheDocument();
    expect(screen.getByText('Study')).toBeInTheDocument();
  });

  it('renders the name undivided when the accent suffix does not apply', () => {
    render(
      <ThemeProvider tokens={{ brand: { name: 'Acme', nameAccentSuffix: 'Ed' } }}>
        <Wordmark />
      </ThemeProvider>,
    );
    expect(screen.getByRole('link', { name: 'Acme' })).toHaveTextContent('Acme');
  });

  it('is a focusable link with a visible focus ring', () => {
    render(<Wordmark />);
    expect(screen.getByRole('link')).toHaveClass('focus-visible:ring');
  });
});

describe('<Button/>', () => {
  it('renders a real button by default and fires onClick', async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Get started</Button>);
    await userEvent.click(screen.getByRole('button', { name: 'Get started' }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('defaults to type=button so it never submits a surrounding form by accident', () => {
    render(<Button>Get started</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });

  it('renders a real link when given href, keeping middle-click and keyboard nav', () => {
    render(<Button href="/signup">Start your journey</Button>);
    const link = screen.getByRole('link', { name: 'Start your journey' });
    expect(link).toHaveAttribute('href', '/signup');
  });

  it.each([
    ['primary', 'bg-primary'],
    ['ghost', 'border-border'],
    ['accent', 'bg-accent-soft'],
  ] as const)('styles the %s variant from tokens', (variant, expected) => {
    render(<Button variant={variant}>Label</Button>);
    expect(screen.getByRole('button')).toHaveClass(expected);
  });

  it('carries a visible focus ring', () => {
    render(<Button>Label</Button>);
    expect(screen.getByRole('button')).toHaveClass('focus-visible:ring');
  });

  it('respects prefers-reduced-motion', () => {
    render(<Button>Label</Button>);
    expect(screen.getByRole('button')).toHaveClass('motion-reduce:transition-none');
  });

  it('can be disabled', () => {
    render(<Button disabled>Label</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});

describe('<FeatureCard/>', () => {
  it('renders title and description', () => {
    render(
      <FeatureCard icon={GraduationCap} title="Find Universities" description="1500+ options" />,
    );
    expect(screen.getByRole('heading', { name: 'Find Universities' })).toBeInTheDocument();
    expect(screen.getByText('1500+ options')).toBeInTheDocument();
  });

  it('uses the soft floating shadow and large radius from tokens', () => {
    const { container } = render(
      <FeatureCard icon={GraduationCap} title="Scholarships" description="Find funding" />,
    );
    const card = container.querySelector('article');
    expect(card).toHaveClass('shadow-md');
    expect(card).toHaveClass('rounded-lg');
  });

  it('hides its decorative icon from assistive technology', () => {
    const { container } = render(
      <FeatureCard icon={GraduationCap} title="Scholarships" description="Find funding" />,
    );
    expect(container.querySelector('[aria-hidden="true"]')).toBeInTheDocument();
  });
});

describe('<CapabilityChip/>', () => {
  it('renders as a list item with its label', () => {
    render(
      <ul>
        <CapabilityChip icon={GraduationCap} label="University Search" />
      </ul>,
    );
    expect(screen.getByRole('listitem')).toHaveTextContent('University Search');
  });
});

describe('<StepItem/>', () => {
  it('renders the step number, title and description', () => {
    render(
      <ol>
        <StepItem step={2} title="Shortlist & apply" description="Pick your universities." />
      </ol>,
    );
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Shortlist & apply' })).toBeInTheDocument();
    expect(screen.getByText('Pick your universities.')).toBeInTheDocument();
  });
});

describe('<StatBlock/>', () => {
  it('renders value and label', () => {
    render(<StatBlock value="12,000+" label="Students guided" />);
    expect(screen.getByText('12,000+')).toBeInTheDocument();
    expect(screen.getByText('Students guided')).toBeInTheDocument();
  });

  it('visibly marks a placeholder figure', () => {
    render(<StatBlock value="12,000+" label="Students guided" placeholder />);
    expect(screen.getByText(/placeholder/i)).toBeInTheDocument();
  });

  it('exposes data-placeholder so unverified numbers are greppable before launch', () => {
    const { container } = render(<StatBlock value="4.8" label="Average rating" placeholder />);
    expect(container.querySelector('[data-placeholder="true"]')).toBeInTheDocument();
  });

  it('shows no placeholder marking for a real figure', () => {
    const { container } = render(<StatBlock value="4.8" label="Average rating" />);
    expect(screen.queryByText(/placeholder/i)).not.toBeInTheDocument();
    expect(container.querySelector('[data-placeholder]')).not.toBeInTheDocument();
  });
});

describe('<TrustBadge/>', () => {
  it('renders its label as a list item', () => {
    render(
      <ul>
        <TrustBadge icon={ShieldCheck} label="Confidential & trusted" />
      </ul>,
    );
    expect(screen.getByRole('listitem')).toHaveTextContent('Confidential & trusted');
  });
});

describe('<SectionBand/>', () => {
  it('renders a section landmark named by its heading', () => {
    render(
      <SectionBand labelledBy="how-heading">
        <h2 id="how-heading">How it works</h2>
      </SectionBand>,
    );
    expect(screen.getByRole('region', { name: 'How it works' })).toBeInTheDocument();
  });

  it.each([
    ['surface', 'bg-surface'],
    ['muted', 'bg-surface-muted'],
    ['soft', 'bg-accent-soft'],
    ['gradient', 'from-accent-soft'],
  ] as const)('applies the %s tone from tokens', (tone, expected) => {
    const { container } = render(
      <SectionBand tone={tone}>
        <p>body</p>
      </SectionBand>,
    );
    expect(container.querySelector('section')).toHaveClass(expected);
  });

  it('can render as a different landmark element', () => {
    const { container } = render(
      <SectionBand as="footer">
        <p>body</p>
      </SectionBand>,
    );
    expect(container.querySelector('footer')).toBeInTheDocument();
  });

  it('constrains content to the shared max width', () => {
    const { container } = render(
      <SectionBand>
        <p>body</p>
      </SectionBand>,
    );
    expect(container.querySelector('.max-w-content')).toBeInTheDocument();
  });
});
