import 'server-only';

import { PagedResponse } from '@models/base';
import {
  CategoryRequestQueries,
  ICategory,
} from '@models/category';

const baseUrl = process.env.INTERNAL_API_URL!;
export async function getCategories({ queries }: CategoryRequestQueries = { queries: {} as any }) {
  const { ByConfig, IsShowInLanding, Page, PageSize } = (await queries) || {};
  const params = new URLSearchParams();
  if (Page !== undefined) params.append("page", Page.toString());
  if (PageSize !== undefined) params.append("PageSize", PageSize.toString());
  if (ByConfig !== undefined) params.append("ByConfig", ByConfig.toString());
  if (IsShowInLanding !== undefined) params.append("IsShowInLanding", IsShowInLanding.toString());
  const url = `${baseUrl}/api/Categories?${params.toString()}`;
  try {
    const res = await fetch(url, {
      cache: "no-store",
    });
    const data: PagedResponse<ICategory> = await res.json()
    return data;

  } catch (error) {
    console.log(error)
  }
}
