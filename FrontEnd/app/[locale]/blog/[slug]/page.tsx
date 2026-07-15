import { Metadata } from 'next';
import { getLocale } from 'next-intl/server';
import Head from 'next/head';
import { notFound } from 'next/navigation';

import {
  BlogContent,
  HeroSection,
  RelatedArticles,
} from '@components/templates/blogTemplate';
import { getBlogBySlug } from '@lib/blog';
import { IBlog } from '@models/Blog';

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
};

// ===== 1. تولید مسیرهای استاتیک =====
// export async function generateStaticParams() {
//   try {
//     const res = await fetch(
//       `${process.env.INTERNAL_API_URL}api/Blogs/getSlugs`,
//       {
//         cache: "no-store",
//       },
//     );

//     if (!res.ok) return [];
//     const response: SimpleResponse<IBlog[]> = await res.json();
//     if (!response.isSuccess) return [];
//     return (response.data || []).map((item: unknown) => ({
//       slug: item.slug,
//     }));
//   } catch (error) {
//     console.error("Error generating static params:", error);
//     return [];
//   }
// }

// ===== 2. تولید Metadata =====
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocale();
  try {
    const blog = await getBlogBySlug({ params: { slug } });

    if (!blog) {
      return {
        title: locale === "fa" ? "مقاله یافت نشد" : "Article Not Found",
      };
    }

    return {
      title: blog.titleFa || blog.titleEn,
      description: blog.contentFa?.slice(0, 160),
      openGraph: {
        title: blog.titleFa || blog.titleEn,
        description: blog.contentFa?.slice(0, 160),
        images: blog.thumbnailFile ? [blog.thumbnailFile] : [],
        locale: locale === "fa" ? "fa_IR" : "en_US",
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: blog.titleFa || blog.titleEn,
        description: blog.contentFa?.slice(0, 160),
        images: blog.thumbnailFile ? [blog.thumbnailFile] : [],
      },
    };
  } catch (error) {
    return {
      title: locale === "fa" ? "مقاله" : "Article",
    };
  }
}

export default async function Page(props: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  // Await کردن params
  const { slug, locale } = await props.params;
  let blog: IBlog | null = null;
  try {
    blog = await getBlogBySlug({ params: { slug } });
  } catch (error) {
    notFound();
  }
  if (!blog) {
    notFound();
  }
  return (
    <>
      <Head>
        <title>{blog.titleFa}</title>
        <meta
          name="description"
          content={
            locale == "fa" ? blog.metaDescriptionFa : blog.metaDescriptionEn
          }
        />
        <meta
          name="keywords"
          content={locale == "fa" ? blog.metaKeywordsFa : blog.metaKeywordsEn}
        />

        {/* OpenGraph برای Social */}
        <meta property="og:description" content={blog.metaDescriptionFa} />
      </Head>
      <article className="pt-24 min-h-screen">
        <HeroSection blog={blog}  locale={locale} />
        <BlogContent blog={blog}  locale={locale}/>
        <RelatedArticles />
      </article>
    </>
  );
}
