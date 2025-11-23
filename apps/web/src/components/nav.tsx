import Image from 'next/image';
import Link from 'next/link';

import { LanguageSwitcher } from '@/components/language-switcher';

export function Nav() {
  return (
    <nav
      className="bg-background/80 border-border/40 fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md"
      role="navigation"
      aria-label="Navigation principale"
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="EasyClub"
            width={120}
            height={40}
            className="h-8 w-auto"
            priority
          />
        </Link>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
        </div>
      </div>
    </nav>
  );
}
