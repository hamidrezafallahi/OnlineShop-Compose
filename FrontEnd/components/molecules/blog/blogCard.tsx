import React from 'react';

import { getLocale } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';

import { IBlog } from '@models/Blog';

export async function BlogCard({ ...props }: { blog: IBlog }) {
  const {   slug, titleFa, thumbnailFile  } = props.blog;
  const locale =await getLocale();
 
  return (
    <Link
      href={`/${locale}/blog/${slug}`} className="flex flex-col gap-5 bg-white/10 shadow-lg hover:shadow-xl backdrop-blur-md p-4 border border-white/20 rounded-2xl w-full sm:w-60 h-fit overflow-hidden text-center hover:scale-105 transition-all duration-300">
      <div className="relative w-full aspect-square">
      {thumbnailFile?.length>0 && 
        <Image
          src={thumbnailFile}
          alt={titleFa}
          className="rounded-xl object-cover"
          fill
          priority 
        />}
      </div>
      <div className="font-semibold text-white">{titleFa}</div>
      <div
        className="bg-primary text-gray-200 text-sm"
      
      >
        {slug}
      </div>
    </Link>
  );
}

