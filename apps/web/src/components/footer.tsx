import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

import { cn } from '@/lib/utils';

export function Footer() {
  const t = useTranslations('Footer');
  const year = new Date().getFullYear();

  const socials = [
    { icon: Twitter, href: '#', label: 'Twitter', active: false },
    { icon: Instagram, href: '#', label: 'Instagram', active: false },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/josselin-b-5b5b5b5b/', label: 'LinkedIn', active: true }, // Placeholder link
    { icon: Facebook, href: '#', label: 'Facebook', active: false },
  ];

  const marqueeText = t('marquee');

  return (
    <footer
      className="border-border border-t bg-black/40 overflow-hidden"
      role="contentinfo"
      aria-label="Pied de page"
    >
      {/* Marquee Section */}
      <div className="relative flex overflow-x-hidden py-3 bg-accent/5 border-b border-border/40">
        <div className="animate-marquee whitespace-nowrap flex">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="mx-4 text-sm font-medium tracking-[0.2em] uppercase text-muted-foreground/70">
              {marqueeText}
            </span>
          ))}
        </div>
        <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex py-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={`clone-${i}`} className="mx-4 text-sm font-medium tracking-[0.2em] uppercase text-muted-foreground/70">
              {marqueeText}
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <p className="text-muted-foreground text-sm">{t('rights', { year })}</p>
          
          <div className="flex items-center gap-6">
            {socials.map(({ icon: Icon, href, label, active }) => (
              <Link
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "transition-all duration-200",
                  active 
                    ? "text-foreground opacity-100 hover:scale-110" 
                    : "text-muted-foreground opacity-50 hover:opacity-100 hover:text-foreground"
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
