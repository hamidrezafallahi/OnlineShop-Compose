import FormGenerator from '@components/organisms/formGenerator';
import {
  getById,
  getFormConfigByEntityName,
} from '@lib/getAll';
import { PageParams } from '@models/base';

export const dynamic = "force-dynamic";
 
export default async function Page({ params }:PageParams<{id: string,field:string}>) {
  const { field, id } = await params;
   const defaultValues:Record<string, unknown> = await getById( field, id );
  console.log(defaultValues)
  const res = await getFormConfigByEntityName(field)
   return (
   <FormGenerator entityFormConfig={res} defaultValues={defaultValues}/>
  );
}
