import { selectAll } from 'unist-util-select'

import { readFileSystem, writeFileSystem } from '$core/functions/fileSystem'

import type { Plugin } from 'unified'
import type { Data, Node } from 'unist'
import type { OembedProvider } from '../../blog/@types/OembedProvider'

interface ExtendedNode extends Node<Data> {
  value: string
}

interface OembedResult {
  html: string
}

const getProviderEndpoint = (url: string, providers: OembedProvider[]) => {
  let transformedEndpoint = undefined

  for (const provider of providers || []) {
    for (const endpoint of provider.endpoints || []) {
      for (let schema of endpoint.schemes || []) {
        if (transformedEndpoint === undefined) {
          schema = schema.replace('*', '.*')
          const regExp = new RegExp(schema)
          const isMatchingSchema = regExp.test(url)

          if (isMatchingSchema) {
            transformedEndpoint = endpoint.url
          }
        }
      }
    }
  }

  return transformedEndpoint
}

const createIframe = (node: ExtendedNode, url: string) => {
  node.type = 'html'
  node.value = `
    <div class="w-full aspect-[16/9]">
      <iframe
        src="${url}"
        class="w-full aspect-[16/9]"
        style="border:0"
        loading="lazy"
        allowfullscreen
      ></iframe>
    </div>
  `
}

export const iframeParser: Plugin = () => {
  return async markdownAST => {
    // get oembed providers into cache
    let oembedKey = ['core', 'oembed', 'providers']

    if ((await readFileSystem(oembedKey)) === null) {
      const providersRemote = await fetch(
        'https://oembed.com/providers.json'
      ).then(o => {
        if (o.ok) return o.json()
        else throw o
      })
      await writeFileSystem(
        oembedKey,
        providersRemote,
        1000 * 60 * 60 * 24 * 30
      )
    }

    // transform
    const nodes = selectAll('[type=inlineCode]', markdownAST) as ExtendedNode[]

    await Promise.all(
      nodes.map(async node => {
        const matcher = node.value.match(/(\w+):\s?(.+)/)
        if (matcher !== null) {
          const provider = matcher[1]
          const targetValue = matcher[2]

          switch (provider) {
            case 'niconico':
              createIframe(
                node,
                `https://embed.nicovideo.jp/watch/${targetValue}`
              )
              break
            case 'youtube':
              createIframe(node, `https://www.youtube.com/embed/${targetValue}`)
              break
            case 'oembed':
              const providers = await readFileSystem<OembedProvider[]>(
                oembedKey
              )
              const extractedUrl = node.value.slice('oembed: '.length)

              // get provider endpoint
              const endpoint = getProviderEndpoint(
                extractedUrl,
                providers?.data ?? []
              )

              if (endpoint !== undefined) {
                const oembedEndpointKey = [
                  'core',
                  'oembed',
                  'endpoints',
                  extractedUrl,
                ]

                const cachedOembedResult = await readFileSystem<OembedResult>(
                  oembedEndpointKey
                )

                if (cachedOembedResult !== null) {
                  node.type = `html`
                  node.value = `<div class="flex justify-center">${cachedOembedResult.data.html}</div>`
                } else {
                  try {
                    // call api
                    const oembedResult = await fetch(
                      endpoint +
                        '?' +
                        new URLSearchParams({
                          format: 'json',
                          url: extractedUrl,
                        }).toString()
                    ).then(o => {
                      if (o.ok) return o.json() as Promise<OembedResult>
                      else throw o
                    })

                    writeFileSystem(
                      oembedEndpointKey,
                      oembedResult,
                      1000 * 60 * 60
                    )

                    // override node
                    node.type = `html`
                    node.value = `<div class="flex justify-center">${oembedResult.html}</div>`
                  } catch (e) {}
                }
              }
              break
          }
        }
      })
    )
  }
}
