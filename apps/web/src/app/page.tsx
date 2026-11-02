import { Footer } from '@/components/footer';
import { AppsGrid } from '@/components/home/apps-grid';
import { BuiltForNight } from '@/components/home/built-for-night';
import { Contact } from '@/components/home/contact';
import { EasySection } from '@/components/home/easy';
import { Hero } from '@/components/home/hero';
import { Marquee } from '@/components/home/marquee';
import { Monaco } from '@/components/home/monaco';
import { NightDay } from '@/components/home/night-day';
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
        <EasySection />
        <Tour />
        <NightDay />
        <BuiltForNight />
        <AppsGrid />
        <Monaco />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
