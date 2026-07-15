import React from 'react';

import { ApiResponse } from '@models/base';
import { IDetailedProductOffer } from '@models/product';

import SupplierProductsCarousel from './supplierProductsCarousel';

const baseUrl = process.env.INTERNAL_API_URL;
export async function SupplierProducts(props: {
  id: number; // IDetailedProduct[]
}) {
  const { id } = props;
  const response = await fetch(`${baseUrl}/api/productOffers/by-seller/${id}`, {
    next: { revalidate: 36 },
  });
  const res: ApiResponse<IDetailedProductOffer> = await response.json();
  if (!res.isSuccess) {
    return <div>محصولی پیدا نشد</div>;
  }
  return (
    <div className="mx-auto px-4 max-w-7xl">
      <SupplierProductsCarousel items={res.data.records} Loading={false} />
    </div>
  );
}
