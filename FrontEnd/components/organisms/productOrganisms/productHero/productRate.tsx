import { Rate } from '@components/atoms/defaultElements/customRate';
import { serverApiBaseUrl } from '@lib/api';
import { SimpleResponse } from '@models/base';
import { EnumTargetType } from '@models/comment';
import { IRate } from '@models/rate';

export default async function ProductRate({ id }: {id:number}) {
  const response = await fetch(`${serverApiBaseUrl}/Rates/average?targetType=${EnumTargetType.Product}&targetId=${id}`,{next: { revalidate: 36 }});
  const rate: SimpleResponse<IRate> = await response.json();
  return (
    <div className="flex items-center gap-2">
      <Rate value={rate.data?.average ?? 0} />
      <span className="text-gray-200 text-sm">
        ({rate.data?.count ?? 0} نظر)
      </span>
    </div>
  );
}