import type contentful from 'contentful'
import type { CategorySkeleton } from './CategorySkeleton'

export type BlogPostSkeleton = {
  contentTypeId: 'blogPost'
  fields: {
    slug: contentful.EntryFieldTypes.Text
    banner: contentful.EntryFieldTypes.AssetLink
    title: contentful.EntryFieldTypes.Text
    subtitle: contentful.EntryFieldTypes.Text
    date: contentful.EntryFieldTypes.Date
    featured: contentful.EntryFieldTypes.Boolean
    category: contentful.EntryFieldTypes.Array<
      contentful.EntryFieldTypes.EntryLink<CategorySkeleton>
    >
    content: contentful.EntryFieldTypes.Text
  }
}
