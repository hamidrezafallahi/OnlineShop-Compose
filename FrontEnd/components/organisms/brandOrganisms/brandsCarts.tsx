import React from 'react';

import BrandCard from '@components/molecules/brandCard';
import { IBrand } from '@models/brand';

export async function BrandsCards({ brands }: { brands: IBrand[] }) {
 
 
  return (
    <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
      {brands.map((b,idx) => (<BrandCard brand={b} key={idx}/>))}
    </div>
  );
}
