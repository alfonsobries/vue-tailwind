# Vue-Tailwind 

![CI](https://github.com/alfonsobries/vue-tailwind/workflows/CI/badge.svg)

For more info check the official site: [https://vue-tailwind.com/](https://vue-tailwind.com/)

**VueTailwind** is a set of Vue components created to be customized to adapt to the unique design of your application.

### Another UI library?

Most component libraries depend on CSS frameworks with an opinionated and limited number of styles defined by the people who maintain those libraries. Those libraries are great and make our work easy, but hey, we made a beautiful custom design, right?

### So what are the alternatives?

We can use a framework like [TailwindCss](https://tailwindcss.com) to define our style, but that will end with us writing long CSS classes repeatedly, which could quickly become unmaintainable. Also, create some components like modals, date pickers, etc., is a tricky task, and let's admit it, nobody has time for that, right? 

### Best of both worlds

The VueTailwind components are meant to be customized with custom CSS classes that you can define when you install the library.

Plus, most component settings are configurable, so using this library is like having your set components for your particular needs.

Define your components' look and feel by defining custom default CSS classes.
- Add unlimited variants for every specific use case.
- Override the default value of the props according to your needs.
- Create different versions of one component but with different default settings.

## Installation

### 1. Install the dependencies 

```console
npm install vue-tailwind@next --save
``` 

Or: 

```console
yarn add vue-tailwind@next
``` 

### 2. Configure your project to use `vue-tailwind` 

```js
import Vue from 'vue'
import VueTailwind from 'vue-tailwind'

const components = {
  //...
}

Vue.use(VueTailwind, components)
```

## 2.1 Add the components you need with his settings

```js
import Vue from 'vue'
import VueTailwind from 'vue-tailwind'
import TInput from 'vue-tailwind/dist/t-input'
import TButton from 'vue-tailwind/dist/t-button'
import TModal from 'vue-tailwind/dist/t-modal'

const settings = {
  't-input': {
    component: TInput,
    props: {
      classes: 'border-2 block w-full rounded text-gray-800'
      // ...More settings
    }
  },
  't-button': {
    component: TButton,
    props: {
      classes: 'rounded-lg border block inline-flex items-center justify-center'
      // ...More settings
    }
  },
  't-modal': {
    component: TModal,
    props: {
      classes: {
        body: 'bg-white p-3',
        header: 'p-3',
        footer: 'p-3 border-t'
      }
      // ...More settings
    }
  }

}

Vue.use(VueTailwind, settings)
```

## Theming

To apply a custom theme you should use the `classes`, `fixedClasses`, and `variants` props.

The `classes` and `fixedClasses` props usually expects an `string` with a CSS class for single-tag components (inputs, button, etc.) and an `object` for more complex components (modals, datepicker, etc) (see every the component docs for detais).

The `variants` props expects an object where every key represents the variant name and every value the classes that will be used when that variant is used.

Example for a single-tag compnent: 

```js
import Vue from 'vue'
import VueTailwind from 'vue-tailwind'
import TButton from 'vue-tailwind/dist/t-button'

const settings = {
  't-button': {
    component: TButton,
    props: {
      // The fixed classes will never change and will be merged with the `classes` value or the active variant
      fixedClasses: 'focus:outline-none focus:shadow-outline inline-flex items-center transition ease-in-out duration-150',
      // Classes used when any variant is active
      classes: 'text-white bg-blue-600 hover:bg-blue-500 focus:border-blue-700 active:bg-blue-700 text-sm font-medium border border-transparent px-3 py-2 rounded-md',
      variants: {
        // A red variant of the button (applied when variant="error")
        error: 'text-white bg-red-600 hover:bg-red-500 focus:border-red-700 active:bg-red-700 text-sm font-medium border border-transparent px-3 py-2 rounded-md',
        // A green variant of the button (applied when variant="success")
        success: 'text-white bg-green-600 hover:bg-green-500 focus:border-green-700 active:bg-green-700 text-sm font-medium border border-transparent px-3 py-2 rounded-md',
        // ...unlimited variants
      }
      // ...More settings
    }
  },
}

Vue.use(VueTailwind, settings)
```

Example for a complex compnent: 

```js
import Vue from 'vue'
import VueTailwind from 'vue-tailwind'
import TAlert from 'vue-tailwind/dist/t-alert'

const settings = {
  't-alert': {
    component: TAlert,
    props: {
      // The fixed classes will never change and will be merged with the `classes` value or the active variant
      fixedClasses: {
        wrapper: 'rounded p-4 flex text-sm border-l-4',
        body: 'flex-grow',
        close: 'ml-4 rounded',
        closeIcon: 'h-5 w-5 fill-current'
      },
      classes: {
        wrapper: 'bg-blue-100 border-blue-500',
        body: 'text-blue-700',
        close: 'text-blue-700 hover:text-blue-500 hover:bg-blue-200',
        closeIcon: 'h-5 w-5 fill-current'
      },
      variants: {
        danger: {
          wrapper: 'bg-red-100 border-red-500',
          body: 'text-red-700',
          close: 'text-red-700 hover:text-red-500 hover:bg-red-200'
          // Notice that I am not defining the `closeIcon` classes since they dont need
          // to change within variants.
        },
      }
    }
  },
}

Vue.use(VueTailwind, settings)
```


## Workflow

Once your different variants were defined you can use the `variant` prop to define which variant should be applied:

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

## What's new in version 2.x

- Install only the components you need for smaller bundle size
- Custom name for components
- The ability to install the same component multiple times with different default settings and name

#### Plans for v3.x

- Rebuild with Vue 3
- Multiple typescript improvements
- Stronger test coverage
- Accesibility first
- New Branding

[Read more →](https://www.vue-tailwind.com/docs/upcoming-changes#plans-for-version-3x)

## Contribute

Is this project helpful for you? Consider sponsoring me [https://github.com/sponsors/alfonsobries](https://github.com/sponsors/alfonsobries).

Of course, any other kind help is welcome, even if you notice some grammar mistakes (English is not my primary language) see [contribute page](https://vue-tailwind.com/contribute) for details.

### Changelog

Please see [Release notes](https://vue-tailwind.com/docs/release-notes) for more information about what was changed recently.

### Security

If you discover any security related issues, please email alfonso@vexilo.com instead of using the issue tracker.

## Credits

- [Alfonso Bribiesca](https://github.com/alfonsobries)
- [All Contributors](https://github.com/alfonsobries/vue-tailwind/contributors)

## License

The MIT License (MIT). Please see [License File](https://github.com/alfonsobries/vue-tailwind/blob/master/LICENSE) for more information.

_Made with love by [@alfonsobries](https://twitter.com/alfonsobries)_


[Version 0.x docs](https://v0.vue-tailwind.com/).
