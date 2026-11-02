'use client';

import * as React from 'react';

/** Un ciel discret : quelques étoiles qui scintillent (positions tirées une fois, identiques serveur et client). */
export function Stars({
  count = 60,
  seed = 7,
}: {
  count?: number;
  seed?: number;
}): React.JSX.Element {
  const stars = React.useMemo(() => {
    let a = seed >>> 0;
    const rnd = (): number => {
      a = (a + 0x6d2b79f5) >>> 0;
      let t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
    return Array.from({ length: count }, () => ({
      x: rnd() * 100,
      y: rnd() * 70,
      s: rnd() < 0.85 ? 1 : 2,
      d: rnd() * 6,
      o: 0.2 + rnd() * 0.6,
    }));
  }, [count, seed]);
  return (
    <div aria-hidden className="absolute inset-0">
      {stars.map((s, i) => (
        <span
          key={i}
          className="animate-twinkle bg-moon absolute rounded-full"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.s,
            height: s.s,
            opacity: s.o,
            animationDelay: `${s.d}s`,
            animationDuration: `${3 + s.d}s`,
          }}
        />
      ))}
    </div>
  );
}
