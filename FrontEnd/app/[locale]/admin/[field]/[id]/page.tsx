import FormGenerator from '@components/organisms/formGenerator';
import {
  getById,
  getFormConfigByEntityName,
} from '@lib/getAll';

export const dynamic = "force-dynamic";
interface PageProps {
  params: Promise<{
    field: string;
    id: string;
  }>;
}
export default async function Page({ params }: PageProps) {
  const { field, id } = await params;
   const defaultValues:Record<string, unknown> = await getById( field, id );
  console.log(defaultValues)
  const res = await getFormConfigByEntityName(field)
   return (
   <FormGenerator entityFormConfig={res} defaultValues={defaultValues}/>
  );
}
