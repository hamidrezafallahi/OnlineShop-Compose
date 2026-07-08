import React from 'react';

import { useTranslations } from 'next-intl';

import BackToLandingPageButton
  from '@components/molecules/backToLandingPageButton';

export default function Header() {
      const t = useTranslations()
  return (
    <div className="flex items-center gap-3 mb-4">
        <BackToLandingPageButton />
        <div className="flex flex-col">
          <h1 className="text-xs whitespace-nowrap">
            {t("checkout.landing page")} 
          </h1>
        </div>
          <h1 className="w-full font-semibold text-xl text-center">
            {t("checkout.title")} 
          </h1>
      </div>
  )
}
