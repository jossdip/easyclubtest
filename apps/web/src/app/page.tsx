import { Footer } from '@/components/footer';
import { Hero } from '@/components/hero';
import { Nav } from '@/components/nav';

export default function Home(): JSX.Element {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <section aria-label="Valeur" className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <li className="border-border bg-card/60 rounded-lg border p-6 backdrop-blur-sm">
              <h3 className="text-base font-semibold">Conformité NF525</h3>
              <p className="text-foreground/70 mt-2 text-sm">
                Scellement, clôtures, archivage, audit et traçabilité avancée.
              </p>
            </li>
            <li className="border-border bg-card/60 rounded-lg border p-6 backdrop-blur-sm">
              <h3 className="text-base font-semibold">Assistant IA</h3>
              <p className="text-foreground/70 mt-2 text-sm">
                Commandes vocales, actions contextuelles, monitoring des coûts, continuité
                hors‑ligne.
              </p>
            </li>
            <li className="border-border bg-card/60 rounded-lg border p-6 backdrop-blur-sm">
              <h3 className="text-base font-semibold">Modèle 1%</h3>
              <p className="text-foreground/70 mt-2 text-sm">
                1% du paiement split à l’acquéreur. Pas d’abonnement.
              </p>
            </li>
            <li className="border-border bg-card/60 rounded-lg border p-6 backdrop-blur-sm">
              <h3 className="text-base font-semibold">Matériel pro</h3>
              <p className="text-foreground/70 mt-2 text-sm">
                Écrans tactiles, imprimantes thermiques, TPE Ingenico/Verifone, scanners,
                tiroir‑caisse.
              </p>
            </li>
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
