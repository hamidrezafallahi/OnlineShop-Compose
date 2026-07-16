import { Metadata } from 'next';

import CategoryCard from '@components/molecules/categoryCart';
import CustomPagination from '@components/molecules/pagination';
import { getAll } from '@lib/getAll';
import { ICategory } from '@models/category';

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "لیست دسته بندی ها",
    description: "همه دسته بندی ها را اینجا ببینید",
  };
}

export default async function Page({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = searchParams ? await searchParams : {};

  const page = parseInt(
    (Array.isArray(resolvedSearchParams?.page)
      ? resolvedSearchParams?.page[0]
      : resolvedSearchParams?.page) ?? "1"
  );
  const pageSize = parseInt(
    (Array.isArray(resolvedSearchParams?.pageSize)
      ? resolvedSearchParams?.pageSize[0]
      : resolvedSearchParams?.pageSize) ?? "10"
  );

  const response = await getAll<ICategory>("categories", {
    page: page,
    pageSize: pageSize,
    byConfig: false,
  });

  const categories = response?.data.records || [];

  return (
    <article className="flex flex-col gap-6 p-6">
      <header className="mb-4">
        <h1 className="mb-2 font-bold text-3xl">دسته‌بندی‌ها</h1>
        <p className="text-gray-100">تمام دسته‌بندی‌های وب سایت</p>
      </header>

      {categories.length === 0 ? (
        <div className="py-8 text-center">
          <p className="text-gray-200">هیچ دسته‌بندی‌ای یافت نشد.</p>
        </div>
      ) : (
        <>
          <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {categories.map((cat, index) => (
              <CategoryCard key={index} category={cat} />
            ))}
          </div>

          {response && response.data.totalPages > 1 && (
            <div className="mt-8">
              <CustomPagination
                pageSize={response.data.pageSize}
                total={response.data.totalCount}
                current={response.data.pageNumber}
              />
            </div>
          )}
        </>
      )}
    </article>
  );
}