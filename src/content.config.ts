import { defineCollection } from 'astro:content'
import { contentfulBlogSchema, localBlogSchema } from "$modules/blog/models/blogSchema.ts";
import {getContentfulClient} from "$core/functions/getContentfulClient.ts";
import type {BlogPostSkeleton} from "$core/@types/BlogPostSkeleton.ts";
import {glob} from "astro/loaders";
import {contentful as contentfulSecrets} from "$core/constants/secrets/contentful.ts";

const localBlogs = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/data/blogs',
  }),
  schema: localBlogSchema,
})

const contentfulBlogs = defineCollection({
  loader: async () => {
    console.log(contentfulSecrets)
    if (!contentfulSecrets.deliveryToken && !contentfulSecrets.previewToken)
      return []

    const contentful =  getContentfulClient('production')

    const blogsEntries =
      await contentful.withoutUnresolvableLinks.getEntries<BlogPostSkeleton>({
        content_type: 'blogPost',
        order: ['-fields.date'],
      })

    console.log('blogsEntries', blogsEntries.items.length)

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
      type: 'contentful',
    }))
  },
  schema: contentfulBlogSchema
})

export const collections = {
  localBlogs,
  contentfulBlogs,
}
