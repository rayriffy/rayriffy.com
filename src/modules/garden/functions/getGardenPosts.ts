import { notion } from '$core/constants/notion'
import { cache } from '$core/functions/cache'

import type { QueryDataSourceResponse } from '@notionhq/client/build/src/api-endpoints'
import type { PostItem } from '../@types/post'

export const getGardenPosts = async () => {
  console.time('garden listing')
  const cacheKeys = ['garden', 'listing']
  let postItems = await cache.read<PostItem[]>(cacheKeys).then(o => o?.data)

  if (!postItems) {
    const items = (await notion.dataSources.query({
      data_source_id: 'c6962c59-0bb7-4d71-b99b-3501cf06bc99',
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
    })) as unknown as Omit<QueryDataSourceResponse, 'results'> & {
      results: PostItem[]
    }
    cache.write<PostItem[]>(cacheKeys, items.results, 1000 * 60 * 5)
    postItems = items.results
  }

  console.timeEnd('garden listing')
  return postItems ?? []
}
