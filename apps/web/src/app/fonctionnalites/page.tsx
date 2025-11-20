import { Footer } from '@/components/footer';
import { Nav } from '@/components/nav';
import { Section } from '@/components/section';

const blocks = [
  {
    title: 'Caisse / NF525',
    desc: 'Scellement, clôtures, archivage, piste d’audit, exports comptables.',
  },
  {
    title: 'Tables, Commandes, Paiements',
    desc: 'Plans de salle, prise rapide, paiements split, TPE intégrés.',
  },
  { title: 'Inventaire', desc: 'Stocks temps réel, pertes, alertes, fiches techniques.' },
  { title: 'CRM & Fidélité', desc: 'Profils, préférences, récompenses, campagnes ciblées.' },
  { title: 'Staff & Planning', desc: 'Droits fins, plannings, pointage, productivité.' },
  { title: 'Événements & Marketing', desc: 'Listes, pré‑ventes, invitations, tracking ROI.' },
  { title: 'Analytics', desc: 'Ventes, marge, efficacité, alertes intelligentes.' },
];

export default function FeaturesPage(): JSX.Element {
  return (
    <>
      <Nav />
      <main>
        <Section
          title="Fonctionnalités clés"
          subtitle="Tout ce qu’il faut, sans gras. Rapide, clair, actionnable."
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blocks.map((b) => (
              <div key={b.title} className="border-border bg-card rounded-lg border p-6">
                <h3 className="text-lg font-semibold">{b.title}</h3>
                <p className="text-foreground/70 mt-2">{b.desc}</p>
              </div>
            ))}
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
