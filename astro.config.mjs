import { defineConfig } from 'astro/config'
import icon from 'astro-icon'

import node from '@astrojs/node'
import tailwindcss from "@tailwindcss/vite";

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
  ],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
})
