import { getContentfulClient } from '$core/functions/getContentfulClient'
import { readFileSystem, writeFileSystem } from '$core/functions/fileSystem'
import { glob } from 'glob'
import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'

import type { EntryCollection, Entry, Asset, EntrySys } from 'contentful'
import type { BlogPostSkeleton } from '$core/@types/BlogPostSkeleton'

export type BlogEntries = EntryCollection<
  BlogPostSkeleton,
  'WITHOUT_UNRESOLVABLE_LINKS',
  string
>

type BlogEntry = Entry<BlogPostSkeleton, 'WITHOUT_UNRESOLVABLE_LINKS', string>

const getLocalBlogs = async (): Promise<BlogEntry[]> => {
  const blogFolders = await glob('src/data/blogs/*')
  
  const localBlogs: BlogEntry[] = []
  
  for (const folder of blogFolders) {
    try {
      const indexPath = path.join(folder, 'index.md')
      const fileContent = await fs.readFile(indexPath, 'utf-8')
      const { data, content } = matter(fileContent)
      
      const folderName = path.basename(folder)
      const bannerPath = path.join(folder, data.banner || 'cover.jpg')
      
      // Check if banner exists
      let bannerExists = false
      try {
        await fs.access(bannerPath)
        bannerExists = true
      } catch (e) {
        // Banner doesn't exist
      }
      
      if (data.type === 'local') {
        // Create a properly typed entry that satisfies the Contentful type requirements
        const entry = {
          sys: {
            id: data.id || folderName,
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
            slug: data.id || folderName,
            title: data.title,
            subtitle: data.subtitle || '',
            date: data.date,
            featured: data.featured || false,
            content: content,
            category: [],
            // Create a properly typed Asset
            banner: bannerExists ? {
              sys: {
                id: `local-${folderName}-banner`,
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
        
        localBlogs.push(entry);
      }
    } catch (error) {
      console.error(`Error processing local blog at ${folder}:`, error)
    }
  }
  
  return localBlogs
}

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
    
  // Get local blogs
  const localBlogs = await getLocalBlogs()
  
  // Merge contentful and local blogs
  const mergedBlogs: BlogEntries = {
    ...blogs,
    items: [...blogs.items, ...localBlogs],
    total: blogs.total + localBlogs.length
  }
  
  // Sort by date in descending order
  mergedBlogs.items.sort((a, b) => {
    const dateA = new Date(a.fields.date).getTime()
    const dateB = new Date(b.fields.date).getTime()
    return dateB - dateA
  })
  
  // Paginate properly
  const startIndex = (page - 1) * 10
  const endIndex = startIndex + 10
  mergedBlogs.items = mergedBlogs.items.slice(startIndex, endIndex)

  if (!preview) writeFileSystem(cacheKey, mergedBlogs, 1000 * 60 * 5)

  console.timeEnd('blog listing')
  return mergedBlogs
}
