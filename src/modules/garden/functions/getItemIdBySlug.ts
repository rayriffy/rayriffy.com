import { notion } from '$core/constants/notion'
import { cache } from '$core/functions/cache'

import type { PostItem } from '../@types/post'

interface Item {
  id: string
  published: boolean
}

export const getItemIdBySlug = async (slug: string): Promise<Item | null> => {
  const cacheKeys = ['garden', 'slug-v2', slug]

  let targetId =
    (await cache.read<Item>(cacheKeys).then(o => o?.data)) ?? null

  if (!targetId) {
    const notionItem = (
      (
        await notion.dataSources.query({
          data_source_id: 'c6962c59-0bb7-4d71-b99b-3501cf06bc99',
          filter: {
            and: [
              {
                property: 'Slug',
                rich_text: {
                  equals: slug ?? '',
                },
              },
            ],
          },
          page_size: 1,
        })
      ).results as unknown as PostItem[]
    )[0]

    if (notionItem) {
      const item: Item = {
        id: notionItem.id,
        published: notionItem.properties.Publish.checkbox,
      }

      await cache.write<Item>(
        cacheKeys,
        item,
        1000 * 60 * 60 * 24 * 30
      )
      targetId = item
    }
  }

  return targetId
}
