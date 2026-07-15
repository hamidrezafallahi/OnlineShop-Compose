import FormGenerator from '@components/organisms/formGenerator';
import {
  getById,
  getFormConfigByEntityName,
} from '@lib/getAll';

export const dynamic = "force-dynamic";

export default async function Page({
  params,
}: {
  params: { field: string; id: string };
}) {
  const { field, id } = await Promise.resolve(params);
  const defaultValues:Record<string, unknown> = await getById( field, id );
  console.log(defaultValues)
  const res = await getFormConfigByEntityName(field)
   return (
   <FormGenerator entityFormConfig={res} defaultValues={defaultValues}/>
  );
}
