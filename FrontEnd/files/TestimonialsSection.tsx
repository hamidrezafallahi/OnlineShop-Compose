"use client";
import React from 'react';
import Image from 'next/image';
import { StarIcon } from '@components/atoms/iconComponents';

const testimonials = [
  {
    id: 1,
    name: 'سمانه کاظمی',
    comment: 'رایحه‌ی عطر واقعا عالی و ماندگار بود، بسته‌بندی هم زیبا و شیک.',
    rating: 5,
    avatar: 'https://i.pravatar.cc/100?img=12',
    product: 'Velvet Oud',
    date: '۱۵ مهر ۱۴۰۳',
  },
  {
    id: 2,
    name: 'حسین موسوی',
    comment: 'ارسال سریع و قیمت مناسب. کاملا راضی هستم از خریدم.',
    rating: 4,
    avatar: 'https://i.pravatar.cc/100?img=22',
    product: 'Noir Intense',
    date: '۱۰ مهر ۱۴۰۳',
  },
  {
    id: 3,
    name: 'مهسا احمدی',
    comment: 'پشتیبانی عالی و پاسخگو، تجربه خرید خیلی خوبی داشتم.',
    rating: 5,
    avatar: 'https://i.pravatar.cc/100?img=33',
    product: 'Rose Delight',
    date: '۵ مهر ۱۴۰۳',
  },
];

export default function TestimonialsSection() {
  return (
    <section className="bg-white py-20 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-4 mb-3">
            <div className="w-8 h-px bg-[#C8955A]" />
            <span className="text-[#C8955A] text-xs tracking-[0.35em] uppercase">نظرات</span>
            <div className="w-8 h-px bg-[#C8955A]" />
          </div>
          <h2 className="font-['Cormorant_Garamond'] text-[#141210] text-3xl md:text-4xl font-light">
            مشتریان ما چه می‌گویند
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="
                relative bg-[#F7F3EE] border border-[#E8D5C4]/40 rounded-2xl p-6
                hover:border-[#C8955A]/30 hover:shadow-[0_4px_20px_rgba(200,149,90,0.08)]
                transition-all duration-400 text-right
              "
            >
              {/* Large quote mark */}
              <div className="absolute top-5 start-6 font-['Cormorant_Garamond'] text-[#C8955A]/15 text-7xl leading-none select-none">
                "
              </div>

              {/* Stars */}
              <div className="flex gap-0.5 mb-4 justify-end">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <span key={i} className="text-[#C8955A]">
                    <StarIcon />
                  </span>
                ))}
              </div>

              {/* Comment */}
              <p className="text-[#141210]/65 text-sm leading-relaxed mb-5">
                {t.comment}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-[#E8D5C4]/40">
                <div className="flex items-center gap-3">
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    width={38}
                    height={38}
                    className="rounded-full border border-[#E8D5C4]"
                  />
                  <div className="text-right">
                    <p className="text-[#141210] font-medium text-sm">{t.name}</p>
                    <p className="text-[#141210]/35 text-xs">{t.date}</p>
                  </div>
                </div>
                {t.product && (
                  <span className="text-[#C8955A] text-xs border border-[#C8955A]/25 px-2.5 py-1 rounded-full">
                    {t.product}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
