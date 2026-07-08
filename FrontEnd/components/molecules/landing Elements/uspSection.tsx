"use client";
import React from 'react';

import {
  BadgeCheckIcon,
  CashIcon,
  PhoneIcon,
  ShieldCheckIcon,
  TruckIcon,
} from '@components/atoms/iconComponents';

type USP = {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
};

const uspItems: USP[] = [
  {
    id: 1,
    icon: <TruckIcon />,
    title: "ارسال رایگان",
    description: "ارسال رایگان برای سفارش‌های بالای ۵۰۰ هزار تومان",
  },
  {
    id: 2,
    icon: <PhoneIcon />,
    title: "پشتیبانی ۲۴ ساعته",
    description: "در هر ساعت از شبانه‌روز پاسخگوی شما هستیم",
  },
  {
    id: 3,
    icon: <CashIcon />,
    title: "پرداخت در محل",
    description: "امکان پرداخت وجه هنگام تحویل سفارش",
  },
  {
    id: 4,
    icon: <ShieldCheckIcon />,
    title: "گارانتی محصولات",
    description: "تمامی محصولات دارای ضمانت اصالت و سلامت فیزیکی هستند",
  },
  {
    id: 5,
    icon: <BadgeCheckIcon />,
    title: "اصالت کالا",
    description: "فقط عطرهای اورجینال و دارای مجوز عرضه می‌شوند",
  },
];

const USPSection: React.FC = () => {
  return (
    <section className="bg-gray-50 py-16">
      <div className="mx-auto px-4 text-center container">
        <h2 className="mb-10 font-bold text-2xl sm:text-3xl">
          مزیت‌های خرید از فروشگاه ما
        </h2>

        <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
          {uspItems.map((usp) => (
            <div
              key={usp.id}
              className="flex flex-col items-center bg-white shadow-sm hover:shadow-md p-6 rounded-2xl transition"
            >
              <div className="mb-3">{usp.icon}</div>
              <h3 className="mb-1 font-semibold text-lg">{usp.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {usp.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default USPSection;
