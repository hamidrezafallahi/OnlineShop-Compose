import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import CategoryTemplate from '@components/templates/categoryTemplate';
import { serverApiBaseUrl } from '@lib/api';
import { buildPageMetadata } from '@lib/seo';
import type { ICategory } from '@models/category';

export const dynamicParams = true;

type Props = {
  params: Promise<{ slug: string; locale: string }>;
};

async function fetchCategory(slug: string): Promise<ICategory | null> {
  try {
    const response = await fetch(`${serverApiBaseUrl}/Categories/${slug}`, {
      next: { revalidate: 36 },
    });

    if (!response.ok) {
      return null;
    }

    const result = await response.json();
    return (result?.data ?? null) as ICategory | null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const tStore = await getTranslations({ locale, namespace: 'store' });
  const category = await fetchCategory(slug);

  if (!category) {
    return buildPageMetadata({
      locale,
      path: `categories/${slug}`,
      title: tStore('notFound'),
      description: tStore('notFoundHint'),
      noIndex: true,
    });
  }

  const title =
    locale === 'fa' ? category.persianName : category.englishName;
  const description =
    locale === 'fa'
      ? category.categoryPersianDesc
      : category.categoryEnglishDesc;

  return buildPageMetadata({
    locale,
    path: `categories/${slug}`,
    title,
    description,
    images: [category.categoryCover],
  });
}

export default async function Page({ params }: Props) {
  const { slug, locale } = await params;
  const tStore = await getTranslations({ locale, namespace: 'store' });
  const category = await fetchCategory(slug);

  if (!category) {
    return (
      <div className="store-page">
        <div className="store-empty">
          <h1 className="store-empty-title">{tStore('notFound')}</h1>
          <p className="store-empty-desc">{tStore('notFoundHint')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="store-page !pt-6">
      <CategoryTemplate category={category} />
    </div>
  );
}
