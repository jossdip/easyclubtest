import { Footer } from '@/components/footer';
import { Hero } from '@/components/hero';
import { Nav } from '@/components/nav';
import { CtaContactSection } from '@/components/screens/cta-contact';
import { FundamentalsSection } from '@/components/sections/fundamentals-section';
import { KPIsRoadmapSection } from '@/components/sections/kpis-roadmap-section';
import { LazyBraceletLickalyser } from '@/components/sections/lazy-bracelet-lickalyser';
import { MarketplaceProSection } from '@/components/sections/marketplace-pro-section';
import { MerchMarketplaceSection } from '@/components/sections/merch-marketplace-section';
import { SecurityIDSection } from '@/components/sections/security-id-section';
import { SmartWasteSection } from '@/components/sections/smart-waste-section';
import { VIPShuttlesSection } from '@/components/sections/vip-shuttles-section';

export default function Home(): JSX.Element {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <FundamentalsSection />
        <SecurityIDSection />
        <LazyBraceletLickalyser />
        <MarketplaceProSection />
        <MerchMarketplaceSection />
        <VIPShuttlesSection />
        <SmartWasteSection />
        <KPIsRoadmapSection />
        <section id="contact" aria-label="Contact">
          <CtaContactSection />
        </section>
      </main>
      <Footer />
    </>
  );
}
