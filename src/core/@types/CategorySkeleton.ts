import type contentful from 'contentful'

export type CategorySkeleton = {
  contentTypeId: 'category'
  fields: {
    key: contentful.EntryFieldTypes.Text
    name: contentful.EntryFieldTypes.Text
    desc: contentful.EntryFieldTypes.Text
  }
}
