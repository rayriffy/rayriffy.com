import { defineConfig } from 'astro/config'

import compress from 'astro-compress'
import tailwind from '@astrojs/tailwind'
import prefetch from '@astrojs/prefetch'
import image from '@astrojs/image'
import svelte from '@astrojs/svelte'

// https://astro.build/config
export default defineConfig({
  site: 'https://rayriffy.com',
  integrations: [
    tailwind({
      config: {
        applyBaseStyles: false,
      },
    }),
    prefetch(),
    image(),
    svelte(),
    compress({
      img: false,
      svg: false,
      js: true,
    }),
  ],
})
