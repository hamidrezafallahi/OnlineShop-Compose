import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { BlogCard } from '@components/molecules/blog';
import CustomPagination from '@components/molecules/pagination';
import EmptyState from '@components/molecules/storefront/EmptyState';
import PageHeader from '@components/molecules/storefront/PageHeader';
import { getAll } from '@lib/getAll';
import { buildPageMetadata } from '@lib/seo';
import { IBlog } from '@models/Blog';

type Props = {
  params: Promise<{ locale: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blog' });

  return buildPageMetadata({
    locale,
    path: 'blog',
    title: t('title'),
    description: t('subtitle'),
  });
}

export default async function Page({ params, searchParams }: Props) {
  const { locale } = await params;
  const query = searchParams ? await searchParams : undefined;
  const t = await getTranslations({ locale, namespace: 'blog' });
  const page = parseInt((query?.page as string) ?? '1');
  const pageRecordCount = 12;

  const response = await getAll<IBlog>('blogs', {
    page,
    pageSize: pageRecordCount,
    byConfig: false,
  });

  const posts = response?.data.records ?? [];

  return (
    <article className="store-page !pt-6">
      <PageHeader title={t('title')} description={t('subtitle')} />

      {posts.length === 0 ? (
        <EmptyState title={t('empty')} description={t('emptyHint')} />
      ) : (
        <section className="gap-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((item) => (
            <BlogCard key={item.slug} blog={item} />
          ))}
        </section>
      )}

      <div className="flex justify-center">
        <CustomPagination
          pageSize={pageRecordCount}
          total={response?.data.totalCount || 0}
          current={page}
        />
      </div>
    </article>
  );
}
