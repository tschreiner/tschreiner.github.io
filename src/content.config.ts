import { glob } from 'astro/loaders';
import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';

const projectSchema = z.object({
  title: z.string(),
  shortDescription: z.string(),
  problem: z.string(),
  solution: z.string(),
  technologies: z.array(z.string()),
  result: z.string(),
  lessons: z.array(z.string()),
  anonymized: z.boolean().default(true),
  featured: z.boolean().default(false),
  order: z.number().default(99),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
});

const blogSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.coerce.date(),
  updated: z.coerce.date().optional(),
  categories: z.array(z.string()),
  tags: z.array(z.string()),
  readingTime: z.string(),
  draft: z.boolean().default(false),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
});

export const collections = {
  projects: defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
    schema: projectSchema,
  }),
  blog: defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
    schema: blogSchema,
  }),
};
