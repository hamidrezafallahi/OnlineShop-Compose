import React from 'react';

import BrandCard from '@components/molecules/brandCard';
import { ApiResponse } from '@models/base';
import { IBrand } from '@models/brand';

const baseUrl = process.env.INTERNAL_API_URL;

export default async function ProductBrand({ id }: { id: number }) {
  const response = await fetch(`${baseUrl}api/Brands/${id}`,{next: { revalidate: 36 }});
  const brands: ApiResponse<IBrand> = await response.json();
  const brand = brands.data;
  return (
    <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 py-10">
      <BrandCard brand={brand} />
    </div>
  );
}
