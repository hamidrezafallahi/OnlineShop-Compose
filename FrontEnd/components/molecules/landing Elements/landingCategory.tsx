import React from 'react';

import { getLocale } from 'next-intl/server';
import Link from 'next/link';

import { ICategory } from '@models/category';

import CategoryCard from '../categoryCart';

interface IProps {
  categories: ICategory[];
}
export default async  function LandingCategory(props: IProps) {
  const { categories } = props;
  const locale = await getLocale()
  return (
    <section id="categories" className="flex flex-col gap-4 mx-auto px-4 py-10 w-full max-w-7xl">
       <Link href={`/${locale}/categories`} className="block text-sm text-end underline">
                مشاهده همه دسته بندی ها
              </Link>
        <div className="hidden-show-scrollbar sm:hidden flex gap-4 pb-2 overflow-x-auto">
          {categories?.map((cat) => (
            <button
              key={cat.id}
              className="group relative flex-shrink-0 bg-white shadow-sm hover:shadow-lg rounded-2xl min-w-[70%] sm:min-w-0 overflow-hidden transition-shadow"
            >
              <div className="w-full h-44 overflow-hidden">
                <img
                  src={cat.categoryCover}
                  alt={cat.englishName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform transform"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium">{cat.persianName}</h3>
                <p className="text-gray-500 text-xs">{cat.categoryPersianDesc}</p>
              </div>
            </button>
          ))}
        </div>
      <div className="gap-6 grid grid-cols-1 sm:grid-cols-3 py-10">
        {categories?.map((cat,index) => (
            <CategoryCard
            key={index}
            category={cat}
        />
          ))}
      </div>
    </section>
  );
}

