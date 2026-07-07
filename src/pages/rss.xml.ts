import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { byPubDateDesc } from '@lib/content';
import { site } from '@lib/site';

export async function GET(context: { site: URL }) {
  const posts = (await getCollection('blog')).filter((post) => post.data.locale === 'de' && !post.data.draft).sort(byPubDateDesc);

  return rss({
    title: site.title,
    description: site.description,
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/blog/${post.data.slug}/`,
      categories: [post.data.category, ...post.data.tags],
    })),
  });
}
