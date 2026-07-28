import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import BlogSection from '@components/molecules/landing Elements/blogSection';
import LandingBrands from '@components/molecules/landing Elements/landingBrands';
import LandingCategory from '@components/molecules/landing Elements/landingCategory';
import LandingSlider from '@components/molecules/landing Elements/landingSlider';
import LandingSpecialOffer from '@components/molecules/landing Elements/landingSpecialOffer';
import TestimonialsSection from '@components/molecules/landing Elements/testimonialsSection';
import TheMostProducts from '@components/molecules/landing Elements/theMostProducts';
import TrustSection from '@components/molecules/landing Elements/trustSection';
import USPSection from '@components/molecules/landing Elements/uspSection';
import JsonLd from '@components/molecules/storefront/JsonLd';
import AdminDock from '@components/organisms/adminDock';
import LandingHero from '@components/organisms/landingHero';
import Footer from '@layout/footer';
import Header from '@layout/header';
import { getCategories } from '@lib/category';
import { getSlides } from '@lib/landing';
import { absoluteUrl, buildPageMetadata } from '@lib/seo';

export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
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

export default async function Home({ params }: Props) {
  const { locale } = await params;
  const tBrand = await getTranslations({ locale, namespace: 'brand' });
  const tSeo = await getTranslations({ locale, namespace: 'seo' });

  const images = await getSlides<{
    pageUrl: string;
    banner: string;
  }>();
  const categories = await getCategories({
    queries: { IsShowInLanding: true },
  });

  const organizationLd = {
    '@context': 'https://schema.org',
    '@type': 'OnlineStore',
    name: tBrand('name'),
    url: absoluteUrl(locale, ''),
    description: tSeo('homeDescription'),
    inLanguage: locale,
  };

  return (
    <>
      <JsonLd data={organizationLd} />
      <Header />
      <main className="flex flex-col gap-2 pt-20 sm:pt-24 min-h-screen">
        <LandingHero />
        <LandingSlider images={images} />
        <LandingBrands />
        <TheMostProducts />
        <LandingCategory categories={categories?.data.records ?? []} />
        <LandingSpecialOffer />
        <TrustSection />
        <USPSection />
        <BlogSection />
        <TestimonialsSection />
      </main>
      <AdminDock />
      <Footer />
    </>
  );
}
