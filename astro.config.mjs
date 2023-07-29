import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import prefetch from '@astrojs/prefetch'
import svelte from '@astrojs/svelte'

import node from '@astrojs/node'

// https://astro.build/config
export default defineConfig({
  output: 'server',
  site: 'https://rayriffy.com',
  adapter: node({
    mode: 'middleware',
  }),
  experimental: {
   viewTransitions: true
  },
  integrations: [
    tailwind({
      config: {
        applyBaseStyles: false,
      },
    }),
    // prefetch(),
    svelte(),
  ],
})
