import React from 'react';

import { serverApiBaseUrl } from '@lib/api';
import { IDetailedProductOffer } from '@models/product';

import SupplierProductsCarousel from './supplierProductsCarousel';

export async function SupplierProducts(props: {
  id: number;
}) {
  const { id } = props;

  try {
    const response = await fetch(
      `${serverApiBaseUrl}/productOffers/by-seller/${id}`,
      {
        next: { revalidate: 36 },
      },
    );

    if (!response.ok) {
      return <div>محصولی پیدا نشد</div>;
    }

    const res = await response.json();
    const payload = res?.data;
    const items: IDetailedProductOffer[] = Array.isArray(payload)
      ? payload
      : Array.isArray(payload?.records)
        ? payload.records
        : Array.isArray(payload?.productOffers)
          ? payload.productOffers
          : [];

    if (items.length === 0) {
      return <div>محصولی پیدا نشد</div>;
    }

    return (
      <div className="mx-auto px-4 max-w-7xl">
        <SupplierProductsCarousel items={items} Loading={false} />
      </div>
    );
  } catch {
    return <div>محصولی پیدا نشد</div>;
  }
}
