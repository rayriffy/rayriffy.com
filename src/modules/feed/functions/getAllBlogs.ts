import { getBlogs, type BlogEntries } from '$modules/blog/functions/getBlogs'

export const getAllBlogs = async (): Promise<BlogEntries['items']> => {
  const firstPage = await getBlogs(1)

  const pages = Math.ceil(firstPage.total / 10)

  const allPages = await Promise.all(
    Array.from({ length: pages - 1 }, (_, i) => i + 2).map(page =>
      getBlogs(page)
    )
  )

  return [...firstPage.items, ...allPages.map(o => o.items).flat()]
}
