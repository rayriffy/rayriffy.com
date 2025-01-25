import { defineCollection } from 'astro:content'
import {blogSchema} from "$modules/blog/models/blogSchema.ts";
import {getContentfulClient} from "$core/functions/getContentfulClient.ts";
import type {BlogPostSkeleton} from "$core/@types/BlogPostSkeleton.ts";

const contentfulBlogs = defineCollection({
  loader: async () => {
    const contentful =  getContentfulClient('production')

    const blogsEntries =
      await contentful.withoutUnresolvableLinks.getEntries<BlogPostSkeleton>({
        content_type: 'blogPost',
        order: ['-fields.date'],
      })

    return blogsEntries.items.map(entry => ({
      id: entry.fields.slug,
      title: entry.fields.title,
      subtitle: entry.fields.subtitle,
      featured: entry.fields.featured,
      banner: entry.fields.banner!.fields.file!.url,
      date: new Date(entry.fields.date),
      categories: entry.fields.category.map(category => category?.fields.name),
      preview: entry.fields.featured,
      content: entry.fields.content ?? '',
    }))
  },
  schema: blogSchema
})

export const collections = {
  contentfulBlogs,
}
