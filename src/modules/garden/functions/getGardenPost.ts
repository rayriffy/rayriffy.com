import { n2m } from '$core/constants/n2m'
import { notion } from '$core/constants/notion'
import { cache } from '$core/functions/cache'

import { getItemIdBySlug } from './getItemIdBySlug'

import type { MdBlock } from 'notion-to-md/build/types'
import type { PostItem } from '../@types/post'

interface GardenPost {
  title: string
  date: string
  content: MdBlock[]
  published: boolean
}

export const getGardenPost = async (slug: string) => {
  console.time('garden post ' + slug)
  const cacheKeys = ['garden', 'content', slug]
  let gardenPost = await cache.read<GardenPost>(cacheKeys).then(
    o => o?.data
  )

  if (!gardenPost) {
    // find page id by slug
    const pageItem = await getItemIdBySlug(slug)
    if (!pageItem) return undefined

    const [page, markdownBlocks] = await Promise.all([
      notion.pages.retrieve({
        page_id: pageItem.id,
      }) as Promise<PostItem>,
      n2m.pageToMarkdown(pageItem.id),
    ])

    const payload: GardenPost = {
      title: page.properties.Topic.title[0].plain_text,
      date: page.created_time,
      content: markdownBlocks,
      published: pageItem.published
    }
    await cache.write<GardenPost>(cacheKeys, payload)
    gardenPost = payload
  }

  console.timeEnd('garden post ' + slug)
  if (gardenPost)
    return {
      ...gardenPost,
      content: n2m.toMarkdownString(gardenPost.content).parent,
      published: gardenPost.published
    }
  else return undefined
}
