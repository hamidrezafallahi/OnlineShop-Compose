import React from 'react';

import { getLocale } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';

import { ICategory } from '@models/category';

export async function SupplierCategory(props: {
  categories: ICategory[];
}) {
  const { categories } = props;
  const locale = await getLocale();
  const uniqueCategory: ICategory[] = [];
  categories.forEach((element) => {
    if (!uniqueCategory.some((u) => u.id == element.id)) {
      uniqueCategory.push(element);
    }
  });
  return (
    <div className="mb-10">
      <div className="gap-6 sm:grid grid-cols-4">
        {uniqueCategory?.map((cat, i) => (
          <Link
            href={`/${locale}/categories/${cat.id}`}
            key={i}
            className="group relative shadow-sm rounded-2xl h-44 md:h-52 overflow-hidden"
          >
            <Image
              src={cat.categoryCover}
              alt={cat.persianName}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform transform"
              loading="lazy"
              width={200}
              height={200}
            />
            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/40 to-transparent p-4">
              <div>
                <h3 className="font-semibold text-white">
                  {locale == "fa" ? cat.persianName : cat.englishName}
                </h3>
                <p className="text-gray-200 text-xs">
                  {locale == "fa"
                    ? cat.categoryPersianDesc
                    : cat.categoryEnglishDesc}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
