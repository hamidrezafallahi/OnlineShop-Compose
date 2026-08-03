import type { MetadataRoute } from 'next';

import { serverApiBaseUrl } from '@lib/api';
import { absoluteUrl, DEFAULT_LOCALE, LOCALES } from '@lib/seo';

export const revalidate = 3600;

type ChangeFreq =
  | 'always'
  | 'hourly'
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'yearly'
  | 'never';

function buildEntries(
  path: string,
  priority: number,
  changeFrequency: ChangeFreq
): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return LOCALES.map((locale) => ({
    url: absoluteUrl(locale, path),
    lastModified,
    changeFrequency,
    priority,
    alternates: {
      languages: {
        fa: absoluteUrl('fa', path),
        en: absoluteUrl('en', path),
        'x-default': absoluteUrl(DEFAULT_LOCALE, path),
      },
    },
  }));
}

function extractKeys(payload: unknown): string[] {
  if (!payload) return [];

  const list = Array.isArray(payload)
    ? payload
    : Array.isArray((payload as { records?: unknown[] }).records)
      ? (payload as { records: unknown[] }).records
      : Array.isArray((payload as { data?: unknown[] }).data)
        ? (payload as { data: unknown[] }).data
        : [];

  return list
    .map((item) => {
      if (typeof item === 'string' || typeof item === 'number') {
        return String(item);
      }

      if (!item || typeof item !== 'object') return '';

      const record = item as {
        slug?: string | number | null;
        id?: string | number | null;
        name?: string | null;
      };

      return String(record.slug ?? record.id ?? record.name ?? '');
    })
    .map((value) => value.trim())
    .filter(Boolean);
}

async function fetchKeys(endpoint: string): Promise<string[]> {
  try {
    const res = await fetch(`${serverApiBaseUrl}/${endpoint}`, {
      next: { revalidate },
    });

    if (!res.ok) {
      console.error(`Failed to fetch ${endpoint} for sitemap (${res.status})`);
      return [];
    }

    const json = await res.json();
    const payload = json?.data ?? json;
    return extractKeys(payload);
  } catch (error) {
    console.error(`Sitemap fetch error (${endpoint}):`, error);
    return [];
  }
}

async function fetchKeysWithFallback(
  primary: string,
  fallback: string
): Promise<string[]> {
  const primaryKeys = await fetchKeys(primary);
  if (primaryKeys.length > 0) return primaryKeys;
  return fetchKeys(fallback);
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [
    products,
    blogs,
    brands,
    categories,
    suppliers,
    tags,
    discounts,
  ] = await Promise.all([
    fetchKeys('products/getslugs'),
    fetchKeys('blogs/getslugs'),
    fetchKeysWithFallback(
      'brands/getids',
      'brands?page=1&pageSize=500&byConfig=false'
    ),
    fetchKeysWithFallback(
      'categories/getids',
      'categories?page=1&pageSize=500&byConfig=false'
    ),
    fetchKeysWithFallback(
      'productOffer/suppliersIds',
      'productOffer/suppliers?page=1&pageSize=500'
    ),
    fetchKeysWithFallback(
      'tags/getids',
      'tags?page=1&pageSize=500&byConfig=false'
    ),
    fetchKeys('discounts/active'),
  ]);

  const staticPaths: Array<{
    path: string;
    priority: number;
    changeFrequency: ChangeFreq;
  }> = [
    { path: '', priority: 1.0, changeFrequency: 'weekly' },
    { path: 'products', priority: 0.95, changeFrequency: 'daily' },
    { path: 'blog', priority: 0.9, changeFrequency: 'weekly' },
    { path: 'brands', priority: 0.85, changeFrequency: 'weekly' },
    { path: 'categories', priority: 0.85, changeFrequency: 'weekly' },
    { path: 'suppliers', priority: 0.8, changeFrequency: 'weekly' },
    { path: 'tags', priority: 0.7, changeFrequency: 'weekly' },
    { path: 'discounts', priority: 0.8, changeFrequency: 'daily' },
    { path: 'sitemap', priority: 0.4, changeFrequency: 'weekly' },
    { path: 'register', priority: 0.3, changeFrequency: 'monthly' },
  ];

  return [
    ...staticPaths.flatMap(({ path, priority, changeFrequency }) =>
      buildEntries(path, priority, changeFrequency)
    ),
    ...products.flatMap((slug) =>
      buildEntries(`products/${slug}`, 0.75, 'weekly')
    ),
    ...blogs.flatMap((slug) => buildEntries(`blog/${slug}`, 0.65, 'monthly')),
    ...brands.flatMap((id) => buildEntries(`brands/${id}`, 0.65, 'monthly')),
    ...categories.flatMap((id) =>
      buildEntries(`categories/${id}`, 0.65, 'monthly')
    ),
    ...suppliers.flatMap((id) =>
      buildEntries(`suppliers/${id}`, 0.6, 'monthly')
    ),
    ...tags.flatMap((id) => buildEntries(`tags/${id}`, 0.55, 'monthly')),
    ...discounts.flatMap((id) =>
      buildEntries(`discounts/${id}`, 0.6, 'weekly')
    ),
  ];
}
