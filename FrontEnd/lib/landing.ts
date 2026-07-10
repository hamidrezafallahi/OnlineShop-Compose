import 'server-only';

const baseUrl = process.env.INTERNAL_API_URL!;
export async function getSlides<T>(): Promise<T[]> {
  console.log(baseUrl)
  const res = await fetch(`${baseUrl}/api/Landing/slide`, {
    cache: 'no-store',
  });

  if (!res.ok) return [];

  const data = await res.json();
  return data.data ?? [];
}