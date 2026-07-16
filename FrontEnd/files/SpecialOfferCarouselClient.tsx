"use client";
import React, {
  useEffect,
  useRef,
} from 'react';

import Image from 'next/image';

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ShoppingCartIcon,
} from '@components/atoms/iconComponents';
import CountdownDisplayClient
  from '@components/molecules/countdownDisplayClient';
import { SpecialOffer } from '@models/specialOffer';

interface Props {
  spacialOffers: SpecialOffer[];
}

const CARD_W = 200;
const GAP = 12;
const STEP = CARD_W + GAP;

export default function SpecialOfferCarouselClient({ spacialOffers }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftBtnRef = useRef<HTMLButtonElement>(null);
  const rightBtnRef = useRef<HTMLButtonElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const items = spacialOffers ?? [];

  const scroll = (dir: 'left' | 'right') => {
    containerRef.current?.scrollBy({ left: dir === 'left' ? -STEP : STEP, behavior: 'smooth' });
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const checkScrollable = () => {
      const show = el.scrollWidth > el.clientWidth + 2 ? 'flex' : 'none';
      if (leftBtnRef.current) leftBtnRef.current.style.display = show;
      if (rightBtnRef.current) rightBtnRef.current.style.display = show;
    };
    checkScrollable();
    window.addEventListener('resize', checkScrollable);

    const onDown = (e: MouseEvent) => {
      isDragging.current = true;
      startX.current = e.pageX - el.offsetLeft;
      scrollLeft.current = el.scrollLeft;
      document.body.style.userSelect = 'none';
    };
    const onUp = () => { isDragging.current = false; document.body.style.userSelect = ''; };
    const onMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      e.preventDefault();
      el.scrollLeft = scrollLeft.current - (e.pageX - el.offsetLeft - startX.current);
    };

    el.addEventListener('mousedown', onDown);
    el.addEventListener('mouseleave', onUp);
    el.addEventListener('mouseup', onUp);
    el.addEventListener('mousemove', onMove);

    return () => {
      window.removeEventListener('resize', checkScrollable);
      el.removeEventListener('mousedown', onDown);
      el.removeEventListener('mouseleave', onUp);
      el.removeEventListener('mouseup', onUp);
      el.removeEventListener('mousemove', onMove);
    };
  }, []);

  if (!items.length) {
    return (
      <div className="flex justify-center items-center w-full h-full text-white/30 text-sm">
        پیشنهادی موجود نیست
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">

      {/* Prev */}
      <button
        ref={leftBtnRef}
        onClick={() => scroll('left')}
        aria-label="قبلی"
        style={{ display: 'none' }}
        className="top-1/2 left-0 z-30 absolute flex justify-center items-center bg-white/10 hover:bg-white/20 border border-white/15 rounded-full w-8 h-8 text-white transition-all -translate-y-1/2 duration-300"
      >
        <ChevronLeftIcon config={{ size: 14 }} />
      </button>

      {/* Next */}
      <button
        ref={rightBtnRef}
        onClick={() => scroll('right')}
        aria-label="بعدی"
        style={{ display: 'none' }}
        className="top-1/2 right-0 z-30 absolute flex justify-center items-center bg-white/10 hover:bg-white/20 border border-white/15 rounded-full w-8 h-8 text-white transition-all -translate-y-1/2 duration-300"
      >
        <ChevronRightIcon config={{ size: 14 }} />
      </button>

      {/* Scrollable list */}
      <div
        ref={containerRef}
        className="flex items-stretch gap-[12px] w-full h-full overflow-x-auto select-none"
        style={{ scrollbarWidth: 'none' }}
      >
        {items.map((s, i) => (
          <div
            key={`${s.id}-${i}`}
            style={{ minWidth: CARD_W, width: CARD_W }}
            className="flex-shrink-0"
          >
            <OfferCard offer={s} />
          </div>
        ))}
      </div>
    </div>
  );
}

function OfferCard({ offer }: { offer: SpecialOffer }) {
  return (
    <article className="group relative flex flex-col bg-[#1e1a16] border border-white/8 hover:border-[#C8955A]/30 rounded-2xl h-full overflow-hidden transition-all duration-400">
      {/* Image */}
      <div className="relative bg-[#141210] w-full h-44 overflow-hidden shrink-0">
        <Image
          src={offer.product.mainImage || 'https://picsum.photos/seed/p/300/300'}
          alt={offer.product.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
          priority
          sizes="200px"
        />
        {/* Countdown badge */}
        <div className="top-2 z-10 absolute start-2">
          <CountdownDisplayClient targetTime={new Date(offer.endDate).getTime()} />
        </div>
        {/* Discount badge */}
        {offer.product.discountId > 0 && (
          <div className="top-2 z-10 absolute bg-[#C8955A] px-2 py-1 rounded-lg font-medium text-white text-xs end-2">
            {offer.product.discountAmount}
            <span className="text-[10px]"> ت</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1e1a16]/60 to-transparent" />
      </div>

      {/* Info */}
      <div className="flex flex-col flex-1 gap-2 p-3">
        <h4 className="font-medium text-white text-xs line-clamp-2 leading-relaxed">
          {offer.product.name}
        </h4>
        <div className="flex justify-between items-center mt-auto pt-2 border-white/8 border-t">
          <span className="font-semibold text-[#C8955A] text-sm">
            {offer.product.finalPrice}
          </span>
          <button
            className="flex items-center gap-1 bg-[#C8955A] hover:bg-[#b8854a] px-2.5 py-1.5 rounded-lg text-white text-xs transition-colors duration-300"
          >
            <ShoppingCartIcon />
            <span>افزودن</span>
          </button>
        </div>
      </div>
    </article>
  );
}
