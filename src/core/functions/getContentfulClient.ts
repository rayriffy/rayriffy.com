import { contentful } from '$core/constants/secrets/contentful'
import contentfulLib from 'contentful'

type Mode = 'production' | 'preview'

export const getContentfulClient = (mode: Mode = 'production') =>
  contentfulLib.createClient({
    space: contentful.spaceId,
    accessToken:
      mode === 'production'
        ? contentful.deliveryToken
        : contentful.previewToken,
    host: mode === 'preview' ? 'preview.contentful.com' : undefined,
  })
