import React from 'react';

import { getLocale, getTranslations } from 'next-intl/server';

export async function RelatedArticles() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: 'blog' });

  return (
    <section className="store-section" aria-labelledby="related-articles-title">
      <div className="store-panel mx-auto px-4 sm:px-6 py-10 max-w-6xl">
        <h2
          id="related-articles-title"
          className="store-section-title mb-8"
        >
          {t('title')}
        </h2>
        <p className="text-[var(--store-text-muted)] text-sm">
          {t('emptyHint')}
        </p>
      </div>
    </section>
  );
}
