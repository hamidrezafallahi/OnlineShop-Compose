import { cookies } from 'next/headers';

import {
  ApiResponse,
  PagedResponse,
} from '@models/base';

const baseUrl = process.env.INTERNAL_API_URL;

export async function getAll<T>(
  entity: string,
  { page, pageSize, byConfig, filter, onlyActives }: { page?: number; pageSize?: number; byConfig?: boolean, onlyActives?: boolean, filter?: string } = {}
): Promise<PagedResponse<T>> {
  const params = new URLSearchParams();
  if (page !== undefined) params.append("page", String(page));
  if (pageSize !== undefined) params.append("pageSize", String(pageSize));
  if (byConfig !== undefined) params.append("byConfig", String(byConfig));
  if (filter !== undefined) params.append("q", String(filter));
  if (onlyActives !== undefined) params.append("onlyActives", String(onlyActives));
  const url = `${baseUrl}/api/${entity}?${params.toString()}`;
   try {
    const res = await fetch(url, { cache: "no-store", next: { tags: [entity] } });
    const text = await res.text();
    return JSON.parse(text) as PagedResponse<T>;
  } catch (e) {
    console.error(`Invalid JSON response from ${url}`, e);
    return {
      isSuccess: false, error: `Invalid JSON response from ${url}`, data: {
        records: [],
        columnsJson: '',
        actionsJson: '',
        totalCount: 0,
        pageNumber: 0,
        pageSize: 0,
        totalPages: 0
      }
    };
  }
}



export async function getById(entity: string, id: string): Promise<Record<string, any>> {
  const cookieStore = await cookies();
  const token = cookieStore.get('candyAccess')?.value;
  const res = await fetch(`${baseUrl}api/${entity}/${id}`, {
 headers: {
      "Authorization": `Bearer ${token || ''}`,
      "Content-Type": 'application/json'
    },




    //     next: {
    //       revalidate: 1,
    //       tags: ["genderFilter", "statusFilter", "speciesFilter"],
    //     },
    //   }


    //, {
      cache: "no-store",
    });
   const data: Promise<ApiResponse<any>> = await res.json();
  return (await data).data;
}
export async function getFormConfigByEntityName(entity: string) {
  const res = await fetch(`${baseUrl}/api/EntityConfigs/entityFormConfig/${entity}`, {
   
    // next: {
    //   revalidate: 1,
    //   tags: ["genderFilter", "statusFilter", "speciesFilter"],
    // },
    // }


    // ,{
    cache: "no-store",
  });
  const data = await res.json();
   return data.data;
}

