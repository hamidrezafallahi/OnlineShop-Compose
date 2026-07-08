import React from 'react';

import { useTranslations } from 'next-intl';
import Link from 'next/link';

import { UserIcon } from '@components/atoms/iconComponents';

export default function Register() {
  const t = useTranslations();
  return (
    <Link
      href={`/register`}
      aria-label={t("header.register")}
      className="flex justify-center items-center bg-white/30 hover:bg-white/40 shadow-black/20 shadow-lg hover:shadow-black/30 hover:shadow-xl backdrop-blur-md border border-white/20 rounded-full w-6 !min-w-6 h-6 !min-h-6 transition-all duration-300"
    >
      <UserIcon />
    </Link>
  );
}

Register;
