import 'server-only';

import { requireAbsoluteUrl, serverApiBaseUrl } from './api';
import { logger } from './logger';

export async function getSlides<T>(): Promise<T[]> {
  const url = requireAbsoluteUrl(
    `${serverApiBaseUrl}/Landing/slide`,
    'getSlides URL',
  );

  try {
    const res = await fetch(url, { cache: 'no-store' });

    if (!res.ok) {
      logger.error('getSlides HTTP error', {
        scope: 'landing',
        source: 'server',
        url,
        status: res.status,
      });
      return [];
    }

    const data = await res.json();
    return (data?.data ?? []) as T[];
  } catch (err) {
    logger.error('getSlides failed', { scope: 'landing', source: 'server', url }, err);
    return [];
  }
}
