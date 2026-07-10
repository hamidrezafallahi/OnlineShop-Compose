import { Metadata } from 'next';

import ProductBrand from '@components/organisms/productOrganisms/productBrand';
import ProductCategory
  from '@components/organisms/productOrganisms/productCategory';
import {
  ProductDetailsTabs,
} from '@components/organisms/productOrganisms/productDetailsTabs';
import ProductHero from '@components/organisms/productOrganisms/productHero';
import {
  ProductSupplierExtended,
} from '@components/organisms/productOrganisms/productSuppliers';
import ProductTags from '@components/organisms/productOrganisms/productTags';

const baseUrl = process.env.INTERNAL_API_URL;

// === 1. تولید مسیرهای استاتیک ===
// export async function generateStaticParams() {
//   try {
//     const response = await fetch(`${baseUrl}api/Products/getIds`, {
//       next: { revalidate: 36 } // هر 1 ساعت cache
//     });
//     if (!response.ok) {
//       console.error('Failed to fetch IDs:', response.status);
//       return [];
//     }

//     const result = await response.json();
    
//     // چندین روش برای دسترسی به data
//     const data = result.data || result || [];
    
//     if (!Array.isArray(data)) {
//       console.error('Data is not an array:', typeof data);
//       return [];
//     }

//     const locales = ['fa', 'en'];
//     const params = [];

//     // اعتبارسنجی هر آیتم قبل از استفاده
//     for (const locale of locales) {
//       for (const item of data) {
//         // بررسی عمیق‌تر برای id
//         const itemId = item?.id ?? item?.ID ?? item?.Id;
        
//         if (itemId !== undefined && itemId !== null) {
//           params.push({
//             locale: locale,
//             slug: String(itemId), // استفاده از String به جای toString()
//           });
//         } else {
//           console.warn('Invalid item found (no id):', item);
//         }
//       }
//     }  
//     return params;
    
//   } catch (error) {
//     console.error('Error in generateStaticParams:', error);
//     return [];
//   }
// }

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
    const response = await fetch(`${baseUrl}api/Products/${slug}`,{next: { revalidate: 36 }});
    if (response.status === 404) {
      return {
        title: locale === 'fa' ? "محصول پیدا نشد" : "Product Not Found",
        description: ""
      };
    }

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const result = await response.json();
    const product = result.data || result;
    
    if (!product) {
      return {
        title: locale === 'fa' ? 'محصول' : 'Product',
        description: '',
      };
    }

    const title = product.name || product.title || (locale === "fa" ? "محصول" : "Product");
    const description = product.description || "";
    const image = product.imageUrls?.[0] || product.imageUrl || product.image;

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
    console.error('Error generating metadata:', error);
    return {
      title: 'Product',
      description: '',
    };
  }
}

// === 3. صفحه محصول ===
export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  try {
    const { slug, locale } = await params;   
    const response = await fetch(`${baseUrl}api/Products/${slug}`, {
      next: { revalidate: 36 } // ISR
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
    const product = result.data || result;
    return (
      <div className="pt-24">
        <div className="mx-auto px-4 max-w-7xl">
          <ProductHero product={product} />
          <ProductBrand id={product.brandId}/>
          <ProductCategory id={product.categoryId}/>
          <ProductTags id={product.id}/>
          <ProductSupplierExtended productId={slug} />
          <ProductDetailsTabs product={product} />
        </div>
      </div>
    );
    
  } catch (error) {
    return (
      <div className="pt-24">
        <div className="mx-auto px-4 py-20 max-w-7xl text-center">
          <h1 className="mb-4 font-bold text-3xl">
            {'خطا در بارگذاری' }
          </h1>
          <p className="text-gray-100">
            { 'متأسفانه در بارگذاری محصول مشکلی پیش آمده است.' }
          </p>
        </div>
      </div>
    );
  }
}