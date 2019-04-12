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
          title: 'Form elements',
          collapsable: false,
          children: [
            '/elements/input',
            '/elements/textarea',
            '/elements/select',
            '/elements/button',
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
