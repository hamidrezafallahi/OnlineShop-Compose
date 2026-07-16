import { Metadata } from 'next';

import CustomPagination from '@components/molecules/pagination';
import SupplierCard from '@components/molecules/supplierCard';
import { getAll } from '@lib/getAll';
import { IUser } from '@models/user';

type Props = {
  params: Promise<{ locale: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale == "fa" ? "لیست تامین کنندگان" : "supplier list",
    description:
      locale == "fa" ? "همه تامین کنندگان را اینجا ببینید" : "see all suppliers here",
  };
}

export default async function Page({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const PageNumber = parseInt((resolvedSearchParams?.Page as string) ?? "1");
  const PageSize = 10;

  const response = await getAll<IUser>("productOffers/suppliers", {
    page: PageNumber,
    pageSize: PageSize,
    byConfig: false,
  });

  const suppliers: IUser[] = response?.data.records ?? [];
  const totalCount = response?.data.totalCount ?? 0;
  const pageNumber = response?.data.pageNumber ?? 0;

  return (
    <article className="flex flex-col gap-6 p-6 pt-24">
      <section className="gap-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {suppliers.map((s, idx) => (
          <SupplierCard supplier={s} key={idx} />
        ))}
      </section>

      <CustomPagination pageSize={PageSize} total={totalCount} current={pageNumber} />
    </article>
  );
}