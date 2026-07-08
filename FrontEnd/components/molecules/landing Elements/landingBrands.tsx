import React from 'react';

import { getLocale } from 'next-intl/server';
import Link from 'next/link';

import { getAll } from '@lib/getAll';
import { IBrand } from '@models/brand';

import BrandCard from '../brandCard';

export const dynamic = "force-dynamic";

export default async function LandingBrands( ) {
    const locale = await getLocale()
   const response = await getAll<IBrand>("brands", {
     page: 1,
     pageSize: 5,
     byConfig: false,
   });
  return (
     <section className="mx-auto px-4 py-12 w-full max-w-7xl">
      {/* Header */}
      <div className="flex sm:flex-row flex-col flex-wrap sm:justify-between sm:items-center gap-4 mb-8">
        <div>
          <h2 className="font-semibold text-2xl sm:text-3xl">برندها</h2>
          <p className="text-muted-foreground text-sm">
           برند های موجود
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link href={`/${locale}/brands`} className="text-sm underline">
            مشاهده همه برند ها
          </Link>
        </div>
      </div>
       <div className="gap-6 grid sm:grid-cols-4">
          {response?.data?.records?.map((brand,index) => (<BrandCard brand={brand}  key={index}/>))}
        </div>
      </section>
  )
}
