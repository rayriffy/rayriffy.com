import { notion } from '$core/constants/notion'
import { readFileSystem, writeFileSystem } from '$core/functions/fileSystem'

import type { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints'
import type { PostItem } from '../@types/post'

export const getGardenPosts = async () => {
  console.time('garden listing')
  const cacheKeys = ['garden', 'listing']
  let postItems = await readFileSystem<PostItem[]>(cacheKeys).then(o => o?.data)

  if (!postItems) {
    const items = (await notion.databases.query({
      database_id: '767256390e784c1794efee891777fabd',
      filter: {
        property: 'Publish',
        checkbox: {
          equals: true,
        },
      },
      sorts: [
        {
          timestamp: 'created_time',
          direction: 'descending',
        },
      ],
      page_size: 100,
    })) as unknown as Omit<QueryDatabaseResponse, 'results'> & {
      results: PostItem[]
    }
    writeFileSystem<PostItem[]>(cacheKeys, items.results, 1000 * 60 * 5)
    postItems = items.results
  }

  console.timeEnd('garden listing')
  return postItems ?? []
}
