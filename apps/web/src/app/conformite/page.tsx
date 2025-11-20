import { Footer } from '@/components/footer';
import { Nav } from '@/components/nav';
import { Section } from '@/components/section';

export default function CompliancePage(): JSX.Element {
  return (
    <>
      <Nav />
      <main>
        <Section
          title="Conformité NF525"
          subtitle="Scellement, clôtures, archivage, piste d’audit. Sécurité & RGPD au cœur."
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="border-border bg-card rounded-lg border p-6">
              <h3 className="text-lg font-semibold">Scellement & clôtures</h3>
              <p className="text-foreground/70 mt-2">
                Mécanismes de scellement fiables, clôtures journalières, numérotation séquentielle.
              </p>
            </div>
            <div className="border-border bg-card rounded-lg border p-6">
              <h3 className="text-lg font-semibold">Archivage & audit</h3>
              <p className="text-foreground/70 mt-2">
                Export sécurisé, piste d’audit complète, conservations légales.
              </p>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
