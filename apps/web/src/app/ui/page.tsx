import type { Metadata } from 'next';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'UI Showcase',
  robots: { index: false, follow: false },
};

export default function UiShowcasePage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-semibold">UI Showcase</h1>
      <p className="text-foreground/70 mb-8 text-sm">Composants clés et variantes (non indexé).</p>

      <section className="mb-10">
        <h2 className="mb-4 text-xl font-medium">Buttons</h2>
        <div className="flex flex-wrap items-center gap-3">
          <Button>Primary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button size="sm">Small</Button>
          <Button size="lg">Large</Button>
          <Button shape="pill">Pill</Button>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-xl font-medium">Cards</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="border-border/60 bg-card/60 rounded-lg border p-4">
              <div className="text-foreground/80 mb-2 font-medium">Card {i}</div>
              <p className="text-foreground/70 text-sm">
                Carte basique avec fond et bordure via tokens.
              </p>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-medium">Elevation & Radius</h2>
        <div className="flex flex-wrap gap-4">
          <div className="shadow-elev-1 rounded-md bg-white/5 p-6">elev-1</div>
          <div className="shadow-elev-2 rounded-lg bg-white/5 p-6">elev-2</div>
          <div className="shadow-elev-3 rounded-xl bg-white/5 p-6">elev-3</div>
        </div>
      </section>
    </main>
  );
}
