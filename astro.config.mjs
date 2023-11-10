import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'

import node from '@astrojs/node'

// https://astro.build/config
export default defineConfig({
  output: 'server',
  site: 'https://rayriffy.com',
  adapter: node({
    mode: 'middleware',
  }),
  prefetch: true,
  compressHTML: true,
  integrations: [
    tailwind({
      config: {
        applyBaseStyles: false,
      },
    }),
  ],
})
