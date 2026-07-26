import React from 'react';

import TagCard from '@components/molecules/tagCard';
import { apiBaseUrl } from '@lib/api';
import { SimpleResponse } from '@models/base';
import { IProductTags } from '@models/product';

export default async function ProductTags({ id }: { id: number }) {
  const response = await fetch(`${apiBaseUrl}/api/ProductOfferTags/productId/${id}`,{next: { revalidate: 36 }});
  const tags: SimpleResponse<IProductTags[]> = await response.json();
  return (<div className='flex justify-start items-center gap-2 p-2 w-full'>
  {tags.data.map((tag,index)=>(<TagCard key={index} tag={{id:tag.tagId,name:tag.tagName}}/>))}
  </div>);
}
