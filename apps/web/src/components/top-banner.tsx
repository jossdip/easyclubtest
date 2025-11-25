'use client';

import * as React from 'react';

const MARQUEE_ITEMS = [
  'La Nightlife Réinventée',
  "EasyClub : L'Expertise au Service de la Nuit",
  "Opportunité d'Investissement : Levée de Fonds en Cours",
];

export function TopBanner(): React.JSX.Element {
  return (
    <div className="fixed top-0 z-[9999] w-full overflow-hidden border-y border-white/10 bg-black/50 py-3 backdrop-blur-sm">
      <div className="animate-marquee2 flex whitespace-nowrap">
        {Array.from({ length: 4 }).map((_, groupIndex) => (
          <React.Fragment key={groupIndex}>
            {MARQUEE_ITEMS.map((text, i) => (
              <span
                key={`${groupIndex}-${i}`}
                className="mx-4 text-sm font-bold tracking-widest text-white/80"
              >
                {text} •
              </span>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
