import { serverApiBaseUrl } from '@lib/api';
import { absoluteUrl, DEFAULT_LOCALE, LOCALES } from '@lib/seo';

export const revalidate = 3600;
export const dynamic = 'force-dynamic';

type ChangeFreq =
  | 'always'
  | 'hourly'
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'yearly'
  | 'never';

type SitemapEntry = {
  path: string;
  priority: number;
  changeFrequency: ChangeFreq;
};

const FETCH_TIMEOUT_MS = 2500;

function xmlEscape(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
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
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });

    if (!res.ok) return [];

    const json = await res.json();
    return extractKeys(json?.data ?? json);
  } catch {
    return [];
  }
}

async function fetchKeysWithFallback(primary: string, fallback: string) {
  const primaryKeys = await fetchKeys(primary);
  if (primaryKeys.length > 0) return primaryKeys;
  return fetchKeys(fallback);
}

function buildUrlXml(path: string, priority: number, changeFrequency: ChangeFreq, lastmod: string) {
  const links = LOCALES.map(
    (locale) =>
      `    <xhtml:link rel="alternate" hreflang="${locale}" href="${xmlEscape(absoluteUrl(locale, path))}" />`,
  ).join('\n');

  return LOCALES.map((locale) => {
    const loc = absoluteUrl(locale, path);
    return `<url>
  <loc>${xmlEscape(loc)}</loc>
${links}
    <xhtml:link rel="alternate" hreflang="x-default" href="${xmlEscape(absoluteUrl(DEFAULT_LOCALE, path))}" />
  <lastmod>${lastmod}</lastmod>
  <changefreq>${changeFrequency}</changefreq>
  <priority>${priority.toFixed(1)}</priority>
</url>`;
  }).join('\n');
}

export async function GET() {
  const lastmod = new Date().toISOString();

  const [products, blogs, brands, categories, suppliers, tags, discounts] =
    await Promise.all([
      fetchKeys('products/getslugs'),
      fetchKeys('blogs/getslugs'),
      fetchKeysWithFallback(
        'brands/getids',
        'brands?page=1&pageSize=500&byConfig=false',
      ),
      fetchKeysWithFallback(
        'categories/getids',
        'categories?page=1&pageSize=500&byConfig=false',
      ),
      fetchKeysWithFallback(
        'productOffer/suppliersIds',
        'productOffer/suppliers?page=1&pageSize=500',
      ),
      fetchKeysWithFallback(
        'tags/getids',
        'tags?page=1&pageSize=500&byConfig=false',
      ),
      fetchKeys('discounts/active'),
    ]);

  const staticPaths: SitemapEntry[] = [
    { path: '', priority: 1.0, changeFrequency: 'weekly' },
    { path: 'products', priority: 0.9, changeFrequency: 'daily' },
    { path: 'blog', priority: 0.9, changeFrequency: 'weekly' },
    { path: 'brands', priority: 0.8, changeFrequency: 'weekly' },
    { path: 'categories', priority: 0.8, changeFrequency: 'weekly' },
    { path: 'suppliers', priority: 0.8, changeFrequency: 'weekly' },
    { path: 'tags', priority: 0.7, changeFrequency: 'weekly' },
    { path: 'discounts', priority: 0.8, changeFrequency: 'daily' },
  ];

  const chunks = [
    ...staticPaths.map((item) =>
      buildUrlXml(item.path, item.priority, item.changeFrequency, lastmod),
    ),
    ...products.map((slug) =>
      buildUrlXml(`products/${slug}`, 0.7, 'weekly', lastmod),
    ),
    ...blogs.map((slug) => buildUrlXml(`blog/${slug}`, 0.6, 'monthly', lastmod)),
    ...brands.map((id) => buildUrlXml(`brands/${id}`, 0.6, 'monthly', lastmod)),
    ...categories.map((id) =>
      buildUrlXml(`categories/${id}`, 0.6, 'monthly', lastmod),
    ),
    ...suppliers.map((id) =>
      buildUrlXml(`suppliers/${id}`, 0.6, 'monthly', lastmod),
    ),
    ...tags.map((id) => buildUrlXml(`tags/${id}`, 0.5, 'monthly', lastmod)),
    ...discounts.map((id) =>
      buildUrlXml(`discounts/${id}`, 0.6, 'weekly', lastmod),
    ),
  ];

  // Google expects the classic http:// namespaces (not https://).
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${chunks.join('\n')}
</urlset>`;

  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
