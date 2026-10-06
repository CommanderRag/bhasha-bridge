'use client';

import '@/styles/globals.css'; // ensure Tailwind is loaded
import { Inter, Noto_Sans_Devanagari } from 'next/font/google';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bhasha Bridge | AI Advocate for Gig Workers (भाषा सेतु)',
  description:
    'AI-powered multilingual contract, penalty, and payout explainer for delivery riders and daily workers.',
  icons: { icon: '/favicon.ico' },
};

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const devanagari = Noto_Sans_Devanagari({
  subsets: ['devanagari'],
  variable: '--font-devanagari',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hi">
      <body
        className={`antialiased selection:bg-amber-500 selection:text-white ${inter.variable} ${devanagari.variable} bg-primary bg-animated`}
      >
        {children}
      </body>
    </html>
  );
}
