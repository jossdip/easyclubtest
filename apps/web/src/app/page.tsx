import { useTranslations } from 'next-intl';

import { Footer } from '@/components/footer';
import { Hero } from '@/components/hero';
import { Nav } from '@/components/nav';

export default function Home(): JSX.Element {
  const t = useTranslations('ValueProps');
  const keys = ['compliance', 'ai', 'model', 'hardware'] as const;

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <section aria-label="Valeur" className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {keys.map((key) => (
              <li
                key={key}
                className="border-border bg-card/60 rounded-lg border p-6 backdrop-blur-sm"
              >
                <h3 className="text-base font-semibold">{t(`items.${key}.title`)}</h3>
                <p className="text-foreground/70 mt-2 text-sm">{t(`items.${key}.description`)}</p>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
