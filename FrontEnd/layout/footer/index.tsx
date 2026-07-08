"use client";
import React from 'react';

import Link from 'next/link';

import {
  FacebookIcon,
  InstagramIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsAppIcon,
  YouTubeIcon,
} from '@components/atoms/iconComponents';

type FooterLink = {
  name: string;
  href: string;
};

type FooterColumn = {
  title: string;
  links: FooterLink[];
};

const footerColumns: FooterColumn[] = [
  {
    title: "درباره ما",
    links: [
      { name: "داستان ما", href: "/about" },
      { name: "تماس با ما", href: "/contact" },
      { name: "فرصت‌های شغلی", href: "/careers" },
    ],
  },
  {
    title: "راهنمای خرید",
    links: [
      { name: "شیوه پرداخت", href: "/payment" },
      { name: "ارسال و تحویل", href: "/shipping" },
      { name: "سیاست بازگشت", href: "/return-policy" },
    ],
  },
  {
    title: "دسته‌بندی‌ها",
    links: [
      { name: "عطر زنانه", href: "/categories/women-perfume" },
      { name: "عطر مردانه", href: "/categories/men-perfume" },
      { name: "ادکلن‌های لوکس", href: "/categories/luxury" },
    ],
  },
  {
    title: "پشتیبانی",
    links: [
      { name: "سوالات متداول", href: "/faq" },
      { name: "پشتیبانی آنلاین", href: "/support" },
      { name: "نظرات مشتریان", href: "/testimonials" },
    ],
  },
];

const socialLinks = [
  { icon: <FacebookIcon />, href: "https://facebook.com" },
  { icon: <InstagramIcon />, href: "https://instagram.com" },
  { icon: <TwitterIcon />, href: "https://twitter.com" },
  { icon: <YouTubeIcon />, href: "https://youtube.com" },
  { icon: <TelegramIcon />, href: "https://telegram.com" },
  { icon: <WhatsAppIcon />, href: "https://whatsapp.com" },
];

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 pt-12 text-gray-300">
      <div className="gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 mx-auto px-4 container">
        {/* لوگو و توضیح کوتاه */}
        <div className="sm:col-span-2 lg:col-span-1">
          <h2 className="mb-4 font-bold text-white text-2xl">PerfumeStore</h2>
          <p className="text-gray-400 text-sm">
            بهترین عطرها با ضمانت اصالت و ارسال سریع. همراه با خدمات مشتریان حرفه‌ای.
          </p>
          <div className="flex gap-4 mt-4">
            {socialLinks.map((s, i) => (
              <Link
                key={i}
                href={s.href}
                target="_blank"
                className="hover:text-white transition"
              >
                {s.icon}
              </Link>
            ))}
          </div>
        </div>

        {/* ستون لینک‌ها */}
        {footerColumns.map((col, i) => (
          <div key={i}>
            <h3 className="mb-4 font-semibold text-white">{col.title}</h3>
            <ul className="flex flex-col gap-2 text-sm">
              {col.links.map((link, j) => (
                <li key={j}>
                  <Link
                    href={link.href}
                    className="hover:text-white transition"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* کپی‌رایت */}
      <div className="mt-12 pt-6 border-gray-800 border-t text-gray-500 text-sm text-center">
        © {new Date().getFullYear()} PerfumeStore. تمامی حقوق محفوظ است.
      </div>
    </footer>
  );
};

export default Footer;
