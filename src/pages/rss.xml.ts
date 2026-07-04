import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { byDateDesc } from '@lib/content';
import { site } from '@lib/site';

export async function GET(context: { site: URL }) {
  const posts = (await getCollection('blog'))
    .filter((post) => !post.data.draft)
    .sort(byDateDesc);

  return rss({
    title: site.title,
    description: site.description,
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/blog/${post.id}/`,
      categories: [...post.data.categories, ...post.data.tags],
    })),
  });
}
