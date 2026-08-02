import '../style/globals.css';

import { ReactNode } from 'react';

import type { Metadata } from 'next';

import { siteBaseUrl } from '@lib/api';
import { SITE_NAME } from '@lib/seo';

type Props = {
  children: ReactNode;
};

export const metadata: Metadata = {
  metadataBase: new URL(siteBaseUrl),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    'Online storefront for products, brands, categories, and curated shopping experiences.',
  applicationName: SITE_NAME,
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
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
      <body className="bg-[radial-gradient(circle_at_top,color-mix(in_srgb,var(--primary-color)_55%,transparent)_0%,color-mix(in_srgb,var(--secondary-color)_30%,#0b1224)_55%,#060914_100%)] min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
