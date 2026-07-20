"use client";
import React, {
  useEffect,
  useState,
} from 'react';

import { useLocale } from 'next-intl';
import Link from 'next/link';

import ProductsCarousel from '@components/molecules/productsCarousel';
import { ILandingProduct } from '@models/product';
import { useGetData } from '@services/base';

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

const TABS = [
  { key: 'BestSeller', label: 'پرفروش‌ترین‌ها' },
  { key: 'TheNewest', label: 'جدیدترین‌ها' },
  { key: 'Discounters', label: 'تخفیف‌دارها' },
] as const;

export default function TheMostProducts() {
  const [activeTab, setActiveTab] = useState<string>('BestSeller');
  const [content, setContent] = useState<ILandingProduct[]>();
  const locale = useLocale();

  const { data, isLoading, isFetching } = useGetData<ILandingProduct[], any>({
    url: `${baseUrl}/api/Products/landings?${activeTab}=true`,
  });

  useEffect(() => {
    if (data?.isSuccess) setContent(data.data);
  }, [data]);

  return (
    <section className="bg-[#F7F3EE] px-6 md:px-16 py-20">
      <div className="mx-auto max-w-7xl">

        {/* Header row */}
        <div className="flex sm:flex-row flex-col justify-between sm:items-end gap-6 mb-12">
          <div className="flex items-center gap-4">
            <div className="bg-[#C8955A] w-8 h-px" />
            <div>
              <p className="mb-1 text-[#C8955A] text-xs uppercase tracking-[0.35em]">محصولات</p>
              <h2 className="font-['Cormorant_Garamond'] font-light text-[#141210] text-3xl md:text-4xl">
                انتخاب‌های ویژه
              </h2>
            </div>
          </div>

          {/* Tab group */}
          <div className="flex items-center gap-1 bg-white p-1 border border-[#E8D5C4]/60 rounded-full">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                aria-pressed={activeTab === tab.key}
                className={`
                  px-4 py-2 rounded-full text-sm transition-all duration-300
                  ${activeTab === tab.key
                    ? 'bg-[#141210] text-white shadow-sm'
                    : 'text-[#141210]/50 hover:text-[#141210]'
                  }
                `}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <ProductsCarousel items={content} Loading={isLoading || isFetching} />

        <div className="mt-10 text-center">
          <Link
            href={`/${locale}/products`}
            className="inline-block px-8 py-3 border border-[#141210]/20 hover:border-[#141210]/60 text-[#141210]/60 hover:text-[#141210] text-sm tracking-wide transition-all duration-300"
          >
            مشاهده همه محصولات ←
          </Link>
        </div>
      </div>
    </section>
  );
}
