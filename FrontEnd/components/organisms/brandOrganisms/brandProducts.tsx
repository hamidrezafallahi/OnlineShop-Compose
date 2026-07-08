import React from 'react';

import { getLocale } from 'next-intl/server';

import { SimpleProductCard } from '@components/molecules/productCard';
import { IProduct } from '@lib/product';
import { ApiResponse } from '@models/base';

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export async function BrandProducts({ id }: { id: number }) {
  const response = await fetch(
    `${baseUrl}api/Brands/getProductByBrandId/${id}`,{next: { revalidate: 36 }});
  const productsResponse: ApiResponse<IProduct[]> = await response.json();
  const products: IProduct[] = productsResponse.data;
  const locale = await getLocale()
  return (
    <div className="py-10">
      <h2 className="mb-4 font-bold text-xl">محصولات برند</h2>
      <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
        {products.map((product,idx) => (<SimpleProductCard key={idx} product={product} />

        ))}
      </div>
    </div>
  );
}
