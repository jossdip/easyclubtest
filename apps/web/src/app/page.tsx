import { Footer } from '@/components/footer';
import { Hero } from '@/components/hero';
import { Nav } from '@/components/nav';
import { valueProps } from '@/content/site';

export default function Home(): JSX.Element {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <section aria-label="Valeur" className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {valueProps.map((p) => (
              <li
                key={p.title}
                className="border-border bg-card/60 rounded-lg border p-6 backdrop-blur-sm"
              >
                <h3 className="text-base font-semibold">{p.title}</h3>
                <p className="text-foreground/70 mt-2 text-sm">{p.description}</p>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
