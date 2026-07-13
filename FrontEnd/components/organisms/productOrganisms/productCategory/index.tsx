import React from 'react';

import CategoryCard from '@components/molecules/categoryCart';
import { ApiResponse } from '@models/base';
import { ICategory } from '@models/category';

const baseUrl = process.env.INTERNAL_API_URL;

export default async function ProductCategory({ id, }: { id: number }) {
  const response = await fetch(`${baseUrl}/api/Categories/${id}`,{next: { revalidate: 36 }});
  const category: ApiResponse<ICategory> = await response.json();
  const cat = category.data;
  return (
    <div className="gap-6 grid grid-cols-1 sm:grid-cols-3 py-10">
      <CategoryCard category={cat}  />
    </div>
  );
}
