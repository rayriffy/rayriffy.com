import type { Entry, EntryCollection } from 'contentful';
import type { BlogPostSkeleton } from '$core/@types/BlogPostSkeleton';

/**
 * Simplified Blog model that contains only the essential properties.
 */
export interface Blog {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  content: string;
  featured: boolean;
  banner: {
    url: string;
    title: string;
    contentType: string;
  } | null;
  categories: {
    id: string;
    name: string;
  }[];
  isLocal: boolean;
}

/**
 * Collection of blogs with pagination information
 */
export interface BlogCollection {
  items: Blog[];
  total: number;
  skip: number;
  limit: number;
  currentPage: number;
  totalPages: number;
}

export type BlogEntry = Entry<BlogPostSkeleton, 'WITHOUT_UNRESOLVABLE_LINKS', string>;
export type BlogEntries = EntryCollection<BlogPostSkeleton, 'WITHOUT_UNRESOLVABLE_LINKS', string>;

/**
 * Converts a Contentful blog entry to our simplified Blog model.
 */
export function mapEntryToBlog(entry: BlogEntry): Blog {
  const isLocal = entry?.sys?.space?.sys?.id === 'local';
  
  // Process categories safely
  const categories: Array<{id: string, name: string}> = [];
  if (Array.isArray(entry.fields.category)) {
    for (const category of entry.fields.category) {
      if (category && category.sys && category.fields && category.fields.name) {
        categories.push({
          id: category.sys.id,
          name: category.fields.name
        });
      }
    }
  }
  
  return {
    id: entry.sys.id,
    slug: entry.fields.slug,
    title: entry.fields.title,
    subtitle: entry.fields.subtitle,
    date: entry.fields.date,
    content: entry.fields.content,
    featured: entry.fields.featured || false,
    banner: entry.fields.banner && entry.fields.banner.fields.file
      ? {
          url: entry.fields.banner.fields.file.url,
          title: entry.fields.banner.fields.title || entry.fields.title,
          contentType: entry.fields.banner.fields.file.contentType
        }
      : null,
    categories,
    isLocal
  };
}

/**
 * Converts a collection of Contentful blog entries to our simplified BlogCollection.
 */
export function mapEntriesToBlogCollection(entries: BlogEntries, page: number): BlogCollection {
  const itemsPerPage = entries.limit;
  
  return {
    items: entries.items.map(entry => mapEntryToBlog(entry)),
    total: entries.total,
    skip: entries.skip,
    limit: entries.limit,
    currentPage: page,
    totalPages: Math.ceil(entries.total / itemsPerPage)
  };
} 