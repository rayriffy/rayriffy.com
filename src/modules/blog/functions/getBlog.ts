import { getContentfulClient } from '$core/functions/getContentfulClient'
import { readFileSystem, writeFileSystem } from '$core/functions/fileSystem'

import type { Entry } from 'contentful'
import type { BlogPostSkeleton } from '$core/@types/BlogPostSkeleton'

type BlogEntry = Entry<BlogPostSkeleton, 'WITHOUT_UNRESOLVABLE_LINKS', string>

export const getBlog = async (slug: string): Promise<BlogEntry> => {
  let cacheKey = ['core', 'blog', 'slug', slug]

  const cachedResult = await readFileSystem<BlogEntry>(cacheKey)
  if (cachedResult !== null) return cachedResult.data

  const contentful = getContentfulClient()
  const blog = await contentful.withoutUnresolvableLinks
    .getEntries<BlogPostSkeleton>({
      content_type: 'blogPost',
      'fields.slug': slug,
      limit: 1,
    })
    .then(o => o.items[0])

  writeFileSystem(cacheKey, blog, 1000 * 60 * 5)
  return blog
}
