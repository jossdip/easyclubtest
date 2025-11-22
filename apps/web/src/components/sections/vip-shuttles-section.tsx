'use client';

import * as React from 'react';

import { Section } from '@/components/section';

export function VIPShuttlesSection(): React.JSX.Element {
  return (
    <Section
      id="navettes"
      title="Navettes VIP"
      subtitle="Confort, sécurité et expérience premium pour vos clients."
    >
      <div className="flex flex-col items-center justify-center gap-8 py-12 text-center">
        <p className="text-muted-foreground max-w-2xl text-lg">
          Offrez un service de transport exclusif. Gérez vos navettes, optimisez les trajets et
          garantissez la sécurité de vos clients directement depuis l'application.
        </p>
      </div>
    </Section>
  );
}
