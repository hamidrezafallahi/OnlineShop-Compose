import { Metadata } from 'next';

import CategoryTemplate from '@components/templates/categoryTemplate';

const baseUrl = process.env.INTERNAL_API_URL;

// اجازه تولید صفحات dynamic جدید
export const dynamicParams = true;

// === 2. تولید Metadata ===
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale?: string }>;
}): Promise<Metadata> {
  try {
    const resolvedParams = await params;
    const { slug, locale = 'fa' } = resolvedParams;
    const response = await fetch(`${baseUrl}/api/Categories/${slug}`, {
      next: { revalidate: 36 },
    });
    const result = await response.json();
    const category = result.data;

    if (!category) {
      return {
        title: locale === 'fa' ? 'دسته بندی' : 'category',
        description: '',
      };
    }
    const title = locale === 'fa' ? category.persianName : category.englishName;
    const description =
      locale === 'fa' ? category.categoryPersianDesc : category.categoryEnglishDesc;
    const image = category.CategoryCover;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        images: image ? [image] : [],
        locale: locale === 'fa' ? 'fa_IR' : 'en_US',
      },
    };
  } catch (error) {
    return {
      title: 'category',
      description: '',
    };
  }
}

// === 3. صفحه محصول ===
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  try {
    const { slug, locale } = await params;
    const response = await fetch(`${baseUrl}/api/Categories/${slug}`, {
      next: { revalidate: 36 },
    });

    if (response.status === 404) {
      return (
        <div className="pt-24">
          <div className="mx-auto px-4 py-20 max-w-7xl text-center">
            <h1 className="mb-4 font-bold text-3xl">
              {locale === 'fa' ? 'محصول پیدا نشد' : 'Product Not Found'}
            </h1>
            <p className="text-gray-600">
              {locale === 'fa'
                ? 'متأسفانه محصول مورد نظر شما یافت نشد.'
                : 'Sorry, the product you are looking for could not be found.'}
            </p>
          </div>
        </div>
      );
    }

    const result = await response.json();
    const category = result.data;
    return <CategoryTemplate category={category} />;
  } catch (error) {
    return (
      <div className="pt-24">
        <div className="mx-auto px-4 py-20 max-w-7xl text-center">
          <h1 className="mb-4 font-bold text-3xl">{'خطا در بارگذاری'}</h1>
          <p className="text-gray-100">
            {'متأسفانه در بارگذاری محصول مشکلی پیش آمده است.'}
          </p>
        </div>
      </div>
    );
  }
}