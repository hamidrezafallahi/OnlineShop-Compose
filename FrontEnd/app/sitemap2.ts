// import type { MetadataRoute } from 'next';

// const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// type ChangeFreq = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';

// interface SlugItem {
//     slug: string;
// }

// function buildEntry(
//     path: string,
//     priority: number,
//     changeFrequency: ChangeFreq
// ): MetadataRoute.Sitemap[number] {
//     return {
//         url: `${BASE_URL}/${path}`,
//         lastModified: new Date(),
//         changeFrequency,
//         priority,
//         alternates: {
//             languages: {
//                 en: `${BASE_URL}/en/${path}`,
//                 fa: `${BASE_URL}/fa/${path}`,
//                 'x-default': `${BASE_URL}/en/${path}`,
//             },
//         },
//     };
// }

// async function fetchSlugs(endpoint: string): Promise<SlugItem[]> {
//     const res = await fetch(`${BASE_URL}/api/${endpoint}`, {
//         // برای اینکه در زمان بیلد کش نشه یا برعکس، بسته به نیازت تنظیم کن
//         next: { revalidate: 3600 },
//     });

//     if (!res.ok) {
//         console.error(`Failed to fetch ${endpoint} for sitemap`);
//         return [];
//     }

//     return res.json();
// }

// export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
//     const [products, blogs, brands, categories, suppliers, tags] = await Promise.all([
//         fetchSlugs('products'),
//         fetchSlugs('blogs'),
//         fetchSlugs('brands'),
//         fetchSlugs('categories'),
//         fetchSlugs('suppliers'),
//         fetchSlugs('tags'),
//     ]);

//     const productEntries = products.map((p) => buildEntry(`products/${p.slug}`, 0.7, 'monthly'));
//     const blogEntries = blogs.map((p) => buildEntry(`blogs/${p.slug}`, 0.7, 'monthly'));
//     const brandEntries = brands.map((p) => buildEntry(`brands/${p.slug}`, 0.7, 'monthly'));
//     const categoryEntries = categories.map((p) => buildEntry(`categories/${p.slug}`, 0.7, 'monthly'));
//     const supplierEntries = suppliers.map((p) => buildEntry(`suppliers/${p.slug}`, 0.7, 'monthly'));
//     const tagEntries = tags.map((p) => buildEntry(`tags/${p.slug}`, 0.7, 'monthly'));

//     return [
//         buildEntry('', 1.0, 'monthly'),
//         buildEntry('products', 0.9, 'weekly'),
//         buildEntry('blogs', 0.9, 'weekly'),
//         buildEntry('brands', 0.9, 'weekly'),
//         buildEntry('categories', 0.9, 'weekly'),
//         buildEntry('suppliers', 0.9, 'weekly'),
//         buildEntry('tags', 0.9, 'weekly'),
//         ...productEntries,
//         ...blogEntries,
//         ...brandEntries,
//         ...categoryEntries,
//         ...supplierEntries,
//         ...tagEntries,
//     ];
// }