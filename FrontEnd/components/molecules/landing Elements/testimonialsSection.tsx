'use client';

import React from 'react';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

import { StarIcon } from '@components/atoms/iconComponents';

const ITEM_KEYS = ['1', '2', '3'] as const;
const AVATARS = [12, 22, 33];

const TestimonialsSection: React.FC = () => {
  const t = useTranslations('testimonials');

  return (
    <section className="bg-gray-50 py-16">
      <div className="mx-auto px-4 text-center container">
        <h2 className="mb-10 font-bold text-2xl sm:text-3xl">
          {t('sectionTitle')}
        </h2>

        <div className="gap-8 grid sm:grid-cols-2 lg:grid-cols-3">
          {ITEM_KEYS.map((id, index) => (
            <div
              key={id}
              className="flex flex-col items-center bg-white shadow-sm hover:shadow-md p-6 rounded-2xl text-center transition"
            >
              <Image
                src={`https://i.pravatar.cc/100?img=${AVATARS[index]}`}
                alt={t(`items.${id}.name`)}
                width={60}
                height={60}
                className="mb-4 rounded-full"
              />
              <p className="mb-3 text-gray-600">{t(`items.${id}.comment`)}</p>

              <div className="flex items-center gap-1 mb-2 text-yellow-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon key={i} />
                ))}
              </div>

              <div className="text-gray-600 text-xs">
                <span>{t(`items.${id}.product`)}</span>
              </div>

              <h3 className="mt-3 font-semibold">{t(`items.${id}.name`)}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
