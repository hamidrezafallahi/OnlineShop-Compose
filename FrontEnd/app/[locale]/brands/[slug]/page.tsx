import React from 'react';

import { Metadata } from 'next';

import BrandTemplate from '@components/templates/brandTemplate';
import { SimpleResponse } from '@models/base';
import { IBrand } from '@models/brand';

const baseUrl = process.env.INTERNAL_API_URL;

// ===== 1. تولید مسیرهای استاتیک =====
// export async function generateStaticParams() {
//   const response = await fetch(`${baseUrl}api/Brands/getIds`,{cache: "force-cache"});
//   if (!response.ok) return [];

//   const { data }: { data: Ids[] } = await response.json();

//   // تعریف localeها
//   const locales = ["fa", "en"]; // یا از پیکربندی next-intl بخوانید

//   // ایجاد همه ترکیب‌های locale و slug
//   const params = [];

//   for (const locale of locales) {
//     for (const item of data) {
//       params.push({
//         locale: locale,
//         slug: item.id.toString(),
//       });
//     }
//   }

//   return params;
// }

// ===== 2. تولید Metadata =====
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale?: string }>;
}): Promise<Metadata> {
  // Await کردن params
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  const response = await fetch(`${baseUrl}api/Brands/${slug}`, {
    cache: "no-store",
  });
  const locale = resolvedParams.locale || "fa"; // استفاده از locale از params

  if (response.status === 404) {
    return locale === "fa"
      ? { title: "محصول پیدا نشد", description: "" }
      : { title: "Product Not Found", description: "" };
  }

  const res: IBrand = await response.json();

  return {
    title: locale === "fa" ? res.name : res.name,
    description: locale === "fa" ? res.description : res.description,
    openGraph: {
      title: res.name,
      description: res.description,
      images: [res.logoFile],
      locale: locale === "fa" ? "fa_IR" : "en_US",
    },
  };
}

// ===== 3. صفحه محصول =====
export default async function Page(props: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  // Await کردن params
  const { slug, locale } = await props.params;

  const response = await fetch(`${baseUrl}api/Brands/${slug}`, {
    cache: "no-store",
  });
  const brandResponse: SimpleResponse<IBrand> = await response.json()
  const brand: IBrand = brandResponse.data;

  return <BrandTemplate brand={brand} />;
}
