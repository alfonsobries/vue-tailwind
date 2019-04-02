module.exports = {
  title: 'VueTailwind',
  description: 'An configurable UI library styled with TailwindCSS',
  postcss: {
    'plugins': [
      require('tailwindcss')('tailwind.js'),
      require('autoprefixer')()
    ]
  }
}
