import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { permanentRedirect } from 'next/navigation';

import ProductBrand from '@components/organisms/productOrganisms/productBrand';
import ProductCategory from '@components/organisms/productOrganisms/productCategory';
import { ProductDetailsTabs } from '@components/organisms/productOrganisms/productDetailsTabs';
import ProductHero from '@components/organisms/productOrganisms/productHero';
import { ProductSupplierExtended } from '@components/organisms/productOrganisms/productSuppliers';
import ProductTags from '@components/organisms/productOrganisms/productTags';
import JsonLd from '@components/molecules/storefront/JsonLd';
import { serverApiBaseUrl } from '@lib/api';
import { absoluteUrl, buildPageMetadata } from '@lib/seo';

export const dynamicParams = true;

async function fetchProduct(slug: string) {
  const response = await fetch(`${serverApiBaseUrl}/Products/${slug}`, {
    next: { revalidate: 36 },
  });
  return response;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale?: string }>;
}): Promise<Metadata> {
  const { slug, locale = 'fa' } = await params;
  const tStore = await getTranslations({ locale, namespace: 'store' });

  try {
    const response = await fetchProduct(slug);
    if (response.status === 404) {
      return buildPageMetadata({
        locale,
        path: `products/${slug}`,
        title: tStore('notFound'),
        description: tStore('notFoundHint'),
        noIndex: true,
      });
    }

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const result = await response.json();
    const product = result.data || result;
    const canonicalSlug = product?.slug || slug;
    const title =
      product?.name || product?.title || (locale === 'fa' ? 'محصول' : 'Product');
    const description = product?.description || '';
    const image =
      product?.imageUrls?.[0] || product?.imageUrl || product?.image;

    return buildPageMetadata({
      locale,
      path: `products/${canonicalSlug}`,
      title,
      description,
      images: [image],
    });
  } catch {
    return buildPageMetadata({
      locale,
      path: `products/${slug}`,
      title: 'Product',
      description: '',
      noIndex: true,
    });
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const tStore = await getTranslations({ locale, namespace: 'store' });

  let response: Response;
  try {
    response = await fetchProduct(slug);
  } catch {
    return (
      <div className="store-page">
        <div className="store-empty">
          <h1 className="store-empty-title">{tStore('loadError')}</h1>
          <p className="store-empty-desc">{tStore('loadErrorHint')}</p>
        </div>
      </div>
    );
  }

  if (response.status === 404) {
    return (
      <div className="store-page">
        <div className="store-empty">
          <h1 className="store-empty-title">{tStore('notFound')}</h1>
          <p className="store-empty-desc">{tStore('notFoundHint')}</p>
          <Link href={`/${locale}/products`} className="store-btn store-btn-primary mt-4">
            {tStore('backHome')}
          </Link>
        </div>
      </div>
    );
  }

  if (!response.ok) {
    return (
      <div className="store-page">
        <div className="store-empty">
          <h1 className="store-empty-title">{tStore('loadError')}</h1>
          <p className="store-empty-desc">{tStore('loadErrorHint')}</p>
        </div>
      </div>
    );
  }

  const result = await response.json();
  const product = result.data || result;

  // Legacy numeric URLs → permanent SEO slug (must not be inside a broad try/catch).
  if (product?.slug && product.slug !== slug && /^\d+$/.test(slug)) {
    permanentRedirect(`/${locale}/products/${product.slug}`);
  }

  const canonicalSlug = product?.slug || slug;
  const image =
    product?.imageUrls?.[0] || product?.imageUrl || product?.image;
  const productUrl = absoluteUrl(locale, `products/${canonicalSlug}`);

  const productLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name || product.title,
    description: product.description,
    image: image ? [image] : undefined,
    url: productUrl,
    sku: product.sku || product.id,
    brand: product.brandName
      ? { '@type': 'Brand', name: product.brandName }
      : undefined,
  };

  return (
    <article className="store-page !pt-6">
      <JsonLd data={productLd} />
      <ProductHero product={product} />
      <ProductBrand id={product.brandId} />
      <ProductCategory id={product.categoryId} />
      <ProductTags id={product.id} />
      <ProductSupplierExtended productId={product.id} />
      <ProductDetailsTabs product={product} />
    </article>
  );
}
