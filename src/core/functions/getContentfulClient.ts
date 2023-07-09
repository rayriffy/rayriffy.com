import { contentful } from '$core/constants/secrets/contentful'
import contentfulLib from 'contentful'

import type { ContentfulMode } from '$core/@types/ContentfulMode'

export const getContentfulClient = (mode: ContentfulMode = 'production') =>
  contentfulLib.createClient({
    space: contentful.spaceId,
    accessToken:
      mode === 'production'
        ? contentful.deliveryToken
        : contentful.previewToken,
    host: mode === 'preview' ? 'preview.contentful.com' : undefined,
  })
