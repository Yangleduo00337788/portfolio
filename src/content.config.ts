import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    year: z.number(),
    role: z.string().optional(),
    summary: z.string(),
    tech: z.array(z.string()).default([]),
    links: z
      .object({
        demo: z.string().url().optional(),
        repo: z.string().url().optional(),
      })
      .optional(),
    cover: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects };
