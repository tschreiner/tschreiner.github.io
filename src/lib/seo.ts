import { site } from './site';

export const defaultSeoImage = '/images/tedd-schreiner-hero.jpg';
export const defaultSeoImageAlt = 'Portrait von Tedd Schreiner auf einer Treppe.';

export const absoluteUrl = (pathOrUrl: string) => new URL(pathOrUrl, site.url).toString();

export const canonicalUrl = (pathOrUrl = '/') => {
  const value = pathOrUrl.trim() || '/';

  try {
    const parsed = new URL(value);
    return new URL(`${parsed.pathname}${parsed.search}`, site.url).toString();
  } catch {
    return new URL(value, site.url).toString();
  }
};

export const imageUrl = (pathOrUrl = defaultSeoImage) => absoluteUrl(pathOrUrl);
