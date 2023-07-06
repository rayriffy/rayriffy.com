import { selectAll } from 'unist-util-select'
import { encode } from 'html-entities'

import { getOptimizedImageUrl } from '$core/functions/getOptimizedImageUrl'

import type { Plugin } from 'unified'
import type { Data, Node } from 'unist'

interface ExtendedNode extends Node<Data> {
  value: string
  url: string
  alt?: string
}

const generateSourceSet = (url: string, type?: 'webp' | 'avif') =>
  [480, 640, 768, 1024]
    .map(size =>
      [
        encode(
          getOptimizedImageUrl(url, {
            width: size,
            ...(type ? { format: type } : {}),
          })
        ),
        `${size}w`,
      ].join(' ')
    )
    .join(', ')

export const imageParser: Plugin = () => {
  return async markdownAST => {
    // transform
    const nodes = selectAll('[type=image]', markdownAST) as ExtendedNode[]

    await Promise.all(
      nodes.map(async node => {
        let targetURL = node.url
        if (targetURL.startsWith('//')) targetURL = `https:${targetURL}`

        const imageUrl = new URL(targetURL)

        const acceptableFormats = ['png', 'jpg', 'jpeg']
        if (
          !acceptableFormats.some(format => imageUrl.pathname.endsWith(format))
        ) {
          return node
        }

        const baseHtml = `<img class="mx-auto" src="${encode(
          getOptimizedImageUrl(targetURL)
        )}" alt="${encode(node.alt)}" loading="lazy" />`

        node.type = 'html'

        const html = `
          <picture>
            <source type="image/avif" srcset="${generateSourceSet(
              targetURL,
              'avif'
            )}"></srouce>
            <source type="image/webp" srcset="${generateSourceSet(
              targetURL,
              'webp'
            )}"></srouce>
            <source type="image/${
              imageUrl.pathname.endsWith('.png') ? 'png' : 'jpeg'
            }" srcset="${generateSourceSet(targetURL)}"></srouce>
            ${baseHtml}
          </picture>
        `

        node.value = html
      })
    )
  }
}
