'use server';

import {
  revalidatePath,
  revalidateTag,
} from 'next/cache';

import { authenticatedFetch } from '@/lib/server-fetch';
import { SimpleResponse } from '@models/base';

export async function saveEntity({
  endPoint,
  body,
  method,
}: {
  endPoint: string;
  body: any;
  method: 'POST' | 'PUT';
}) {
  try {
    const data:SimpleResponse<any> = await authenticatedFetch({
      endpoint: endPoint,
      method,
      body,
    });
    if (data.isSuccess) {
      revalidatePath(`/admin/${endPoint}`);
      revalidateTag(endPoint);
    }

    return data;
  } catch (error: any) {
    return {
      data: null,
      isSuccess: false,
      error: error.message,
    };
  }
}
