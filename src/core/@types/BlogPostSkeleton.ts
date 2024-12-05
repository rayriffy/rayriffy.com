import type { EntryFieldTypes } from 'contentful'
import type { CategorySkeleton } from './CategorySkeleton'

export type BlogPostSkeleton = {
  contentTypeId: 'blogPost'
  fields: {
    slug: EntryFieldTypes.Text
    banner: EntryFieldTypes.AssetLink
    title: EntryFieldTypes.Text
    subtitle: EntryFieldTypes.Text
    date: EntryFieldTypes.Date
    featured: EntryFieldTypes.Boolean
    category: EntryFieldTypes.Array<
      EntryFieldTypes.EntryLink<CategorySkeleton>
    >
    content: EntryFieldTypes.Text
  }
}
