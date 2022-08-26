import preprocess from 'svelte-preprocess'
import image from 'svelte-image'
import vercel from '@sveltejs/adapter-vercel'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [
    image({
      compressionLevel: 8,
      quality: 90,
      placeholder: 'blur',
      webpOptions: {
        quality: 90,
        lossless: false,
        force: true,
      },
      sizes: [800, 1600, 2000],
      breakpoints: [375, 768, 1024],
    }),
    preprocess({
      postcss: true,
    }),
  ],

  kit: {
    adapter: vercel({
      edge: true
    }),
    prerender: {
      default: true
    },
  },
}

export default config
