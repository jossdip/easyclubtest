import * as React from 'react';

export function EmptyState({
  title,
  description,
  action,
  icon,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <section className="border-border/60 bg-card/60 mx-auto grid max-w-lg gap-3 rounded-lg border p-6 text-center">
      {icon ? <div className="mx-auto text-3xl" aria-hidden>{icon}</div> : null}
      <h3 className="text-lg font-medium">{title}</h3>
      {description ? (
        <p className="text-foreground/70 text-sm leading-relaxed">{description}</p>
      ) : null}
      {action ? <div className="mt-2">{action}</div> : null}
    </section>
  );
}
