import React from 'react';

import { getLocale } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';

import CategoryCard from '@components/molecules/categoryCart';
import { ICategory } from '@models/category';

interface IProps {
  categories: ICategory[];
}

/**
 * Category section — editorial asymmetric grid on desktop,
 * horizontal scroll strip on mobile.
 */
export default async function LandingCategory({ categories }: IProps) {
  const locale = await getLocale();

  return (
    <section id="categories" className="bg-[#141210] px-6 md:px-16 py-20">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="flex justify-between items-end mb-12">
          <div className="flex items-center gap-4">
            <div className="bg-[#C8955A] w-8 h-px" />
            <div>
              <p className="mb-1 text-[#C8955A] text-xs uppercase tracking-[0.35em]">کشف کن</p>
              <h2 className="font-['Cormorant_Garamond'] font-light text-white text-3xl md:text-4xl">
                دسته‌بندی‌ها
              </h2>
            </div>
          </div>
          <Link
            href={`/${locale}/categories`}
            className="pb-px border-white/10 hover:border-[#C8955A] border-b text-white/30 hover:text-[#C8955A] text-sm transition-all duration-300"
          >
            همه دسته‌ها ←
          </Link>
        </div>

        {/* Mobile horizontal scroll */}
        <div
          className="sm:hidden flex gap-4 pb-2 overflow-x-auto"
          style={{ scrollbarWidth: 'none' }}
        >
          {categories?.map((cat) => (
            <Link
              key={cat.id}
              href={`/${locale}/categories/${cat.id}`}
              className="group relative flex-shrink-0 border border-white/8 rounded-2xl w-[68vw] overflow-hidden"
            >
              <div className="relative w-full h-52 overflow-hidden">
                <Image
                  src={cat.categoryCover}
                  alt={cat.englishName}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141210]/80 via-transparent to-transparent" />
              </div>
              <div className="bottom-0 absolute inset-x-0 p-4">
                <h3 className="font-medium text-white text-sm">{cat.persianName}</h3>
                <p className="mt-0.5 text-white/50 text-xs line-clamp-2">{cat.categoryPersianDesc}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Desktop grid */}
        <div className="hidden gap-5 sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {categories?.map((cat, i) => (
            <CategoryCard key={i} category={cat} />
          ))}
        </div>
      </div>
    </section>
  );
}
