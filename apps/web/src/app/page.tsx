import { Footer } from '@/components/footer';
import { Hero } from '@/components/hero';
import { Nav } from '@/components/nav';
import { ConformiteSection } from '@/components/screens/conformite';
import { POSSection } from '@/components/screens/pos';
import { ReservationsSection } from '@/components/screens/reservations';
import { SecuriteSection } from '@/components/screens/securite';
import { BraceletLickalyserSection } from '@/components/sections/bracelet-lickalyser-section';
import { BusinessModelSection } from '@/components/sections/business-model-section';
import { CTAContactSection } from '@/components/sections/cta-contact-section';
import { SecurityIDSection } from '@/components/sections/security-id-section';
import { VIPShuttlesSection } from '@/components/sections/vip-shuttles-section';

export const dynamic = 'force-dynamic';
export const runtime = 'edge';

export default function Home(): React.JSX.Element {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <POSSection />
        <ReservationsSection />
        <SecurityIDSection />
        <BraceletLickalyserSection />
        <VIPShuttlesSection />
        <ConformiteSection />
        <SecuriteSection />
        <BusinessModelSection />
        <CTAContactSection />
      </main>
      <Footer />
    </>
  );
}
