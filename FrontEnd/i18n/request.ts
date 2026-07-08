import { getRequestConfig } from 'next-intl/server';

const supportedLocales = ['fa', 'en'] as const;
type SupportedLocale = (typeof supportedLocales)[number];
export default getRequestConfig(async ({locale}) => {
    const currentLocale: SupportedLocale =
    supportedLocales.includes(locale as SupportedLocale)
      ? (locale as SupportedLocale)
      : 'fa';
  return {
    locale: currentLocale,
    messages: (await import(`../messages/${currentLocale}.json`)).default
  };
});