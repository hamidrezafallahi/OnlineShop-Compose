import type { MetadataRoute } from 'next';

import { serverApiBaseUrl } from '@lib/api';
import { absoluteUrl, DEFAULT_LOCALE } from '@lib/seo';

export const revalidate = 3600;

type ChangeFreq =
  | 'always'
  | 'hourly'
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'yearly'
  | 'never';

interface SlugItem {
  slug: string;
}

function buildEntry(
  path: string,
  priority: number,
  changeFrequency: ChangeFreq
): MetadataRoute.Sitemap[number] {
  return {
    url: absoluteUrl(DEFAULT_LOCALE, path),
    lastModified: new Date(),
    changeFrequency,
    priority,
    alternates: {
      languages: {
        en: absoluteUrl('en', path),
        fa: absoluteUrl('fa', path),
        'x-default': absoluteUrl(DEFAULT_LOCALE, path),
      },
    },
  };
}

async function fetchSlugs(endpoint: string): Promise<SlugItem[]> {
  try {
    const res = await fetch(`${serverApiBaseUrl}/${endpoint}`, {
      next: { revalidate },
    });

    if (!res.ok) {
      console.error(`Failed to fetch ${endpoint}`);
      return [];
    }

    const json = await res.json();
    const data = Array.isArray(json) ? json : json?.data ?? [];
    if (!Array.isArray(data)) return [];

    return data
      .map((item: { slug?: string; id?: string | number }) => ({
        slug: String(item.slug ?? item.id ?? ''),
      }))
      .filter((item: SlugItem) => Boolean(item.slug));
  } catch (error) {
    console.error(`Sitemap fetch error (${endpoint}):`, error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, blogs, brands, categories, suppliers, tags] =
    await Promise.all([
      fetchSlugs('products'),
      fetchSlugs('blogs'),
      fetchSlugs('brands'),
      fetchSlugs('categories'),
      fetchSlugs('suppliers'),
      fetchSlugs('tags'),
    ]);

  return [
    buildEntry('', 1.0, 'weekly'),
    buildEntry('products', 0.9, 'daily'),
    buildEntry('blog', 0.9, 'weekly'),
    buildEntry('brands', 0.85, 'weekly'),
    buildEntry('categories', 0.85, 'weekly'),
    buildEntry('suppliers', 0.8, 'weekly'),
    buildEntry('tags', 0.7, 'weekly'),
    buildEntry('discounts', 0.8, 'daily'),
    buildEntry('register', 0.3, 'monthly'),
    ...products.map((item) =>
      buildEntry(`products/${item.slug}`, 0.7, 'weekly')
    ),
    ...blogs.map((item) => buildEntry(`blog/${item.slug}`, 0.65, 'monthly')),
    ...brands.map((item) =>
      buildEntry(`brands/${item.slug}`, 0.65, 'monthly')
    ),
    ...categories.map((item) =>
      buildEntry(`categories/${item.slug}`, 0.65, 'monthly')
    ),
    ...suppliers.map((item) =>
      buildEntry(`suppliers/${item.slug}`, 0.6, 'monthly')
    ),
    ...tags.map((item) => buildEntry(`tags/${item.slug}`, 0.55, 'monthly')),
  ];
}
