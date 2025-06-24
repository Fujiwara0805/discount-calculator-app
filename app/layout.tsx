import './globals.css';
import type { Metadata, Viewport } from 'next';
import { SettingsProvider } from '@/context/SettingsContext';
import { Noto_Sans_JP } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-noto-sans-jp',
});

export const metadata: Metadata = {
  title: '割引計算アプリ',
  description: '簡単な割引計算ができるアプリです',
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        <link rel="apple-touch-icon" href="/icon-192x192.png"></link>
        <meta name="theme-color" content="#FF9FB5" />
      </head>
      <body className={`${notoSansJP.variable} font-sans antialiased bg-[#FEF6FA]`}>
        <SettingsProvider>
          {children}
          <Toaster />
        </SettingsProvider>
      </body>
    </html>
  );
}