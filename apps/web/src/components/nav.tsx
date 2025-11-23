import Image from 'next/image';

import { LanguageSwitcher } from '@/components/language-switcher';
import { Link } from '@/i18n/navigation';

export function Nav() {
  return (
    <>
      {/* Sticky Banner */}
      <div className="sticky top-0 z-[60] w-full overflow-hidden border-b border-white/10 bg-black/80 py-2 backdrop-blur-md">
        <div className="flex min-w-full">
          <div
            className="animate-marquee flex shrink-0 whitespace-nowrap"
            style={{ '--marquee-duration': '40s' } as React.CSSProperties}
          >
            <span className="mx-4 text-sm font-medium tracking-widest text-white/90">
              LA NIGHTLIFE RÉINVENTÉE • EASYCLUB : L&apos;EXPERTISE AU SERVICE DE LA NUIT •
              OPPORTUNITÉ D&apos;INVESTISSEMENT : LEVÉE DE FONDS EN COURS • LA NIGHTLIFE RÉINVENTÉE
              • EASYCLUB : L&apos;EXPERTISE AU SERVICE DE LA NUIT • OPPORTUNITÉ
              D&apos;INVESTISSEMENT : LEVÉE DE FONDS EN COURS
            </span>
          </div>
          <div
            className="animate-marquee flex shrink-0 whitespace-nowrap"
            aria-hidden="true"
            style={{ '--marquee-duration': '40s' } as React.CSSProperties}
          >
            <span className="mx-4 text-sm font-medium tracking-widest text-white/90">
              LA NIGHTLIFE RÉINVENTÉE • EASYCLUB : L&apos;EXPERTISE AU SERVICE DE LA NUIT •
              OPPORTUNITÉ D&apos;INVESTISSEMENT : LEVÉE DE FONDS EN COURS • LA NIGHTLIFE RÉINVENTÉE
              • EASYCLUB : L&apos;EXPERTISE AU SERVICE DE LA NUIT • OPPORTUNITÉ
              D&apos;INVESTISSEMENT : LEVÉE DE FONDS EN COURS
            </span>
          </div>
        </div>
      </div>

      {/* Transparent Nav Overlay */}
      <nav
        className="pointer-events-none fixed inset-x-0 top-12 z-50"
        role="navigation"
        aria-label="Navigation principale"
      >
        <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-6">
          {/* Logo - Bigger and pointer-events-auto to be clickable */}
          <Link
            href="/"
            className="pointer-events-auto relative block transition-transform hover:scale-105"
          >
            <Image
              alt="EasyClub"
              width={160}
              height={53}
              className="h-12 w-auto object-contain md:h-14"
              src="/logo.png"
              priority
            />
          </Link>

          {/* Controls */}
          <div className="pointer-events-auto flex items-center gap-4">
            <LanguageSwitcher />
            {/* ThemeToggle removed or kept based on user pref? User said 'juste le bouton fr eng'. I will keep theme toggle for now as it wasn't explicitly forbidden, but user said 'juste le bouton'. I'll hide theme toggle to be safe and stick to strict instructions. */}
          </div>
        </div>
      </nav>
    </>
  );
}
