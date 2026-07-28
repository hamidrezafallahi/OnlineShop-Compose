import { ReactNode } from 'react';

import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import localFont from 'next/font/local';
import { cookies } from 'next/headers';

import CustomLayout from '@layout/index';
import { buildPageMetadata } from '@lib/seo';
import type { TLang } from '@slice/config/type';

export const dynamic = 'force-dynamic';

interface IProps {
  children: ReactNode;
  params: Promise<{
    locale: TLang;
  }>;
}

const myFont = localFont({
  src: [
    {
      path: '../../public/fonts/IRANSansWeb(FaNum).woff',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--IRANSans-font',
  display: 'swap',
});

export async function generateStaticParams() {
  return [{ locale: 'fa' }, { locale: 'en' }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo' });

  return buildPageMetadata({
    locale,
    path: '',
    title: t('homeTitle'),
    description: t('homeDescription'),
    keywords: t('homeKeywords').split(',').map((k) => k.trim()),
  });
}

export default async function BaseLayout({ children, params }: IProps) {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  const cookieStore = await cookies();
  const theme = cookieStore.get('theme')?.value || 'default';

  return (
    <div
      className={myFont.className}
      dir={locale === 'fa' ? 'rtl' : 'ltr'}
      lang={locale}
      data-theme={theme}
    >
      <NextIntlClientProvider locale={locale} messages={messages}>
        <CustomLayout>{children}</CustomLayout>
      </NextIntlClientProvider>
    </div>
  );
}
