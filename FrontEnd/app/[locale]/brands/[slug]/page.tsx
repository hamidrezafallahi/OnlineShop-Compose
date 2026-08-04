import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { permanentRedirect } from 'next/navigation';

import SeoHighlight from '@components/molecules/storefront/SeoHighlight';
import StoreBreadcrumbs from '@components/molecules/storefront/StoreBreadcrumbs';
import BrandTemplate from '@components/templates/brandTemplate';
import { serverApiBaseUrl } from '@lib/api';
import { buildPageMetadata } from '@lib/seo';
import { SimpleResponse } from '@models/base';
import { IBrand } from '@models/brand';

type Props = {
  params: Promise<{ slug: string; locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const tStore = await getTranslations({ locale, namespace: 'store' });

  const response = await fetch(`${serverApiBaseUrl}/Brands/${slug}`, {
    next: { revalidate: 300 },
  });

  if (response.status === 404) {
    return buildPageMetadata({
      locale,
      path: `brands/${slug}`,
      title: tStore('notFound'),
      description: tStore('notFoundHint'),
      noIndex: true,
    });
  }

  const envelope = await response.json();
  const res: IBrand = envelope?.data ?? envelope;
  const canonical = res.slug || String(res.id);
  const title =
    (locale === 'fa' ? res.seoTitleFa : res.seoTitleEn) || res.name;
  const description =
    (locale === 'fa' ? res.metaDescriptionFa : res.metaDescriptionEn) ||
    res.description;

  return buildPageMetadata({
    locale,
    path: `brands/${canonical}`,
    title,
    description,
    images: [res.logoFile],
  });
}

export default async function Page({ params }: Props) {
  const { slug, locale } = await params;

  const response = await fetch(`${serverApiBaseUrl}/Brands/${slug}`, {
    next: { revalidate: 300 },
  });
  const brandResponse: SimpleResponse<IBrand> = await response.json();
  const brand: IBrand = brandResponse.data;

  if (brand?.slug && brand.slug !== slug && /^\d+$/.test(slug)) {
    permanentRedirect(`/${locale}/brands/${brand.slug}`);
  }

  const seoTitle =
    (locale === 'fa' ? brand?.seoTitleFa : brand?.seoTitleEn) || null;
  const seoDescription =
    (locale === 'fa' ? brand?.metaDescriptionFa : brand?.metaDescriptionEn) ||
    null;

  return (
    <div className="store-page !pt-6">
      <StoreBreadcrumbs
        locale={locale}
        items={[
          { name: locale === 'fa' ? 'خانه' : 'Home', path: '' },
          { name: locale === 'fa' ? 'برندها' : 'Brands', path: 'brands' },
          { name: brand?.name || slug },
        ]}
      />
      <SeoHighlight locale={locale} title={seoTitle} description={seoDescription} />
      <BrandTemplate brand={brand} />
    </div>
  );
}
