import React from 'react';

import { getTranslations } from 'next-intl/server';

export async function Navigator({ ...props }: IProps) {
  const {   locale } = props;

  const t = await getTranslations({ locale });
  const isRTL = locale == "fa";
  return (
    <div className="bg-white shadow-sm p-6 border rounded-lg">
      <h3 className={`font-semibold text-lg mb-4 ${isRTL ? "text-right" : ""}`}>
        {t("blog.tableOfContents")}
      </h3>
      <nav className={`space-y-2 ${isRTL ? "text-right" : ""}`}>
        <a
          href="#section1"
          className="block py-2 text-gray-600 hover:text-primary"
        >
        {t("blog.introduction")}
        </a>
        <a
          href="#section2"
          className="block py-2 text-gray-600 hover:text-primary"
          >
            {t("blog.content")}
 
        </a>
        <a
          href="#section3"
          className="block py-2 text-gray-600 hover:text-primary"
          >
            {t("blog.conclusion")}
        </a>
      </nav>
    </div>
  );
}
