import * as React from 'react';

import { cn } from '@/lib/utils';

export function Section({
  id,
  title,
  subtitle,
  children,
  className,
}: {
  id?: string;
  title: React.ReactNode;
  subtitle?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn('mx-auto max-w-6xl px-4 py-16 md:py-24', className)}>
      <div className="mb-8">
        <h2 className="text-balance text-3xl font-semibold md:text-4xl">{title}</h2>
        {subtitle ? <p className="text-foreground/70 mt-3 max-w-2xl">{subtitle}</p> : null}
      </div>
      {children}
    </section>
  );
}
