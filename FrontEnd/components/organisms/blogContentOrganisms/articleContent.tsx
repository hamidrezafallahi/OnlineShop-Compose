import React from 'react';

import { getTranslations } from 'next-intl/server';

import { IProps } from './type';

export async function ArticleContent({ ...props }: IProps) {
  const { blog, locale } = props;
  const isRTL = locale == "fa";
  const t = await getTranslations({ locale });

  return (
    <>
      <span id="section1" className="scroll-mt-24 snap-start">
        {t("blog.introduction")}
      </span>
      <div
        className={` bg-white rounded-lg p-4 prose prose-lg max-w-none ${
          isRTL ? "prose-rtl" : "prose-ltr"
        }`}
        dangerouslySetInnerHTML={{
          __html: isRTL ? blog.introFa : blog.introEn || "",
        }}
      ></div>
      <span id="section2" className="scroll-mt-24 snap-start">
        {t("blog.content")}
      </span>
      <div
        className={`  bg-white rounded-lg p-4 prose prose-lg max-w-none ${
          isRTL ? "prose-rtl" : "prose-ltr"
        }`}
        dangerouslySetInnerHTML={{
          __html: isRTL ? blog.contentFa : blog.contentEn || "",
        }}
      ></div>
      <span id="section3" className="scroll-mt-24 snap-start">
        {t("blog.conclusion")}
      </span>
      <div
        className={`  bg-white rounded-lg p-4 prose prose-lg max-w-none ${
          isRTL ? "prose-rtl" : "prose-ltr"
        }`}
        dangerouslySetInnerHTML={{
          __html: isRTL ? blog.conclusionFa : blog.conclusionEn || "",
        }}
      ></div>
    </>
  );
}
