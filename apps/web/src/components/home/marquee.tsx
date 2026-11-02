'use client';

import { useTranslations } from 'next-intl';
import * as React from 'react';

/** Le bandeau des fonctions de l'app, qui défile sans fin. */
export function Marquee(): React.JSX.Element {
  const t = useTranslations();
  const items = t.raw('marquee') as string[];
  const row = (hidden: boolean): React.JSX.Element => (
    <ul aria-hidden={hidden} className="flex shrink-0 items-center gap-10 pr-10">
      {items.map((item) => (
        <li key={item} className="flex items-center gap-10 whitespace-nowrap">
          <span className="display text-moon/80 text-[clamp(22px,2.6vw,34px)]">{item}</span>
          <span
            aria-hidden
            className="size-2 rounded-full bg-[radial-gradient(circle_at_30%_30%,#EDE9FE,#8B5CF6)] shadow-[0_0_14px_2px_rgb(139_92_246/0.6)]"
          />
        </li>
      ))}
    </ul>
  );
  return (
    <section aria-label="EasyClub OS" className="relative border-y border-white/[0.06] py-7">
      <div className="flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        <div className="animate-marquee flex motion-reduce:animate-none">
          {row(false)}
          {row(true)}
        </div>
      </div>
    </section>
  );
}
