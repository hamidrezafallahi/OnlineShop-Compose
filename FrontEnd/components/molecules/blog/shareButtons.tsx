import React from 'react';

import { getTranslations } from 'next-intl/server';

export async function ShareButtons({ ...props }: IProps) {
  const {  locale } = props;
  const t = await getTranslations({locale});
  const isRTL = locale == "fa";
  return (
    <div className="bg-white shadow-sm p-6 border rounded-lg">
      <h3 className={`font-semibold text-lg mb-4 ${isRTL ? "text-right" : ""}`}>
        {t("blog.share")}
      </h3>
      <div className={`flex gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
        {["twitter", "linkedin", "telegram", "whatsapp"].map((platform) => (
          <button
            key={platform}
            className="flex justify-center items-center bg-gray-100 hover:bg-primary rounded-full w-10 h-10 hover:text-white transition-colors"
            aria-label={`Share on ${platform}`}
          >
            {platform.charAt(0).toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
}
