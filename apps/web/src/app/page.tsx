import { Footer } from '@/components/footer';
import { Hero } from '@/components/hero';
import { Nav } from '@/components/nav';
import { BraceletLickalyserSection } from '@/components/sections/bracelet-lickalyser-section';
import { CTAContactSection } from '@/components/sections/cta-contact-section';
import { FundamentalsSection } from '@/components/sections/fundamentals-section';
import { KPIsRoadmapSection } from '@/components/sections/kp-is-roadmap-section';
import { SecurityIDSection } from '@/components/sections/security-id-section';
import { SmartWasteSection } from '@/components/sections/smart-waste-section';
import { VIPShuttlesSection } from '@/components/sections/vip-shuttles-section';

export default function Home(): React.JSX.Element {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <FundamentalsSection />
        <SecurityIDSection />
        <BraceletLickalyserSection />
        <VIPShuttlesSection />
        <SmartWasteSection />
        <KPIsRoadmapSection />
        <CTAContactSection />
      </main>
      <Footer />
    </>
  );
}
