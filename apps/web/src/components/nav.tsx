import Link from 'next/link';

import { LanguageSwitcher } from '@/components/language-switcher';
import { ThemeToggle } from '@/components/theme-toggle';

export function Nav() {
  return (
    <nav
      className="bg-background/80 border-border/40 fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md"
      role="navigation"
      aria-label="Navigation principale"
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          EasyClub
        </Link>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
