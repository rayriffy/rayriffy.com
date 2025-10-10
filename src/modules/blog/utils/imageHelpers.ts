import path from 'path'
import type { Asset } from 'contentful'

export interface LocalImageProps {
  src: string
  width: number
  height: number
  format: 'jpg' | 'jpeg' | 'png' | 'webp' | 'avif' | 'svg' | 'tiff' | 'gif'
}

/**
 * Process a local image for use with Astro's Image component
 */
export function processLocalImage(banner: Asset): LocalImageProps | null {
  if (
    !banner ||
    !banner.fields.file ||
    typeof banner.fields.file.url !== 'string'
  ) {
    return null
  }

  const bannerUrl = banner.fields.file.url

  // Make sure the path starts with 'src/' for Astro's image handling
  const bannerPath = bannerUrl.startsWith('/src/')
    ? bannerUrl.substring(1) // Remove leading slash
    : bannerUrl.startsWith('/')
      ? `src${bannerUrl}` // Add 'src' prefix to path
      : `src/${bannerUrl}` // Add 'src/' prefix to path

  try {
    // We'll use a standard 1500x788 aspect ratio
    const imageSize = {
      width: 1500,
      height: 788,
      format: path
        .extname(bannerPath)
        .replace('.', '') as LocalImageProps['format'],
    }

    return {
      src: bannerPath,
      width: imageSize.width,
      height: imageSize.height,
      format: imageSize.format,
    }
  } catch (error) {
    console.error('Error processing local image:', error)
    return null
  }
}

/**
 * Check if a blog post is a local blog
 */
export function isLocalBlog(blog: any): boolean {
  return blog?.sys?.space?.sys?.id === 'local'
}
