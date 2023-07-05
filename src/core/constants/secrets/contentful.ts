export const contentful = {
  spaceId:
    import.meta.env.CONTENTFUL_SPACE_ID ?? process.env.CONTENTFUL_SPACE_ID,
  deliveryToken:
    import.meta.env.CONTENTFUL_DELIVERY_API ??
    process.env.CONTENTFUL_DELIVERY_API,
  previewToken:
    import.meta.env.CONTENTFUL_PREVIEW_API ??
    process.env.CONTENTFUL_PREVIEW_API,
}
