import React from 'react';

import CategoryCard from '@components/molecules/categoryCart';
import { serverApiBaseUrl } from '@lib/api';
import { SimpleResponse } from '@models/base';
import { ICategory } from '@models/category';

export default async function ProductCategory({ id, }: { id: number }) {
  const response = await fetch(`${serverApiBaseUrl}/Categories/${id}`,{next: { revalidate: 36 }});
  const category: SimpleResponse<ICategory> = await response.json();
  const cat = category.data;
  return (
    <div className="gap-6 grid grid-cols-1 sm:grid-cols-3 py-10">
      <CategoryCard category={cat}  />
    </div>
  );
}
