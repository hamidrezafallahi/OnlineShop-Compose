"use client";
import React from 'react';

import Image from 'next/image';

import { StarIcon } from '@components/atoms/iconComponents';

type Testimonial = {
  id: number;
  name: string;
  comment: string;
  rating: number;
  avatar?: string;
  product?: string;
  date?: string;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "سمانه کاظمی",
    comment: "رایحه‌ی عطر واقعا عالی و ماندگار بود، بسته‌بندی هم زیبا و شیک بود.",
    rating: 5,
    avatar: "https://i.pravatar.cc/100?img=12",
    product: "Velvet Oud",
    date: "۱۵ مهر ۱۴۰۳",
  },
  {
    id: 2,
    name: "حسین موسوی",
    comment: "ارسال سریع و قیمت مناسب. کاملا راضی هستم.",
    rating: 4,
    avatar: "https://i.pravatar.cc/100?img=22",
    product: "Noir Intense",
    date: "۱۰ مهر ۱۴۰۳",
  },
  {
    id: 3,
    name: "مهسا احمدی",
    comment: "پشتیبانی عالی و پاسخگو، تجربه خرید خیلی خوبی داشتم.",
    rating: 5,
    avatar: "https://i.pravatar.cc/100?img=33",
    product: "Rose Delight",
    date: "۵ مهر ۱۴۰۳",
  },
];

const TestimonialsSection: React.FC = () => {
  return (
    <section className="bg-gray-50 py-16">
      <div className="mx-auto px-4 text-center container">
        <h2 className="mb-10 font-bold text-2xl sm:text-3xl">نظر مشتریان ما</h2>

        <div className="gap-8 grid sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="flex flex-col items-center bg-white shadow-sm hover:shadow-md p-6 rounded-2xl text-center transition"
            >
              {t.avatar && (
                <Image
                  src={t.avatar}
                  alt={t.name}
                  width={60}
                  height={60}
                  className="mb-4 rounded-full"
                />
              )}
              <p className="mb-3 text-gray-600">{t.comment}</p>

              <div className="flex items-center gap-1 mb-2 text-yellow-500">
                {Array.from({ length: 2 }).map((_, i) => (
                  <StarIcon key={i}  />
                ))}
              </div>

              <div className="text-gray-400 text-xs">
                {t.product && <span className="mr-2">{t.product}</span>}
                {t.date && <span>{t.date}</span>}
              </div>

              <h4 className="mt-3 font-semibold">{t.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
