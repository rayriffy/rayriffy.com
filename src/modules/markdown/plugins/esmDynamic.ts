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

      // optionally, there might be import map in following format
      // !imports - react/jsx-runtime https://esm.sh/preact@1.19.0/jsx-runtime
      const importMatches = [...node.value.matchAll(/!imports\s+-\s+([^\s]+)\s+([^\s]+)/g)]
      const imports = importMatches.reduce((acc, match) => {
        return {
          ...acc,
          [match[1]]: match[2]
        }
      }, {} as Record<string, string>)

      node.type = 'html'
      node.value = `
        <script type="importmap">
          {
            "imports": ${JSON.stringify(imports)}
          }
        </script>
        <script type="module" src="https://esm.sh/tsx"></script>
        <div id="${rootId}"></div>
        <script type="text/jsx">
          ${node.value.replace(/^\/\/.*$/gm, '').replace(/^\s*$/gm, '')}
        </script>
      `
    })
  }
}
