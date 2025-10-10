import type { EntryFieldTypes } from 'contentful'

export type CategorySkeleton = {
  contentTypeId: 'category'
  fields: {
    key: EntryFieldTypes.Text
    name: EntryFieldTypes.Text
    desc: EntryFieldTypes.Text
  }
}
