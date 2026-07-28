import '../style/globals.css';

import { ReactNode } from 'react';

import type { Metadata } from 'next';

import { siteBaseUrl } from '@lib/api';

type Props = {
  children: ReactNode;
};

export const metadata: Metadata = {
  metadataBase: new URL(siteBaseUrl),
  title: {
    default: 'Online Shop',
    template: '%s | Online Shop',
  },
  description:
    'Online storefront for products, brands, categories, and curated shopping experiences.',
  applicationName: 'Online Shop',
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  openGraph: {
    type: 'website',
    siteName: 'Online Shop',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="fa" suppressHydrationWarning>
      <body className="bg-[radial-gradient(circle_at_top,color-mix(in_srgb,var(--primary-color)_55%,transparent)_0%,color-mix(in_srgb,var(--secondary-color)_35%,#0b1f14)_55%,#07140e_100%)] min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
