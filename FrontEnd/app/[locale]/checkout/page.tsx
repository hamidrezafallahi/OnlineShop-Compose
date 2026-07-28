import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import CheckoutTemplate from '@components/templates/checkoutTemplate';
import { buildPageMetadata } from '@lib/seo';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'checkout' });

  return buildPageMetadata({
    locale,
    path: 'checkout',
    title: t('title'),
    description: t('title'),
    noIndex: true,
  });
}

export default async function Page() {
  return <CheckoutTemplate />;
}
