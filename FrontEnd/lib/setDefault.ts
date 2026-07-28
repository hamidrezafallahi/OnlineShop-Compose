'use server';

import {
  revalidatePath,
  revalidateTag,
} from 'next/cache';
import { cookies } from 'next/headers';

import { serverApiBaseUrl } from './api';

export async function fetchDefault(entity:string,formData:FormData) {
  const id = formData.get('id') as string;
  const isDefault = formData.get('isDefault') === 'true';
  const cookieStore =await cookies();
  const token = cookieStore.get('candyAccess')?.value;
   const response = await fetch(`${serverApiBaseUrl}/${entity}/set-default`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ 
      Id: id, 
      IsDefault: !isDefault, 
    }),
  });
  const data = await response.json();
  if(data.isSuccess){
    revalidatePath(`admin/${entity}`);
    revalidateTag(entity);
    return true
  }else{
    return false
  }
}