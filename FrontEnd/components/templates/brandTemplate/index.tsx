import React from 'react';

import { Banner } from '@components/molecules/banner';
import {
  BrandCategories,
  BrandDescription,
  BrandProducts,
  BrandSuppliers,
} from '@components/organisms/brandOrganisms';
import { IBrand } from '@models/brand';

export default async  function BrandTemplate({ brand }: { brand: IBrand}) {
  return (
    <>
      <div className="flex flex-col gap-6 p-6">
        <Banner src={brand.logoFile} name={brand.name} />
        <BrandDescription brand={brand}/>
        <BrandProducts id={brand.id} />
       <BrandCategories  id={brand.id} />
      <BrandSuppliers id={brand.id} />

      </div>
    </>
  );
}
