import React from 'react';

import { SimpleProductCard } from '@components/molecules/productCard';
import { ISimpleProduct } from '@components/molecules/productCard/type';
import { ApiResponse } from '@models/base';

const baseUrl = process.env.INTERNAL_API_URL;

export async function RelatedProductByTag({ tagId }: { tagId: number }) {
  const response = await fetch(
    `${baseUrl}api/ProductOfferTags/tag/${tagId}`,{next: { revalidate: 36 }});
  const productsResponse: ApiResponse<ISimpleProduct[]> = await response.json();
  console.log(productsResponse)
  return (
    <div className="pb-10">
      <h2 className="mb-4 font-bold text-xl">محصولات دسته بندی</h2>
      <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
        {productsResponse.data.map((p, idx) => (
          <SimpleProductCard key={idx} product={p} />
        ))}
      </div>
    </div>
  );
}
