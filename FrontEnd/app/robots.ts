import type { MetadataRoute } from 'next';

import { apiBaseUrl } from '@lib/api';

const BASE_URL = apiBaseUrl ?? 'https://www.hamidrezafalahi.ir';

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