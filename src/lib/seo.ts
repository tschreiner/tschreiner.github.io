import { site } from './site';

export const defaultSeoImage = '/images/social-preview.jpg';
export const defaultSeoImageAlt =
  'Social Preview für Tedd Schreiner, DevOps Engineer für AWS Cloud, Automation und AI-assisted Software Engineering.';
export const defaultSeoImageHeight = 630;
export const defaultSeoImageType = 'image/jpeg';
export const defaultSeoImageWidth = 1200;
export const themeColor = '#24201d';

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
