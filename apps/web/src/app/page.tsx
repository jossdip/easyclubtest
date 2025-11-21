import { Footer } from '@/components/footer';
import { Hero } from '@/components/hero';
import { Nav } from '@/components/nav';
import { ConformiteSection } from '@/components/screens/conformite';
import { CtaContactSection } from '@/components/screens/cta-contact';
import { DurabiliteSection } from '@/components/screens/durabilite';
import { FutureBraceletSection } from '@/components/screens/future/bracelet';
import { ModeleUnPourcentSection } from '@/components/screens/modele-1pct';
import { POSSection } from '@/components/screens/pos';
import { ReservationsSection } from '@/components/screens/reservations';
import { SecuriteSection } from '@/components/screens/securite';
import { TransportSection } from '@/components/screens/transport';

export default function Home(): JSX.Element {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <POSSection />
        <ReservationsSection />
        <FutureBraceletSection />
        <SecuriteSection />
        <DurabiliteSection />
        <TransportSection />
        <ModeleUnPourcentSection />
        <ConformiteSection />
        <CtaContactSection />
      </main>
      <Footer />
    </>
  );
}
