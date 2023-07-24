/** @type {import("prettier").Options} */
module.exports = {
  semi: false,
  arrowParens: 'avoid',
  singleQuote: true,
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  trailingComma: 'es5',
  bracketSpacing: true,
  endOfLine: 'lf',
  plugins: [
    'prettier-plugin-tailwindcss',
    'prettier-plugin-svelte',
    'prettier-plugin-astro',
  ],
  overrides: [
    {
      files: '*.svelte',
      options: {
        parser: 'svelte',
      },
    },
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
}
