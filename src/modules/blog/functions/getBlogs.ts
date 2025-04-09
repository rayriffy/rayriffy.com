import { getContentfulClient } from '$core/functions/getContentfulClient'
import { readFileSystem, writeFileSystem } from '$core/functions/fileSystem'
import { glob } from 'glob'
import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'
import { mapEntryToBlog } from '../models/Blog'

import type { BlogPostSkeleton } from '$core/@types/BlogPostSkeleton'
import type { BlogEntries, BlogCollection, Blog } from '../models/Blog'

// Internal function to get local blogs as simplified Blog objects
const getLocalBlogs = async (): Promise<Blog[]> => {
  const blogFolders = await glob('src/data/blogs/*')
  
  const localBlogs: Blog[] = []
  
  for (const folder of blogFolders) {
    try {
      const indexPath = path.join(folder, 'index.md')
      const fileContent = await fs.readFile(indexPath, 'utf-8')
      const { data, content } = matter(fileContent)
      
      // Only process if it has the local type flag
      if (data.type !== 'local') {
        continue
      }
      
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
      
      // Create a simplified Blog object directly
      const blog: Blog = {
        id: data.id || folderName,
        slug: data.id || folderName,
        title: data.title,
        subtitle: data.subtitle || '',
        date: data.date,
        content: content,
        featured: data.featured || false,
        banner: bannerExists ? {
          url: `/${bannerPath.replace(/^src\//, '')}`,
          title: data.title,
          contentType: 'image/jpeg'
        } : null,
        categories: [], // Local blogs don't have categories yet
        isLocal: true
      };
      
      localBlogs.push(blog);
    } catch (error) {
      console.error(`Error processing local blog at ${folder}:`, error)
    }
  }
  
  return localBlogs
}

// Get Contentful blog entries with pagination info
const getContentfulBlogs = async (
  limit: number,
  preview: boolean = false
): Promise<{ blogs: Blog[], total: number }> => {
  const mode = preview ? 'preview' : 'production'
  const contentful = getContentfulClient(mode)
  
  // Get Contentful entries
  const contentfulEntries = 
    await contentful.withoutUnresolvableLinks.getEntries<BlogPostSkeleton>({
      content_type: 'blogPost',
      limit: Math.min(limit, 1000), // Contentful has a hard limit of 1000
      order: ['-fields.date'],
    })
  
  // Convert Contentful entries to Blog objects
  const contentfulBlogs = contentfulEntries.items.map(entry => mapEntryToBlog(entry))
  
  return {
    blogs: contentfulBlogs,
    total: contentfulEntries.total
  }
}

// Get the total count from Contentful
const getContentfulTotalCount = async (preview: boolean = false): Promise<number> => {
  const mode = preview ? 'preview' : 'production'
  const contentful = getContentfulClient(mode)
  
  // Make a minimal query just to get the total count
  const result = await contentful.withoutUnresolvableLinks.getEntries<BlogPostSkeleton>({
    content_type: 'blogPost',
    limit: 1,
    order: ['-fields.date'],
  })
  
  return result.total
}

// Merge and sort blogs from different sources
const mergeAndSortBlogs = (contentfulBlogs: Blog[], localBlogs: Blog[]): Blog[] => {
  const allBlogs = [...contentfulBlogs, ...localBlogs]
  
  // Sort by date in descending order
  allBlogs.sort((a, b) => {
    const dateA = new Date(a.date).getTime()
    const dateB = new Date(b.date).getTime()
    return dateB - dateA
  })
  
  return allBlogs
}

// Calculate pagination for blog collection
const createBlogCollection = (
  allBlogs: Blog[],
  page: number,
  totalContentfulItems: number,
  totalLocalItems: number,
  itemsPerPage: number = 10
): BlogCollection => {
  const totalItems = totalContentfulItems + totalLocalItems
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  
  // Apply pagination to the merged list
  const startIndex = (page - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedBlogs = allBlogs.slice(startIndex, endIndex)
  
  return {
    items: paginatedBlogs,
    total: totalItems,
    skip: startIndex,
    limit: itemsPerPage,
    currentPage: page,
    totalPages: totalPages
  }
}

// Main function to get all blogs (used by getAllBlogs in feed module)
export const getAllMergedBlogs = async (
  preview: boolean = false
): Promise<Blog[]> => {
  console.time('all blogs')
  
  // Check cache first
  const mode = preview ? 'preview' : 'production'
  const cacheKey = ['core', 'blog', mode, 'all']
  
  const cachedResult = await readFileSystem<Blog[]>(cacheKey)
  if (cachedResult !== null) {
    console.timeEnd('all blogs')
    return cachedResult.data
  }
  
  // Get all blogs from both sources
  const [localBlogs, contentfulResult] = await Promise.all([
    getLocalBlogs(),
    getContentfulBlogs(1000, preview) // Get as many as possible
  ])
  
  // Merge and sort
  const allBlogs = mergeAndSortBlogs(contentfulResult.blogs, localBlogs)
  
  // Cache result
  if (!preview) writeFileSystem(cacheKey, allBlogs, 1000 * 60 * 5)
  
  console.timeEnd('all blogs')
  return allBlogs
}

/**
 * Get a collection of blog posts with pagination.
 * Returns a simplified BlogCollection with just the necessary data.
 */
export const getBlogs = async (
  page: number,
  preview: boolean = false
): Promise<BlogCollection> => {
  console.time('blog listing')
  const itemsPerPage = 10
  
  // Get all blogs - this will use cache if available
  const allBlogs = await getAllMergedBlogs(preview)
  
  // Get total counts for pagination calculation
  const [localBlogs, contentfulTotal] = await Promise.all([
    getLocalBlogs(),
    getContentfulTotalCount(preview)
  ])
  
  // Create the collection with pagination
  const collection = createBlogCollection(
    allBlogs,
    page,
    contentfulTotal,
    localBlogs.length,
    itemsPerPage
  )
  
  console.timeEnd('blog listing')
  return collection
}

/**
 * Get the original Contentful entries for blog posts.
 * This is useful when you need access to the original Contentful structure.
 * Note: Local blogs won't be included in this result.
 */
export const getRawBlogEntries = async (
  page: number,
  preview: boolean = false
): Promise<BlogEntries> => {
  console.time('raw blog listing')
  const mode = preview ? 'preview' : 'production'
  
  // Only fetch from Contentful - local blogs don't have proper Contentful entries
  const contentful = getContentfulClient(mode)
  const blogs =
    await contentful.withoutUnresolvableLinks.getEntries<BlogPostSkeleton>({
      content_type: 'blogPost',
      limit: 10,
      order: ['-fields.date'],
      skip: (page - 1) * 10,
    })

  console.timeEnd('raw blog listing')
  return blogs
}
