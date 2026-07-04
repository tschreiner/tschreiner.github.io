import type { CollectionEntry } from 'astro:content';

export const visiblePosts = (post: CollectionEntry<'blog'>) => import.meta.env.DEV || !post.data.draft;

export const byPubDateDesc = (a: CollectionEntry<'blog'>, b: CollectionEntry<'blog'>) =>
  b.data.pubDate.getTime() - a.data.pubDate.getTime();

export const byExperienceDateDesc = (
  a: CollectionEntry<'experience'>,
  b: CollectionEntry<'experience'>,
) => b.data.startDate.localeCompare(a.data.startDate);

export const byProjectTitle = (a: CollectionEntry<'projects'>, b: CollectionEntry<'projects'>) =>
  a.data.title.localeCompare(b.data.title, 'de');

export const formatDate = (date: Date) =>
  new Intl.DateTimeFormat('de-DE', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(date);

export const readingLabel = (post: CollectionEntry<'blog'>) =>
  `${formatDate(post.data.pubDate)} · ${post.data.readingTime}`;
