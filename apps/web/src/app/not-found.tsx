import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { Footer } from '@/components/footer';
import { Nav } from '@/components/nav';

export default function NotFound(): React.JSX.Element {
  const t = useTranslations('notFound');
  return (
    <>
      <Nav />
      <main className="max-w-site mx-auto flex min-h-[80vh] flex-col items-center justify-center px-5 text-center">
        <img src="/brand/eclipse.svg" alt="" className="w-24" />
        <h1 className="display mt-8 text-[clamp(32px,5vw,56px)]">{t('title')}</h1>
        <p className="text-mute mt-3">{t('text')}</p>
        <Link
          href="/"
          className="bg-moon text-night mt-8 rounded-full px-6 py-3 text-[15px] font-semibold"
        >
          {t('back')}
        </Link>
      </main>
      <Footer />
    </>
  );
}
