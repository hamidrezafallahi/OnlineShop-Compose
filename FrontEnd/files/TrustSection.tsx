"use client";
import React from 'react';
import Image from 'next/image';
import {
  CreditCardIcon, LookIcon, ReplaceIcon, StarIcon, TruckIcon,
} from '@components/atoms/iconComponents';

const trustBadges = [
  { icon: <LookIcon />, title: 'پرداخت امن', desc: 'اطلاعات شما رمزگذاری می‌شود' },
  { icon: <CreditCardIcon />, title: 'پرداخت در محل', desc: 'پس از دریافت کالا پرداخت کنید' },
  { icon: <ReplaceIcon />, title: '۷ روز ضمانت', desc: 'در صورت نارضایتی بازگردانید' },
  { icon: <TruckIcon />, title: 'ارسال سریع', desc: 'تحویل فوری به سراسر کشور' },
];

const reviews = [
  { id: 1, name: 'مریم رضایی', comment: 'بسته‌بندی عالی و ارسال سریع. عطر فوق‌العاده‌ای بود!', rating: 5, avatar: 'https://i.pravatar.cc/100?img=47' },
  { id: 2, name: 'علیرضا کریمی', comment: 'کیفیت محصولات خیلی خوبه، حتماً دوباره خرید می‌کنم.', rating: 4, avatar: 'https://i.pravatar.cc/100?img=55' },
  { id: 3, name: 'الهام احمدی', comment: 'پشتیبانی سریع و محترمانه. حس خوبی از خرید داشتم.', rating: 5, avatar: 'https://i.pravatar.cc/100?img=32' },
];

const brands = [
  { id: 1, name: 'Dior', logo: '/images/brands/dior.svg' },
  { id: 2, name: 'Chanel', logo: '/images/brands/chanel.svg' },
  { id: 3, name: 'Tom Ford', logo: '/images/brands/tomford.svg' },
  { id: 4, name: 'Versace', logo: '/images/brands/versace.svg' },
];

export default function TrustSection() {
  return (
    <section className="bg-white py-20 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">

        {/* Section header */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-4 mb-3">
            <div className="w-8 h-px bg-[#C8955A]" />
            <span className="text-[#C8955A] text-xs tracking-[0.35em] uppercase">اعتماد</span>
            <div className="w-8 h-px bg-[#C8955A]" />
          </div>
          <h2 className="font-['Cormorant_Garamond'] text-[#141210] text-3xl md:text-4xl font-light">
            چرا مشتریان به ما اعتماد دارند؟
          </h2>
        </div>

        {/* Trust badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {trustBadges.map((badge, i) => (
            <div
              key={i}
              className="
                flex flex-col items-center text-center
                bg-[#F7F3EE] border border-[#E8D5C4]/40
                rounded-2xl p-6 gap-3
                hover:border-[#C8955A]/40 hover:shadow-[0_4px_20px_rgba(200,149,90,0.08)]
                transition-all duration-400
              "
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white border border-[#E8D5C4]">
                <span className="text-[#C8955A]">{badge.icon}</span>
              </div>
              <h3 className="text-[#141210] font-medium text-sm">{badge.title}</h3>
              <p className="text-[#141210]/45 text-xs leading-relaxed">{badge.desc}</p>
            </div>
          ))}
        </div>

        {/* Reviews */}
        <div className="grid sm:grid-cols-3 gap-6 mb-16">
          {reviews.map((r) => (
            <div
              key={r.id}
              className="
                bg-[#F7F3EE] border border-[#E8D5C4]/40 rounded-2xl p-6
                hover:border-[#C8955A]/30 transition-all duration-400
                text-right
              "
            >
              <div className="flex items-center gap-3 mb-4">
                <Image src={r.avatar} alt={r.name} width={44} height={44} className="rounded-full" />
                <div>
                  <h4 className="text-[#141210] font-medium text-sm">{r.name}</h4>
                  <div className="flex gap-0.5 mt-0.5">
                    {Array.from({ length: r.rating }).map((_, i) => (
                      <StarIcon key={i} />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-[#141210]/55 text-sm leading-relaxed">{r.comment}</p>
            </div>
          ))}
        </div>

        {/* Brand logos */}
        <div className="flex flex-wrap justify-center items-center gap-10 pt-10 border-t border-[#E8D5C4]/50">
          {brands.map((b) => (
            <div key={b.id} className="relative w-24 h-10 opacity-30 hover:opacity-60 grayscale hover:grayscale-0 transition-all duration-400">
              <Image src={b.logo} alt={b.name} fill className="object-contain" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
