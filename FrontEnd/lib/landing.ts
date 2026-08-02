import 'server-only';

import { ILandingProduct } from '@models/product';

import { serverApiBaseUrl } from './api';

type LandingTab = 'BestSeller' | 'TheNewest' | 'Discounters';

type LandingProductsEnvelope = {
  isSuccess?: boolean;
  data?: ILandingProduct[] | null;
  error?: string | null;
};

export async function getSlides<T>(): Promise<T[]> {
  try {
    const url = `${serverApiBaseUrl}/Landing/slide`;
    const res = await fetch(url, {
      cache: 'no-store',
    });
    const data = await res.json();
    return data.data ?? [];
  } catch (e) {
    console.error(e);
    throw e;
  }
}

/**
 * Fetches landing product carousels from Products/landings.
 * Backend evaluates flags exclusively (BestSeller → TheNewest → else/Discounters).
 */
export async function getLandingProducts(
  tab: LandingTab,
): Promise<ILandingProduct[]> {
  const params = new URLSearchParams({
    BestSeller: String(tab === 'BestSeller'),
    TheNewest: String(tab === 'TheNewest'),
    Discounters: String(tab === 'Discounters'),
  });

  const url = `${serverApiBaseUrl}/Products/landings?${params.toString()}`;

  try {
    const res = await fetch(url, {
      cache: 'no-store',
      next: { tags: ['Products/landings'] },
    });
    if (!res.ok) {
      console.error(`getLandingProducts failed: ${res.status} ${url}`);
      return [];
    }

    const payload = (await res.json()) as LandingProductsEnvelope | ILandingProduct[];
    if (Array.isArray(payload)) return payload;
    if (payload?.isSuccess === false) {
      console.error(
        `getLandingProducts error: ${payload.error ?? 'unknown'} ${url}`,
      );
      return [];
    }
    return payload?.data ?? [];
  } catch (e) {
    console.error(`getLandingProducts error for ${tab}`, e);
    return [];
  }
}

export async function getLandingProductsByTabs() {
  const [bestSeller, theNewest, discounters] = await Promise.all([
    getLandingProducts('BestSeller'),
    getLandingProducts('TheNewest'),
    getLandingProducts('Discounters'),
  ]);

  return { bestSeller, theNewest, discounters };
}
