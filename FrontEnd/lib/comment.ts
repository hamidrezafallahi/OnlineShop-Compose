'use server';

import {
  revalidatePath,
  revalidateTag,
} from 'next/cache';
import { cookies } from 'next/headers';

import { serverApiBaseUrl } from './api';

export async function approveComment(field:string,formData: FormData) {
  const id = formData.get('id') as string;
  const isApprove = formData.get('isApproved') === 'true';
    const cookieStore =await cookies();
  const token = cookieStore.get('candyAccess')?.value;
   const response = await fetch(`${serverApiBaseUrl}/${field}/approve`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ 
      Id: parseInt(id), 
      IsApprove: !isApprove, 
    }),
  });
  const data = await response.json();
  if(data.isSuccess){
    revalidatePath('/admin/comments');
    revalidateTag('comments');
    return true

  }else{
    return false
  }
}