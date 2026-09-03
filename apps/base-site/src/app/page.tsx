import { AudienceSplit } from '@/sections/AudienceSplit';
import { CapabilityStrip } from '@/sections/CapabilityStrip';
import { ClosingCta } from '@/sections/ClosingCta';
import { Footer } from '@/sections/Footer';
import { Header } from '@/sections/Header';
import { Hero } from '@/sections/Hero';
import { HowItWorks } from '@/sections/HowItWorks';
import { SocialProof } from '@/sections/SocialProof';

/** Statically generated: no data fetching, no product auth, no Cloudinary. */
export const dynamic = 'force-static';

export default function LandingPage() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to main content
      </a>

      <div id="top" />
      <Header />

      <main id="main">
        <Hero />
        <CapabilityStrip />
        <HowItWorks />
        <AudienceSplit />
        <SocialProof />
        <ClosingCta />
      </main>

      <Footer />
    </>
  );
}
