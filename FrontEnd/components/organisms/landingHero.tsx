import { getLocale } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';

import landing from '@public/images/landingpage/landing.png';

export default async  function LandingHero( ) {
  const locale = await getLocale()
  return (
    <section className="relative flex md:flex-row flex-col justify-between items-center bg-gradient-to-br from-gray-50 via-white to-gray-100 px-6 md:px-16 w-full min-h-[90vh] overflow-hidden">
      {/* متن سمت چپ */}
      <div className="z-10 flex flex-col justify-center items-start space-y-6 max-w-xl md:text-left text-center animate-fade-in-up">
        <h1 className="font-extrabold text-gray-900 text-4xl md:text-6xl leading-tight">
          عطر خاصت رو پیدا کن 💫
        </h1>
        <p className="text-gray-600 text-lg md:text-xl">
          مجموعه‌ای از بهترین برندهای عطر با رایحه‌های ماندگار و اصیل برای هر
          سلیقه.
        </p>
        <div className="flex sm:flex-row flex-col gap-4 mt-4">
          <Link
            href={`/${locale}/products`}
            className="bg-black hover:bg-gray-800 px-8 py-3 rounded-full font-medium text-white text-lg transition-all duration-300"
          >
            مشاهده محصولات
          </Link>
          <Link
            href={`/${locale}/discounts`}
            className="hover:bg-black px-8 py-3 border border-black rounded-full font-medium text-black hover:text-white text-lg transition-all duration-300"
          >
            تخفیف‌های ویژه
          </Link>
        </div>
      </div>

      {/* تصویر سمت راست */}
      <div className="relative mt-10 md:mt-0 p-4 animate-scale-in">
        <div className="relative shadow-xl rounded-2xl w-[260px] md:w-[400px] h-[360px] md:h-[520px] overflow-hidden">
          <Image
            src={landing}
            alt="Luxury Perfume"
            fill
            className="object-cover hover:scale-105 transition-transform duration-700"
            priority
          />
        </div>

        {/* تزئینی - دایره گرادینتی */}
        <div className="-top-10 -right-10 absolute bg-gradient-to-tr from-pink-200 to-yellow-100 opacity-60 blur-3xl rounded-full w-40 h-40"></div>
      </div>

      {/* گرادینت تزئینی پس‌زمینه */}
      <div className="bottom-0 left-0 absolute bg-gradient-to-tr from-purple-200 to-pink-100 opacity-40 blur-3xl rounded-full w-72 h-72"></div>
    </section>
  );
}
