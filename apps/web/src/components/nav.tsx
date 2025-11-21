'use client';

import Link from 'next/link';
import * as React from 'react';

import { buttonVariants } from '@/components/ui/button';
import { navItems } from '@/content/site';

export function Nav() {
  const [open, setOpen] = React.useState(false);

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith('#')) {
      return;
    }
    e.preventDefault();
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: 'start' });
      history.replaceState(null, '', href);
      setOpen(false);
    }
  };

  return (
    <nav
      className="fixed inset-x-0 top-0 z-50 bg-black/20 backdrop-blur supports-[backdrop-filter]:bg-black/30"
      role="navigation"
      aria-label="Navigation principale"
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="font-semibold tracking-tight">
          EasyClub
        </Link>
        <div className="hidden gap-6 md:flex">
          {navItems
            .filter((i) => i.href.startsWith('#'))
            .map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={(e) => handleAnchorClick(e, item.href)}
                className="text-foreground/80 hover:text-foreground text-sm"
              >
                {item.label}
              </Link>
            ))}
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className={buttonVariants({ variant: 'outline', size: 'sm' })}
            role="button"
          >
            Contact
          </Link>
          <Link
            href="/contact"
            className={buttonVariants({ variant: 'default', size: 'sm' })}
            role="button"
          >
            Demandez une démo
          </Link>
          <button
            type="button"
            className="text-foreground/80 hover:text-foreground ml-1 block rounded md:hidden"
            aria-label="Menu"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="block h-0.5 w-5 bg-current"></span>
            <span className="mt-1 block h-0.5 w-5 bg-current"></span>
            <span className="mt-1 block h-0.5 w-5 bg-current"></span>
          </button>
        </div>
      </div>
      {/* Mobile overlay */}
      {open ? (
        <div
          id="mobile-nav"
          className="bg-background/95 border-border mx-4 mb-4 rounded-lg border p-4 md:hidden"
          role="menu"
        >
          <div className="grid gap-2">
            {navItems
              .filter((i) => i.href.startsWith('#'))
              .map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleAnchorClick(e, item.href)}
                  className="hover:text-foreground text-foreground/80 text-sm"
                  role="menuitem"
                >
                  {item.label}
                </Link>
              ))}
          </div>
        </div>
      ) : null}
    </nav>
  );
}
