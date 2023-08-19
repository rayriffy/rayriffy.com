import type {
  PageObjectResponse,
} from '@notionhq/client/build/src/api-endpoints'

export type DatabaseResult = Extract<
  PageObjectResponse,
  { properties: Record<string, unknown> }
>

type PropertyValueMap = DatabaseResult['properties']
type PropertyValue = PropertyValueMap[string]
type PropertyValueType = PropertyValue['type']

type ExtractedPropertyValue<TType extends PropertyValueType> = Extract<
  PropertyValue,
  { type: TType }
>

export type PostItem = Omit<PageObjectResponse, 'properties'> & {
  properties: {
    Topic: ExtractedPropertyValue<'title'>
    Slug: ExtractedPropertyValue<'rich_text'>
    Tags: ExtractedPropertyValue<'multi_select'>
    Publish: ExtractedPropertyValue<'checkbox'>
  }
}
