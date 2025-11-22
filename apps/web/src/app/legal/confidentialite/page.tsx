import { Footer } from '@/components/footer';
import { Nav } from '@/components/nav';
import { Section } from '@/components/section';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

const content =
  'Politique de confidentialité. Données minimisées, chiffrées en transit et au repos. Aucune revente. Droit d’accès et de suppression sur demande. Contact : privacy@easyclub.app';

export default function ConfidentialitePage(): React.JSX.Element {
  return (
    <>
      <Nav />
      <main>
        <Section title="Confidentialité">
          <p className="text-foreground/80 max-w-3xl">{content}</p>
        </Section>
      </main>
      <Footer />
    </>
  );
}
