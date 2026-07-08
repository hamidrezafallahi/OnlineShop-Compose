"use client";
import React from 'react';

import Image from 'next/image';

import {
  CreditCardIcon,
  LookIcon,
  ReplaceIcon,
  StarIcon,
  TruckIcon,
} from '@components/atoms/iconComponents';

type TrustBadge = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

type Review = {
  id: number;
  name: string;
  comment: string;
  rating: number;
  avatar: string;
};

type Brand = {
  id: number;
  name: string;
  logo: string;
};

const trustBadges: TrustBadge[] = [
  {
    icon: <LookIcon/>,
    title: "پرداخت امن",
    description: "اطلاعات شما رمزگذاری می‌شود",
  },
  {
    icon: <CreditCardIcon/>,
    title: "پرداخت در محل",
    description: "پس از دریافت کالا پرداخت کنید",
  },
  {
    icon: <ReplaceIcon/>,
    title: "۷ روز ضمانت بازگشت",
    description: "در صورت نارضایتی کالا را بازگردانید",
  },
  {
    icon: <TruckIcon/>,
    title: "ارسال سریع",
    description: "تحویل فوری به سراسر کشور",
  },
];

const reviews: Review[] = [
  {
    id: 1,
    name: "مریم رضایی",
    comment: "بسته‌بندی عالی و ارسال سریع. عطر فوق‌العاده‌ای بود!",
    rating: 5,
    avatar: "https://i.pravatar.cc/100?img=47",
  },
  {
    id: 2,
    name: "علیرضا کریمی",
    comment: "کیفیت محصولات خیلی خوبه، حتماً دوباره خرید می‌کنم.",
    rating: 4,
    avatar: "https://i.pravatar.cc/100?img=55",
  },
  {
    id: 3,
    name: "الهام احمدی",
    comment: "پشتیبانی سریع و محترمانه. حس خوبی از خرید داشتم.",
    rating: 5,
    avatar: "https://i.pravatar.cc/100?img=32",
  },
];

const brands: Brand[] = [
  { id: 1, name: "Dior", logo: "/images/brands/dior.svg" },
  { id: 2, name: "Chanel", logo: "/images/brands/chanel.svg" },
  { id: 3, name: "Tom Ford", logo: "/images/brands/tomford.svg" },
  { id: 4, name: "Versace", logo: "/images/brands/versace.svg" },
];

const TrustSection: React.FC = () => {
  return (
    <section className="bg-white py-16 text-center">
      <h2 className="mb-10 font-bold text-2xl sm:text-3xl">
        چرا مشتریان به ما اعتماد دارند؟
      </h2>

      {/* Badges */}
      <div className="gap-6 grid grid-cols-2 sm:grid-cols-4 mb-16">
        {trustBadges.map((badge, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center bg-gray-50 hover:shadow-md p-6 rounded-2xl text-center transition"
          >
            {badge.icon}
            <h3 className="mt-3 font-semibold">{badge.title}</h3>
            <p className="mt-1 text-gray-500 text-sm">{badge.description}</p>
          </div>
        ))}
      </div>

      {/* Reviews */}
      <div className="gap-6 grid sm:grid-cols-3 mb-16">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-gray-50 hover:shadow-md p-6 rounded-2xl text-right transition"
          >
            <div className="flex items-center mb-3">
              <Image
                src={review.avatar}
                alt={review.name}
                width={50}
                height={50}
                className="rounded-full"
              />
              <div className="mr-3">
                <h4 className="font-semibold">{review.name}</h4>
                <div className="flex text-yellow-500">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <StarIcon key={i} />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              {review.comment}
            </p>
          </div>
        ))}
      </div>

      {/* Brands */}
      <div className="flex flex-wrap justify-center items-center gap-10 opacity-70 grayscale">
        {brands.map((brand) => (
          <div key={brand.id} className="relative w-24 h-12">
            <Image
              src={brand.logo}
              alt={brand.name}
              fill
              className="object-contain"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrustSection;
