import { getAllBlogs } from '$modules/feed/functions/getAllBlogs'
import rss from '@astrojs/rss'

import type { APIRoute } from 'astro'
import type { RSSFeedItem } from '@astrojs/rss'
import { getGardenPosts } from '$modules/garden/functions/getGardenPosts'
import type { Blog } from '$modules/blog/models/Blog'

export const GET: APIRoute = async context => {
  const blogFeed = getAllBlogs().then(blogs =>
    blogs.map(
      (b: Blog) =>
        ({
          title: b.title,
          link: `/blog/${b.slug}`,
          pubDate: new Date(b.date),
        }) satisfies RSSFeedItem
    )
  )

  const gardenFeed = getGardenPosts().then(posts =>
    posts.map(
      p =>
        ({
          title: p.properties.Topic.title[0].plain_text,
          link: `/garden/${p.properties.Slug.rich_text[0].plain_text}`,
          pubDate: new Date(p.created_time),
        }) satisfies RSSFeedItem
    )
  )

  const [blogs, gardens] = await Promise.all([blogFeed, gardenFeed])

  return rss({
    title: 'rayriffy.com',
    description: 'The front frontier of rayriffy.com!',
    site: context.site!,
    items: [...blogs, ...gardens].sort(
      (a, b) => b.pubDate.getTime() - a.pubDate.getTime()
    ),
  })
}
