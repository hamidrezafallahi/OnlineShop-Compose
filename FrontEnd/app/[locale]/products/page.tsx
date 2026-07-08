// app/[locale]/products/page.tsx
import { Metadata } from 'next';

import CustomPagination from '@components/molecules/pagination';
import { SimpleProductCard } from '@components/molecules/productCard';
import { IProduct } from '@lib/product';
import { PagedResponse } from '@models/base';

const baseUrl = process.env.NEXT_PUBLIC_API_URL;
// ===== 1. تولید مسیرهای استاتیک =====
// export async function generateStaticParams() {
//   try {
 
//     const response = await fetch(`${baseUrl}api/Products/getIds`, {
//       cache: 'force-cache'
//     });
    
//     if (!response.ok) {
//        return [];
//     }

//     const result: { data: Ids[]; isSuccess: boolean; error: string | null } = await response.json();
    
//     if (!result.isSuccess || !result.data) {
//       return [];
//     }

//     // ایجاد صفحات مختلف برای هر locale
//     const locales = ['fa', 'en'];
//     const params = [];

//     // فقط صفحات لیست محصولات را generate می‌کنیم (حداکثر 5 صفحه)
//     const maxPages = 5;
    
//     for (const locale of locales) {
//       for (let page = 1; page <= maxPages; page++) {
//         params.push({
//           locale: locale,
//           page: page.toString(),
//         });
//       }
//     }
    
//     return params;
//   } catch (error) {
//      return [{ locale: 'fa', page: '1' }];
//   }
// }

// ===== 2. تولید Metadata =====
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; page?: string }> | { locale: string; page?: string };
}): Promise<Metadata> {
  // مدیریت پارامترها
  let locale = 'fa';
  let page = '1';
  
  if (params instanceof Promise) {
    const resolvedParams = await params;
    locale = resolvedParams.locale || 'fa';
    page = resolvedParams.page || '1';
  } else {
    locale = params.locale || 'fa';
    page = params.page || '1';
  }
  
  const pageNumber = parseInt(page);
  const pageTitle = pageNumber > 1 ? ` - صفحه ${pageNumber}` : '';

  if (locale === 'fa') {
    return {
      title: `محصولات${pageTitle}`,
      description: "مرجع تخصصی خرید انواع محصولات با بهترین قیمت و کیفیت",
      openGraph: {
        title: `محصولات${pageTitle}`,
        description: "خرید آنلاین محصولات با تضمین بهترین قیمت",
        type: 'website',
        locale: 'fa_IR',
      },
      twitter: {
        card: 'summary_large_image',
        title: `محصولات${pageTitle}`,
        description: "مرجع تخصصی خرید انواع محصولات",
      },
    };
  } else {
    return {
      title: `Products${pageNumber > 1 ? ` - Page ${pageNumber}` : ''}`,
      description: "Specialized reference for buying various products with the best price and quality",
      openGraph: {
        title: `Products${pageNumber > 1 ? ` - Page ${pageNumber}` : ''}`,
        description: "Online shopping with best price guarantee",
        type: 'website',
        locale: 'en_US',
      },
    };
  }
}

// ===== 3. صفحه محصولات =====
export default async function Page({
  searchParams,
  params,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }> | { [key: string]: string | string[] | undefined };
  params?: Promise<{ locale: string; page?: string }> | { locale: string; page?: string };
}) {
  // مدیریت پارامترها
  let locale = 'fa';
  let pageFromParams = '1';
  
  if (params) {
    if (params instanceof Promise) {
      const resolvedParams = await params;
      locale = resolvedParams.locale || 'fa';
      pageFromParams = resolvedParams.page || '1';
    } else {
      locale = params.locale || 'fa';
      pageFromParams = params.page || '1';
    }
  }

  // مدیریت searchParams
  let pageFromSearch = '1';
  
  if (searchParams) {
    if (searchParams instanceof Promise) {
      const resolvedSearchParams = await searchParams;
      pageFromSearch = (resolvedSearchParams?.page as string) || pageFromParams;
    } else {
      pageFromSearch = (searchParams?.page as string) || pageFromParams;
    }
  }

  const PageNumber = parseInt(pageFromSearch || "1");
  const PageRecordCount = 12; // 12 محصول در هر صفحه

  // گرفتن داده‌های محصولات
  let productsResponse: PagedResponse<IProduct>;
  let products: IProduct[] = [];
  let totalCount = 0;
  let currentPage = PageNumber;
  let pageSize = PageRecordCount;
  let totalPages = 1;

  try {
    const response = await fetch(
      `${baseUrl}api/Products?page=${PageNumber}&PageSize=${PageRecordCount}`,
      {
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.status}`);
    }

    productsResponse = await response.json();
    
    // بررسی موفقیت آمیز بودن درخواست
    if (productsResponse.isSuccess && productsResponse.data) {
      products = productsResponse.data.records;
      
      // اگر API اطلاعات صفحه‌بندی را برمی‌گرداند
      totalCount = productsResponse.data.totalCount || products.length;
      currentPage = productsResponse.data.pageNumber || PageNumber;
      pageSize = productsResponse.data.pageSize || PageRecordCount;
      totalPages = productsResponse.data.totalPages || Math.ceil(totalCount / pageSize);
    } else {
      console.error('API returned error:', productsResponse.error);
      products = [];
    }
    
  } catch (error) {
    
    // داده‌های پیش‌فرض
    productsResponse = {
      data: {
        records:[],
      actionsJson:"",
      columnsJson:"",
      pageNumber:0,
      pageSize:0,
      totalCount:0,
      totalPages:0
      },
      isSuccess: false,
      error: 'خطا در دریافت اطلاعات محصولات',
    };
    products = [];
  }
console.log(productsResponse)
  return (
    <article className="flex flex-col gap-6 p-4 md:p-6 !pt-24">
      {/* هدر */}
      <header className="mb-8 text-center md:text-right">
        <h1 className="mb-2 font-bold text-2xl md:text-3xl">
          {locale === 'fa' ? 'محصولات' : 'Products'}
        </h1>
        <p className="mx-auto md:mx-0 max-w-2xl text-gray-200">
          {locale === 'fa' 
            ? 'مرجع تخصصی خرید انواع محصولات با بهترین قیمت و کیفیت' 
            : 'Specialized reference for buying various products with the best price and quality'}
        </p>
      </header>

      {/* نمایش وضعیت درخواست */}
      {!productsResponse.isSuccess && (
        <div className="bg-red-50 mb-6 px-4 py-3 border border-red-200 rounded-lg text-red-700">
          <p className="font-medium">{locale === 'fa' ? 'خطا' : 'Error'}:</p>
          <p>{productsResponse.error || (locale === 'fa' ? 'خطا در دریافت اطلاعات' : 'Error fetching data')}</p>
        </div>
      )}

      {/* نمایش تعداد نتایج */}
      {productsResponse.isSuccess && (
        <div className="flex justify-between items-center mb-4">
          <p className="text-gray-200 text-sm">
            {locale === 'fa' 
              ? `نمایش ${products.length} محصول`
              : `Showing ${products.length} products`}
            {totalCount > 0 && (
              <span className="mr-2">
                {locale === 'fa' 
                  ? ` از ${totalCount} محصول`
                  : ` of ${totalCount} products`}
              </span>
            )}
          </p>
        </div>
      )}

      {/* لیست محصولات */}
      {products.length === 0 ? (
        <div className="py-16 text-center">
          <div className="mb-6 text-gray-300">
            <svg className="mx-auto w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
          <h3 className="mb-2 font-medium text-gray-200 text-xl">
            {productsResponse.isSuccess 
              ? (locale === 'fa' ? 'محصولی یافت نشد' : 'No products found')
              : (locale === 'fa' ? 'خطا در دریافت محصولات' : 'Error loading products')}
          </h3>
          <p className="mx-auto max-w-md text-gray-200">
            {productsResponse.isSuccess 
              ? (locale === 'fa' 
                  ? 'در حال حاضر هیچ محصولی در این دسته‌بندی وجود ندارد. لطفاً بعداً مراجعه کنید.'
                  : 'There are currently no products in this category. Please check back later.')
              : (locale === 'fa'
                  ? 'مشکلی در ارتباط با سرور به وجود آمده است. لطفاً دوباره تلاش کنید.'
                  : 'There was a problem connecting to the server. Please try again.')}
          </p>
        </div>
      ) : (
        <>
          <section className="gap-4 md:gap-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {products.map((product,idx) => (<SimpleProductCard product={product} key={idx}/>))}
          </section>
 
          {totalPages > 1 && (
            <div className="mt-8 pt-6 border-gray-200 border-t">
              <CustomPagination 
                pageSize={pageSize} 
                total={totalCount} 
                current={currentPage}
                // totalPages={totalPages}
                onChange={(page) => {
                  // منطق تغییر صفحه
                  const url = new URL(window.location.href);
                  url.searchParams.set('PageNumber', page.toString());
                  window.location.href = url.toString();
                }}
              />
            </div>
          )}
        </>
      )}
    </article>
  );
}