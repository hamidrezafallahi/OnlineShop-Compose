import React, { use } from 'react';

import { ITreeContext } from '@components/atoms/defaultElements/tree';
import AdminCategoryTemplate from '@components/templates/admin/categories';
import {
  getAll,
  getFormConfigByEntityName,
} from '@lib/getAll';
import { PageParams } from '@models/base';

export const dynamic = "force-dynamic";
export default async function Page({
  searchParams,
}: PageParams<{locale: string}>) {
  const resolvedSearchParams = searchParams ? use(searchParams) : undefined;
  const page = parseInt((resolvedSearchParams?.page as string) ?? "1");
  const pageSize = parseInt(
    (resolvedSearchParams?.pageSize as string) ?? "10000",
  );
  const list = await getAll<ITreeContext>("Categories", {
    page,
    pageSize,
    byConfig: true,
    onlyActives: false,
  });
  const res = await getFormConfigByEntityName("Categories");

  return (
    <div className="p-6">
      <h1 className="mb-4 font-semibold text-lg">لیست دسته‌بندی‌ها</h1>
      <AdminCategoryTemplate
        categories={list?.data.records ?? []}
        entityFormConfig={res}
      />
    </div>
  );
}
