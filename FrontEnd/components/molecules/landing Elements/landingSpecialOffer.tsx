// app/components/landing/LandingSpecialOffer.tsx
import React from 'react';

import { getAll } from '@lib/getAll';
import { SpecialOffer } from '@models/specialOffer';

import SpecialOfferCarouselClient from './SpecialOfferCarouselClient';

export const dynamic = "force-dynamic";

export default async  function LandingSpecialOffer() {
  const spacialOffers = await getAll<SpecialOffer>("SpecialOffers/landing");
  return (
    <section className="mx-auto px-4 py-16 w-full max-w-7xl">
      <div className="relative flex md:flex-row flex-col items-center gap-8 bg-gradient-to-r from-rose-600 to-pink-500 p-8 sm:p-12 rounded-3xl overflow-hidden text-white">
        {/* متن سمت چپ */}
        <div className="flex-1 min-w-0">
          <h2 className="mb-3 font-extrabold text-3xl sm:text-4xl">
            پیشنهاد ویژه امروز
          </h2>
          <p className="opacity-90 mb-6 max-w-md text-sm sm:text-base text-center">
            فقط تا پایان امروز می‌تونی این محصولات  را با   تخفیف ویژه تهیه کنی!
          </p>


          
        </div>

        <div className="flex flex-1 justify-center w-2/3">
          {/* اندازه این قاب به گونه‌ای انتخاب شده که جای یک تصویر قبلی را بگیرد */}
          <div className="w-full h-80">
            <SpecialOfferCarouselClient spacialOffers={spacialOffers?.data.records||[]} />
          </div>
        </div>
      </div>
    </section>
  );
}
