import { defineCollection, z } from 'astro:content';

// Define the blog collection schema
const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    employer: z.string().optional(),
    thumbnail: z.string().url().optional(),
    banner: z.string().url().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    pubDate: z.string().optional(),
    lucidchartUrl: z.string().optional(),
    tags: z.array(z.object({
      name: z.string(),
      color: z.string()
    })).optional(),
    lang: z.enum(['en', 'es']).default('en'),
    translationKey: z.string().optional(),
    published: z.boolean().default(true),
    featured: z.boolean().default(false)
  })
});

// Export collections
export const collections = {
  blog
};
