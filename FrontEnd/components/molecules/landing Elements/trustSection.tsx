'use client';

import React from 'react';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

import {
  CreditCardIcon,
  LookIcon,
  ReplaceIcon,
  StarIcon,
  TruckIcon,
} from '@components/atoms/iconComponents';

const BADGE_KEYS = [
  { id: 'secure', icon: <LookIcon /> },
  { id: 'cod', icon: <CreditCardIcon /> },
  { id: 'return', icon: <ReplaceIcon /> },
  { id: 'shipping', icon: <TruckIcon /> },
] as const;

const REVIEW_KEYS = ['1', '2', '3'] as const;

const TrustSection: React.FC = () => {
  const t = useTranslations('trust');

  return (
    <section className="bg-white py-16 text-center">
      <h2 className="mb-10 font-bold text-2xl sm:text-3xl">
        {t('sectionTitle')}
      </h2>

      <div className="gap-6 grid grid-cols-2 sm:grid-cols-4 mb-16">
        {BADGE_KEYS.map((badge) => (
          <div
            key={badge.id}
            className="flex flex-col items-center bg-gray-50 hover:shadow-md p-6 rounded-2xl text-center transition"
          >
            {badge.icon}
            <h3 className="mt-3 font-semibold">{t(`badges.${badge.id}.title`)}</h3>
            <p className="mt-1 text-gray-500 text-sm">
              {t(`badges.${badge.id}.description`)}
            </p>
          </div>
        ))}
      </div>

      <div className="gap-6 grid sm:grid-cols-3 mb-16">
        {REVIEW_KEYS.map((id, index) => (
          <div
            key={id}
            className="bg-gray-50 hover:shadow-md p-6 rounded-2xl text-right transition"
          >
            <div className="flex items-center mb-3">
              <Image
                src={`https://i.pravatar.cc/100?img=${[47, 55, 32][index]}`}
                alt={t(`reviews.${id}.name`)}
                width={50}
                height={50}
                className="rounded-full"
              />
              <div className="ms-3">
                <h4 className="font-semibold">{t(`reviews.${id}.name`)}</h4>
                <div className="flex text-yellow-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon key={i} />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              {t(`reviews.${id}.comment`)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrustSection;
