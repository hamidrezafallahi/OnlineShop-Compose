import { Rate } from '@components/atoms/defaultElements/customRate';
import { ApiResponse } from '@models/base';
import { EnumTargetType } from '@models/comment';
import { IRate } from '@models/rate';

const baseUrl = process.env.INTERNAL_API_URL;
export default async function ProductRate({ id }: {id:number}) {
  const response = await fetch(`${baseUrl}api/Rates/average?targetType=${EnumTargetType.Product}&targetId=${id}`,{next: { revalidate: 36 }});
  const rate: ApiResponse<IRate> = await response.json();
  return (
    <div className="flex items-center gap-2">
      <Rate value={rate.data?.average ?? 0} />
      <span className="text-gray-200 text-sm">
        ({rate.data?.count ?? 0} نظر)
      </span>
    </div>
  );
}