import React from 'react';

import { getAll } from '@lib/getAll';
import { SpecialOffer } from '@models/specialOffer';

import SpecialOfferCarouselClient from './SpecialOfferCarouselClient';

export const dynamic = "force-dynamic";

export default async function LandingSpecialOffer() {
  const spacialOffers = await getAll<SpecialOffer>('SpecialOffers/landing');
  const items = spacialOffers?.data.records ?? [];

  return (
    <section className="bg-[#F7F3EE] px-6 md:px-16 py-20">
      <div className="mx-auto max-w-7xl">

        {/* Outer frame — dark card */}
        <div className="relative bg-[#141210] rounded-3xl overflow-hidden">

          {/* Background texture orb */}
          <div className="top-0 right-1/4 absolute bg-[#C8955A]/8 blur-[80px] rounded-full w-80 h-80 pointer-events-none" />
          <div className="bottom-0 left-10 absolute bg-[#E8C4B0]/5 blur-[60px] rounded-full w-52 h-52 pointer-events-none" />

          <div className="relative flex md:flex-row flex-col gap-10 p-8 sm:p-12">

            {/* Left: copy */}
            <div className="flex flex-col justify-center gap-5 md:w-64 shrink-0">
              <div className="flex items-center gap-3">
                <div className="bg-[#C8955A] w-6 h-px" />
                <span className="text-[#C8955A] text-xs uppercase tracking-[0.35em]">امروز</span>
              </div>

              <h2 className="font-['Cormorant_Garamond'] font-light text-white text-4xl md:text-5xl leading-tight">
                پیشنهاد
                <br />
                <span className="text-[#C8955A]">ویژه</span>
              </h2>

              <p className="text-white/40 text-sm leading-relaxed">
                فقط تا پایان امروز با تخفیف ویژه خرید کن.
                فرصت را از دست نده!
              </p>

              {/* Countdown placeholder — your CountdownDisplay goes here */}
              <div className="flex gap-3">
                {[
                  { val: '۰۸', label: 'ساعت' },
                  { val: '۴۵', label: 'دقیقه' },
                  { val: '۳۰', label: 'ثانیه' },
                ].map((t) => (
                  <div key={t.label} className="flex flex-col items-center bg-white/5 px-4 py-2.5 border border-white/10 rounded-xl min-w-[54px]">
                    <span className="font-['Cormorant_Garamond'] font-light text-white text-2xl">{t.val}</span>
                    <span className="mt-0.5 text-[10px] text-white/30">{t.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: carousel */}
            <div className="flex-1 min-w-0">
              <div className="w-full h-80">
                <SpecialOfferCarouselClient spacialOffers={items} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
