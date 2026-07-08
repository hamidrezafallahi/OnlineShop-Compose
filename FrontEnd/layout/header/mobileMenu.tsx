"use client";
import React, { useState } from 'react';

import { useLocale } from 'next-intl';
import Link from 'next/link';

import {
  CloseIcon,
  MenuIcon,
} from '@components/atoms/iconComponents';
import LangSwitcher from '@components/molecules/lang';
import ThemeSwitcher from '@components/molecules/theme';

function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
const locale = useLocale()
  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <>
      {/* دکمه منو */}
      <button
        onClick={toggleMenu}
        className="z-[80] relative bg-white/20 backdrop-blur-sm p-2 border rounded-md"
      >
        <MenuIcon />
      </button>

      {/* بک‌گراند تار */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm transition-all duration-300 ${
          isOpen ? "opacity-100 visible z-[60]" : "opacity-0 invisible z-0"
        }`}
      />

      {/* منوی کشویی */}
      <div
        className={`
          fixed top-20 bottom-0 w-full bg-white bg-opacity-90  shadow-2xl z-[70] p-6
          transition-transform duration-300 ease-in-out
          h-[calc(100dvh-80px)]
          ${
            isOpen
              ? "translate-x-0 left-0 rtl:translate-x-0 rtl:right-0  "
              : " -translate-x-full left-0 rtl:translate-x-full rtl:right-0"
          }
        `}
      >
        <div className="flex flex-col gap-6 font-medium text-primary text-lg">
          <div className="flex justify-between w-full">
            <button onClick={() => setIsOpen(false)}>
              <CloseIcon />
            </button>
            <div className="flex gap-4">
              <ThemeSwitcher />
              <LangSwitcher />
            </div>
          </div>

          <Link href={`/${locale}`} className="hover:text-blue-500 transition">
            صفحه اصلی
          </Link>
          <Link href={`/${locale}/products`} className="hover:text-blue-500 transition">
            محصولات
          </Link>
          <Link href={`/${locale}/shoppingCart`} className="hover:text-blue-500 transition">
            سبد خرید
          </Link>
          <Link href={`/${locale}/contactUs`} className="hover:text-blue-500 transition">
            تماس با ما
          </Link>
        </div>
      </div>
    </>
  );
}

export default MobileMenu;
