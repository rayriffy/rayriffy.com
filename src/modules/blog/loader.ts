import {type CollectionEntry, getCollection, getEntry} from 'astro:content'

export type Content = CollectionEntry<'contentfulBlogs'> | CollectionEntry<'localBlogs'>

export const loadContent = async (slug: string): Promise<Content | undefined> => {
  const local = await getEntry('localBlogs', slug)

  if (local !== undefined)
    return local

  return getEntry('contentfulBlogs', slug)
}

export const loadContents = async (): Promise<Content[]> => {
  const [local, contentful] = await Promise.all([
    getCollection('localBlogs'),
    getCollection('contentfulBlogs'),
  ])

  return [...local, ...contentful].sort(
    (a, b) =>
      b.data.date.getTime() - a.data.date.getTime()
  )
}
