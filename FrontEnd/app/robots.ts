import type { MetadataRoute } from 'next';

import { siteBaseUrl } from '@lib/api';

const BASE_URL = siteBaseUrl;

const privatePaths = [
  '/api/',
  '/auth/',
  '/fa/admin/',
  '/en/admin/',
  '/fa/checkout',
  '/en/checkout',
  '/fa/shoppingCart',
  '/en/shoppingCart',
  '/fa/payment',
  '/en/payment',
  '/fa/order',
  '/en/order',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: privatePaths,
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: privatePaths,
      },
      {
        userAgent: 'GPTBot',
        allow: '/',
        disallow: privatePaths,
      },
      {
        userAgent: 'ClaudeBot',
        allow: '/',
        disallow: privatePaths,
      },
      {
        userAgent: 'PerplexityBot',
        allow: '/',
        disallow: privatePaths,
      },
      {
        userAgent: 'Google-Extended',
        allow: '/',
        disallow: privatePaths,
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
