import { Link } from '@/i18n/navigation';

import { LanguageSwitcher } from '@/components/language-switcher';
import { ThemeToggle } from '@/components/theme-toggle';

export function Nav() {
  return (
    <nav
      className="fixed inset-x-0 top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/40"
      role="navigation"
      aria-label="Navigation principale"
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="font-semibold tracking-tight text-lg">
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
