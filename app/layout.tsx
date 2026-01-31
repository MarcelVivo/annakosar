import './globals.css';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { Cormorant_Garamond, Source_Sans_3 } from 'next/font/google';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { LanguageProvider } from '@/components/layout/language-provider';
import { normalizeLanguage } from '@/lib/i18n';

const display = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display'
});

const body = Source_Sans_3({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-body'
});

export const metadata: Metadata = {
  title: 'Anna Kosar | Psychologische Beratung',
  description:
    'Psychologische Online-Beratung mit Anna Kosar – seriös, empathisch und diskret. Termine über Zoom oder Microsoft Teams.',
  metadataBase: new URL('https://www.annakosar.com'),
  keywords: [
    'Psychologische Beratung',
    'Online Therapie',
    'Zoom',
    'Microsoft Teams',
    'Psychologin',
    'Anna Kosar'
  ]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies();
  const initialLang = normalizeLanguage(cookieStore.get('lang')?.value);

  return (
    <html lang={initialLang} className={`${display.variable} ${body.variable}`}>
      <body className="bg-white text-charcoal">
        <LanguageProvider initialLang={initialLang}>
          <Header />
          <main className="container-width min-h-screen pt-8 pb-20">{children}</main>
          <Footer lang={initialLang} />
        </LanguageProvider>
      </body>
    </html>
  );
}
