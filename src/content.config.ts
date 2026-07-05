import { glob } from 'astro/loaders';
import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';

const seoSchema = z
  .object({
    title: z.string().optional(),
    description: z.string().optional(),
  })
  .optional();

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    category: z.enum(['Tech', 'DevOps', 'Automation', 'AI Tools', 'Webprojekte', 'Personal Notes']),
    tags: z.array(z.string()),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
    seo: seoSchema,
    ogImage: z.string().optional(),
    readingTime: z.string(),
  }),
});

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    problem: z.string(),
    context: z.string().optional(),
    role: z.string().optional(),
    constraints: z.array(z.string()).default([]),
    approach: z.array(z.string()).default([]),
    solution: z.string(),
    technologies: z.array(z.string()),
    result: z.string(),
    featured: z.boolean().default(false),
    category: z.string(),
    status: z.string(),
    confidentialNote: z.string().optional(),
    links: z
      .array(
        z.object({
          label: z.string(),
          href: z.string(),
        }),
      )
      .default([]),
    cover: z.string().optional(),
    lessons: z.array(z.string()).default([]),
    seo: seoSchema,
  }),
});

const experience = defineCollection({
  loader: glob({ base: './src/content/experience', pattern: '**/*.json' }),
  schema: z.object({
    role: z.string(),
    company: z.string(),
    location: z.string(),
    startDate: z.string(),
    endDate: z.string().optional(),
    current: z.boolean(),
    summary: z.string(),
    highlights: z.array(z.string()),
    technologies: z.array(z.string()),
  }),
});

const siteData = defineCollection({
  loader: glob({ base: './src/content/site', pattern: '**/*.json' }),
  schema: z.object({
    name: z.string(),
    domain: z.string(),
    email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
    hero: z.object({
      title: z.string(),
      headline: z.string(),
      subheadline: z.string(),
    }),
    navigation: z.array(
      z.object({
        label: z.string(),
        href: z.string(),
      }),
    ),
    social: z.object({
      github: z.string().regex(/^https:\/\/.+/),
      linkedin: z.string().regex(/^https:\/\/.+/),
      xing: z.string().regex(/^https:\/\/.+/).optional(),
    }),
  }),
});

export const collections = {
  blog,
  projects,
  experience,
  siteData,
};
