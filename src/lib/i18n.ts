export const locales = ['de', 'en'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'de';
export const localeStorageKey = 'ts_locale';

export const localeMeta: Record<Locale, { lang: string; ogLocale: string; label: string; languageName: string }> = {
  de: {
    lang: 'de',
    ogLocale: 'de_DE',
    label: 'DE',
    languageName: 'Deutsch',
  },
  en: {
    lang: 'en',
    ogLocale: 'en_US',
    label: 'EN',
    languageName: 'English',
  },
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getLocaleFromPath(pathname: string): Locale {
  return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'de';
}

export function stripLocaleFromPath(pathname: string) {
  if (pathname === '/en') return '/';
  if (pathname.startsWith('/en/')) return pathname.slice(3);
  return pathname || '/';
}

export function withLocalePath(locale: Locale, pathname: string) {
  const normalizedPath = pathname === '' ? '/' : pathname;

  if (locale === 'de') {
    return normalizedPath;
  }

  if (normalizedPath === '/') {
    return '/en/';
  }

  return `/en${normalizedPath}`;
}

export function switchLocalePath(pathname: string, locale: Locale) {
  return withLocalePath(locale, stripLocaleFromPath(pathname));
}

export function alternateLocale(locale: Locale): Locale {
  return locale === 'de' ? 'en' : 'de';
}
