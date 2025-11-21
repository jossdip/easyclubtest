'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import * as React from 'react';

import { ThemeToggle } from '@/components/theme-toggle';
import { buttonVariants } from '@/components/ui/button';
import { navItems } from '@/content/site';
import { cn } from '@/lib/utils';

export function Nav() {
  const [open, setOpen] = React.useState(false);
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const [hidden, setHidden] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    const ids = [
      'hero',
      'fundamentaux',
      'securite',
      'bracelet',
      'marketplace',
      'merch',
      'navettes',
      'dechets',
      'kpis',
      'contact',
    ];
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (elements.length === 0) {
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) {
          setActiveId(visible.target.id);
        }
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0.1, 0.25, 0.5, 0.75] },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > lastY && y > 80);
      lastY = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
    <motion.nav
      className="fixed inset-x-0 top-0 z-50 bg-black/20 backdrop-blur supports-[backdrop-filter]:bg-black/30"
      role="navigation"
      aria-label="Navigation principale"
      initial={false}
      animate={{ y: hidden ? -72 : 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="font-semibold tracking-tight">
          EasyClub
        </Link>
        <div className="hidden items-center gap-6 md:flex">
          {navItems
            .filter((i) => i.href.startsWith('#'))
            .map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={(e) => handleAnchorClick(e, item.href)}
                className={cn(
                  'text-sm',
                  activeId && item.href === `#${activeId}`
                    ? 'text-foreground'
                    : 'text-foreground/80 hover:text-foreground',
                )}
                aria-current={activeId && item.href === `#${activeId}` ? 'page' : undefined}
              >
                {item.label}
              </Link>
            ))}
          <ThemeToggle className="text-foreground/80 hover:text-foreground" />
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
                  className={cn(
                    'text-sm',
                    activeId && item.href === `#${activeId}`
                      ? 'text-foreground'
                      : 'text-foreground/80 hover:text-foreground',
                  )}
                  aria-current={activeId && item.href === `#${activeId}` ? 'page' : undefined}
                  role="menuitem"
                >
                  {item.label}
                </Link>
              ))}
          </div>
        </div>
      ) : null}
    </motion.nav>
  );
}
