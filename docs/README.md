# Vue-Tailwind 

**VueTailwind** is a set of Vue components created to be customized to adapt to the unique design of your application.

It uses [TailwindCss](https://tailwindcss.com) classes by default, and all classes are configurable, that give you total control of how the components will look like.

No more Bootstrap like sites, you just need to configure your theme classes once and all set.

## Install and use
### 1. Install the dependencies 

```console
npm install vue-tailwind --save
``` 

Or: 
```console
yarn add vue-tailwind
``` 

### 2. Configure your project to use `vue-tailwind` 

### 2.1 Do nothing if you want to use our default theme:

```js
import Vue from 'vue'
import VueTailwind from 'vue-tailwind'

Vue.use(VueTailwind)
```

### 2.2 Or better yet, create your own theme:

Let's say, for example, that for the specific needs of your project the text inputs should have a `blue two width border` instead of the default border, the button should has `more rounded borders`, and the primary button should be `purple`.

::: tip 

Notice that you don't need to set all the classes settings, just the ones you want to override from `src/themes/default.js`

:::

```js
// `./myOwnTheme.js`
const TInput = {
  // Notice that this will override the full `baseClass` setting so probably you want to keep some
  // of the clases and just replace the ones you want to override.
  // baseClass: 'border block w-full rounded',
  baseClass: 'border-2 border-blue-500 block w-full rounded',
}

const TButton = {
  // baseClass: 'border block rounded inline-flex items-center justify-center',
  baseClass: 'rounded-lg border block inline-flex items-center justify-center',
  // primaryClass: 'text-white bg-blue-500 border-blue-500 hover:bg-blue-600 hover:border-blue-600',
  primaryClass: 'text-white bg-purple-500 border-purple-500 hover:bg-purple-600 hover:border-purple-600',
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

Vue.use(VueTailwind, {
  theme: MyOwnTheme
})
```

Another option is to set the settings directly, check at this example:

```js {4,5,6,11}
import Vue from 'vue'
import VueTailwind from 'vue-tailwind'

const TInput = {
  baseClass: 'border-2 border-blue-500 block w-full rounded',
}
// Or create a separate file like `src/themes/default/TInput.js` and import it
// import TInput from './myOwnTInput'
Vue.use(VueTailwind, {
  theme: {
    TInput
  }
})
// Or why not define the settings inline:
Vue.use(VueTailwind, {
  theme: {
    baseClass: 'border-2 border-blue-500 block w-full rounded',
  }
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

## What's next?

The idea is to create a big set of common components using the same philosophy: Configurable elements that could be adapted to your project style:

For now, these are the comp (subject to change).

**Basic inputs**
- [x] Text input(https://vue-tailwind.com/components/input.html)
- [x] Textarea(https://vue-tailwind.com/components/textarea.html)
- [x] Select(https://vue-tailwind.com/components/select.html)
- [x] Radio(https://vue-tailwind.com/components/radio.html)
- [x] Radio Group(https://vue-tailwind.com/components/radio-group.html)
- [x] Button(https://vue-tailwind.com/components/button.html)
- [x] Checkbox(https://vue-tailwind.com/components/checkbox.html)
- [x] Checkbox Group(https://vue-tailwind.com/components/checkbox-group.html)
- [ ] File input

**Rich inputs**
- [ ] [In Progress] Rich Select (tagging, autocomplete, remote data sets, etc.)  
- [ ] Date/Time Picker
- [ ] Rich file input (drop, multiupload, progress bar, etc)

**Components**
- [x] [Alert](https://vue-tailwind.com/components/alert.html)
- [x] [Card](https://vue-tailwind.com/components/card.html)
- [x] [Dropdown](https://vue-tailwind.com/components/dropdown.html)
- [x] [InputGroup](https://vue-tailwind.com/components/input-group.html.html)
- [x] __NEW__ [Table](https://vue-tailwind.com/components/table.html)
- [x] __NEW__ [Pagination](https://vue-tailwind.com/components/pagination.html)
- [ ] [In Progress] Pagination Nav
- [ ] [In Progress] Dialogs
- [ ] [In Progress] Modal
- [ ] Tooltip
- [ ] Progress bar

**More features**
- [ ] Table filter, pagination & sorting
- *Send your feature requests*

**More**

- Once we have a reasonable amount of components I'm also planning:
  - Create some more default themes
  - Improve the documentation with better playgrounds
  - Create a theme editor. (And maybe a "submit your theme" page)
  - Add more features to the components

_Made with love by [@alfonsobries](https://twitter.com/alfonsobries)_
