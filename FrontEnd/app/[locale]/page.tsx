import BlogSection from '@components/molecules/landing Elements/blogSection';
import LandingBrands
  from '@components/molecules/landing Elements/landingBrands';
import LandingCategory
  from '@components/molecules/landing Elements/landingCategory';
import LandingSlider
  from '@components/molecules/landing Elements/landingSlider';
import LandingSpecialOffer
  from '@components/molecules/landing Elements/landingSpecialOffer';
import TestimonialsSection
  from '@components/molecules/landing Elements/testimonialsSection';
import TheMostProducts
  from '@components/molecules/landing Elements/theMostProducts';
import TrustSection from '@components/molecules/landing Elements/trustSection';
import USPSection from '@components/molecules/landing Elements/uspSection';
import AdminDock from '@components/organisms/adminDock';
import LandingHero from '@components/organisms/landingHero';
import Footer from '@layout/footer';
import Header from '@layout/header';
import { getCategories } from '@lib/category';
import { getSlides } from '@lib/landing';

export const dynamic = "force-dynamic";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const images = await getSlides<{
    pageUrl: string;
    banner: string;
  }>();
   const categories = await getCategories({
    queries: { IsShowInLanding: true },
  });

  return (
    <>
      <Header />
      <main className="flex flex-col gap-2 pt-20 xs:pt-24 min-h-screen transition-all duration-300">
        <LandingHero  />
        <LandingSlider images={images} />
        <LandingBrands  />
        <TheMostProducts/> 
        <LandingCategory categories={categories?.data.records!} />
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
