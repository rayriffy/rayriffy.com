import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import prefetch from '@astrojs/prefetch'

import node from '@astrojs/node'

// https://astro.build/config
export default defineConfig({
  output: 'server',
  site: 'https://rayriffy.com',
  adapter: node({
    mode: 'middleware',
  }),
  compressHTML: true,
  integrations: [
    tailwind({
      config: {
        applyBaseStyles: false,
      },
    }),
    prefetch(),
  ],
})
