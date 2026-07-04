import { getCollection } from 'astro:content';
import { site } from '@lib/site';

export async function GET() {
  const projects = await getCollection('projects');
  const posts = (await getCollection('blog')).filter((post) => !post.data.draft);
  const staticPaths = [
    '/',
    '/about/',
    '/cv/',
    '/projects/',
    '/blog/',
    '/mentoring/',
    '/contact/',
    '/impressum/',
    '/datenschutz/',
  ];

  const urls = [
    ...staticPaths,
    ...projects.map((project) => `/projects/${project.data.slug}/`),
    ...posts.map((post) => `/blog/${post.id}/`),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map((path) => `  <url><loc>${new URL(path, site.url).toString()}</loc></url>`)
    .join('\n')}\n</urlset>\n`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
