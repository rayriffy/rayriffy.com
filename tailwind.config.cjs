/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      typography: theme => ({
        h1: {
          fontWeight: '700',
          letterSpacing: theme('letterSpacing.tight'),
          color: theme('colors.gray.900'),
        },
        h2: {
          fontWeight: '700',
          letterSpacing: theme('letterSpacing.tight'),
          color: theme('colors.gray.900'),
        },
        h3: {
          fontWeight: '600',
          color: theme('colors.gray.900'),
        },
        h4: {
          fontSize: '1.166667em',
        },
        'h4,h5,h6': {
          color: theme('colors.gray.900'),
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
