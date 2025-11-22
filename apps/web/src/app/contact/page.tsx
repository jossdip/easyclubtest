import { Footer } from '@/components/footer';
import { Nav } from '@/components/nav';
import { ContactForm } from '@/components/screens/contact-form';
import { Section } from '@/components/section';

export default function ContactPage(): React.JSX.Element {
  return (
    <>
      <Nav />
      <main>
        <Section title="Contact" subtitle="Parlons de vos opérations et d’un déploiement fluide.">
          <ContactForm />
        </Section>
      </main>
      <Footer />
    </>
  );
}
