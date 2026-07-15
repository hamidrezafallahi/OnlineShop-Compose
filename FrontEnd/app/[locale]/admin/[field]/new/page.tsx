import React from 'react';

import FormGenerator from '@components/organisms/formGenerator';
import { getFormConfigByEntityName } from '@lib/getAll';
import { PageParams } from '@models/base';

export const dynamic = "force-dynamic";

export default async function Page({ params }:  PageParams<{locale: string,field:string}>) {
  const resolvedParams = await params;
  const field = resolvedParams.field;
  const res = await getFormConfigByEntityName(field);
   return <FormGenerator  entityFormConfig={res} />;
}
