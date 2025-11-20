import Link from 'next/link';

import { buttonVariants } from '@/components/ui/button';
import { navItems } from '@/content/site';

export function Nav() {
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
          {navItems.slice(1, -1).map((item) => (
            <Link
              key={item.href}
              href={item.href}
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
        </div>
      </div>
    </nav>
  );
}
