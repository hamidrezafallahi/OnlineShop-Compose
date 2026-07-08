import {
  getLocale,
  getTranslations,
} from 'next-intl/server';

import { IDetailedProduct } from '@models/product';

import ProductRate from './productRate';

export default async function ProductInfo({ product }: { product: IDetailedProduct }) {
  const locale = await getLocale();
  const t = await getTranslations();

  const formatLength = (value: number) => {
    const unit = locale === 'en' ? 'inch' : 'centimeter';
    const converted = locale === 'en' ? value / 2.54 : value;
    return new Intl.NumberFormat(locale, { style: 'unit', unit, unitDisplay: 'short' }).format(converted);
  };

  const formatWeight = (value: number) => {
    const unit = locale === 'en' ? 'ounce' : 'gram';
    const converted = locale === 'en' ? value / 28.3495 : value;
    return new Intl.NumberFormat(locale, { style: 'unit', unit, unitDisplay: 'short' }).format(converted);
  };

  return (
    <div className="flex flex-col gap-4 max-w-xl">
      <h1 className="font-semibold text-2xl md:text-3xl">{product.name}</h1>

      {product.description && (
        <p className="text-gray-700 line-clamp-3">{product.description}</p>
      )}

      {product.dimensions && (
        <div className="flex flex-wrap gap-4">
          {product.dimensions.width && (
            <p>{t('product.width')}: {formatLength(product.dimensions.width)}</p>
          )}
          {product.dimensions.height && (
            <p>{t('product.height')}: {formatLength(product.dimensions.height)}</p>
          )}
          {product.dimensions.depth && (
            <p>{t('product.depth')}: {formatLength(product.dimensions.depth)}</p>
          )}
          {product.dimensions.weight && (
            <p>{t('product.weight')}: {formatWeight(product.dimensions.weight)}</p>
          )}
        </div>
      )}

      <ProductRate id={product.id} />
      {/* <ProductPrice product={product} /> */}
    </div>
  );
}