import { Footer } from '@/components/footer';
import { Nav } from '@/components/nav';
import { Section } from '@/components/section';

export default function PricingPage(): JSX.Element {
  return (
    <>
      <Nav />
      <main>
        <Section
          title="Tarification transparente"
          subtitle="1% du paiement split à l’acquéreur. Aucun abonnement."
        >
          <div className="border-border bg-card rounded-lg border p-8 text-center">
            <p className="text-5xl font-semibold">1%</p>
            <p className="text-foreground/70 mt-2">
              Split à l’acquéreur. Matériel et services sur devis.
            </p>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
