# Vue-Tailwind 

[![Build Status](https://travis-ci.org/alfonsobries/vue-tailwind.svg?branch=master)](https://travis-ci.org/alfonsobries/vue-tailwind) [![Netlify Status](https://api.netlify.com/api/v1/badges/40acc43a-7f44-4030-b18a-62c08e0b03d2/deploy-status)](https://app.netlify.com/sites/vue-tailwind/deploys)

For more info check the official site: [https://vue-tailwind.com/](https://vue-tailwind.com/)

**VueTailwind** is a set of Vue components created to be customized to adapt to the unique design of your application.

All classes are configurable and that give you total control of how the components will look like and its perfect for work with utility-first frameworks like [TailwindCss](https://tailwindcss.com). 

No more Bootstrap like sites, you just need to configure your theme classes once and all set.

## Whats new in version 1.x

- Rebuilt from scratch in Typescript
- Small bundle size and less dependencies
- A better way to import just selected components
- A new theme builder (Wait for the link)
- An easy and more flexible way to define variants

The new settings look like this:

```js
import Vue from 'vue'
import VueTailwind from 'vue-tailwind'

const theme = {
  TInput: {
    classes: 'form-input border-2 text-gray-700',
    variants: {
      error: 'form-input border-2 border-red-300 bg-red-100',
      // ... Infinite variantes
    }
  },
  // ... The rest of the components
}

Vue.use(VueTailwind, theme)
```

The variants can also be defined in the component props:

```html
<t-input
  :classes="form-input border-2 text-gray-700"
  :variants="{
    error: 'form-input border-2 border-red-300 bg-red-100',
    success: 'form-input border-2 border-green-300 bg-green-100'
  }"
  :variant="{
    'success': isValid,
    'error': isNotValid,
  }"
/>
```


## Install and use
### 1. Install the dependencies 

```console
npm install vue-tailwind@next --save
``` 

Or: 
```console
yarn add vue-tailwind@next
``` 

::: tip 
Dont forget to [install TailwindCSS](https://tailwindcss.com/docs/installation)
:::


### 2. Configure your project to use `vue-tailwind` 

#### 2.1 Do nothing if you dont want to define a default theme (not recommended):

```js
import Vue from 'vue'
import VueTailwind from 'vue-tailwind'

Vue.use(VueTailwind)
```

### 2.2 Or better yet, create your own theme:

Let's say, for example, that for the specific needs of your project the text inputs should have a `blue two width border`, the buttons should have `more rounded borders` and you need a secondary button that should be `purple`.

```js
// `./myOwnTheme.js`
const TInput = {
  classes: 'border-2 block w-full rounded text-gray-8000',
  // Optional variants
  variants: {
    // ...
  }
}

const TButton = {
  classes: 'rounded-lg border block inline-flex items-center justify-center',
  variants: {
    secondary: 'rounded-lg border block inline-flex items-center justify-center bg-purple-500 border-purple-500 hover:bg-purple-600 hover:border-purple-600',
  }
}

const MyOwnTheme = {
  TInput,
  TButton,
}

export default MyOwnTheme
```

Finally, add your custom theme when you install VueTailwind:

```js {3,6}
import Vue from 'vue'
import VueTailwind from 'vue-tailwind'
import MyOwnTheme from './myOwnTheme.js'

Vue.use(VueTailwind, MyOwnTheme)
```

Another option is to set the settings directly, check at this example:

```js {4,5,6,11}
import Vue from 'vue'
import VueTailwind from 'vue-tailwind'

const TInput = {
  classes: 'border-2 border-blue-500 block w-full rounded',
}
// Or create a separate file like `src/themes/default/TInput.js` and import it
// import TInput from './myOwnTInput'
Vue.use(VueTailwind, {
  TInput
})

// Or why not? define the settings inline:
Vue.use(VueTailwind, {
  TInput: {
    baseClass: 'border-2 border-blue-500 block w-full rounded',
  }
})
```

### 3. (Optional) configure `purgecss`

Using `purgecss` postcss plugin? Add your theme file to the postcss config (or if you using the default theme add the theme path):

```js
// postcss.config.js (from https://tailwindcss.com/docs/controlling-file-size#setting-up-purgecss)
const purgecss = require('@fullhuman/postcss-purgecss')({
  content: [
    './myOwnTheme.js',
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

## Install only the components you need

If you want to install only selected components you can do it by importing the component directly and registering it like this:

```js
import TInput from 'vue-tailwind/dist/components/TInput.umd.js'
import TButton from 'vue-tailwind/dist/components/TButton.umd.js'

Vue.use(TInput, {
  classes: 'border-green-600 bg-green-300 text-white',
  variants: {
    // ...
  }
})

Vue.use(TButton, {
  classes: 'bg-blue-500 hover:bg-blue-600 p-3 text-white',
  variants: {
    // ...
  }
})
```

You can also import the component directly to use it in your template but in that case you can't override the default theme. However, you can set the classes by using the props, look at this example:

```js
<template>
<div>
  <t-input
    :classes="'border p-4'"
    :variants="{
      success: "p-3 border-green-600 bg-green-300 text-green-700"
    }"
    :variant="'success'"
  >
</div>
</template>

<script>
import TInput from 'vue-tailwind/dist/components/TInput.umd.js'
export default {
  components: {
    TInput
  }
}
</script>
```

## Contribute

Is this project helpful for you? Consider sponsoring me [https://github.com/sponsors/alfonsobries]

Of course, any other kind help is welcome, even if you notice some grammar mistakes (English is not my primary language) [CONTRIBUTING](https://github.com/alfonsobries/vue-tailwind/blob/master/CONTRIBUTING.md) for details.


### Changelog

Please see [CHANGELOG](CHANGELOG.md) for more information what has changed recently.

### Security

If you discover any security related issues, please email alfonso@vexilo.com instead of using the issue tracker.

## Credits

- [Alfonso Bribiesca](https://github.com/alfonsobries)
- [All Contributors](https://github.com/alfonsobries/vue-tailwind/contributors)

## License

The MIT License (MIT). Please see [License File](LICENSE) for more information.

_Made with love by [@alfonsobries](https://twitter.com/alfonsobries)_

