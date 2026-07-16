import React from 'react';

import FormGenerator from '@components/organisms/formGenerator';
import { getFormConfigByEntityName } from '@lib/getAll';

export const dynamic = "force-dynamic";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; field: string }>;
}) {
  const { field } = await params;
  const res = await getFormConfigByEntityName(field);
  return <FormGenerator entityFormConfig={res} />;
}