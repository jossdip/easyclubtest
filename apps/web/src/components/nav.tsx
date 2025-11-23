import Image from 'next/image';

import { LanguageSwitcher } from '@/components/language-switcher';
import { Link } from '@/i18n/navigation';

export function Nav() {
  return (
    <>
      {/* Transparent Nav Overlay */}
      <nav
        className="pointer-events-none fixed inset-x-0 top-0 z-50"
        role="navigation"
        aria-label="Navigation principale"
      >
        <div className="mx-auto flex h-32 max-w-7xl items-center justify-between px-6">
          {/* Logo - Bigger and pointer-events-auto to be clickable */}
          <Link
            href="/"
            className="pointer-events-auto relative block transition-transform hover:scale-105"
          >
            <Image
              alt="EasyClub"
              width={240}
              height={80}
              className="h-20 w-auto object-contain md:h-24"
              src="/logo.png"
              priority
            />
          </Link>

          {/* Controls */}
          <div className="pointer-events-auto flex items-center gap-4">
            <LanguageSwitcher />
          </div>
        </div>
      </nav>
    </>
  );
}
