import {
  getLocale,
  getTranslations,
} from 'next-intl/server';

import { IDetailedProduct } from '@models/product';

import ProductPrice from './productPrice';
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

      {(product.brandName || product.categoryName) && (
        <div className="flex flex-wrap gap-2">
          {product.brandName && (
            <span className="rounded-full bg-sky-500/15 px-3 py-1 text-xs text-sky-200">
              {product.brandName}
            </span>
          )}
          {product.categoryName && (
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/80">
              {product.categoryName}
            </span>
          )}
        </div>
      )}

      {product.description && (
        <p className="text-gray-300 line-clamp-3">{product.description}</p>
      )}

      <ProductPrice
        price={product.price}
        finalPrice={product.finalPrice}
        currency={product.currency}
        inStock={product.inStock}
        inventory={product.inventory}
        locale={locale}
      />

      <ProductRate
        id={product.id}
        average={product.averageRate}
        count={product.rateCount}
      />

      {product.dimensions && (
        <div className="flex flex-wrap gap-4 text-sm text-white/75">
          {product.dimensions.width ? (
            <p>{t('product.width')}: {formatLength(product.dimensions.width)}</p>
          ) : null}
          {product.dimensions.height ? (
            <p>{t('product.height')}: {formatLength(product.dimensions.height)}</p>
          ) : null}
          {product.dimensions.depth ? (
            <p>{t('product.depth')}: {formatLength(product.dimensions.depth)}</p>
          ) : null}
          {product.dimensions.weight ? (
            <p>{t('product.weight')}: {formatWeight(product.dimensions.weight)}</p>
          ) : null}
        </div>
      )}
    </div>
  );
}
