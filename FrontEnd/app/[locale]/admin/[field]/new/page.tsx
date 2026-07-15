import React from 'react';

import FormGenerator from '@components/organisms/formGenerator';
import { getFormConfigByEntityName } from '@lib/getAll';

interface PageProps {
  params: Promise<{
    locale: string;
    field: string;
  }>;
}
export const dynamic = "force-dynamic";

export default async function NewEntityPage({ params }: PageProps) {
  const resolvedParams = await params;
  const field = resolvedParams.field;
  const res = await getFormConfigByEntityName(field);
   return <FormGenerator  entityFormConfig={res} />;
}
