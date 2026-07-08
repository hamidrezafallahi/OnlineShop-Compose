import React from 'react';

import TagCard from '@components/molecules/tagCard';
import { SimpleResponse } from '@models/base';
import { IProductTags } from '@models/product';

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export default async function ProductTags({ id }: { id: number }) {
  const response = await fetch(`${baseUrl}api/ProductOfferTags/productId/${id}`,{next: { revalidate: 36 }});
  const tags: SimpleResponse<IProductTags[]> = await response.json();
  return (<div className='flex justify-start items-center gap-2 p-2 w-full'>
  {tags.data.map((tag,index)=>(<TagCard key={index} tag={{id:tag.tagId,name:tag.tagName}}/>))}
  </div>);
}
