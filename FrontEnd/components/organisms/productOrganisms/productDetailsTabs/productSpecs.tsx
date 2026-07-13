import { ApiResponse } from '@models/base';
import { ISpecificationResponse } from '@models/product';

const baseUrl = process.env.INTERNAL_API_URL;

export default async function ProductSpecs({ id }: {id:number}) { 
   const response = await fetch(
      `${baseUrl}/api/Products/getSpecifications/${id}`,
      {
        next: { revalidate: 36 }, // ISR
      },
    );
  
    if (!response.ok) {
      throw new Error("Failed to fetch comments");
    }
  
    const specs:ApiResponse<ISpecificationResponse> = await response.json();
  if (!specs.data || specs.data.specifications.length === 0) {
    return (
      <p className="text-gray-400 text-sm">
        مشخصات فنی برای این محصول ثبت نشده است.
      </p>
    );
  }

  return (
    <ul className="space-y-3 text-sm">
      {specs.data.specifications.map((s, i) => (
        <li
          key={i}
          className="flex justify-between gap-4 pb-2 border-b w-fit"
        >
          <span className="text-gray-500">{s.key} :</span>
          <span className="font-medium">{s.value}</span>
        </li>
      ))}
    </ul>
  );
}
