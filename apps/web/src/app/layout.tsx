import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages, getTranslations } from 'next-intl/server';

import { SmoothScroll } from '@/components/smooth-scroll';
import { SITE_URL } from '@/lib/site';

import './globals.css';

export const runtime = 'edge';

// Les polices du brand kit v3 : Jost (titres, libellés), Inter (texte). Toutes deux sous licence OFL.
const jost = localFont({
  src: [
    { path: '../fonts/Jost-Regular.woff2', weight: '400' },
    { path: '../fonts/Jost-Medium.woff2', weight: '500' },
    { path: '../fonts/Jost-SemiBold.woff2', weight: '600' },
  ],
  variable: '--font-jost',
  display: 'swap',
});
const inter = localFont({
  src: '../fonts/Inter-Variable.woff2',
  weight: '100 900',
  variable: '--font-inter',
  display: 'swap',
});

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('meta');
  const locale = await getLocale();
  return {
    metadataBase: new URL(SITE_URL),
    title: t('title'),
    description: t('description'),
    applicationName: 'EasyClub',
    alternates: { canonical: '/' },
    openGraph: {
      type: 'website',
      siteName: 'EasyClub',
      title: t('title'),
      description: t('description'),
      locale: locale === 'fr' ? 'fr_FR' : 'en_GB',
      images: [{ url: '/og.jpg', width: 1200, height: 627, alt: 'EasyClub' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: ['/og.jpg'],
    },
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: '48x48' },
        { url: '/favicon.svg', type: 'image/svg+xml' },
      ],
      apple: '/apple-touch-icon.png',
    },
  };
}

export const viewport: Viewport = {
  themeColor: '#0A0A10',
  colorScheme: 'dark',
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>): Promise<React.JSX.Element> {
  const locale = await getLocale();
  const messages = await getMessages();
  return (
    <html lang={locale} className={`${jost.variable} ${inter.variable}`}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <SmoothScroll>{children}</SmoothScroll>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
