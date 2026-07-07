import type { CollectionEntry } from 'astro:content';
import type { Locale } from '@lib/i18n';

type ProjectEntry = CollectionEntry<'projects'> | CollectionEntry<'projectsEn'>;

export const visiblePosts = (post: CollectionEntry<'blog'>) => !post.data.draft;

export const byPubDateDesc = (a: CollectionEntry<'blog'>, b: CollectionEntry<'blog'>) =>
  b.data.pubDate.getTime() - a.data.pubDate.getTime();

export const byExperienceDateDesc = (
  a: CollectionEntry<'experience'>,
  b: CollectionEntry<'experience'>,
) => b.data.startDate.localeCompare(a.data.startDate);

export const byProjectTitle = (a: ProjectEntry, b: ProjectEntry) =>
  a.data.title.localeCompare(b.data.title, 'de');

export const byProjectTitleForLocale =
  (locale: Locale) => (a: ProjectEntry, b: ProjectEntry) =>
    a.data.title.localeCompare(b.data.title, locale === 'de' ? 'de' : 'en');

export const formatDate = (date: Date, locale: Locale = 'de') =>
  new Intl.DateTimeFormat(locale === 'de' ? 'de-DE' : 'en-US', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(date);

export const readingLabel = (post: CollectionEntry<'blog'>, locale: Locale = 'de') =>
  `${formatDate(post.data.pubDate, locale)} · ${post.data.readingTime}`;
