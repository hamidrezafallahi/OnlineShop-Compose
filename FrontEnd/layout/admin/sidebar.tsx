"use client";
import React, { useState } from 'react';

import {
  useLocale,
  useTranslations,
} from 'next-intl';
import Link from 'next/link';

import {
  LeftIcon,
  RightIcon,
} from '@components/atoms/iconComponents';
import LangSwitcher from '@components/molecules/lang';
import ThemeSwitcher from '@components/molecules/theme';
import { menuResponse } from '@models/config';

interface SidebarProps {
  initialOpen?: boolean;
  menu: menuResponse;
}

export default function Sidebar({ menu, initialOpen = true }: SidebarProps) {
  const [open, setOpen] = useState(initialOpen);
  const t = useTranslations();
  const SIDEBAR_WIDTH = 250;
  const SIDEBAR_COLLAPSED = 80;
  const locale = useLocale();
  return (
    <div
      style={{
        width: open ? SIDEBAR_WIDTH : SIDEBAR_COLLAPSED,
      }}
    >
      <div
        style={{
          width: open ? SIDEBAR_WIDTH : SIDEBAR_COLLAPSED,
        }}
        className="flex flex-col bg-white/10 backdrop-blur-md border border-white/20 h-screen transition-all duration-300"
      >
        {/* toggle button */}
        <button
          className="top-4 z-10 absolute flex justify-center items-center bg-white shadow border rounded-full w-6 h-6"
          onClick={() => setOpen(!open)}
          style={{
            left: locale === "fa" ? -12 : undefined,
            right: locale !== "fa" ? -12 : undefined,
          }}
        >
          {locale !== "fa" ? (
            open ? (
              <LeftIcon />
            ) : (
              <RightIcon />
            )
          ) : open ? (
            <RightIcon />
          ) : (
            <LeftIcon />
          )}
        </button>
        {/* هدر ثابت */}
        <div className="h-20">
          <div className="flex justify-center items-center h-20">
                          <Link
                href={`/${locale}`}
               >
                {open?t("brand.name"):t("brand.icon")}
              </Link>
            
          </div>
        </div>

        <div className="flex flex-col flex-1 gap-2 p-2 min-h-0 overflow-y-auto">
          {menu.data.map((item, idx) => (
            <Link
              key={idx}
              href={`/${locale}/admin/${item.endPoint}?ByConfig=true`}
              className={`flex ${!open&&"justify-center"} gap-2`}
            >
              <div
                dangerouslySetInnerHTML={{ __html: item.entityIconBase64 }}
              />
              {open && (
                locale == "fa" ? (
                  <div className="whitespace-nowrap">
                    {item.persianDisplayName}
                  </div>
                ) : (
                  <div className="whitespace-nowrap">
                    {item.englishDisplayName}
                  </div>
                )
              )}
            </Link>
          ))}
        </div>

        {/* فوتر ثابت */}
        <div className="h-20">
          <div className="flex justify-center items-center border-t h-20">
            <ThemeSwitcher />
            <LangSwitcher />
          </div>
        </div>
      </div>
    </div>
  );
}
