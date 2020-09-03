# Vue-Tailwind 

![CI](https://github.com/alfonsobries/vue-tailwind/workflows/CI/badge.svg)

For more info check the official site: [https://vue-tailwind.com/](https://vue-tailwind.com/)

**VueTailwind** is a set of Vue components created to be customized to adapt to the unique design of your application.


### Built to be customized

When you work on a real-world application, you usually need different variants for every component your app uses; you may need (besides of default style of your text input) a specific style for a search input inside a navbar and another one for the contact form, and we are not talking yet about the different states that your input could have.

All **VueTailwind** components were designed to be customized with custom CSS classes and unlimited variants defined when you import the library or when you use the component.

This means that when you use this library, you are not attached to any style defined by us like it happens when you use a typical library of components like Bootstrap. Instead, you can determine your theme based on your application's needs.

This library makes special sense when you work with utility-first frameworks like [TailwindCss](https://tailwindcss.com), which is the default framework used in this library.

## Installation

### 1. Install the dependencies 

```console
npm install vue-tailwind --save
``` 

Or: 

```console
yarn add vue-tailwind
``` 

### 2. Configure your project to use `vue-tailwind` 


```js
import Vue from 'vue'
import VueTailwind from 'vue-tailwind'

const settings = {
  //...
}

Vue.use(VueTailwind, settings)
```

#### Apply your own theme:

Let's say, for example, that for the specific needs of your project the text inputs should have a `blue two width border`, the buttons should have `rounded borders` and you need a secondary button that should be `purple`.

Considering those needs define objects with the desired classes for every component, a good approach is to create a file where you define the template:

```js
const TInput = {
  classes: 'border-2 block w-full rounded text-gray-800',
  // Optional variants
  variants: {
    // ...
  },
  // Optional fixedClasses
  // fixedClasses: '',
}

const TButton = {
  classes: 'rounded-lg border block inline-flex items-center justify-center',
  variants: {
    secondary: 'rounded-lg border block inline-flex items-center justify-center bg-purple-500 border-purple-500 hover:bg-purple-600 hover:border-purple-600',
  },
  // Optional fixedClasses
  // fixedClasses: 'transform ease-in-out duration-100',
}

const settings = {
  TInput,
  TButton,
}

export default settings
```

Then you can import your theme and add it as a parameter when you install VueTailwind:

```js {3,6}
import Vue from 'vue'
import VueTailwind from 'vue-tailwind'
import settings from './settings.js'

Vue.use(VueTailwind, settings)
```

Or just define the settings directly:

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
    classes: 'border-2 border-blue-500 block w-full rounded',
  }
})
```

#### Override the default settings (1.2.0+)

Let's say that some default values of the component are not the best for your specific project needs and you see yourself setting the props over and over every time you use the component.

With this library, you can override the default settings when installing the library.

For example, maybe you want:

- That all the button components have the `type="button"` attribute (I do myself change that).
- Change the default localization settings for a DatePicker.
- Make all the alert not `dismissible` by default.
- Don't allow the Modal to be closed by pressing `ESC` as default.

You can also override the default values of the props for every component using the same syntax you use for the classes:

So let's try the goal explained above:

```js
// Locale to eventually replace the default datepicker locale
import Spanish from 'vue-tailwind/dist/l10n/es'

const settings = {
  TButton: {
    // classes: '...',
    // ...
    // Originally it defaults to `undefined` that means is considered a submit
    // button if the button is inside a form.
    type: 'button',
  },
  TDatepicker: {
    // classes: '...',
    // ...
    // Originally a locale object with English values
    locale: Spanish,
  },
  TAlert: {
    // classes: '...',
    // ...
    // Originally `true`
    dismissible: false,
  },
  TModal: {
    // classes: '...',
    // ...
    // Originally `true`
    escToClose: false,
  },
  
}

Vue.use(VueTailwind, settings)
```


## Quick start

Here is a small example of how the classes and variants are defined when you import this library:

```js
import Vue from 'vue'
import VueTailwind from 'vue-tailwind'

const settings = {
  TInput: {
    classes: 'form-input border-2 text-gray-700',
    variants: {
      error: 'form-input border-2 border-red-300 bg-red-100',
      // ... Infinite variants
    }
  },
  TAlert: {
    classes: {
      wrapper: 'rounded bg-blue-100 p-4 flex text-sm border-l-4 border-blue-500',
      body: 'flex-grow text-blue-700',
      close: 'text-blue-700 hover:text-blue-500 hover:bg-blue-200 ml-4 rounded',
      closeIcon: 'h-5 w-5 fill-current'
    },
    variants: {
      danger: {
        wrapper: 'rounded bg-red-100 p-4 flex text-sm border-l-4 border-red-500',
        body: 'flex-grow text-red-700',
        close: 'text-red-700 hover:text-red-500 hover:bg-red-200 ml-4 rounded'
      },
      // ... Infinite variants
    }
  },
  // ... The rest of the components
}

Vue.use(VueTailwind, settings)
```

The default classes and variants can also be defined in the component props:

```html
<t-input
  :classes="form-input border-2 text-gray-700"
  :variants="{
    error: 'form-input border-2 border-red-300 bg-red-100',
    success: 'form-input border-2 border-green-300 bg-green-100'
  }"
/>
```

To apply an specific variant you just need to use the `variant` prop:

```html
<t-input variant="error" />
```

The variant prop also accepts an object that takes the first attribute with a _truthy_ value

```html
<t-input
  :variant="{
    error: inputIsNotValid,
    success: inputIsValid,
  }"
/>
```

## What's new in version 1.x

- Rebuilt from scratch in Typescript
- Small bundle size and less dependencies
- A better way to import only selected components
- Unlimited variants and an easy way to configure them

## What's next?

- I'm working in a time picker feature for the Datepicker component
- Also working in a Dialog component inspired in the [Sweetalert library](https://sweetalert2.github.io/) 
- Vue 3 compatibility and more plans for v2.x. [Read more →](https://www.vue-tailwind.com/docs/upcoming-changes)

## Contribute

Is this project helpful for you? Consider sponsoring me [https://github.com/sponsors/alfonsobries](https://github.com/sponsors/alfonsobries).

Of course, any other kind help is welcome, even if you notice some grammar mistakes (English is not my primary language) see [contribute page](https://vue-tailwind.com/contribute) for details.

### Changelog

Please see [CHANGELOG](https://github.com/alfonsobries/vue-tailwind/blob/master/CHANGELOG.md) for more information what has changed recently.

### Security

If you discover any security related issues, please email alfonso@vexilo.com instead of using the issue tracker.

## Credits

- [Alfonso Bribiesca](https://github.com/alfonsobries)
- [All Contributors](https://github.com/alfonsobries/vue-tailwind/contributors)

## License

The MIT License (MIT). Please see [License File](https://github.com/alfonsobries/vue-tailwind/blob/master/LICENSE) for more information.

_Made with love by [@alfonsobries](https://twitter.com/alfonsobries)_


[Version 0.x docs](https://v0.vue-tailwind.com/).
