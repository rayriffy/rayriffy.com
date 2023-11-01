import { getContentfulClient } from '$core/functions/getContentfulClient'
import { readFileSystem, writeFileSystem } from '$core/functions/fileSystem'

import type { EntryCollection } from 'contentful'
import type { BlogPostSkeleton } from '$core/@types/BlogPostSkeleton'

export type BlogEntries = EntryCollection<
  BlogPostSkeleton,
  'WITHOUT_UNRESOLVABLE_LINKS',
  string
>

export const getBlogs = async (
  page: number,
  preview: boolean = false
): Promise<BlogEntries> => {
  console.time('blog listing')
  const mode = preview ? 'preview' : 'production'
  let cacheKey = ['core', 'blog', mode, 'page', page.toString()]

  const cachedResult = await readFileSystem<BlogEntries>(cacheKey)
  if (cachedResult !== null) {
    console.timeEnd('blog listing')
    return cachedResult.data
  }

  const contentful = getContentfulClient(mode)
  const blogs =
    await contentful.withoutUnresolvableLinks.getEntries<BlogPostSkeleton>({
      content_type: 'blogPost',
      limit: 10,
      order: ['-fields.date'],
      skip: (page - 1) * 10,
    })

  if (!preview) writeFileSystem(cacheKey, blogs, 1000 * 60 * 5)

  console.timeEnd('blog listing')
  return blogs
}
