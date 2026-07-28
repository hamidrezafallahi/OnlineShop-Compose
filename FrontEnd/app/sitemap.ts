import type { MetadataRoute } from 'next';

import {
  serverApiBaseUrl,
  siteBaseUrl,
} from '@lib/api';

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

function buildUrl(path: string) {
  return path ? `${siteBaseUrl}/${path}` : siteBaseUrl;
}

function buildEntry(
  path: string,
  priority: number,
  changeFrequency: ChangeFreq
): MetadataRoute.Sitemap[number] {
  return {
    url: buildUrl(path),
    lastModified: new Date(),
    changeFrequency,
    priority,
    alternates: {
      languages: {
        en: buildUrl(`en/${path}`),
        fa: buildUrl(`fa/${path}`),
        'x-default': buildUrl(`en/${path}`),
      },
    },
  };
}

async function fetchSlugs(
  endpoint: string
): Promise<SlugItem[]> {
  const res = await fetch(
    `${serverApiBaseUrl}/${endpoint}`,
    {
      cache: 'no-store',
    }
  );

  if (!res.ok) {
    console.error(`Failed to fetch ${endpoint}`);
    return [];
  }

  return res.json();
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
    buildEntry('', 1.0, 'monthly'),
    buildEntry('products', 0.9, 'weekly'),
    buildEntry('blogs', 0.9, 'weekly'),
    buildEntry('brands', 0.9, 'weekly'),
    buildEntry('categories', 0.9, 'weekly'),
    buildEntry('suppliers', 0.9, 'weekly'),
    buildEntry('tags', 0.9, 'weekly'),
    ...products.map((item) =>
      buildEntry(`products/${item.slug}`, 0.7, 'monthly')
    ),
    ...blogs.map((item) =>
      buildEntry(`blogs/${item.slug}`, 0.7, 'monthly')
    ),
    ...brands.map((item) =>
      buildEntry(`brands/${item.slug}`, 0.7, 'monthly')
    ),
    ...categories.map((item) =>
      buildEntry(`categories/${item.slug}`, 0.7, 'monthly')
    ),
    ...suppliers.map((item) =>
      buildEntry(`suppliers/${item.slug}`, 0.7, 'monthly')
    ),
    ...tags.map((item) =>
      buildEntry(`tags/${item.slug}`, 0.7, 'monthly')
    ),
  ];
}
