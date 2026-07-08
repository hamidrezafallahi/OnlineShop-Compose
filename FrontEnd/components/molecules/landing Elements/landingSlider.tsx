"use client";
import React, {
  useEffect,
  useState,
} from 'react';

import { useLocale } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  LinkIcon,
} from '@components/atoms/iconComponents';

interface IProps {
 images:{banner:string, pageUrl: string}[]
}

function LandingSlider({ ...props }: IProps) {
  const { images } = props;
const locale = useLocale()
  const [current, setCurrent] = useState(0);
  const length = images.length;
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % length);
    }, 5000);
    return () => clearInterval(interval);
  }, [length]);

  const goToSlide = (index: number) => setCurrent(index);
  const prevSlide = () =>
    setCurrent((prev) => (prev === 0 ? length - 1 : prev - 1));
  const nextSlide = () => setCurrent((prev) => (prev + 1) % length);
   return (
    <div className="relative w-full overflow-hidden">
      <div className="relative shadow-lg h-56 md:h-96 overflow-hidden">
        {images.map((item, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === current ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <Image
              src={item.banner}
              alt={`Slide ${index + 1}`}
              fill
              className="object-cover"
              priority={index === 0}
            />

            {/* لایه‌ی تیره برای خواناتر شدن متن و دکمه */}
            <div className="absolute inset-0 bg-black/40" />

            {/* متن و دکمه */}
            <div className="rtl:md:right-16 rtl:right-8 bottom-8 left-8 md:left-16 absolute bg-white hover:bg-gray-200 rounded-full w-10 h-10">
              <Link
                href={`/${locale}/${item.pageUrl}`}
                className="flex justify-center items-center shadow-md w-full h-full transition-all duration-200"
              >
                <LinkIcon />
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="bottom-5 left-1/2 z-40 absolute flex rtl:flex-row-reverse gap-3 -translate-x-1/2 transform">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === current ? "bg-white" : "bg-gray-400"
            }`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* دکمه قبلی */}
      <button
        onClick={prevSlide}
        className="top-0 left-0 z-40 absolute flex justify-center items-center px-4 h-full cursor-pointer"
      >
        <span className="inline-flex justify-center items-center bg-white/30 hover:bg-white/50 rounded-full w-10 h-10">
          <ChevronLeftIcon />
        </span>
      </button>

      {/* دکمه بعدی */}
      <button
        onClick={nextSlide}
        className="top-0 right-0 z-40 absolute flex justify-center items-center px-4 h-full cursor-pointer"
      >
        <span className="inline-flex justify-center items-center bg-white/30 hover:bg-white/50 rounded-full w-10 h-10">
          <ChevronRightIcon />
        </span>
      </button>
    </div>
  );
}

export default LandingSlider;
