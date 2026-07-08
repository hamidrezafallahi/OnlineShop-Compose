"use client";
import React from 'react';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import {
  shallowEqual,
  useDispatch,
} from 'react-redux';

import { LangIcon } from '@components/atoms/iconComponents';
import { setLocale } from '@slice/config';
import { TLang } from '@slice/config/type';
import { useAppSelector } from '@store/index';

export default function LangSwitcher() {
  const { locale } = useAppSelector((state) => {
    const locale = state.withPersist.config.locale;
    return { locale };
  }, shallowEqual);
  const router = useRouter();
  const t = useTranslations()
  const dispatch = useDispatch();

  const handleChangeLang = () => {
  const newLang: TLang = locale === "fa" ? "en" : "fa";

  // مسیر فعلی بدون دامنه
  const pathname = window.location.pathname; // مثلا "/fa/blog/123"

  // قسمت‌ها رو جدا می‌کنیم
  const parts = pathname.split("/").filter(Boolean); // ["fa", "blog", "123"]

  // اولین بخش (زبان) رو جایگزین می‌کنیم
  if (parts.length > 0) {
    parts[0] = newLang;
  } else {
    parts.unshift(newLang);
  }

  // دوباره URL رو می‌سازیم
  const newPath = "/" + parts.join("/");
  const newUrl = window.location.origin + newPath;

  // تغییر state زبان
  dispatch(setLocale({ locale: newLang }));

  // تغییر مسیر
  router.replace(newUrl);
};
  return (
    <button
      onClick={handleChangeLang}
      aria-label={t('header.lang')}
      className="flex justify-center items-center bg-white/30 hover:bg-white/40 shadow-black/20 shadow-lg hover:shadow-black/30 hover:shadow-xl backdrop-blur-md border border-white/20 rounded-md xs:rounded-full w-10 h-10 transition-all duration-300"
    >
      <LangIcon config={{ size: 14 }} />
    </button>
  );
}
