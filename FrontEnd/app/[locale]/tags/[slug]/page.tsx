import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';

import TagTemplate from '@components/templates/tagTemplate';
import { serverApiBaseUrl } from '@lib/api';
import { buildPageMetadata } from '@lib/seo';
import { SimpleResponse } from '@models/base';
import { ITag } from '@models/tag';

type Props = {
  params: Promise<{ slug: string; locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const tStore = await getTranslations({ locale, namespace: 'store' });

  const response = await fetch(`${serverApiBaseUrl}/Tags/${slug}`, {
    next: { revalidate: 36 },
  });

  if (response.status === 404) {
    return buildPageMetadata({
      locale,
      path: `tags/${slug}`,
      title: tStore('notFound'),
      description: tStore('notFoundHint'),
      noIndex: true,
    });
  }

  const res: SimpleResponse<ITag> = await response.json();
  if (!res.isSuccess) {
    return buildPageMetadata({
      locale,
      path: `tags/${slug}`,
      title: tStore('notFound'),
      description: tStore('notFoundHint'),
      noIndex: true,
    });
  }

  return buildPageMetadata({
    locale,
    path: `tags/${slug}`,
    title: res.data.name,
    description: res.data.name,
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const response = await fetch(`${serverApiBaseUrl}/Tags/${slug}`, {
    next: { revalidate: 36 },
  });
  const tagResponse: SimpleResponse<ITag> = await response.json();

  if (!tagResponse.isSuccess) {
    notFound();
  }

  return (
    <div className="store-page !pt-6">
      <TagTemplate Tag={tagResponse.data} />
    </div>
  );
}
