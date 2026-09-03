# Rakuxon Ed — Landing Page & Design System Foundation
**Repo:** `rakuxon-edu-FE` · Supersedes the color placeholders in `docs/04-design-system.md` and becomes the visual source of truth. **Date:** August 2026

> This document does two jobs at once:
> 1. **Landing page spec** — the concrete sections, layout, copy direction, and components for the first thing we build.
> 2. **Design system source** — the tokens, foundations, and principles the *entire product* infers its visual rules from. Build the landing page from these tokens and the product inherits them for free.

---

## 0. Brand

- **Name:** **Rakuxon Ed** — wordmark: **Rakuxon** (primary indigo) + **Ed** (accent). Keeps the `rakuxon-edu` lineage; "Ed" reads product-like and leaves room to grow beyond pure education.
- **Tagline:** *Your study abroad journey, simplified.*
- **Voice:** calm, credible, encouraging. We reassure, we don't hype. Short sentences. Plain language a 17-year-old and their parent both understand.
- **The name is a token** (`--brand-name`, logo asset) — swap it in one place if you change your mind; nothing hard-codes it.

---

## 1. Direction & rationale

**Chosen direction: calm, trust-forward, indigo/soft** (the Image 1 family), deliberately **not** the red high-energy route.

Why, tied to purpose: this platform handles minors' academic documents, admissions outcomes, and money. It is a **trust and stewardship** product. Calm indigo reads as credible, institutional, and safe — the same reason banks, universities, and health platforms lean blue/indigo. Bold red signals urgency and promotion, which undercuts the reassurance a student uploading a passport needs. Calm also matches the product's locked design language, so landing and product feel like one company.

**Borrowed structural ideas (from the strong reference):** floating feature/product cards around a focused hero, a horizontal "one platform, many capabilities" strip, social-proof stat block, and a warm closing CTA band. These quickly communicate *multi-feature platform* without clutter.

---

## 2. Design principles (govern landing AND product)

1. **Token-driven & themeable.** Every color/space/font/radius is a token. White-label tenants reskin brand tokens; the landing page uses the base Rakuxon theme.
2. **Trust over flash.** Generous whitespace, soft shadows, rounded forms, no aggressive gradients or loud color. Calm = credible.
3. **One component library.** Landing page components live in `packages/ui` where reusable, so the product inherits them.
4. **Accessible by default.** AA contrast, visible focus, semantic structure, keyboard paths.
5. **Content-first clarity.** Every section answers one question the visitor has; no decoration that doesn't carry meaning.

---

## 3. Foundations (the base theme tokens)

These are the **base tokens** in `packages/ui/src/theme/tokens.base.ts`. The landing page consumes them directly; the product consumes them + tenant overrides.

### 3.1 Color

```
/* Brand */
--color-primary:        #5B4BE1   /* indigo — primary actions, wordmark "Rakuxon" */
--color-primary-hover:  #4A3BC7
--color-on-primary:     #FFFFFF
--color-accent:         #8B7CF6   /* lighter violet — "Ed", highlights, secondary accents */
--color-accent-soft:    #EEEBFB   /* lavender tint — card/section backgrounds */

/* Neutrals */
--color-bg:             #FFFFFF
--color-surface:        #FFFFFF
--color-surface-muted:  #F7F6FC   /* very soft lavender-grey section band */
--color-text:           #1A1830   /* near-black with a violet undertone */
--color-text-muted:     #5B5870
--color-text-inverse:   #FFFFFF
--color-border:         #E7E5F2

/* State (NOT tenant-overridable — safety consistency) */
--color-success:        #2FA36B
--color-warning:        #E6A23C
--color-danger:         #E5484D
--color-info:           #4A7DE1
--color-focus-ring:     #8B7CF6
```

Palette character: indigo primary, violet accent, lavender tints on white. Soft, professional, unmistakably calm.

### 3.2 Typography

```
--font-sans:    "Inter", system-ui, sans-serif       /* body + UI */
--font-heading: "Inter", system-ui, sans-serif       /* same family, heavier weights for headings */
```

- Inter (or a close system-safe equivalent) — clean, neutral, excellent at small sizes for document-heavy screens.
- Headings: bold/semibold, tight leading, large hero size. Body: regular, comfortable leading.

```
--text-xs:  12px   --text-sm: 14px   --text-base: 16px
--text-lg:  18px   --text-xl: 22px   --text-2xl: 28px
--text-3xl: 36px   --text-4xl: 48px  --text-hero: 60px (responsive down)
--weight-regular:400 --weight-medium:500 --weight-semibold:600 --weight-bold:700
```

### 3.3 Spacing, radius, shadow, motion

```
--space scale: 4px base → 1:4  2:8  3:12  4:16  5:20  6:24  8:32  10:40  12:48  16:64  20:80
--radius-sm:8px  --radius-md:14px  --radius-lg:20px  --radius-xl:28px  --radius-full:9999px
--shadow-sm: 0 1px 2px rgba(26,24,48,.06)
--shadow-md: 0 6px 20px rgba(26,24,48,.08)     /* the soft "floating card" shadow */
--shadow-lg: 0 16px 40px rgba(26,24,48,.10)
--ease-standard: cubic-bezier(.4,0,.2,1)
--duration-fast:150ms --duration-base:250ms
```

Rounded and soft throughout (radius-md/lg on cards and buttons); shadows are diffuse and light, never harsh — this is what creates the calm "floating" feel.

---

## 4. Landing page structure (base-site)

A single scrolling page, `apps/base-site`, SSG/ISR for SEO + speed. Sections top to bottom:

### 4.1 Header (sticky, translucent on scroll)
- Left: **Rakuxon Ed** wordmark + logo mark.
- Center/right: nav — *How it works · Features · For Agencies · About*.
- Right: **Log in** (ghost) + **Get started** (primary).
- Small pill top-right optional: *"Built for students, guided by experts."*

### 4.2 Hero
- **Left column:** H1 — *"Your study abroad journey, **simplified**."* ("simplified" in accent). Subcopy — *Everything you need to research, plan, apply, and track — in one place.* Two CTAs: **Start your journey** (primary) + **Explore universities** (ghost). A trust line beneath: *Trusted by students worldwide · Transparent · Confidential.*
- **Right column:** a focused visual (student + laptop or a clean product mock) with **3–4 floating feature cards** overlapping it: *Find Universities (1500+)*, *Scholarships*, *Budget Predictor*, *Application Tracker*. Cards use `--shadow-md`, `--radius-lg`, white surface, small accent icon.
- **Three inline mini-pillars** under the hero: **Explore · Plan · Apply**, each an icon + one line.

### 4.3 Capability strip — "One platform. Endless possibilities."
A single horizontal band of 6–7 icon+label capabilities on `--color-surface-muted`:
*University Search · Compare Programs · Rankings & Reviews · SOP Analyzer · Scholarship Finder · Application Tracker · Expert Mentorship.*
Communicates breadth in one glance (borrowed from the strong reference).

### 4.4 How it works (3 steps)
Numbered stepper: **1. Build your profile → 2. Shortlist & apply → 3. Track your admission.** Each with a short line + soft illustration/icon. This mirrors the actual product flow so expectations are set correctly.

### 4.5 For students / For agencies (two-audience split)
Two cards side by side: **For Students** (guided, self-serve, track everything) and **For Agencies/Partners** (manage students, review documents, onboard via one link). Establishes the multi-tenant nature without jargon.

### 4.6 Social proof
Stat block on a soft surface: *e.g. Students guided · Average rating · Universities · Countries.* Plus a row of trust badges: **Personalized guidance · University-specific advice · Confidential & trusted · Transparent pricing.** (Use real numbers only when you have them — placeholders clearly marked in code.)

### 4.7 Closing CTA band
Warm gradient-tint band (subtle lavender→white, not loud): *"Stop searching. **Start achieving.**"* + **Get started** primary CTA + reassurance line *"We're with you, every step of the way."*

### 4.8 Footer
Wordmark, short nav, legal (privacy/terms — important for a document-handling product), contact, socials. Domain line: `rakuxoned.com` (placeholder).

---

## 5. Components introduced by the landing page (→ `packages/ui`)

Build these token-styled and reusable so the product inherits them:

- **Button** (primary / ghost / accent) — rounded (`--radius-md`), `--shadow-sm` on primary.
- **FeatureCard** — floating card: icon chip, title, one line; `--shadow-md`, `--radius-lg`.
- **CapabilityChip** — icon + label, used in the strip.
- **StepItem** — number badge + title + line.
- **StatBlock** — big number + label, grouped.
- **TrustBadge** — icon + short label.
- **SectionBand** — full-width section wrapper with a surface/tint variant.
- **Wordmark** — the brand lockup (reads `--brand-name`, swappable).

Landing-only marketing flourishes that won't recur in-product can live in `apps/base-site/components`, but anything reusable goes to `packages/ui`.

---

## 6. Iconography & imagery

- **Icons:** one consistent line-icon set (e.g. Lucide) in accent chips (soft lavender circle + indigo icon), matching the reference's rounded icon badges.
- **Imagery:** warm, real, calm — a focused student, soft interior light. Avoid stocky/loud. Product-mock snippets are fine and reinforce "real platform."
- **Illustration:** minimal, soft, single-accent line illustrations for the "how it works" step icons if used.

---

## 7. Accessibility (landing + product)

- AA contrast on all text (indigo-on-white and white-on-indigo both pass at the sizes used).
- Visible focus ring (`--color-focus-ring`) on every interactive element.
- Semantic landmarks (`header/nav/main/section/footer`), one H1, logical heading order.
- CTAs are real buttons/links with discernible names; hero visual has meaningful alt text.
- Respect `prefers-reduced-motion` for any float/scroll animation.

---

## 8. Responsive

- **Mobile-first.** Hero stacks (copy → visual); floating cards collapse into a simple stacked list or a couple of key cards. Capability strip becomes a 2-column grid or horizontal scroll. Stat block wraps.
- Header collapses to a menu; CTAs remain reachable.

---

## 9. How the product infers its rules from this

- **Tokens here = base theme** for the whole app; tenants override only brand tokens (`--color-primary`, `--color-accent`, `--font-heading`, logo). State/neutral tokens are fixed.
- **Principles here** (trust over flash, token-driven, content-first, accessible) are the product's principles.
- **Components introduced here** seed `packages/ui`; product screens compose the same primitives, so the visual language is continuous from marketing to app.
- This file supersedes the color/typography placeholders in `04-design-system.md`; that doc's architecture (token layers, ThemeProvider, white-label flow, component list, patterns) still stands — plug these concrete values into it.

---

## 10. Build note (when we code it)

- `apps/base-site`, Next.js, SSG/ISR.
- Tokens as CSS variables from `packages/ui/theme`; Tailwind (if used) maps to the variables, so no raw hex in components.
- Ship with loading-free static hero; lazy-load below-the-fold imagery.
- TDD still applies: component tests for Button/FeatureCard/etc. and a smoke test that the page renders all sections with correct headings/landmarks.
- No Cloudinary secrets, no product auth on the public page.