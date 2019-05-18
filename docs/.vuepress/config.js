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
            '/elements/radio',
            '/elements/radio-group',
            '/elements/button',
            '/elements/checkbox',
        ]
      }
    ]
  },
  postcss: {
    'plugins': [
      require('tailwindcss')('tailwind.config.js'),
      require('autoprefixer')()
    ]
  }
}
