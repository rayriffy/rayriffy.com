import { SitemapStream, streamToPromise } from 'sitemap'
import { Readable } from 'stream'

import type { APIRoute } from 'astro'
import { paths } from '$app/constants/paths'
import { getBlogs } from '$modules/blog/functions/getBlogs'
import { getGardenPosts } from '$modules/garden/functions/getGardenPosts'

interface Link {
  url: string
  changefreq: 'daily' | 'monthly' | 'weekly'
  priority: number
}

export const get: APIRoute = async () => {
  console.time('sitemap')
  try {
    const stream = new SitemapStream({
      hostname: 'https://rayriffy.com',
    })

    const staticLinks = paths.map(o => o.path)

    const blogLinksPromise = new Promise<string[]>(async (res, rej) => {
      try {
        const firstPage = await getBlogs(1)

        const pages = Math.ceil(firstPage.total / 10)

        const allPages = await Promise.all(
          Array.from({ length: pages - 1 }, (_, i) => i + 2).map(page =>
            getBlogs(page)
          )
        )

        res(
          [firstPage, ...allPages].map(page =>
            page.items.map(item => `/blog/${item.fields.slug}`)
          ).flat()
        )
      } catch (e) {
        rej(e)
      }
    })

    const gardenPromise = getGardenPosts().then(posts => posts.map(post => `/garden/${post.properties.Slug.rich_text[0].plain_text}`))

    const [blogLinks, gardenLinks] = await Promise.all([blogLinksPromise, gardenPromise])

    const builtLinks: Link[] = [...staticLinks, ...blogLinks, ...gardenLinks].map(link => ({
      url: link,
      changefreq: 'daily',
      priority: 0.5,
    }))

    return new Response(
      await streamToPromise(Readable.from(builtLinks).pipe(stream)).then(data =>
        data.toString()
      ),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/xml',
          'Cache-Control': 'max-age=7200', // 2 hours
          'CDN-Cache-Control': 'max-age=7200', // 2 hours
        },
      }
    )
  } catch (e) {
    return new Response('server error', {
      status: 500,
    })
  } finally {
    console.timeEnd('sitemap')
  }
}
