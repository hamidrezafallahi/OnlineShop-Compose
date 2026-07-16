import React from 'react';

import CategoryCard from '@components/molecules/categoryCart';
import { SimpleResponse } from '@models/base';
import { ICategory } from '@models/category';

const baseUrl = process.env.INTERNAL_API_URL;

export async function BrandCategories({ id }: { id: number }) {
  const response = await fetch(
    `${baseUrl}/api/Brands/getProductsCategoriesByBrandId/${id}`,
    {
      cache: "no-store",
    },
  );
  const categoriesResponse: SimpleResponse<ICategory[]> = await response.json();
  const categories: ICategory[] = categoriesResponse.data;
  return (
    <div className="my-10">
      <h2 className="mb-4 font-bold text-xl">دسته‌بندی‌ها</h2>
      <div className="flex gap-4 pb-2 overflow-x-auto">
        {categories.map((cat, idx) => (
          <CategoryCard key={idx} category={cat}/>
        ))}
      </div>
    </div>
  );
}
