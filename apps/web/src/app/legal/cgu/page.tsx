import { Footer } from '@/components/footer';
import { Nav } from '@/components/nav';
import { Section } from '@/components/section';

const content =
  'Conditions générales d’utilisation (CGU). Service fourni “tel quel”, sous réserve de disponibilité. Conformité et sécurité au cœur. Contactez‑nous pour les modalités contractuelles complètes.';

export default function CGUPage(): React.JSX.Element {
  return (
    <>
      <Nav />
      <main>
        <Section title="CGU">
          <p className="text-foreground/80 max-w-3xl">{content}</p>
        </Section>
      </main>
      <Footer />
    </>
  );
}
