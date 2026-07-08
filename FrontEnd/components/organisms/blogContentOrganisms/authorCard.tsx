import React from 'react';

import { getTranslations } from 'next-intl/server';

import { IProps } from './type';

export async function AuthorCard({ ...props }: IProps) {
  const { blog, locale } = props;
  const t = await getTranslations({ locale });
  const isRTL = locale == "fa";
  return (
    <div
      className={`flex items-center gap-4 p-6 bg-white rounded-lg shadow-sm mb-8 border ${
        isRTL ? "flex-row-reverse text-right" : ""
      }`}
    >
      <div className="flex justify-center items-center bg-primary/10 rounded-full w-14 h-14">
        <div className="font-bold text-primary">{t("blog.author")}</div>
      </div>
      <div>
        <h3>
          {blog.authorName}
          {locale}
        </h3>
        <div>{t("blog.createdAt")}</div>
        <time className="text-gray-600 text-sm">
          {new Intl.DateTimeFormat(locale, {
            day: "numeric",
            month: "long",
            year: "numeric",
          }).format(new Date(blog.createdAt))}
        </time>
        <div>{t("blog.updatedAt")}</div>
        <time className="text-gray-600 text-sm">
          {new Intl.DateTimeFormat(locale, {
            day: "numeric",
            month: "long",
            year: "numeric",
          }).format(new Date(blog.updatedAt))}
        </time>
      </div>
    </div>
  );
}
