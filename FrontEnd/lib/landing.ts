import 'server-only';

import { serverApiBaseUrl } from './api';

export async function getSlides<T>(): Promise<T[]> {
  try {
     const url = `${serverApiBaseUrl}/Landing/slide`;
    const res = await fetch(url, {
      cache: "no-store",
    });
    const data = await res.json();
    return data.data ?? [];
  } catch (e) {
    console.error(e);
    throw e;
  }
}