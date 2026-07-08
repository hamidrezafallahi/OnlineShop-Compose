import React from 'react';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { IBrand } from '@models/brand';

export default function BrandCard({ brand }: { brand: IBrand }) {
  const locale = useLocale();

  return (
    <Link
      href={`/${locale}/brands/${brand.id}`}
      className="
        group relative bg-white overflow-hidden
        border border-[#E8D5C4]/50 hover:border-[#C8955A]/40
        transition-all duration-500
        hover:shadow-[0_8px_30px_rgba(200,149,90,0.12)]
        rounded-2xl
      "
    >
      {/* Image */}
      <div className="relative w-full h-44 overflow-hidden bg-[#F7F3EE]">
        <Image
          src={brand.logoFile}
          alt={brand.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-[#141210]/0 group-hover:bg-[#141210]/10 transition-all duration-500" />
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-medium text-[#141210] text-sm">{brand.name}</h3>
        {brand.description && (
          <p className="text-[#141210]/40 text-xs mt-1 line-clamp-2">{brand.description}</p>
        )}
        <span className="inline-block mt-3 text-[#C8955A] text-xs tracking-wide group-hover:tracking-wider transition-all duration-300">
          مشاهده →
        </span>
      </div>
    </Link>
  );
}
