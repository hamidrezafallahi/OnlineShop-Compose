import React from 'react';

import { Metadata } from 'next';

import CustomPagination from '@components/molecules/pagination';
import TagCard from '@components/molecules/tagCard';
import { getAll } from '@lib/getAll';
import { IProductTag } from '@models/tag';

type Props = {
  params: Promise<{ locale: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale == "fa" ? "لیست تگ ها" : "Tag list",
    description:
      locale == "fa" ? "همه تگ ها را اینجا ببینید" : "see all tags here",
  };
}

export default async function Page({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const PageNumber = parseInt((resolvedSearchParams?.page as string) ?? "1");
  const PageRecordCount = 10;

  const response = await getAll<IProductTag>("ProductTag", {
    page: PageNumber,
    pageSize: PageRecordCount,
    byConfig: false,
  });

  const tags: IProductTag[] = response?.data?.records ?? [];

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 py-10 max-w-7xl">
      <h1 className="mb-8 font-bold text-3xl text-center">تمام تگ ها</h1>

      {tags.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-gray-500">تگی یافت نشد.</p>
        </div>
      ) : (
        <div className="flex flex-wrap justify-start items-center gap-4">
          {tags.map((tag, index) => (
            <TagCard key={index} tag={{ id: tag.id, name: tag.tagName }} />
          ))}
        </div>
      )}
      <CustomPagination
        pageSize={PageRecordCount}
        total={response?.data.totalCount || 0}
        current={PageNumber}
      />
    </div>
  );
}