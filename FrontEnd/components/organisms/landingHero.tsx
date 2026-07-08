import { getLocale } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';

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
            src="https://localhost:7116/uploads/brands/2/35dbc5de-a5b6-4c76-a7b4-41a8c108ca08_6.webp"
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
//  return (
//     <section className="relative flex justify-center items-center bg-black min-h-[90vh] overflow-hidden text-white">
//       {/* تصویر بک‌گراند */}
//       <div
//         className="absolute inset-0 bg-cover bg-center opacity-60"
//         style={{ backgroundImage: "url('/images/perfume-hero.jpg')" }}
//       ></div>

//       {/* گرادیان محو از پایین */}
//       <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-transparent"></div>

//       {/* محتوا */}
//       <div className="z-10 relative px-6 max-w-2xl text-center">
//         <h1 className="mb-4 font-light text-5xl md:text-6xl tracking-wide">
//           عطری که امضای توست
//         </h1>
//         <p className="mb-8 text-gray-300 text-lg md:text-xl leading-relaxed">
//           رایحه‌ای ماندگار از اصالت و ظرافت.
//           مجموعه‌ای از بهترین عطرهای مردانه و زنانه را کشف کن.
//         </p>
//         <div className="flex justify-center items-center gap-4">
//           <a
//             href="/products"
//             className="bg-white hover:bg-gray-200 px-8 py-3 rounded-full font-semibold text-black transition"
//           >
//             مشاهده محصولات
//           </a>
//           <a
//             href="/collections"
//             className="hover:bg-white px-8 py-3 border border-white rounded-full font-semibold hover:text-black transition"
//           >
//             کالکشن ویژه
//           </a>
//         </div>
//       </div>
//     </section>
//   );
