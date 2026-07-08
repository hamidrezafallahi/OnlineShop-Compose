import React from 'react';

import Link from 'next/link';

import { IProps } from './type';

export async function BlogTags({ ...props }: IProps) {
  const { blog, locale } = props;
  const isRTL = locale == "fa";
  return (
    <div className={`flex flex-wrap gap-2 p-2  ${isRTL ? "justify-end" : ""}`}>
      {blog?.blogTags?.map((tag,idx) => (
        <Link
        href={`/${locale}/tags/${tag.name}`}
        key={idx}
          className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full text-sm transition-colors cursor-pointer"
        >
            #{tag.name}
        </Link>
      ))}
    </div>
  );
}
