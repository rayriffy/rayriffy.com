import { n2m } from '$core/constants/n2m'
import { notion } from '$core/constants/notion'
import { readFileSystem, writeFileSystem } from '$core/functions/fileSystem'

import type { MdBlock } from 'notion-to-md/build/types'
import type { PostItem } from '../@types/post'

interface GardenPost {
  title: string
  date: string
  content: MdBlock[]
}

export const getGardenPost = async (slug: string) => {
  console.time('garden post ' + slug)
  const cacheKeys = ['garden', 'content', slug]
  let gardenPost = await readFileSystem<GardenPost>(cacheKeys).then(
    o => o?.data
  )

  if (!gardenPost) {
    // find page id by slug
    const targetPageDatabase = (
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

    if (!targetPageDatabase) return undefined

    const markdownBlocks = await n2m.pageToMarkdown(targetPageDatabase.id)
    const payload: GardenPost = {
      title: targetPageDatabase.properties.Topic.title[0].plain_text,
      date: targetPageDatabase.created_time,
      content: markdownBlocks,
    }
    await writeFileSystem<GardenPost>(cacheKeys, payload, 60 * 60 * 1000)
    gardenPost = payload
  }

  console.timeEnd('garden post ' + slug)
  if (gardenPost)
    return {
      ...gardenPost,
      content: n2m.toMarkdownString(gardenPost.content).parent,
    }
  else return undefined
}
