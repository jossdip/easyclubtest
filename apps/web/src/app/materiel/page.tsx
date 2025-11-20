import { Footer } from '@/components/footer';
import { Nav } from '@/components/nav';
import { Section } from '@/components/section';

const items = [
  'Écrans tactiles (15"‑21")',
  'Imprimantes thermiques 80mm',
  'TPE Ingenico / Verifone',
  'Scanners code‑barres',
  'Tiroir‑caisse métal',
  'Bornes et iPad en appoint',
];

export default function HardwarePage(): JSX.Element {
  return (
    <>
      <Nav />
      <main>
        <Section
          title="Matériel professionnel"
          subtitle="Configurations validées pour fiabilité et performance."
        >
          <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {items.map((t) => (
              <li key={t} className="border-border bg-card/70 rounded-md border p-4">
                {t}
              </li>
            ))}
          </ul>
        </Section>
      </main>
      <Footer />
    </>
  );
}
