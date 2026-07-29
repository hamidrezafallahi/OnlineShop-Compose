import type { Metadata } from 'next';

import {
  serverApiBaseUrl,
  siteBaseUrl,
} from '@lib/api';

export const DEFAULT_LOCALE = 'fa' as const;
export const LOCALES = ['fa', 'en'] as const;
export type AppLocale = (typeof LOCALES)[number];

const SITE_NAME = 'Online Shop';

/** Path without leading locale. Empty string = home. */
export function cleanPath(path = ''): string {
  return path.replace(/^\/+|\/+$/g, '');
}

/**
 * Locale-aware path matching next-intl `localePrefix: 'always'`.
 * Every page URL is /fa/... or /en/...
 */
export function localizedPath(locale: string, path = ''): string {
  const cleaned = cleanPath(path);
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

type SeoOverride = {
  title?: string | null;
  description?: string | null;
  keywords?: string | null;
  canonicalPath?: string | null;
  ogImageUrl?: string | null;
  robotsIndex?: boolean;
  robotsFollow?: boolean;
};

async function getSeoOverride(locale: string, path = ''): Promise<SeoOverride | null> {
  const normalizedPath = cleanPath(path);

  try {
    const url = new URL(`${serverApiBaseUrl}/seoSettings/resolve`);
    url.searchParams.set('path', normalizedPath);
    url.searchParams.set('locale', locale);

    const res = await fetch(url.toString(), {
      next: { revalidate: 300, tags: ['seoSettings'] },
    });

    if (!res.ok) {
      return null;
    }

    const json = await res.json();
    return json?.data ?? null;
  } catch {
    return null;
  }
}

function splitKeywords(keywords?: string[] | string | null): string[] | undefined {
  if (Array.isArray(keywords)) {
    return keywords.length ? keywords : undefined;
  }

  if (!keywords) {
    return undefined;
  }

  const parsed = keywords
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

  return parsed.length ? parsed : undefined;
}

function toAbsoluteAssetUrl(url: string): string {
  return url.startsWith('http')
    ? url
    : `${siteBaseUrl}${url.startsWith('/') ? '' : '/'}${url}`;
}

export async function buildPageMetadata({
  locale,
  path = '',
  title,
  description,
  images = [],
  type = 'website',
  noIndex = false,
  keywords,
}: BuildPageMetadataInput): Promise<Metadata> {
  const seoOverride = await getSeoOverride(locale, path);
  const resolvedTitle = seoOverride?.title?.trim() || title;
  const resolvedDescription = seoOverride?.description?.trim() || description;
  const resolvedCanonicalPath = seoOverride?.canonicalPath?.trim() || path;
  const resolvedNoIndex = seoOverride?.robotsIndex === false ? true : noIndex;
  const resolvedFollow = seoOverride?.robotsFollow ?? true;
  const resolvedKeywords = splitKeywords(seoOverride?.keywords ?? keywords);
  const resolvedImages = seoOverride?.ogImageUrl
    ? [seoOverride.ogImageUrl, ...images]
    : images;
  const url = absoluteUrl(locale, resolvedCanonicalPath);
  const ogImages = resolvedImages
    .filter((img): img is string => Boolean(img))
    .map((img) => toAbsoluteAssetUrl(img));

  return {
    metadataBase: new URL(siteBaseUrl),
    title: resolvedTitle,
    description: resolvedDescription,
    keywords: resolvedKeywords,
    alternates: buildAlternates(locale, resolvedCanonicalPath),
    robots: resolvedNoIndex
      ? { index: false, follow: false }
      : { index: true, follow: resolvedFollow },
    openGraph: {
      title: resolvedTitle,
      description: resolvedDescription,
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
      title: resolvedTitle,
      description: resolvedDescription,
      images: ogImages.length ? ogImages : undefined,
    },
  };
}

export function jsonLdScript(data: Record<string, unknown> | Record<string, unknown>[]) {
  return {
    __html: JSON.stringify(data).replace(/</g, '\\u003c'),
  };
}
