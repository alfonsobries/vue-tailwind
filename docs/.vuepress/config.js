module.exports = {
  title: 'VueTailwind',
  description: 'A configurable UI library styled with TailwindCSS',
  ga: 'UA-142051519-1',
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
      },
      {
          title: 'Components',
          collapsable: false,
          children: [
            '/components/alert',
            '/components/card',
            '/components/dropdown',
            '/components/input-group',
          ]
      }
    ]
  },
  postcss: {
    'plugins': [
      require('tailwindcss')('tailwind.config.js'),
      require('autoprefixer')()
    ]
  },
  plugins: [
    [ 
      '@vuepress/google-analytics',
      {
        'ga': 'UA-142051519-1'
      }
    ]  
  ] 
}
