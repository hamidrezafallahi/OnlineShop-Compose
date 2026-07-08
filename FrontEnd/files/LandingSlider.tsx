"use client";
import React, { useEffect, useState, useCallback } from 'react';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeftIcon, ChevronRightIcon, LinkIcon } from '@components/atoms/iconComponents';

interface IProps {
  images: { banner: string; pageUrl: string }[];
}

export default function LandingSlider({ images }: IProps) {
  const locale = useLocale();
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const length = images.length;

  const goTo = useCallback(
    (index: number) => {
      if (animating || index === current) return;
      setAnimating(true);
      setTimeout(() => setAnimating(false), 700);
      setCurrent((index + length) % length);
    },
    [animating, current, length]
  );

  useEffect(() => {
    const id = setInterval(() => goTo((current + 1) % length), 5500);
    return () => clearInterval(id);
  }, [current, goTo, length]);

  if (!images?.length) return null;

  return (
    <div className="relative w-full bg-[#141210] overflow-hidden" style={{ height: 'clamp(220px, 50vw, 500px)' }}>

      {/* Slides */}
      {images.map((item, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            idx === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <Image
            src={item.banner}
            alt={`اسلاید ${idx + 1}`}
            fill
            className="object-cover"
            priority={idx === 0}
          />
          {/* Dark vignette */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#141210]/70 via-transparent to-[#141210]/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141210]/60 via-transparent to-transparent" />

          {/* CTA link */}
          <div className="absolute bottom-8 start-8 md:start-16">
            <Link
              href={`/${locale}/${item.pageUrl}`}
              className="
                flex items-center gap-2 px-5 py-2.5
                bg-white/15 backdrop-blur-sm border border-white/25
                text-white text-sm tracking-wide
                hover:bg-white/25 hover:border-white/40
                transition-all duration-300 rounded-full
              "
            >
              <LinkIcon />
              <span>مشاهده بیشتر</span>
            </Link>
          </div>
        </div>
      ))}

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20 h-0.5 bg-white/10">
        <div
          className="h-full bg-[#C8955A] transition-none"
          style={{
            width: `${((current + 1) / length) * 100}%`,
            transition: 'width 5.5s linear',
          }}
        />
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            aria-label={`اسلاید ${idx + 1}`}
            className={`
              rounded-full transition-all duration-400
              ${idx === current
                ? 'w-6 h-2 bg-[#C8955A]'
                : 'w-2 h-2 bg-white/30 hover:bg-white/50'
              }
            `}
          />
        ))}
      </div>

      {/* Prev / Next */}
      {[
        { dir: 'prev', Icon: ChevronRightIcon, pos: 'right-4', action: () => goTo(current - 1) },
        { dir: 'next', Icon: ChevronLeftIcon, pos: 'left-4', action: () => goTo(current + 1) },
      ].map(({ dir, Icon, pos, action }) => (
        <button
          key={dir}
          onClick={action}
          aria-label={dir === 'prev' ? 'قبلی' : 'بعدی'}
          className={`
            absolute top-1/2 -translate-y-1/2 ${pos} z-20
            w-10 h-10 flex items-center justify-center
            bg-white/10 backdrop-blur-sm border border-white/15
            rounded-full text-white
            hover:bg-white/25 hover:border-white/30
            transition-all duration-300
          `}
        >
          <Icon />
        </button>
      ))}
    </div>
  );
}
