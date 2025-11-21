import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Script from 'next/script';

import { LenisProvider } from '@/components/providers/lenis-provider';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { slogan } from '@/content/site';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: slogan,
  description:
    "Solution POS tout‑en‑un conforme NF525, IA d'assistance, matériel pro, modèle 1% split à l’acquéreur. Performance, luxe et précision.",
  metadataBase: new URL('https://easyclub.app'),
  openGraph: {
    title: slogan,
    description:
      "Solution POS tout‑en‑un conforme NF525, IA d'assistance, matériel pro, modèle 1% split à l’acquéreur.",
    url: 'https://easyclub.app',
    siteName: 'EasyClub',
    images: [{ url: '/api/og', width: 1200, height: 630, alt: 'EasyClub' }],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: slogan,
    description:
      "Solution POS tout‑en‑un conforme NF525, IA d'assistance, matériel pro, modèle 1% split à l’acquéreur.",
    images: ['/api/og'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const redesignEnabled =
    process.env.REDESIGN_ENABLED === '1' || process.env.REDESIGN_ENABLED === 'true';
  return (
    <html lang="fr" data-redesign={redesignEnabled ? '1' : undefined}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <a href="#main" className="skip-link">
          Passer au contenu
        </a>
        <ThemeProvider>
          <LenisProvider>
            {children}
            <Analytics />
            {/* JSON-LD for Organization and Website */}
            <Script id="ld-org" type="application/ld+json" strategy="afterInteractive">
              {JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'Organization',
                name: 'EasyClub',
                url: 'https://easyclub.app',
                logo: 'https://easyclub.app/og.png',
                sameAs: [],
              })}
            </Script>
            <Script id="ld-website" type="application/ld+json" strategy="afterInteractive">
              {JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'WebSite',
                name: 'EasyClub',
                url: 'https://easyclub.app',
                potentialAction: {
                  '@type': 'SearchAction',
                  target: 'https://easyclub.app/?q={search_term_string}',
                  'query-input': 'required name=search_term_string',
                },
              })}
            </Script>
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
