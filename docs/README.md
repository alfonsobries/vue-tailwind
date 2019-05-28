# Vue-Tailwind 

**VueTailwind** is a set of Vue components with configurable classes that don't depend on any CSS frameworks but works fantastic with [TailwindCss](https://tailwindcss.com).

That means that you can define your own classes for every component according to his status and the unique style of your application.

Yes, you read right, no more Bootstrap like sites, you just need to configure your classes once and all set.

## Install and use
1. Install the dependencies 

```console
npm install vue-tailwind --save
``` 

Or: 
```console
yarn add vue-tailwind
``` 

2. Configure your project to use `vue-tailwind` 

2.1 Do nothing if you want ot use the default theme for TailwindCss:

```js
import Vue from 'vue'
import VueTailwind from 'vue-tailwind'

Vue.use(VueTailwind)
```

2.2 Or better yet, create your own theme:

```js
// `./myOwnTheme.js`
const MyOwnTheme = {
  TInput: {
    baseClass: 'border-2 block w-full rounded',
    defaultStatusClass: 'bg-white',
    warningStatusClass: 'border-yellow-400 bg-yellow-100',
    errorStatusClass: 'border-red-300 bg-red-100',
    successStatusClass: 'border-green-300 bg-green-100',
    disabledClass: 'bg-gray-100 cursor-not-allowed opacity-75',
    defaultSizeClass: 'p-3',
    largeSizeClass: 'p-4 text-lg',
    smallSizeClass: 'p-2 text-sm',
  },
  TTextarea: {
    // ...
  },
  TSelect: {
    // ...
  },
  TRadio: {
    // ...
  },
  TCheckbox: {
    // ...
  },
  TButton: {
    // ...
  },
  TRadioGroup: {
    // ...
  },
  TDropdown: {
    // ...
  },
}

export const {
  TInput: TInputTheme,
  TTextarea: TTextareaTheme,
  TSelect: TSelectTheme,
  TButton: TButtonTheme,
  TRadio: TRadioTheme,
  TCheckbox: TCheckboxTheme,
  TRadioGroup: TRadioGroupTheme,
  TDropdown: TDropdownTheme,
} = MyOwnTheme

export default MyOwnTheme
```

```js
import Vue from 'vue'
import VueTailwind from 'vue-tailwind'
import theme from './myOwnTheme.js'

Vue.use(VueTailwind, {
  theme
})
```

3. Using `purgecss` postcss plugin? Add your theme file to the postcss config (or if you using the default theme add the theme path):
```js
// postcss.config.js (from https://tailwindcss.com/docs/controlling-file-size#setting-up-purgecss)
const purgecss = require('@fullhuman/postcss-purgecss')({
  content: [
    // ...Default config
    // Your custom theme file:
    './myOwnTheme.js',
    // Or the default 
    // './node_modules/vue-tailwind/src/themes/default.js'
  ],

  // Include any special characters you're using in this regular expression
  defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || []
})

module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    ...process.env.NODE_ENV === 'production'
      ? [purgecss]
      : []
  ]
}
```

## Whats next?

The idea is to create a big set of common components using the same philosophy: Configurable elements that could be adapted to your project style:

For now this are the priorities (subject to change).

**Basic inputs**
- [ ] Checkbox group
- [ ] File input

**Rich inputs**
- [ ] Rich Select (with tagging, autocomplete, remote data sets, etc.)
- [ ] Date/Time Picker
- [ ] Rich file input (drop, multiupload, progress bar, etc)

**Components**
- [ ] Modal
- [ ] Tooltip
- [ ] Progress bar

## Contribute
Do you like this project? Contribute!, Any help is welcome. (Im not an english speaker so also any comments on my redaction are welcome :D).

