import { Footer } from '@/components/footer';
import { Nav } from '@/components/nav';
import { Section } from '@/components/section';

export default function SolutionPage(): JSX.Element {
  return (
    <>
      <Nav />
      <main>
        <Section
          title="La solution tout‑en‑un"
          subtitle="Caisse, IA, paiements et matériel pro — conçus pour des opérations impeccables en salle comme au bar."
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="border-border bg-card rounded-lg border p-6">
              <h3 className="text-lg font-semibold">Problèmes → Solutions</h3>
              <ul className="text-foreground/80 mt-3 list-inside list-disc space-y-2">
                <li>Flux lents → Interface rapide et gestes optimisés</li>
                <li>Erreurs de saisie → Assistant IA et règles métier</li>
                <li>Conformité → Scellement, clôtures, archivage NF525</li>
                <li>Pannes réseau → Mode hors‑ligne robuste</li>
              </ul>
            </div>
            <div className="border-border bg-card rounded-lg border p-6">
              <h3 className="text-lg font-semibold">Monaco‑quality, by design</h3>
              <p className="text-foreground/80 mt-3">
                Une exécution premium : performances, précision, et UX raffinée. Pensé pour un
                service sans friction, même en forte affluence.
              </p>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
