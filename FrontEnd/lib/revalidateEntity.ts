'use server';

import {
  revalidatePath,
  revalidateTag,
} from 'next/cache';

/** Cache bust after a successful client-side BFF save (no file body on this hop). */
export async function revalidateEntity(endPoint: string) {
  const normalized = endPoint.replace(/^\/+/, '');
  revalidatePath(`/fa/admin/${normalized}`);
  revalidatePath(`/en/admin/${normalized}`);
  revalidateTag(normalized);
}
