import { selectAll } from 'unist-util-select'

import type { Plugin } from 'unified'
import type { Data, Node } from 'unist'
import { prismMap } from '../constants/prismMap'

interface ExtendedNode extends Node<Data> {
  lang?: string
  children: Node<Data>[]
  properties?: { [key: string]: string[] }
  depth?: number
}

export const codeHighlight: Plugin = () => {
  return markdownAST => {
    const nodes = selectAll('element', markdownAST) as ExtendedNode[]

    nodes.forEach(node => {
      let [token, type] = node.properties?.className || []
      if (token === 'token') {
        node.properties!.className = [prismMap[type]]
      }
    })
  }
}