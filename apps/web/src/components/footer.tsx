import Link from 'next/link';

import { footer, navItems } from '@/content/site';

export function Footer() {
  return (
    <footer
      className="border-border border-t bg-black/40"
      role="contentinfo"
      aria-label="Pied de page"
    >
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <p className="text-foreground/60 text-sm">{footer.rights}</p>
          <nav className="flex flex-wrap items-center gap-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-foreground/80 hover:text-foreground text-sm"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
