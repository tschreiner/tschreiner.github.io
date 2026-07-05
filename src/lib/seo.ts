import { site } from './site';

export const defaultSeoImage = '/images/tedd-schreiner-hero.jpg';
export const defaultSeoImageAlt = 'Portrait von Tedd Schreiner auf einer Treppe.';

const trimToValue = (value?: string) => value?.trim();

const hasFileExtension = (pathname: string) => /\/[^/]+\.[a-z0-9]+$/i.test(pathname);

const normalizeSitePath = (pathname: string) => {
  if (!pathname || pathname === '/') {
    return '/';
  }

  if (pathname.endsWith('/') || hasFileExtension(pathname)) {
    return pathname;
  }

  return `${pathname}/`;
};

export const absoluteUrl = (pathOrUrl = '/') => {
  const value = trimToValue(pathOrUrl) ?? '/';
  return new URL(value, site.url).toString();
};

export const canonicalUrl = (pathOrUrl = '/') => {
  const value = trimToValue(pathOrUrl) ?? '/';
  const parsed = new URL(value, site.url);
  const pathname = normalizeSitePath(parsed.pathname);

  return new URL(`${pathname}${parsed.search}`, site.url).toString();
};

export const imageUrl = (pathOrUrl = defaultSeoImage) => {
  const value = trimToValue(pathOrUrl) ?? defaultSeoImage;
  return absoluteUrl(value);
};
