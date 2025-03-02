import { defineConfig } from 'astro/config'
import icon from 'astro-icon'

import node from '@astrojs/node'
import tailwindcss from "@tailwindcss/vite";

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
