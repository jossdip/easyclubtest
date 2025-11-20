import Link from 'next/link';

import { buttonVariants } from '@/components/ui/button';

export default function NotFound(): JSX.Element {
  return (
    <div className="grid min-h-[60vh] place-items-center px-4">
      <div className="text-center">
        <p className="text-foreground/60 text-sm">404</p>
        <h1 className="mt-2 text-3xl font-semibold">Page introuvable</h1>
        <p className="text-foreground/70 mt-2">La page que vous cherchez n’existe pas ou plus.</p>
        <div className="mt-6">
          <Link href="/" className={buttonVariants({ size: 'md' })}>
            Retour à l’accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
