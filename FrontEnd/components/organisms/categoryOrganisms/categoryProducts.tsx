import React from 'react';

import { getLocale } from 'next-intl/server';

import { SimpleProductCard } from '@components/molecules/productCard';
import { ApiResponse } from '@models/base';
import { ILandingProduct } from '@models/product';

const baseUrl = process.env.INTERNAL_API_URL;

export async function CategoryProducts({id}:{id:number}) {
    const response = await fetch(`${baseUrl}/api/Products/getProductByCategoryId/${id}`,
    {
      cache: "no-store",
    },
  );
  const productsResponse: ApiResponse<ILandingProduct[]> = await response.json();
  const products: ILandingProduct[] = productsResponse.data;
  console.log(productsResponse)
  const locale = await getLocale()
  return (
     <div className="pb-10">
          <h2 className="mb-4 font-bold text-xl">محصولات دسته بندی</h2>
          <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
            {products.map((product,idx) => (<SimpleProductCard key={idx} product={product}/>
    
            ))}
          </div>
        </div>
  )
}
