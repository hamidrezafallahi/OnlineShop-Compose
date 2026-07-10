import type { MetadataRoute } from 'next';

const BASE_URL = process.env.INTERNAL_API_URL ?? 'https://www.hamidrezafalahi.ir';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}