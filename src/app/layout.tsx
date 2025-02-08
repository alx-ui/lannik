import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

const thumbnail = {
  url: 'https://lannik.com.br/og.jpg',
  width: 1200,
  height: 630,
  alt: 'Lannik',
};

const defaultMetadata = {
  title: 'LANNIK',
  description: 'LANNIK STREAMER TWITCH BR',
  images: [thumbnail],
};

export const metadata: Metadata = {
  ...defaultMetadata,
  openGraph: {
    ...defaultMetadata,
    type: 'website',
    url: 'https://lannik.com.br',
    siteName: 'LANNIK',
  },
  twitter: {
    ...defaultMetadata,
    card: 'summary_large_image',
    site: '@lannik1',
    creator: '@lannik1',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/favicon.svg" sizes="any" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
