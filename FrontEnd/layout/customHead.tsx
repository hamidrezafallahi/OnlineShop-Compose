// import Head from "next/head";
// interface CustomHeadProps {
//   title?: string;
//   description?: string;
//   ogTitle?: string;
//   ogDescription?: string;
//   ogImage?: string;
//   url?: string;
// }
// export default function CustomHead({
//   title = "Page Title",
//   description = "A brief description of the page content.",
//   ogTitle,
//   ogDescription,
//   ogImage = "/default-og-image.jpg",
//   url = "https://yourdomain.com",
// }: CustomHeadProps) {
//   return (
//     <Head>
//       {/* پایه‌های اصلی */}
//       <meta charSet="UTF-8" />
//       <meta
//         name="viewport"
//         content="width=device-width, initial-scale=1.0, minimum-scale=1.0, user-scalable=yes"
//       />

//       <meta name="robots" content="index, follow" />

//       {/* آیکون */}
//       {/* <!-- .ico نسخه کلاسیک برای پشتیبانی گسترده --> */}
//       <link rel="icon" href="/favicon.ico" />
//       {/* <!-- نسخه‌های دیگر با فرمت‌های متفاوت --> */}
//       <link
//         rel="icon"
//         type="image/png"
//         sizes="32x32"
//         href="/favicon-32x32.png"
//       />
//       <link
//         rel="icon"
//         type="image/png"
//         sizes="16x16"
//         href="/favicon-16x16.png"
//       />
//       <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

//       {/* <!-- مانيفست اپلیکیشن (اختیاری برای PWA) --> */}
//       <link rel="manifest" href="/site.webmanifest" />

//       {/* Open Graph برای شبکه‌های اجتماعی (Facebook, LinkedIn, ...) */}
//       <meta property="og:type" content="website" />
//       <meta property="og:title" content={ogTitle || title} />
//       <meta property="og:description" content={ogDescription || description} />
//       <meta property="og:image" content={ogImage} />
//       <meta property="og:url" content={url} />
//       <meta property="og:site_name" content="YourSiteName" />

//       {/* Twitter Card */}
//       <meta name="twitter:card" content="summary_large_image" />
//       <meta name="twitter:title" content={ogTitle || title} />
//       <meta name="twitter:description" content={ogDescription || description} />
//       <meta name="twitter:image" content={ogImage} />
//       <meta name="twitter:site" content="@YourTwitterHandle" />

//       {/* پشتیبانی از زبان */}
//       <meta httpEquiv="Content-Language" content="fa" />
//     </Head>
//   );
// }
