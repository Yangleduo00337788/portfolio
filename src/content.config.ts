import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  /* image() 要按 collection 的入口文件解析相对路径，所以 cover 写
     ../../assets/images/xxx.png，构建时自动压缩缩放 */
  schema: ({ image }) =>
    z.object({
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
      cover: image().optional(),
      draft: z.boolean().default(false),
    }),
});

export const collections = { projects };
