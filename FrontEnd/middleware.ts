// middleware.ts
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['fa', 'en'],
  defaultLocale: 'fa',
  localePrefix: 'as-needed' ,
  localeDetection: true
});

export const config = {
  // Exclude API proxies and Next route handlers from locale middleware
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$|api|auth|health).*)',
  ],
};