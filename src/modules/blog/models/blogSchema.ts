import { z } from 'astro:content'

export type BlogSchema = z.infer<typeof blogSchema>

export const blogSchema = z.object({
  id: z.string(),
  title: z.string(),
  subtitle: z.string(),
  featured: z.boolean(),
  banner: z.string(),
  date: z.date(),
  content: z.string(),
  categories: z.array(z.string()),
  preview: z.boolean(),
})
