import { Footer } from '@/components/footer';
import { Contact } from '@/components/home/contact';
import { Nav } from '@/components/nav';

export const runtime = 'edge';

export default function ContactPage(): React.JSX.Element {
  return (
    <>
      <Nav />
      <main className="pt-16">
        <Contact />
      </main>
      <Footer />
    </>
  );
}
