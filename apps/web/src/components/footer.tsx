import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { LanguageSwitch } from '@/components/language-switch';
import { CONTACT } from '@/lib/site';

export function Footer(): React.JSX.Element {
  const t = useTranslations('footer');
  return (
    <footer className="border-t border-white/[0.06]">
      <div className="max-w-site mx-auto flex flex-col gap-10 px-5 py-14 sm:px-8 md:flex-row md:items-end md:justify-between">
        <div>
          <img
            src="/brand/easyclub-logo.svg"
            alt="EasyClub"
            className="-ml-2 h-10 w-auto"
            draggable={false}
          />
          <p className="eyebrow !text-faint mt-4">{t('slogan')}</p>
          <p className="text-faint mt-6 text-[13px]">
            <a href={`mailto:${CONTACT.email}`} className="hover:text-moon">
              {CONTACT.email}
            </a>
          </p>
        </div>
        <div className="flex flex-col gap-5 md:items-end">
          <nav
            aria-label="Légal"
            className="text-mute flex flex-wrap gap-x-6 gap-y-2 text-[13.5px]"
          >
            <Link href="/legal/mentions-legales" className="hover:text-moon">
              {t('legal')}
            </Link>
            <Link href="/legal/cgu" className="hover:text-moon">
              {t('cgu')}
            </Link>
            <Link href="/legal/confidentialite" className="hover:text-moon">
              {t('privacy')}
            </Link>
          </nav>
          <LanguageSwitch />
          <p className="text-faint text-[12.5px]">
            © {new Date().getFullYear()} · {t('company')}
          </p>
        </div>
      </div>
    </footer>
  );
}
