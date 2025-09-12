import { selectAll } from 'unist-util-select'

import type { Plugin } from 'unified'
import type { Node } from 'unist' 

interface CodeBlockNode extends Node {
  type: 'code' | 'html'
  lang: string
  value: string
}

export const esmDynamic: Plugin = () => {
  return markdownAST => {
    // locate root of code blocks
    const codeBlocks = selectAll('[type=code]', markdownAST) as unknown as CodeBlockNode[]

    codeBlocks.forEach(node => {
      // do transform process if were specified to use esm
      if (!node.value.includes('// !esm')) return

      // get root id
      const rootId = node.value.match(/\!esm\s?-\s?(\w+)/)?.[1]
      if (!rootId) return

      console.log(rootId)

      // // if not jsx, then skip process
      // if (!node.properties?.className?.includes('[language-jsx]')) return
      
      // // read all text lines
      // const readLines = extractTextContent(node)
      // console.log('Extracted text:', readLines)

      node.type = 'html'
      node.value = `
        <script type="module" src="https://esm.sh/tsx"></script>
        <div id="${rootId}"></div>
        <script type="text/jsx">
          ${node.value.split('\n').slice(1).join('\n')}
        </script>
      `

      // delete node.tagName
      // delete node.children
      // delete node.properties

      // console.log(node)
    })
  }
}
