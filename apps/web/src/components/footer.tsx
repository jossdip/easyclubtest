import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import Link from 'next/link';
import * as React from 'react';

import { cn } from '@/lib/utils';

const MARQUEE_ITEMS = [
  'La Nightlife Réinventée',
  "EasyClub : L'Expertise au Service de la Nuit",
  "Opportunité d'Investissement : Levée de Fonds en Cours",
];

export function Footer() {
  const year = new Date().getFullYear();

  const socials = [
    { icon: Twitter, href: '#', label: 'Twitter', active: false },
    { icon: Instagram, href: '#', label: 'Instagram', active: false },
    {
      icon: Linkedin,
      href: 'https://www.linkedin.com/in/josselin-b-5b5b5b5b/',
      label: 'LinkedIn',
      active: true,
    },
    { icon: Facebook, href: '#', label: 'Facebook', active: false },
  ];

  return (
    <footer
      className="border-border overflow-hidden border-t bg-black/40"
      role="contentinfo"
      aria-label="Pied de page"
    >
      <div className="bg-accent/5 border-border/40 relative flex overflow-x-hidden border-b py-3">
        <div className="animate-marquee flex whitespace-nowrap">
          {Array.from({ length: 4 }).map((_, groupIndex) => (
            <React.Fragment key={groupIndex}>
              {MARQUEE_ITEMS.map((text, i) => (
                <span
                  key={`${groupIndex}-${i}`}
                  className="text-muted-foreground/70 mx-4 text-sm font-medium uppercase tracking-[0.2em]"
                >
                  {text} •
                </span>
              ))}
            </React.Fragment>
          ))}
        </div>
        <div className="animate-marquee2 absolute top-0 flex whitespace-nowrap py-3">
          {Array.from({ length: 4 }).map((_, groupIndex) => (
            <React.Fragment key={`clone-${groupIndex}`}>
              {MARQUEE_ITEMS.map((text, i) => (
                <span
                  key={`clone-${groupIndex}-${i}`}
                  className="text-muted-foreground/70 mx-4 text-sm font-medium uppercase tracking-[0.2em]"
                >
                  {text} •
                </span>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <p className="text-muted-foreground text-sm">© {year} EasyClub. Tous droits réservés.</p>

          <div className="flex items-center gap-6">
            {socials.map(({ icon: Icon, href, label, active }) => (
              <Link
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'transition-all duration-200',
                  active
                    ? 'text-foreground opacity-100 hover:scale-110'
                    : 'text-muted-foreground hover:text-foreground opacity-50 hover:opacity-100',
                )}
                aria-label={label}
              >
                <Icon className="h-5 w-5" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
