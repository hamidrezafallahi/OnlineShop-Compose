import React from 'react';

import { getLocale } from 'next-intl/server';

export async function RelatedArticles() {
      const locale = await getLocale();
      const isRTL = locale == "fa"
  return (
    <section className="bg-gray-50 py-16">
        <div className="mx-auto px-4 max-w-6xl">
          <h2
            className={`font-bold text-2xl mb-8 ${isRTL ? "text-right" : ""}`}
          >
            {isRTL ? "مقالات مرتبط" : "Related Articles"}
          </h2>
          <div className="gap-6 grid grid-cols-1 md:grid-cols-3">
            {/* اینجا می‌توانید مقالات مرتبط را اضافه کنید */}
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="bg-white shadow-sm hover:shadow-md rounded-xl overflow-hidden transition-shadow"
              >
                <div className="bg-gradient-to-br from-primary/20 to-secondary/20 h-48" />
                <div className="p-4">
                  <h3 className="mb-2 font-semibold text-lg">
                    {isRTL ? "عنوان مقاله مرتبط" : "Related Article Title"}
                  </h3>
                  <p className="mb-3 text-gray-600 text-sm line-clamp-2">
                    {isRTL
                      ? "توضیح کوتاه درباره مقاله مرتبط"
                      : "Short description about related article"}
                  </p>
                  <a
                    href="#"
                    className="font-medium text-primary text-sm hover:underline"
                  >
                    {isRTL ? "مطالعه بیشتر" : "Read More"}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
  )
}
