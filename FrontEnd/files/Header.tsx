"use client";
import React, {
  useEffect,
  useState,
} from 'react';

import {
  useLocale,
  useTranslations,
} from 'next-intl';
import Link from 'next/link';

import { UserIcon } from '@components/atoms/iconComponents';
import LangSwitcher from '@components/molecules/lang';
import ThemeSwitcher from '@components/molecules/theme';
import MobileMenu from '@layout/header/mobileMenu';
import ShoppingCart from '@layout/header/shoppingCart';

export default function Header() {
  const locale = useLocale();
  const t = useTranslations();
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 431);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`
        fixed inset-x-0 top-0 z-50 flex justify-center
        transition-all duration-500
        ${scrolled ? 'xs:top-2 xs:px-6' : 'xs:top-4 xs:px-10'}
      `}
    >
      <nav
        className={`
          flex justify-between items-center w-full h-[68px] px-5
          transition-all duration-500
          ${scrolled
            ? 'bg-[#141210]/90 backdrop-blur-xl border border-white/10 xs:rounded-2xl shadow-2xl shadow-black/30'
            : 'bg-[#141210]/60 backdrop-blur-md border border-white/10 xs:rounded-2xl'
          }
        `}
      >
        {isMobile ? (
          <>
            <MobileMenu />
            <Link
              href={`/${locale}`}
              className="font-['Cormorant_Garamond'] font-light text-white text-xl tracking-widest"
            >
              عطرینو
            </Link>
            <Link href={`/${locale}/register`} className="text-white/70 hover:text-white transition-colors">
              <UserIcon />
            </Link>
          </>
        ) : (
          <>
            {/* Brand */}
            <Link
              href={`/${locale}`}
              className="font-['Cormorant_Garamond'] font-light text-white text-2xl tracking-[0.15em] shrink-0"
            >
              {t('brand.name')}
            </Link>

            {/* Nav links */}
            <div className="flex items-center gap-8">
              {[
                { href: `/${locale}/products`, label: t('header.men') },
                { href: `/${locale}/products`, label: t('header.women') },
                { href: `/${locale}/discounts`, label: t('header.discounts') },
                { href: `/${locale}/blog`, label: t('header.blogs') },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="after:right-0 after:-bottom-0.5 hover:after:left-0 after:absolute relative after:bg-[#C8955A] after:w-0 hover:after:w-full after:h-px text-white/70 hover:text-white text-sm tracking-wide transition-colors after:transition-all duration-300 after:duration-300"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Link
                href={`/${locale}/register`}
                aria-label={t('header.register')}
                className="flex justify-center items-center hover:bg-white/10 border border-white/20 hover:border-white/40 rounded-full w-9 h-9 text-white/70 hover:text-white transition-all duration-300"
              >
                <UserIcon />
              </Link>
              <ShoppingCart />
              <ThemeSwitcher />
              <LangSwitcher />
            </div>
          </>
        )}
      </nav>
    </header>
  );
}
