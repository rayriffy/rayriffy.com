import {type SchemaContext, z} from 'astro:content'

const baseBlogSchema = z.object({
  id: z.string(),
  title: z.string(),
  subtitle: z.string(),
  featured: z.boolean(),
  date: z.date(),
  categories: z.array(z.string()),
  preview: z.boolean(),
  content: z.optional(z.string()),
})

export const contentfulBlogSchema = baseBlogSchema.merge(
  z.object({
    type: z.enum(['contentful']),
    banner: z.string(),
  })
)

export const localBlogSchema = ({ image }: SchemaContext) =>
  baseBlogSchema.merge(
    z.object({
      type: z.enum(['local']),
      banner: image(),
    })
  )
