import { NotionToMarkdown } from 'notion-to-md'
import { notion } from './notion'

export const n2m = new NotionToMarkdown({ notionClient: notion })
