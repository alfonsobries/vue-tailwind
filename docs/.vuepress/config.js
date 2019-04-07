module.exports = {
  title: 'VueTailwind',
  description: 'A configurable UI library styled with TailwindCSS',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Github', link: 'https://github.com/alfonsobries/vue-tailwind' },
    ],
    sidebar: [
      '/',
      {
          title: 'Components',
          collapsable: false,
          children: [
            '/components/input',
            '/components/textarea',
            '/components/select',
        ]
      }
    ]
  },
  postcss: {
    'plugins': [
      require('tailwindcss')('tailwind.js'),
      require('autoprefixer')()
    ]
  }
}
