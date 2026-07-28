import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import CategoryTemplate from '@components/templates/categoryTemplate';
import { serverApiBaseUrl } from '@lib/api';
import { buildPageMetadata } from '@lib/seo';

export const dynamicParams = true;

type Props = {
  params: Promise<{ slug: string; locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const tStore = await getTranslations({ locale, namespace: 'store' });

  try {
    const response = await fetch(`${serverApiBaseUrl}/Categories/${slug}`, {
      next: { revalidate: 36 },
    });
    const result = await response.json();
    const category = result.data;

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
      images: [category.CategoryCover || category.categoryCover],
    });
  } catch {
    return buildPageMetadata({
      locale,
      path: `categories/${slug}`,
      title: tStore('loadError'),
      description: tStore('loadErrorHint'),
      noIndex: true,
    });
  }
}

export default async function Page({ params }: Props) {
  const { slug, locale } = await params;
  const tStore = await getTranslations({ locale, namespace: 'store' });

  try {
    const response = await fetch(`${serverApiBaseUrl}/Categories/${slug}`, {
      next: { revalidate: 36 },
    });

    if (response.status === 404) {
      return (
        <div className="store-page">
          <div className="store-empty">
            <h1 className="store-empty-title">{tStore('notFound')}</h1>
            <p className="store-empty-desc">{tStore('notFoundHint')}</p>
          </div>
        </div>
      );
    }

    const result = await response.json();
    const category = result.data;
    return (
      <div className="store-page !pt-6">
        <CategoryTemplate category={category} />
      </div>
    );
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
}
