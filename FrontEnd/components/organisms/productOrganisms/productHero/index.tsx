// components/product/ProductHero.tsx
import { IDetailedProduct } from '@models/product';

import ProductGallery from './productGallery';
import ProductInfo from './productInfo';

interface Props {
  product: IDetailedProduct;
}
export default function ProductHero({ product }: Props) {
  return (
<section className="items-start gap-6 grid grid-cols-1 md:grid-cols-2">
      <ProductGallery product={product} />
      <ProductInfo product={product} />
    </section>
  );
}
