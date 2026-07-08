"use client";
import React from 'react';

import { useLocale } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

import {
  CalendarIcon,
  UserIcon,
} from '@components/atoms/iconComponents';

type BlogPost = {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
  slug: string;
};

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "۵ نکته برای انتخاب عطر مناسب فصل",
    excerpt:
      "انتخاب عطر مناسب برای هر فصل باعث می‌شود حس و حالتان با طبیعت هماهنگ‌تر باشد. در این مقاله یاد می‌گیرید چطور رایحه درست را انتخاب کنید.",
    image: "/images/blogs/perfume-tips.jpg",
    author: "تحریریه عطرینو",
    date: "۱۴ مهر ۱۴۰۳",
    slug: "choose-best-perfume",
  },
  {
    id: 2,
    title: "راهنمای تشخیص عطر اصل از تقلبی",
    excerpt:
      "در این مقاله با نکات کاربردی و نشانه‌هایی آشنا می‌شوید که کمک می‌کند عطر اورجینال را از نمونه‌های فیک تشخیص دهید.",
    image: "/images/blogs/original-vs-fake.jpg",
    author: "سارا فلاحی",
    date: "۲۶ شهریور ۱۴۰۳",
    slug: "original-vs-fake-perfume",
  },
  {
    id: 3,
    title: "بهترین روش‌های نگهداری از عطر",
    excerpt:
      "برای اینکه رایحه‌ی عطرتان همیشه مثل روز اول بماند، باید اصول نگهداری آن را بدانید. در این مطلب همه‌چیز را یاد می‌گیرید.",
    image: "/images/blogs/perfume-care.jpg",
    author: "تحریریه عطرینو",
    date: "۱۰ مرداد ۱۴۰۳",
    slug: "perfume-storage-tips",
  },
];

const BlogSection: React.FC = () => {
  const locale = useLocale()
  return (
    <section className="bg-white py-16">
      <div className="mx-auto px-4 container">
        <div className="mb-10 text-center">
          <h2 className="mb-3 font-bold text-2xl sm:text-3xl">از بلاگ ما بخوانید</h2>
          <p className="text-gray-500 text-sm sm:text-base">
            جدیدترین مقالات آموزشی و نکات مفید درباره عطر و ادکلن
          </p>
        </div>

        <div className="gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <Link
              key={post.id}
              href={`/${locale}/blog/${post.slug}`}
              className="group flex flex-col bg-gray-50 hover:shadow-lg rounded-2xl overflow-hidden transition"
            >
              <div className="relative w-full h-56">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="flex flex-col flex-grow p-5 text-right">
                <h3 className="mb-2 font-semibold group-hover:text-primary text-lg transition">
                  {post.title}
                </h3>
                <p className="flex-grow text-gray-600 text-sm">{post.excerpt}</p>

                <div className="flex justify-between items-center mt-4 text-gray-400 text-xs">
                  <div className="flex items-center gap-1">
                    <UserIcon />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {/* {calendar} */}
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
};

export default BlogSection;
