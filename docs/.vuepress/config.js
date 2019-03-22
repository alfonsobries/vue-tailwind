module.exports = {
  title: 'VueTailwind',
  description: 'An ui library styled with TailwindCSS',
  postcss: {
    'plugins': [
      require('tailwindcss')('tailwind.js'),
      require('autoprefixer')()
    ]
  }
}
