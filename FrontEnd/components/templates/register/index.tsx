'use client';

import React, { useState } from 'react';

import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

import { CardTitle } from '@components/atoms/defaultElements/card';
import logo from '@public/arianSystemLogo1.png';

import { LoginForm } from './login';
import { SignUpForm } from './signUp';

function Register() {
  const [isLogin, setIsLogin] = useState(true);
  const t = useTranslations('register');
  const tHeader = useTranslations('header');
  const locale = useLocale();

  return (
    <div className="flex justify-center items-center px-4 py-10 min-h-[70vh]">
      <div className="store-panel flex flex-col items-center gap-5 p-5 sm:p-7 w-full sm:w-[26rem] overflow-hidden text-center">
        <CardTitle className="flex flex-col items-center gap-2">
          <Image alt={tHeader('register')} src={logo} width={60} height={60} />
          <span className="font-semibold text-[var(--store-text)] text-lg">
            {isLogin ? t('enter') : t('signUp')}
          </span>
        </CardTitle>
        {isLogin ? (
          <LoginForm setIsLogin={setIsLogin} />
        ) : (
          <SignUpForm setIsLogin={setIsLogin} />
        )}
        <Link
          href={`/${locale}`}
          className="text-[var(--store-text-muted)] hover:text-[var(--primary-color)] text-sm transition"
        >
          {tHeader('landing page')}
        </Link>
      </div>
    </div>
  );
}

export default Register;
