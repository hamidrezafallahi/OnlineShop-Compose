import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import { getBlogBySlug } from '@lib/blog';
import { IBlog } from '@models/Blog';

type Props = {
  params: Promise<{ locale: string; slug: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

export const dynamic = "force-dynamic";

// ===== 2. تولید Metadata =====
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  try {
    const blog = await getBlogBySlug({ params: { slug } });
    if (!blog) {
      return {
        title: locale === "fa" ? "مقاله یافت نشد" : "Article Not Found",
      };
    }

    return {
      title: blog.titleFa || blog.titleEn,
      description: blog.contentFa?.slice(0, 160) || blog.contentEn?.slice(0, 160),
      openGraph: {
        title: blog.titleFa || blog.titleEn,
        description: blog.contentFa?.slice(0, 160) || blog.contentEn?.slice(0, 160),
        images: blog.thumbnailFile ? [blog.thumbnailFile] : [],
        locale: locale === "fa" ? "fa_IR" : "en_US",
        type: "article",
        publishedTime: new Date(blog.createdAt).toISOString(),
        authors: [blog.authorName || "Admin"],
      },
      twitter: {
        card: "summary_large_image",
        title: blog.titleFa || blog.titleEn,
        description: blog.contentFa?.slice(0, 160) || blog.contentEn?.slice(0, 160),
        images: blog.thumbnailFile ? [blog.thumbnailFile] : [],
      },
    };
  } catch (error) {
    return {
      title: locale === "fa" ? "مقاله" : "Article",
    };
  }
}

// ===== 3. صفحه تک مقاله =====
export default async function Page({ params }: Props) {
  const { locale, slug } = await params;
  let blog: IBlog | null = null;
  
  try {
    blog = await getBlogBySlug({ params: { slug } });
  } catch (error) {
    notFound();
  }

  if (!blog) {
    notFound();
  }

  const isRTL = locale === "fa";

  return (
    <article className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] max-h-[700px] overflow-hidden">
        {blog.thumbnailFile && (
          <div className="relative w-full h-full">
            <Image
              src={blog.thumbnailFile}
              alt={blog.titleFa || blog.titleEn}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
          </div>
        )}

        <div
          className={`absolute bottom-0 ${
            isRTL ? "right-0 text-right" : "left-0"
          } p-8 md:p-12 text-white max-w-4xl w-full`}
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="bg-primary/80 px-3 py-1 rounded-full text-sm">
              {isRTL ? blog.titleFa || "دسته‌بندی" : blog.titleEn || "category"}
            </span>
            <time className="text-white/90">
              {new Intl.DateTimeFormat(locale, {
                day: "numeric",
                month: "long",
                year: "numeric",
              }).format(new Date(blog.createdAt))}
            </time>
          </div>
          <h1 className="mb-4 font-bold text-3xl md:text-5xl leading-tight">
            {isRTL ? blog.titleFa : blog.titleEn}
          </h1>
          <p className="opacity-90 text-xl line-clamp-2">{blog.excerptFa}</p>
        </div>
      </section>

      {/* Content Section */}
      <div className="mx-auto px-4 py-12 max-w-4xl">
        <div className="flex lg:flex-row flex-col gap-8">
          {/* Main Content */}
          <main className="lg:w-2/3">
            {/* Author Card */}
            <div
              className={`flex items-center gap-4 p-6 bg-white rounded-2xl shadow-sm mb-8 border ${
                isRTL ? "flex-row-reverse text-right" : ""
              }`}
            >
              <div className="flex justify-center items-center bg-primary/10 rounded-full w-14 h-14">
                <span className="font-bold text-primary text-xl">
                  {blog.authorId || "A"}
                </span>
              </div>
              <div>
                <h3 className="font-semibold text-lg">
                  {blog.authorId || "نویسنده"}
                </h3>
                <p className="text-gray-600 text-sm">
                  <time>
                    {new Intl.DateTimeFormat(locale, {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    }).format(new Date(blog.createdAt))}
                  </time>
                </p>
              </div>
            </div>

            {/* Article Content */}
            <div
              className={`prose prose-lg max-w-none ${
                isRTL ? "prose-rtl" : "prose-ltr"
              }`}
              dangerouslySetInnerHTML={{ __html: blog.contentFa || "" }}
            />

            {/* Tags */}
            {blog.metaKeywordsFa && blog.metaKeywordsFa.length > 0 && (
              <div
                className={`flex flex-wrap gap-2 mt-12 ${
                  isRTL ? "justify-end" : ""
                }`}
              >
                <span className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full text-sm transition-colors cursor-pointer">
                  #{blog.metaKeywordsFa}
                </span>
              </div>
            )}
          </main>

          {/* Sidebar */}
          <aside className="lg:w-1/3">
            <div className="top-8 sticky space-y-6">
              {/* Share Buttons */}
              <div className="bg-white shadow-sm p-6 border rounded-2xl">
                <h3
                  className={`font-semibold text-lg mb-4 ${
                    isRTL ? "text-right" : ""
                  }`}
                >
                  {isRTL ? "اشتراک گذاری" : "Share"}
                </h3>
                <div
                  className={`flex gap-2 ${isRTL ? "flex-row-reverse" : ""}`}
                >
                  {["twitter", "linkedin", "telegram", "whatsapp"].map(
                    (platform) => (
                      <button
                        key={platform}
                        className="flex justify-center items-center bg-gray-100 hover:bg-primary rounded-full w-10 h-10 hover:text-white transition-colors"
                        aria-label={`Share on ${platform}`}
                      >
                        {platform.charAt(0).toUpperCase()}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Table of Contents */}
              {blog.contentFa && (
                <div className="bg-white shadow-sm p-6 border rounded-2xl">
                  <h3
                    className={`font-semibold text-lg mb-4 ${
                      isRTL ? "text-right" : ""
                    }`}
                  >
                    {isRTL ? "فهرست مطالب" : "Table of Contents"}
                  </h3>
                  <nav className={`space-y-2 ${isRTL ? "text-right" : ""}`}>
                    <a
                      href="#section1"
                      className="block py-2 text-gray-600 hover:text-primary"
                    >
                      {isRTL ? "مقدمه" : "Introduction"}
                    </a>
                    <a
                      href="#section2"
                      className="block py-2 text-gray-600 hover:text-primary"
                    >
                      {isRTL ? "محتوا" : "Content"}
                    </a>
                    <a
                      href="#section3"
                      className="block py-2 text-gray-600 hover:text-primary"
                    >
                      {isRTL ? "نتیجه‌گیری" : "Conclusion"}
                    </a>
                  </nav>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>

      {/* Related Articles */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto px-4 max-w-6xl">
          <h2
            className={`font-bold text-2xl mb-8 ${isRTL ? "text-right" : ""}`}
          >
            {isRTL ? "مقالات مرتبط" : "Related Articles"}
          </h2>
          <div className="gap-6 grid grid-cols-1 md:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="bg-white shadow-sm hover:shadow-md rounded-xl overflow-hidden transition-shadow"
              >
                <div className="bg-gradient-to-br from-primary/20 to-secondary/20 h-48" />
                <div className="p-4">
                  <h3 className="mb-2 font-semibold text-lg">
                    {isRTL ? "عنوان مقاله مرتبط" : "Related Article Title"}
                  </h3>
                  <p className="mb-3 text-gray-600 text-sm line-clamp-2">
                    {isRTL
                      ? "توضیح کوتاه درباره مقاله مرتبط"
                      : "Short description about related article"}
                  </p>
                  <a
                    href="#"
                    className="font-medium text-primary text-sm hover:underline"
                  >
                    {isRTL ? "مطالعه بیشتر" : "Read More"}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}