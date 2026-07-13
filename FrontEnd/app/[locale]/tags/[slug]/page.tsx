import React from 'react';

import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import TagTemplate from '@components/templates/tagTemplate';
import { SimpleResponse } from '@models/base';
import { ITag } from '@models/tag';

const baseUrl = process.env.INTERNAL_API_URL;

// ===== 1. تولید مسیرهای استاتیک =====
// export async function generateStaticParams() {
//   const response = await fetch(`${baseUrl}api/Tag/getIds`, {
//     next: { revalidate: 36 },
//   });
//   if (!response.ok) return [];
//   const { data }: { data: Ids[] } = await response.json();
//   const locales = ["fa", "en"]; // یا از پیکربندی next-intl بخوانید
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

  const response = await fetch(
    `${baseUrl}/api/Tag/getTagByTagId?tagId=${slug}`,
    { next: { revalidate: 36 } },
  );
  const locale = resolvedParams.locale || "fa";
  if (response.status === 404) {
    return locale === "fa"
      ? { title: "تگ محصول پیدا نشد", description: "" }
      : { title: "Product Tag Not Found", description: "" };
  }
  const res: SimpleResponse<ITag> = await response.json();
  if (res.isSuccess) {
    const tag: ITag = res.data;
    return {
      title: tag.name,
      description: tag.name,
      openGraph: {
        title: tag.name,
        description: tag.name,
        locale: locale === "fa" ? "fa_IR" : "en_US",
      },
    };
  }

  return locale === "fa"
    ? { title: "تگ پیدا نشد", description: "" }
    : { title: "Tag Not Found", description: "" };
}

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  console.log(slug);
  const response = await fetch(`${baseUrl}/api/Tags/${slug}`, {
    next: { revalidate: 36 },
  });
  const TagResponse: SimpleResponse<ITag> = await response.json();
  console.log("TagResponse", TagResponse);
  if (!TagResponse.isSuccess) {
    notFound();
  } else {
    const Tag: ITag = TagResponse.data;
    return <TagTemplate Tag={Tag} />;
  }
}
