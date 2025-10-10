import { getContentfulClient } from '$core/functions/getContentfulClient'
import { cache } from '$core/functions/cache'
import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'
import { mapEntryToBlog } from '../models/Blog'
import type { BlogPostSkeleton } from '$core/@types/BlogPostSkeleton'
import type { BlogEntry, Blog } from '../models/Blog'

// Internal helper function to get a local blog post as a simplified Blog object
const getLocalBlog = async (slug: string): Promise<Blog | null> => {
  try {
    const localBlogPath = path.join('src/data/blogs', slug, 'index.md')

    // Check if the local blog exists
    try {
      await fs.access(localBlogPath)
    } catch (e) {
      return null
    }

    const fileContent = await fs.readFile(localBlogPath, 'utf-8')
    const { data, content } = matter(fileContent)

    // Only process if it has the local type flag
    if (data.type !== 'local') {
      return null
    }

    const bannerPath = path.join(
      'src/data/blogs',
      slug,
      data.banner || 'cover.jpg'
    )

    // Check if banner exists
    let bannerExists = false
    try {
      await fs.access(bannerPath)
      bannerExists = true
    } catch (e) {
      // Banner doesn't exist
    }

    // Create a simplified Blog object directly
    return {
      id: data.id || slug,
      slug: data.id || slug,
      title: data.title,
      subtitle: data.subtitle || '',
      date: data.date,
      content: content,
      featured: data.featured || false,
      banner: bannerExists
        ? {
            url: `/${bannerPath.replace(/^src\//, '')}`,
            title: data.title,
            contentType: 'image/jpeg',
          }
        : null,
      categories: [], // Local blogs don't have categories yet
      isLocal: true,
    }
  } catch (error) {
    console.error(`Error processing local blog for slug ${slug}:`, error)
    return null
  }
}

/**
 * Get a blog post by slug, with support for both Contentful and local blog posts.
 * Returns a simplified Blog object with just the necessary data.
 */
export const getBlog = async (
  slug: string,
  preview: boolean
): Promise<Blog | null> => {
  console.time('blog post ' + slug)
  const mode = preview ? 'preview' : 'production'
  let cacheKey = ['core', 'blog', mode, 'slug', slug]

  // Try to get from cache first
  const cachedResult = await cache.read<Blog>(cacheKey)
  if (cachedResult !== null) {
    console.timeEnd('blog post ' + slug)
    return cachedResult.data
  }

  // First, check if a local blog post exists with this slug
  const localBlog = await getLocalBlog(slug)
  if (localBlog) {
    console.timeEnd('blog post ' + slug)

    // Cache the local blog
    if (!preview) cache.write(cacheKey, localBlog, 1000 * 60 * 5)
    return localBlog
  }

  // If no local blog is found, fetch from Contentful
  const contentful = getContentfulClient(mode)
  const blog = await contentful.withoutUnresolvableLinks
    .getEntries<BlogPostSkeleton>({
      content_type: 'blogPost',
      'fields.slug': slug,
      limit: 1,
    })
    .then(o => o.items[0])

  if (!blog) {
    console.timeEnd('blog post ' + slug)
    return null
  }

  const simplifiedBlog = mapEntryToBlog(blog)

  // Cache the simplified blog
  if (!preview) cache.write(cacheKey, simplifiedBlog, 1000 * 60 * 5)

  console.timeEnd('blog post ' + slug)
  return simplifiedBlog
}

/**
 * Get the original Contentful entry for a blog post.
 * This is useful when you need access to the original Contentful structure.
 * Note: For local blog posts, this will return null as they don't have Contentful entries.
 * Use isLocalBlog(blog) to check if a blog is local before using this.
 */
export const getRawBlogEntry = async (
  slug: string,
  preview: boolean
): Promise<BlogEntry | null> => {
  console.time('raw blog post ' + slug)
  const mode = preview ? 'preview' : 'production'

  // Only fetch from Contentful - local blogs don't have proper Contentful entries
  const contentful = getContentfulClient(mode)
  const blog = await contentful.withoutUnresolvableLinks
    .getEntries<BlogPostSkeleton>({
      content_type: 'blogPost',
      'fields.slug': slug,
      limit: 1,
    })
    .then(o => o.items[0])

  console.timeEnd('raw blog post ' + slug)
  return blog || null
}

/**
 * Checks if a blog exists locally (returns true) or only in Contentful (returns false).
 * This is useful if you need to know the source of a blog post.
 */
export const isLocalBlogPost = async (slug: string): Promise<boolean> => {
  const localBlog = await getLocalBlog(slug)
  return localBlog !== null
}
