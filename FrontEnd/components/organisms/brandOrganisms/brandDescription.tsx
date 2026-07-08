import React from 'react';

import { IBrand } from '@models/brand';

export  function BrandDescription({ brand }: { brand: IBrand }) {
  return (
    <div>{brand.description}</div>
  )
}
