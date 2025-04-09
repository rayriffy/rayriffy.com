import { getContentfulClient } from '$core/functions/getContentfulClient'
import { readFileSystem, writeFileSystem } from '$core/functions/fileSystem'
import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'

import type { Entry, Asset } from 'contentful'
import type { BlogPostSkeleton } from '$core/@types/BlogPostSkeleton'

type BlogEntry = Entry<BlogPostSkeleton, 'WITHOUT_UNRESOLVABLE_LINKS', string>

const getLocalBlog = async (slug: string): Promise<BlogEntry | null> => {
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
    
    const bannerPath = path.join('src/data/blogs', slug, data.banner || 'cover.jpg')
    
    // Check if banner exists
    let bannerExists = false
    try {
      await fs.access(bannerPath)
      bannerExists = true
    } catch (e) {
      // Banner doesn't exist
    }
    
    // Create a properly typed entry that satisfies the Contentful type requirements
    const entry = {
      sys: {
        id: data.id || slug,
        type: 'Entry',
        createdAt: data.date,
        updatedAt: data.date,
        locale: 'en-US',
        revision: 1,
        space: {
          sys: {
            type: 'Link',
            linkType: 'Space',
            id: 'local'
          }
        },
        environment: {
          sys: {
            type: 'Link',
            linkType: 'Environment',
            id: 'local'
          }
        },
        contentType: {
          sys: {
            type: 'Link',
            linkType: 'ContentType',
            id: 'blogPost'
          }
        },
        // Add required properties for EntrySys
        publishedVersion: 1,
        publishedAt: data.date,
        firstPublishedAt: data.date,
        publishedCounter: 1
      },
      fields: {
        slug: data.id || slug,
        title: data.title,
        subtitle: data.subtitle || '',
        date: data.date,
        featured: data.featured || false,
        content: content,
        category: [],
        // Create a properly typed Asset
        banner: bannerExists ? {
          sys: {
            id: `local-${slug}-banner`,
            type: 'Asset',
            createdAt: data.date,
            updatedAt: data.date,
            locale: 'en-US',
            revision: 1,
            space: {
              sys: {
                type: 'Link',
                linkType: 'Space',
                id: 'local'
              }
            },
            environment: {
              sys: {
                type: 'Link',
                linkType: 'Environment',
                id: 'local'
              }
            },
            // Add required properties for EntrySys
            publishedVersion: 1,
            publishedAt: data.date,
            firstPublishedAt: data.date,
            publishedCounter: 1
          },
          fields: {
            title: data.title,
            file: {
              url: `/${bannerPath.replace(/^src\//, '')}`,
              fileName: path.basename(bannerPath),
              contentType: 'image/jpeg'
            }
          },
          metadata: {
            tags: []
          }
        } : undefined
      },
      metadata: {
        tags: []
      }
    } as BlogEntry; // Type assertion to ensure compatibility
    
    return entry;
  } catch (error) {
    console.error(`Error processing local blog for slug ${slug}:`, error)
    return null
  }
}

export const getBlog = async (
  slug: string,
  preview: boolean
): Promise<BlogEntry> => {
  console.time('blog post ' + slug)
  const mode = preview ? 'preview' : 'production'
  let cacheKey = ['core', 'blog', mode, 'slug', slug]

  const cachedResult = await readFileSystem<BlogEntry>(cacheKey)
  if (cachedResult !== null) {
    console.timeEnd('blog listing')
    return cachedResult.data
  }

  // First, check if a local blog post exists with this slug
  const localBlog = await getLocalBlog(slug)
  if (localBlog) {
    console.timeEnd('blog post ' + slug)
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

  if (!preview) writeFileSystem(cacheKey, blog, 1000 * 60 * 5)

  console.timeEnd('blog post ' + slug)
  return blog
}
