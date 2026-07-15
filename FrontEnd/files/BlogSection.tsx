"use client";
import React from 'react';

import { useLocale } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

import {
  CalendarIcon,
  UserIcon,
} from '@components/atoms/iconComponents';

const blogPosts = [
  {
    id: 1,
    title: '6 نکته برای انتخاب عطر مناسب فصل',
    excerpt: 'انتخاب عطر مناسب برای هر فصل باعث می‌شود حس و حالتان با طبیعت هماهنگ‌تر باشد.',
    image: '/images/blogs/perfume-tips.jpg',
    author: 'تحریریه عطرینو',
    date: '۱۴ مهر ۱۴۰۳',
    slug: 'choose-best-perfume',
    tag: 'راهنما',
  },
  {
    id: 2,
    title: 'راهنمای تشخیص عطر اصل از تقلبی',
    excerpt: 'با نکات کاربردی و نشانه‌هایی آشنا می‌شوید که کمک می‌کند عطر اورجینال را تشخیص دهید.',
    image: '/images/blogs/original-vs-fake.jpg',
    author: 'سارا فلاحی',
    date: '۲۶ شهریور ۱۴۰۳',
    slug: 'original-vs-fake-perfume',
    tag: 'آموزش',
  },
  {
    id: 3,
    title: 'بهترین روش‌های نگهداری از عطر',
    excerpt: 'برای اینکه رایحه‌ی عطرتان همیشه مثل روز اول بماند، باید اصول نگهداری آن را بدانید.',
    image: '/images/blogs/perfume-care.jpg',
    author: 'تحریریه عطرینو',
    date: '۱۰ مرداد ۱۴۰۳',
    slug: 'perfume-storage-tips',
    tag: 'نگهداری',
  },
];

export default function BlogSection() {
  const locale = useLocale();

  return (
    <section className="bg-[#F7F3EE] px-6 md:px-16 py-20">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="flex justify-between items-end mb-12">
          <div className="flex items-center gap-4">
            <div className="bg-[#C8955A] w-8 h-px" />
            <div>
              <p className="mb-1 text-[#C8955A] text-xs uppercase tracking-[0.35em]">دانش</p>
              <h2 className="font-['Cormorant_Garamond'] font-light text-[#141210] text-3xl md:text-4xl">
                از بلاگ ما بخوانید
              </h2>
            </div>
          </div>
          <Link
            href={`/${locale}/blog`}
            className="pb-px border-[#141210]/20 hover:border-[#C8955A] border-b text-[#141210]/50 hover:text-[#C8955A] text-sm transition-all duration-300"
          >
            همه مقالات ←
          </Link>
        </div>

        {/* Blog grid — first card featured, rest smaller */}
        <div className="gap-5 grid grid-cols-1 md:grid-cols-3">
          {blogPosts.map((post, i) => (
            <Link
              key={post.id}
              href={`/${locale}/blog/${post.slug}`}
              className={`
                group relative bg-white overflow-hidden rounded-2xl
                border border-[#E8D5C4]/40
                hover:border-[#C8955A]/30 hover:shadow-[0_8px_30px_rgba(200,149,90,0.10)]
                transition-all duration-500 flex flex-col
                ${i === 0 ? 'md:row-span-2' : ''}
              `}
            >
              {/* Image */}
              <div className={`relative w-full overflow-hidden ${i === 0 ? 'h-64 md:h-[320px]' : 'h-44'}`}>
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {/* Tag pill */}
                <div className="top-3 absolute start-3">
                  <span className="bg-white/90 backdrop-blur-sm px-3 py-1 border border-[#E8D5C4]/60 rounded-full text-[#141210] text-xs">
                    {post.tag}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-5 text-right">
                <h3 className="mb-2 font-['Cormorant_Garamond'] font-medium text-[#141210] group-hover:text-[#C8955A] text-xl leading-snug transition-colors duration-300">
                  {post.title}
                </h3>
                <p className="flex-1 text-[#141210]/45 text-sm leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="flex justify-between items-center mt-4 pt-4 border-[#E8D5C4]/40 border-t">
                  <div className="flex items-center gap-1.5 text-[#141210]/35 text-xs">
                    <UserIcon />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#141210]/35 text-xs">
                    <CalendarIcon />
                    <span>{post.date}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
