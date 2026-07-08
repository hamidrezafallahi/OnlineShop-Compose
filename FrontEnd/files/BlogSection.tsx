"use client";
import React from 'react';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { CalendarIcon, UserIcon } from '@components/atoms/iconComponents';

const blogPosts = [
  {
    id: 1,
    title: '۵ نکته برای انتخاب عطر مناسب فصل',
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
    <section className="bg-[#F7F3EE] py-20 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div className="flex items-center gap-4">
            <div className="w-8 h-px bg-[#C8955A]" />
            <div>
              <p className="text-[#C8955A] text-xs tracking-[0.35em] uppercase mb-1">دانش</p>
              <h2 className="font-['Cormorant_Garamond'] text-[#141210] text-3xl md:text-4xl font-light">
                از بلاگ ما بخوانید
              </h2>
            </div>
          </div>
          <Link
            href={`/${locale}/blog`}
            className="text-[#141210]/50 hover:text-[#C8955A] text-sm border-b border-[#141210]/20 hover:border-[#C8955A] transition-all duration-300 pb-px"
          >
            همه مقالات ←
          </Link>
        </div>

        {/* Blog grid — first card featured, rest smaller */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
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
                <div className="absolute top-3 start-3">
                  <span className="bg-white/90 backdrop-blur-sm text-[#141210] text-xs px-3 py-1 rounded-full border border-[#E8D5C4]/60">
                    {post.tag}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-5 text-right">
                <h3 className="font-['Cormorant_Garamond'] text-[#141210] text-xl font-medium leading-snug mb-2 group-hover:text-[#C8955A] transition-colors duration-300">
                  {post.title}
                </h3>
                <p className="text-[#141210]/45 text-sm leading-relaxed flex-1">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#E8D5C4]/40">
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
