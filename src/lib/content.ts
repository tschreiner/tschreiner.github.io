import type { CollectionEntry } from 'astro:content';

export const byProjectOrder = (a: CollectionEntry<'projects'>, b: CollectionEntry<'projects'>) =>
  a.data.order - b.data.order || a.data.title.localeCompare(b.data.title, 'de');

export const byDateDesc = (a: CollectionEntry<'blog'>, b: CollectionEntry<'blog'>) =>
  b.data.date.getTime() - a.data.date.getTime();

export const isVisiblePost = (entry: CollectionEntry<'blog'>) =>
  import.meta.env.DEV || !entry.data.draft;

export const formatDate = (date: Date) =>
  new Intl.DateTimeFormat('de-DE', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(date);
