"use client";
import React, {
  useEffect,
  useState,
} from 'react';

import { useLocale } from 'next-intl';
import Link from 'next/link';

import { ILandingProduct } from '@models/product';
import { useGetData } from '@services/base';
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

import ProductsCarousel from '../productsCarousel';

function TheMostProducts() {
  const [activeTab, setActiveTab] = useState("BestSeller");
  const [content, setContent] = useState<ILandingProduct[]>();
  const { data, isLoading, isFetching } = useGetData<ILandingProduct[], any>({
    url: `${baseUrl}/api/Products/landings?${activeTab}=true`,
  });
  const locale = useLocale();
  useEffect(() => {
    if (data?.isSuccess) {
      setContent(data.data);
    }
  }, [data]);
  return (
    <>
      <div className="flex sm:flex-row flex-col flex-wrap sm:justify-between sm:items-center gap-4 mb-8">
        <div className="flex items-center gap-3">
          <TabButton
            active={activeTab === "BestSeller"}
            onClick={() => setActiveTab("BestSeller")}
          >
            پرفروش‌ترین‌ها
          </TabButton>
          <TabButton
            active={activeTab === "TheNewest"}
            onClick={() => setActiveTab("TheNewest")}
          >
            جدیدترین‌ها
          </TabButton>
          <TabButton
            active={activeTab === "Discounters"}
            onClick={() => setActiveTab("Discounters")}
          >
            تخفیف‌دارها
          </TabButton>
        </div>
        <div className="flex items-center gap-3">
          <Link href={`/${locale}/products`} className="text-sm underline">
            مشاهده همه محصولات
          </Link>
        </div>
      </div>

      <div>
        <ProductsCarousel items={content} Loading={isLoading || isFetching} />
      </div>
    </>
  );
}

export default TheMostProducts;

function TabButton({
  children,
  active,
  onClick,
}: {
  children: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
        active
          ? "bg-primary text-white shadow"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }`}
      aria-pressed={active}
    >
      {children}
    </button>
  );
}

// function ProductCard({ product, compact = false }) {
//   const discount = product.oldPrice
//     ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
//     : 0;

//   return (
//     <article
//       className={`bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow ${
//         compact ? "" : ""
//       }`}
//     >
//       <div className="relative w-full h-56 overflow-hidden">
//         <img
//           src={product.img}
//           alt={product.title}
//           className="w-full h-full object-cover"
//           loading="lazy"
//         />
//         {discount > 0 && (
//           <span className="top-3 left-3 absolute bg-red-600 px-2 py-1 rounded font-semibold text-white text-xs">
//             -{discount}%
//           </span>
//         )}
//       </div>
//       <div className="p-4">
//         <h4 className="font-medium text-sm line-clamp-2">{product.title}</h4>
//         <p className="text-gray-500 text-xs">{product.brand}</p>

//         <div className="flex justify-between items-end gap-2 mt-3">
//           <div>
//             <div className="font-semibold text-sm">{product.price}$</div>
//             {product.oldPrice && (
//               <div className="text-gray-400 text-xs line-through">
//                 {product.oldPrice}$
//               </div>
//             )}
//           </div>

//           <div className="flex items-center gap-2">
//             <button className="bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg text-xs">
//               مشاهده
//             </button>
//             <button className="bg-primary px-3 py-2 rounded-lg text-white text-xs">
//               افزودن
//             </button>
//           </div>
//         </div>
//       </div>
//     </article>
//   );
// }
