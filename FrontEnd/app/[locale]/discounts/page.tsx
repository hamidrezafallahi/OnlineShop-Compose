import { Metadata } from 'next';

import CustomPagination from '@components/molecules/pagination';
import { getAll } from '@lib/getAll';
import { IBlog } from '@models/Blog';

type Props = {
  params: Promise<{ locale: string}>;
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title:locale == 'fa'?"لیست تخفیف ها":'blog list',
    description:locale == 'fa'? "همه تخفیفات ما را اینجا ببینید":'see all discounts here',
  };
}
export const dynamic = "force-dynamic";

export default async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
    const params = await searchParams;
  const page = parseInt((params?.page as string) ?? "1");
  const PageRecordCount = 10;
  const response = await getAll<IBlog>("discounts", {
    page: page,
    pageSize: PageRecordCount,
    byConfig: false
  });  
  return (
    <article className="flex flex-col gap-6 p-6 pt-28">
      <section className="flex flex-wrap gap-4">
صفحه تخفیفات
      </section>
      <CustomPagination pageSize={PageRecordCount} total={response?.data.totalCount||0} current={page}  />
    </article>
  );
}


