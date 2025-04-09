import { SitemapStream, streamToPromise } from 'sitemap'
import { Readable } from 'stream'

import type { APIRoute } from 'astro'
import { paths } from '$app/constants/paths'
import { getGardenPosts } from '$modules/garden/functions/getGardenPosts'
import { getAllBlogs } from '$modules/feed/functions/getAllBlogs'
import type { Blog } from '$modules/blog/models/Blog'

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

    const blogLinksPromise = getAllBlogs().then(blogs => blogs.map((blog: Blog) => `/blog/${blog.slug}`))

    const gardenPromise = getGardenPosts().then(posts =>
      posts.map(
        post => `/garden/${post.properties.Slug.rich_text[0].plain_text}`
      )
    )

    const [blogLinks, gardenLinks] = await Promise.all([
      blogLinksPromise,
      gardenPromise,
    ])

    const builtLinks: Link[] = [
      ...staticLinks,
      ...blogLinks,
      ...gardenLinks,
    ].map(link => ({
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
