'use client';

import React, { useMemo, useState } from 'react';

import { useLocale } from 'next-intl';
import Link from 'next/link';

import { ILandingProduct } from '@models/product';

import ProductsCarousel from '../productsCarousel';

type TabKey = 'BestSeller' | 'TheNewest' | 'Discounters';

type Props = {
  bestSeller: ILandingProduct[];
  theNewest: ILandingProduct[];
  discounters: ILandingProduct[];
};

const TABS: { key: TabKey; label: string }[] = [
  { key: 'BestSeller', label: 'پرفروش‌ترین‌ها' },
  { key: 'TheNewest', label: 'جدیدترین‌ها' },
  { key: 'Discounters', label: 'تخفیف‌دارها' },
];

export default function TheMostProductsClient({
  bestSeller,
  theNewest,
  discounters,
}: Props) {
  const [activeTab, setActiveTab] = useState<TabKey>('BestSeller');
  const locale = useLocale();

  const items = useMemo(() => {
    switch (activeTab) {
      case 'TheNewest':
        return theNewest;
      case 'Discounters':
        return discounters;
      case 'BestSeller':
      default:
        return bestSeller;
    }
  }, [activeTab, bestSeller, theNewest, discounters]);

  return (
    <>
      <div className="flex sm:flex-row flex-col flex-wrap sm:justify-between sm:items-center gap-4 mb-8">
        <div className="flex items-center gap-3">
          {TABS.map((tab) => (
            <TabButton
              key={tab.key}
              active={activeTab === tab.key}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </TabButton>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <Link href={`/${locale}/products`} className="text-sm underline">
            مشاهده همه محصولات
          </Link>
        </div>
      </div>

      <div>
        <ProductsCarousel items={items} Loading={false} />
      </div>
    </>
  );
}

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
      type="button"
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
        active
          ? 'bg-primary text-white shadow'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
      aria-pressed={active}
    >
      {children}
    </button>
  );
}
