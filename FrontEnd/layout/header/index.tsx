"use client";
import React from 'react';

import {
  useLocale,
  useTranslations,
} from 'next-intl';
import Link from 'next/link';

import { UserIcon } from '@components/atoms/iconComponents';
import LangSwitcher from '@components/molecules/lang';
import ThemeSwitcher from '@components/molecules/theme';

import MobileMenu from './mobileMenu';
import ShoppingCart from './shoppingCart';

export default function Header() {
  const locale = useLocale();

  const t = useTranslations();
  const isMobile = window.innerWidth < 431;

  return (
    <>
      {/* <ThemeButton /> */}

      <div className="xs:top-4 z-50 fixed inset-0 flex justify-center xs:items-end xs:px-10 xs:pt-4 h-20 transition-all duration-300">
        <div className="z-50 flex justify-between items-center bg-white/10 shadow-lg hover:shadow-xl backdrop-blur-md p-4 border border-white/20 xs:rounded-2xl w-full h-20 text-center transition-all duration-300">
          {isMobile ? (
            <>
              <MobileMenu />
              <Link href={`/${locale}`}>brand</Link>
              <Link href={`/${locale}/register`}>login</Link>
            </>
          ) : (
            <>
              <Link
                href={`/${locale}`}
                className="flex justify-center items-center !bg-transparent h-10"
              >
                {t("brand.name")}
              </Link>
              <div className="flex gap-4">
                <Link
                  href={`/${locale}/products`}
                  className="flex justify-center items-center !bg-transparent h-10"
                >
                  {t("header.men")}
                </Link>
                <Link
                  href={`/${locale}/products`}
                  className="flex justify-center items-center !bg-transparent h-10"
                >
                  {t("header.women")}
                </Link>

                <Link
                  href={`/${locale}/discounts`}
                  className="flex justify-center items-center !bg-transparent h-10"
                >
                  {t("header.discounts")}
                </Link>

                <Link
                  href={`/${locale}/blog`}
                  className="flex justify-center items-center !bg-transparent h-10"
                >
                  {t("header.blogs")}
                </Link>
              </div>
              <div className="relative flex gap-2">
                <Link
                  href={`/${locale}/register`}
                  aria-label={t("header.register")}
                  className="flex justify-center items-center bg-white/30 hover:bg-white/40 shadow-black/20 shadow-lg hover:shadow-black/30 hover:shadow-xl backdrop-blur-md border border-white/20 rounded-md xs:rounded-full w-10 h-10 transition-all duration-300"
                >
                  <UserIcon />
                </Link>
                <ShoppingCart />
                <ThemeSwitcher />
                <LangSwitcher />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
