import React from 'react';

import { getTranslations } from 'next-intl/server';

import { SimpleProductCard } from '@components/molecules/productCard';
import { serverApiBaseUrl } from '@lib/api';
import { ILandingProduct } from '@models/product';

export async function CategoryProducts({ id }: { id: number }) {
  const t = await getTranslations('productsPage');

  try {
    const response = await fetch(
      `${serverApiBaseUrl}/Products/getProductByCategoryId/${id}`,
      {
        cache: 'no-store',
      },
    );

    if (!response.ok) {
      return null;
    }

    const productsResponse = await response.json();
    const products: ILandingProduct[] = Array.isArray(productsResponse?.data)
      ? productsResponse.data
      : Array.isArray(productsResponse?.data?.records)
        ? productsResponse.data.records
        : [];

    if (products.length === 0) {
      return null;
    }

    return (
      <div className="pb-10">
        <h2 className="mb-4 font-bold text-xl">{t('title')}</h2>
        <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
          {products.map((product) => (
            <SimpleProductCard
              key={product.id ?? product.slug}
              product={product}
            />
          ))}
        </div>
      </div>
    );
  } catch {
    return null;
  }
}
