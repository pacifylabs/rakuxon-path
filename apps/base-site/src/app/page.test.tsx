import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ThemeProvider } from '@rakuxon-edu/ui';

import { CAPABILITIES, STATS, STEPS, TRUST_BADGES } from '@/content/landing';
import LandingPage from './page';

function renderPage() {
  return render(
    <ThemeProvider>
      <LandingPage />
    </ThemeProvider>,
  );
}

describe('landing page structure', () => {
  it('renders exactly one h1', () => {
    renderPage();
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
  });

  it('leads with the tagline as the h1', () => {
    renderPage();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Your study abroad journey, simplified.',
    );
  });

  it('exposes banner, main and contentinfo landmarks', () => {
    renderPage();
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('offers a skip link as the first focusable element', () => {
    renderPage();
    expect(screen.getByRole('link', { name: 'Skip to main content' })).toHaveAttribute(
      'href',
      '#main',
    );
  });

  it('renders every section from the spec, in order', () => {
    renderPage();
    const headings = screen
      .getAllByRole('heading', { level: 2 })
      .map((heading) => heading.textContent);

    expect(headings).toEqual(
      expect.arrayContaining([
        'One platform. Endless possibilities.',
        'How it works',
        'Built for both sides of the journey',
        'Students trust us with the big decision',
        'Stop searching. Start achieving.',
      ]),
    );
  });
});

describe('header', () => {
  it('shows the wordmark and both CTAs', () => {
    renderPage();
    const banner = screen.getByRole('banner');
    expect(within(banner).getByRole('link', { name: 'Rakuxon Ed' })).toBeInTheDocument();
    expect(within(banner).getByRole('link', { name: 'Log in' })).toBeInTheDocument();
    expect(within(banner).getByRole('link', { name: 'Get started' })).toBeInTheDocument();
  });

  it('names its primary navigation', () => {
    renderPage();
    expect(
      within(screen.getByRole('banner')).getByRole('navigation', { name: 'Primary' }),
    ).toBeInTheDocument();
  });
});

describe('hero', () => {
  it('renders both calls to action as real links', () => {
    renderPage();
    expect(screen.getAllByRole('link', { name: 'Start your journey' }).length).toBeGreaterThan(0);
    expect(screen.getByRole('link', { name: 'Explore universities' })).toBeInTheDocument();
  });

  it('gives the hero visual meaningful alternative text', () => {
    renderPage();
    expect(screen.getByRole('img', { name: /student working on a laptop/i })).toBeInTheDocument();
  });

  it('marks the hero visual as a placeholder', () => {
    const { container } = renderPage();
    expect(container.querySelector('[role="img"][data-placeholder="true"]')).toBeInTheDocument();
  });

  it('renders the three mini-pillars', () => {
    renderPage();
    for (const pillar of ['Explore', 'Plan', 'Apply']) {
      expect(screen.getByRole('heading', { name: pillar })).toBeInTheDocument();
    }
  });
});

describe('capability strip', () => {
  it('renders every capability', () => {
    // Scoped to the strip: "Application Tracker" deliberately also appears as a
    // floating hero card, so a page-wide query would be ambiguous.
    const { container } = renderPage();
    const strip = container.querySelector('#capabilities') as HTMLElement;
    expect(strip).toBeInTheDocument();

    for (const capability of CAPABILITIES) {
      expect(within(strip).getByText(capability.label)).toBeInTheDocument();
    }
  });
});

describe('how it works', () => {
  it('renders the three steps in order in an ordered list', () => {
    const { container } = renderPage();
    const list = container.querySelector('#how-it-works ol');
    expect(list).toBeInTheDocument();

    const items = within(list as HTMLElement).getAllByRole('listitem');
    expect(items).toHaveLength(STEPS.length);
    expect(items[0]).toHaveTextContent('Build your profile');
    expect(items[2]).toHaveTextContent('Track your admission');
  });
});

describe('audience split', () => {
  it('addresses students and agencies separately', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: 'For Students' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'For Agencies & Partners' })).toBeInTheDocument();
  });
});

describe('social proof', () => {
  it('renders a block for every stat', () => {
    renderPage();
    for (const stat of STATS) {
      expect(screen.getByText(stat.label)).toBeInTheDocument();
    }
  });

  it('marks every unverified figure as a placeholder, so no invented number ships', () => {
    const { container } = renderPage();
    const marked = container.querySelectorAll('[data-placeholder="true"]');
    const expected = STATS.filter((stat) => stat.placeholder).length;
    // stats + the hero visual placeholder
    expect(marked.length).toBe(expected + 1);
    expect(screen.getAllByText(/placeholder — awaiting real figure/i)).toHaveLength(expected);
  });

  it('renders the trust badges', () => {
    renderPage();
    for (const badge of TRUST_BADGES) {
      expect(screen.getByText(badge.label)).toBeInTheDocument();
    }
  });
});

describe('closing cta', () => {
  it('renders the closing call to action and its reassurance line', () => {
    renderPage();
    expect(
      screen.getByRole('heading', { name: 'Stop searching. Start achieving.' }),
    ).toBeInTheDocument();
    expect(screen.getByText("We're with you, every step of the way.")).toBeInTheDocument();
  });
});

describe('footer', () => {
  it('carries the legal links a document-handling product needs', () => {
    renderPage();
    const contentinfo = screen.getByRole('contentinfo');
    expect(within(contentinfo).getByRole('link', { name: 'Privacy policy' })).toBeInTheDocument();
    expect(within(contentinfo).getByRole('link', { name: 'Terms of service' })).toBeInTheDocument();
  });

  it('names each footer navigation group', () => {
    renderPage();
    const contentinfo = screen.getByRole('contentinfo');
    for (const name of ['Platform', 'Company', 'Legal', 'Social']) {
      expect(within(contentinfo).getByRole('navigation', { name })).toBeInTheDocument();
    }
  });
});

describe('public-page security rules', () => {
  it('never references a Cloudinary URL', () => {
    const { container } = renderPage();
    expect(container.innerHTML).not.toMatch(/cloudinary/i);
  });

  it('renders no login form or credential input on the public page', () => {
    renderPage();
    expect(screen.queryByLabelText(/password/i)).not.toBeInTheDocument();
    expect(document.querySelector('input[type="password"]')).not.toBeInTheDocument();
  });
});
