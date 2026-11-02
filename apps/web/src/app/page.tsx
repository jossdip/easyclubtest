import { Footer } from '@/components/footer';
import { AppsGrid } from '@/components/home/apps-grid';
import { BuiltForNight } from '@/components/home/built-for-night';
import { Connected } from '@/components/home/connected';
import { Contact } from '@/components/home/contact';
import { EasySection } from '@/components/home/easy';
import { Reservations, Stock } from '@/components/home/feature';
import { Free } from '@/components/home/free';
import { Hero } from '@/components/home/hero';
import { Marquee } from '@/components/home/marquee';
import { Monaco } from '@/components/home/monaco';
import { Tour } from '@/components/home/tour';
import { Nav } from '@/components/nav';

export const runtime = 'edge';

export default function HomePage(): React.JSX.Element {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Free />
        <EasySection />
        <Connected />
        <Reservations />
        <Stock />
        <Tour />
        <BuiltForNight />
        <AppsGrid />
        <Monaco />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
