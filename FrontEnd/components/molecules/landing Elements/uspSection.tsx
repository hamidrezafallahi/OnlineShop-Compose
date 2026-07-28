'use client';

import React from 'react';

import { useTranslations } from 'next-intl';

import {
  BadgeCheckIcon,
  CashIcon,
  PhoneIcon,
  ShieldCheckIcon,
  TruckIcon,
} from '@components/atoms/iconComponents';

const USP_KEYS = [
  { id: 'shipping', icon: <TruckIcon /> },
  { id: 'support', icon: <PhoneIcon /> },
  { id: 'cod', icon: <CashIcon /> },
  { id: 'warranty', icon: <ShieldCheckIcon /> },
  { id: 'authenticity', icon: <BadgeCheckIcon /> },
] as const;

const USPSection: React.FC = () => {
  const t = useTranslations('usp');

  return (
    <section className="store-section" aria-labelledby="usp-title">
      <div className="mx-auto px-4 sm:px-6 max-w-7xl text-center">
        <div className="store-panel px-4 sm:px-8 py-10 md:py-12">
          <h2 id="usp-title" className="store-section-title !mb-8">
            {t('sectionTitle')}
          </h2>

          <div className="gap-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
            {USP_KEYS.map((usp) => (
              <article
                key={usp.id}
                className="flex flex-col items-center bg-[var(--store-surface-muted)] hover:bg-[color-mix(in_srgb,var(--primary-color)_6%,white)] p-5 rounded-2xl border border-[var(--store-border)] transition"
              >
                <div
                  className="mb-3 text-[var(--primary-color)]"
                  aria-hidden
                >
                  {usp.icon}
                </div>
                <h3 className="mb-1 font-semibold text-[var(--store-text)] text-base">
                  {t(`items.${usp.id}.title`)}
                </h3>
                <p className="text-[var(--store-text-muted)] text-sm leading-relaxed">
                  {t(`items.${usp.id}.description`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default USPSection;
