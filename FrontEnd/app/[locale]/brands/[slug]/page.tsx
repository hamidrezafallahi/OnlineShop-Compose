import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

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
    cache: 'no-store',
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

  const res: IBrand = await response.json();

  return buildPageMetadata({
    locale,
    path: `brands/${slug}`,
    title: res.name,
    description: res.description,
    images: [res.logoFile],
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;

  const response = await fetch(`${serverApiBaseUrl}/Brands/${slug}`, {
    cache: 'no-store',
  });
  const brandResponse: SimpleResponse<IBrand> = await response.json();
  const brand: IBrand = brandResponse.data;

  return (
    <div className="store-page !pt-6">
      <BrandTemplate brand={brand} />
    </div>
  );
}
