import type { MetadataRoute } from 'next';

import { siteBaseUrl } from '@lib/api';

const BASE_URL = siteBaseUrl;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/*/admin/',
          '/checkout',
          '/*/checkout',
          '/shoppingCart',
          '/*/shoppingCart',
          '/payment',
          '/*/payment',
          '/order',
          '/*/order',
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
