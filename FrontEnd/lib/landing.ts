import 'server-only';

const apiBaseUrl=process.env.NEXT_PUBLIC_INTERNAL_SERVER_SIDE_API_URL

export async function getSlides<T>(): Promise<T[]> {
  try {
    const url = `${apiBaseUrl}/Landing/slide`;
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