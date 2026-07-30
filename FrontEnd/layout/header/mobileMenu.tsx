'use client';

import React, { useEffect, useState } from 'react';

import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';

import { CloseIcon, MenuIcon } from '@components/atoms/iconComponents';
import LangSwitcher from '@components/molecules/lang';
import ThemeSwitcher from '@components/molecules/theme';

const LINKS = [
  { href: '', labelKey: 'home' as const },
  { href: 'products', labelKey: 'products' as const },
  { href: 'categories', labelKey: 'categories' as const },
  { href: 'brands', labelKey: 'brands' as const },
  { href: 'suppliers', labelKey: 'suppliers' as const },
  { href: 'tags', labelKey: 'tags' as const },
  { href: 'discounts', labelKey: 'discounts' as const },
  { href: 'blog', labelKey: 'blogs' as const },
  { href: 'shoppingCart', labelKey: 'shopping cart' as const },
  { href: 'register', labelKey: 'register' as const },
] as const;

function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const locale = useLocale();
  const t = useTranslations('header');

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="store-icon-btn"
        aria-expanded={isOpen}
        aria-controls="mobile-nav-drawer"
        aria-label={t('openMenu')}
      >
        <MenuIcon />
      </button>

      <div
        data-open={isOpen ? 'true' : 'false'}
        className="store-mobile-backdrop"
        aria-hidden={!isOpen}
        onClick={() => setIsOpen(false)}
      />

      <nav
        id="mobile-nav-drawer"
        data-open={isOpen ? 'true' : 'false'}
        aria-label={t('mainNav')}
        aria-hidden={!isOpen}
        className="store-mobile-drawer"
      >
        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="store-icon-btn"
            aria-label={t('closeMenu')}
          >
            <CloseIcon />
          </button>
          <div className="flex gap-2">
            <ThemeSwitcher />
            <LangSwitcher />
          </div>
        </div>

        <ul className="flex flex-col gap-1 font-medium text-base">
          {LINKS.map((item) => (
            <li key={item.href || 'home'}>
              <Link
                href={item.href ? `/${locale}/${item.href}` : `/${locale}`}
                className="block px-3 py-2.5 rounded-xl hover:bg-[color-mix(in_srgb,var(--primary-color)_10%,transparent)] hover:text-[var(--primary-color)] transition"
                onClick={() => setIsOpen(false)}
                tabIndex={isOpen ? 0 : -1}
              >
                {t(item.labelKey)}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}

export default MobileMenu;
