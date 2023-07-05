import { getContentfulClient } from '$core/functions/getContentfulClient'
import { readFileSystem, writeFileSystem } from '$core/functions/fileSystem'

import type { EntryCollection } from 'contentful'
import type { BlogPostSkeleton } from '$core/@types/BlogPostSkeleton'

type BlogEntries = EntryCollection<
  BlogPostSkeleton,
  'WITHOUT_UNRESOLVABLE_LINKS',
  string
>

export const getBlogs = async (page: number): Promise<BlogEntries> => {
  let cacheKey = ['core', 'blog', 'page', page.toString()]

  const cachedResult = await readFileSystem<BlogEntries>(cacheKey)
  if (cachedResult !== null) return cachedResult.data

  const contentful = getContentfulClient()
  const blogs =
    await contentful.withoutUnresolvableLinks.getEntries<BlogPostSkeleton>({
      content_type: 'blogPost',
      limit: 10,
      order: ['-fields.date'],
      skip: (page - 1) * 10,
    })

  writeFileSystem(cacheKey, blogs, 1000 * 60 * 5)
  return blogs
}
