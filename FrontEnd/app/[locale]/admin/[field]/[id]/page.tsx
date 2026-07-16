import FormGenerator from '@components/organisms/formGenerator';
import {
  getById,
  getFormConfigByEntityName,
} from '@lib/getAll';

export const dynamic = "force-dynamic";

// حذف PageParams و استفاده از نوع مستقیم
export default async function Page({
  params,
}: {
  params: Promise<{ id: string; field: string }>;
}) {
  const { field, id } = await params;
  const defaultValues: Record<string, unknown> = await getById(field, id);
  const res = await getFormConfigByEntityName(field);
  return <FormGenerator entityFormConfig={res} defaultValues={defaultValues} />;
}