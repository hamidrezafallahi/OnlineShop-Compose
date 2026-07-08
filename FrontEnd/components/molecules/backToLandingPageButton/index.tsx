import React from 'react';

import { useLocale } from 'next-intl';
import Link from 'next/link';

import {
  ArrowLongLeft,
  ArrowLongRight,
} from '@components/atoms/iconComponents';

function BackToLandingPageButton() {
    const locale = useLocale()
  return (
         <Link
        className="bg-zinc-800 hover:bg-zinc-700 p-2 rounded-lg"
        href={`/${locale}`}
      >
           {locale == "fa"? <ArrowLongRight/>:<ArrowLongLeft/>}
      </Link>
  )
}

export default BackToLandingPageButton