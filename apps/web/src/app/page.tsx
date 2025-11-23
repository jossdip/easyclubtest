import { Footer } from '@/components/footer';
import { Hero } from '@/components/hero';
import { Nav } from '@/components/nav';
import { POSSection } from '@/components/screens/pos';
import { ReservationsSection } from '@/components/screens/reservations';
import { CTAContactSection } from '@/components/sections/cta-contact-section';
import { SecurityFeatures } from '@/components/sections/security-features';
import { SmartWasteSection } from '@/components/sections/smart-waste-section';

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
        <SmartWasteSection />
        <SecurityFeatures />
        <CTAContactSection />
      </main>
      <Footer />
    </>
  );
}
