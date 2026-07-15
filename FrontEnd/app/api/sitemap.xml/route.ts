import { NextResponse } from 'next/server';

const BASE_URL = process.env.INTERNAL_API_URL;

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
) {
  return {
    url: `${BASE_URL}/${path}`,
    lastModified: new Date().toISOString(),
    changeFrequency,
    priority,
    alternates: {
      languages: {
        en: `${BASE_URL}/en/${path}`,
        fa: `${BASE_URL}/fa/${path}`,
        'x-default': `${BASE_URL}/en/${path}`,
      },
    },
  };
}

async function fetchSlugs(endpoint: string): Promise<SlugItem[]> {
  const res = await fetch(`${BASE_URL}/api/${endpoint}`, {
    cache: 'no-store', // مهم: دیگر build-time نیست
  });

  if (!res.ok) {
    console.error(`Failed to fetch ${endpoint}`);
    return [];
  }

  return res.json();
}

export async function GET() {
  const [products, blogs, brands, categories, suppliers, tags] =
    await Promise.all([
      fetchSlugs('products'),
      fetchSlugs('blogs'),
      fetchSlugs('brands'),
      fetchSlugs('categories'),
      fetchSlugs('suppliers'),
      fetchSlugs('tags'),
    ]);

  const urls = [
    buildEntry('', 1.0, 'monthly'),
    buildEntry('products', 0.9, 'weekly'),
    buildEntry('blogs', 0.9, 'weekly'),
    buildEntry('brands', 0.9, 'weekly'),
    buildEntry('categories', 0.9, 'weekly'),
    buildEntry('suppliers', 0.9, 'weekly'),
    buildEntry('tags', 0.9, 'weekly'),

    ...products.map((p) =>
      buildEntry(`products/${p.slug}`, 0.7, 'monthly')
    ),
    ...blogs.map((p) =>
      buildEntry(`blogs/${p.slug}`, 0.7, 'monthly')
    ),
    ...brands.map((p) =>
      buildEntry(`brands/${p.slug}`, 0.7, 'monthly')
    ),
    ...categories.map((p) =>
      buildEntry(`categories/${p.slug}`, 0.7, 'monthly')
    ),
    ...suppliers.map((p) =>
      buildEntry(`suppliers/${p.slug}`, 0.7, 'monthly' )
    ),
    ...tags.map((p) =>
      buildEntry(`tags/${p.slug}`, 0.7, 'monthly')
    ),
  ];

  // تبدیل به XML استاندارد sitemap
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `
  <url>
    <loc>${u.url}</loc>
    <lastmod>${u.lastModified}</lastmod>
    <changefreq>${u.changeFrequency}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('')}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}