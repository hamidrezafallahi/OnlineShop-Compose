"use client";
import React from 'react';
import { BadgeCheckIcon, CashIcon, PhoneIcon, ShieldCheckIcon, TruckIcon } from '@components/atoms/iconComponents';

const uspItems = [
  { icon: <TruckIcon />, title: 'ارسال رایگان', desc: 'سفارش‌های بالای ۵۰۰ هزار تومان' },
  { icon: <PhoneIcon />, title: 'پشتیبانی ۲۴ ساعته', desc: 'در هر ساعت پاسخگوی شما هستیم' },
  { icon: <CashIcon />, title: 'پرداخت در محل', desc: 'پرداخت هنگام تحویل سفارش' },
  { icon: <ShieldCheckIcon />, title: 'گارانتی محصولات', desc: 'ضمانت اصالت و سلامت فیزیکی' },
  { icon: <BadgeCheckIcon />, title: 'اصالت کالا', desc: 'فقط عطرهای اورجینال و مجوزدار' },
];

export default function USPSection() {
  return (
    <section className="bg-[#141210] py-20 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-4 mb-3">
            <div className="w-8 h-px bg-[#C8955A]/50" />
            <span className="text-[#C8955A] text-xs tracking-[0.35em] uppercase">چرا ما؟</span>
            <div className="w-8 h-px bg-[#C8955A]/50" />
          </div>
          <h2 className="font-['Cormorant_Garamond'] text-white text-3xl md:text-4xl font-light">
            مزیت‌های خرید از ما
          </h2>
        </div>

        {/* USP grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {uspItems.map((item, i) => (
            <div
              key={i}
              className="
                group flex flex-col items-center text-center
                border border-white/8 rounded-2xl p-6 gap-4
                hover:border-[#C8955A]/30 hover:bg-white/3
                transition-all duration-400
              "
            >
              <div className="
                w-12 h-12 flex items-center justify-center rounded-full
                bg-white/5 border border-white/10
                group-hover:border-[#C8955A]/30 group-hover:bg-[#C8955A]/8
                transition-all duration-400
              ">
                <span className="text-white/60 group-hover:text-[#C8955A] transition-colors duration-400">
                  {item.icon}
                </span>
              </div>
              <div>
                <h3 className="text-white font-medium text-sm mb-1">{item.title}</h3>
                <p className="text-white/35 text-xs leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
