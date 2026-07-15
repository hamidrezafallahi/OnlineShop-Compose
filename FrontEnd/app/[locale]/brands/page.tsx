import React from 'react';

import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import CustomPagination from '@components/molecules/pagination';
import { getAll } from '@lib/getAll';
import { PageParams } from '@models/base';
import { IBrand } from '@models/brand';

type Props = {
  params: Promise<{ locale: string }>;
};
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale == "fa" ? "لیست برند ها" : "brands list",
    description:
      locale == "fa" ? "همه برند ها را اینجا ببینید" : "see all brands here",
  };
}
export default async function Page({
  searchParams,
  params,
}:  PageParams<{locale: string}>) {
   const resolvedSearchParams =
    searchParams instanceof Promise ? await searchParams : searchParams;
  const resolvedParams = params instanceof Promise ? await params : params;

  const { locale } = resolvedParams;
  const page = parseInt(
    (resolvedSearchParams?.page as string) ?? "1"
  );
  const PageRecordCount = 10;

  const response = await getAll<IBrand>("brands", {
    page: page,
    pageSize: PageRecordCount,
    byConfig: false,
  });
  const brands: IBrand[] = response?.data?.records ?? [];
  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 py-10 max-w-7xl">
      <h1 className="mb-8 font-bold text-3xl text-center">تمام برندها</h1>

      {brands.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-gray-500">برندی یافت نشد.</p>
        </div>
      ) : (
        <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {brands.map((brand,index) => (
            <Link
            href={`/${locale}/brands/${brand.id}`}
              key={index}
              className="group relative bg-white shadow-sm hover:shadow-lg p-0 rounded-2xl overflow-hidden text-left transition-shadow"
            >
              <div className="w-full h-40 md:h-44 overflow-hidden">
                <Image
                  src={brand.logoFile}
                  alt={brand.name}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform transform"
                  loading={index<5?"eager":"lazy"}
                  priority={index<5}
                />
              </div>
              <div className="p-4 sm:p-5">
                <h3 className="font-medium">{brand.name}</h3>
                <p className="text-gray-500 text-xs">{brand.description}</p>
                <span className="inline-block mt-3 font-medium text-primary text-sm">
                  مشاهده برند →
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
      <CustomPagination
        pageSize={PageRecordCount}
        total={response?.data.totalCount || 0}
        current={page}
      />
    </div>
  );
}
