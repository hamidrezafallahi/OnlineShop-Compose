import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import Register from '@components/templates/register';
import { buildPageMetadata } from '@lib/seo';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'registerPage' });

  return buildPageMetadata({
    locale,
    path: 'register',
    title: t('metaTitle'),
    description: t('metaDescription'),
    noIndex: true,
  });
}

export default async function RegisterPage() {
  return (
    <main className="min-h-screen">
      <Register />
    </main>
  );
}
