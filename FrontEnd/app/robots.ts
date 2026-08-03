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
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
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
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
