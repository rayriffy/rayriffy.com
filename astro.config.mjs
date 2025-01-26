import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import icon from 'astro-icon'

import node from '@astrojs/node'

import {iframeParser} from "./src/modules/markdown/plugins/iframeParser";
import {imageParser} from "./src/modules/markdown/plugins/imageParser";

// https://astro.build/config
export default defineConfig({
  output: 'server',
  site: 'https://rayriffy.com',
  devToolbar: {
    enabled: true,
  },
  adapter: node({
    mode: 'middleware',
  }),
  prefetch: true,
  markdown: {
    remarkPlugins: [
      iframeParser,
    ]
  },
  compressHTML: true,
  integrations: [
    icon({
      include: {
        dashicons: ['admin-site-alt2'],
        ri: ['slideshow-2-fill'],
        logos: ['github', 'youtube'],
      },
    }),
    tailwind({
      config: {
        applyBaseStyles: false,
      },
    }),
  ],
})
