import type { Metadata } from 'next';

import { siteBaseUrl } from '@lib/api';

export const DEFAULT_LOCALE = 'fa' as const;
export const LOCALES = ['fa', 'en'] as const;
export type AppLocale = (typeof LOCALES)[number];

const SITE_NAME = 'Online Shop';

/** Path without leading locale. Empty string = home. */
export function cleanPath(path = ''): string {
  return path.replace(/^\/+|\/+$/g, '');
}

/**
 * Locale-aware path matching next-intl `localePrefix: 'as-needed'`
 * (default locale `fa` has no prefix).
 */
export function localizedPath(locale: string, path = ''): string {
  const cleaned = cleanPath(path);
  const isDefault = locale === DEFAULT_LOCALE;

  if (isDefault) {
    return cleaned ? `/${cleaned}` : '/';
  }

  return cleaned ? `/${locale}/${cleaned}` : `/${locale}`;
}

export function absoluteUrl(locale: string, path = ''): string {
  return `${siteBaseUrl}${localizedPath(locale, path)}`;
}

export function buildAlternates(locale: string, path = '') {
  return {
    canonical: absoluteUrl(locale, path),
    languages: {
      fa: absoluteUrl('fa', path),
      en: absoluteUrl('en', path),
      'x-default': absoluteUrl(DEFAULT_LOCALE, path),
    },
  };
}

export function ogLocale(locale: string): string {
  return locale === 'fa' ? 'fa_IR' : 'en_US';
}

type BuildPageMetadataInput = {
  locale: string;
  path?: string;
  title: string;
  description: string;
  images?: (string | undefined | null)[];
  type?: 'website' | 'article';
  noIndex?: boolean;
  keywords?: string[];
};

export function buildPageMetadata({
  locale,
  path = '',
  title,
  description,
  images = [],
  type = 'website',
  noIndex = false,
  keywords,
}: BuildPageMetadataInput): Metadata {
  const url = absoluteUrl(locale, path);
  const ogImages = images
    .filter((img): img is string => Boolean(img))
    .map((img) =>
      img.startsWith('http') ? img : `${siteBaseUrl}${img.startsWith('/') ? '' : '/'}${img}`
    );

  return {
    metadataBase: new URL(siteBaseUrl),
    title,
    description,
    keywords,
    alternates: buildAlternates(locale, path),
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: ogLocale(locale),
      type,
      images: ogImages.length
        ? ogImages.map((url) => ({ url }))
        : undefined,
    },
    twitter: {
      card: ogImages.length ? 'summary_large_image' : 'summary',
      title,
      description,
      images: ogImages.length ? ogImages : undefined,
    },
  };
}

export function jsonLdScript(data: Record<string, unknown> | Record<string, unknown>[]) {
  return {
    __html: JSON.stringify(data).replace(/</g, '\\u003c'),
  };
}
