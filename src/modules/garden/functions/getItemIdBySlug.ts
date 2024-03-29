import { notion } from '$core/constants/notion'
import { readFileSystem, writeFileSystem } from '$core/functions/fileSystem'

import type { PostItem } from '../@types/post'

export const getItemIdBySlug = async (slug: string): Promise<string | null> => {
  const cacheKeys = ['garden', 'slug', slug]

  let targetId =
    (await readFileSystem<string>(cacheKeys).then(o => o?.data)) ?? null

  if (!targetId) {
    const notionItem = (
      (
        await notion.databases.query({
          database_id: '767256390e784c1794efee891777fabd',
          filter: {
            and: [
              {
                property: 'Publish',
                checkbox: {
                  equals: true,
                },
              },
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
      await writeFileSystem<string>(
        cacheKeys,
        notionItem.id,
        1000 * 60 * 60 * 24 * 30
      )
      targetId = notionItem.id
    }
  }

  return targetId
}
