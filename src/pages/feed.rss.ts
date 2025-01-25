import rss from '@astrojs/rss'

import { getCollection } from 'astro:content'
import { getGardenPosts } from '$modules/garden/functions/getGardenPosts'

import type { APIRoute } from 'astro'
import type { RSSFeedItem } from '@astrojs/rss'

export const GET: APIRoute = async context => {
  const blogFeed = getCollection('contentfulBlogs').then(blogs =>
    blogs.map(
      b =>
        ({
          title: b.data.title,
          link: `/blog/${b.id}`,
          pubDate: b.data.date,
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
