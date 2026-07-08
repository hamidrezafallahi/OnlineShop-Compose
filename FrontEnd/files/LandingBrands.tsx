import React from 'react';

import { getLocale } from 'next-intl/server';
import Link from 'next/link';

import { getAll } from '@lib/getAll';
import { IBrand } from '@models/brand';

import BrandCard from './BrandCard';

export const dynamic = "force-dynamic";

export default async function LandingBrands() {
  const locale = await getLocale();
  const response = await getAll<IBrand>('brands', {
    page: 1,
    pageSize: 5,
    byConfig: false,
  });
  const brands = response?.data?.records ?? [];

  return (
    <section className="relative bg-[#F7F3EE] px-6 md:px-16 py-20">
      <div className="mx-auto max-w-7xl">

        {/* Section header */}
        <div className="flex justify-between items-end mb-12">
          <div className="flex items-center gap-4">
            <div className="bg-[#C8955A] w-8 h-px" />
            <div>
              <p className="mb-1 text-[#C8955A] text-xs uppercase tracking-[0.35em]">مجموعه</p>
              <h2 className="font-['Cormorant_Garamond'] font-light text-[#141210] text-3xl md:text-4xl">
                برندهای برگزیده
              </h2>
            </div>
          </div>
          <Link
            href={`/${locale}/brands`}
            className="pb-px border-[#141210]/20 hover:border-[#C8955A] border-b text-[#141210]/50 hover:text-[#C8955A] text-sm transition-all duration-300"
          >
            همه برندها ←
          </Link>
        </div>

        {/* Brand grid */}
        <div className="gap-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {brands.map((brand, i) => (
            <BrandCard brand={brand} key={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
