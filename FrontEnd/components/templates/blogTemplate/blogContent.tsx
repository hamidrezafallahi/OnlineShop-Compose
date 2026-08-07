import React from 'react';

import FaqSection from '@components/molecules/storefront/FaqSection';
import {
  ArticleContent,
  AuthorCard,
  BlogSidebar,
  BlogTags,
} from '@components/organisms/blogContentOrganisms';

import { IProps } from './type';

export async function BlogContent({ ...props }: IProps) {
  const { blog, locale, faqItems = [] } = props;
  const prop = { blog, locale };
  return (
    <div className="mx-auto px-4 py-12 max-w-4xl">
      <div className="relative flex lg:flex-row flex-col gap-8">
        <main className="p-3 sm:w-2/3">
          <AuthorCard {...prop} />
          <ArticleContent {...prop} />
          {faqItems.length > 0 ? (
            <FaqSection items={faqItems} locale={locale} />
          ) : null}
          <BlogTags {...prop} />
        </main>
        <BlogSidebar {...prop} />
      </div>
    </div>
  );
}
