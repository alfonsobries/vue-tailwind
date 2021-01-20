# Vue-Tailwind 

![CI](https://github.com/alfonsobries/vue-tailwind/workflows/CI/badge.svg)

For more info, check the official site: [https://vue-tailwind.com/](https://vue-tailwind.com/).

**VueTailwind** is a set of Vue components created to be customized to adapt to your application's unique design.

### Another UI library?

Most component libraries depend on CSS frameworks with an opinionated and limited number of styles defined by the people who maintain those libraries.

Those libraries are great and make our work easy, but hey, we made a beautiful custom design, right?

### So what are the alternatives?

We can use a framework like [TailwindCss](https://tailwindcss.com) to define our style, but that will end with us writing long CSS classes repeatedly, which could quickly become unmaintainable. Also, create some components like modals, date pickers, etc., is a tricky task, and let's admit it, nobody has time for that, right?

### Best of both worlds

The **VueTailwind** components are meant to be customized with custom CSS classes that you can define when you install the library.

Plus, most component settings are configurable, so using this library is like having your personal set of components for your particular needs.

All that means that with this library, you will be able to:

- Define your components look and feel by defining custom default CSS classes.
- Add unlimited variants for every specific use case.
- Override the default value of the props according to your needs.
- Create different versions of one component with different default settings.

## Installation

### 1. Install the dependencies 

```console
npm install vue-tailwind --save
``` 

Or: 

```console
yarn add vue-tailwind
``` 

## 2. Install TailwindCSS (Optional)

This library uses TailwindCSS classes by default. Still, it should work with any CSS framework since all the CSS classes are configurable.

To install TailwindCSS follow his official documentation: [https://tailwindcss.com/docs/installation](https://tailwindcss.com/docs/installation)

#### 2.1 Add the @tailwindcss/forms plugin

The default theme of this library depends on the `@tailwindcss/forms` plugin. To use it, follow the steps on the plugin source page.
[https://github.com/tailwindlabs/tailwindcss-forms](https://github.com/tailwindlabs/tailwindcss-forms)

#### 2.1 Add variants for disabled pseudo-class

Also needed for the default theme and strongly recommended since it adds the ability to use some classes like `disabled:opacity-50 disabled:cursor-not-allowed` to disabled inputs.

See [https://tailwindcss.com/docs/configuring-variants](https://tailwindcss.com/docs/configuring-variants) on the TailwindCSS docs for more info.

As a reference, your `tailwind.config.js` may look like this:

```js
module.exports = {
  variants: {
    extend: {
      opacity: ['disabled'],
      cursor: ['disabled'],
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
```

## 3. Configure Vue to use vue-tailwind

```js
import Vue from 'vue'
import VueTailwind from 'vue-tailwind'

const components = {
  // ...You need to add the components you need here (explained above)
}

Vue.use(VueTailwind, components)
```

### 3.1 Import and install the components

```js
import Vue from 'vue'
import VueTailwind from 'vue-tailwind'

import {
  TInput,
  TTextarea,
  TSelect,
  TRadio,
  TCheckbox,
  TButton,
  TInputGroup,
  TCard,
  TAlert,
  TModal,
  TDropdown,
  TRichSelect,
  TPagination,
  TTag,
  TRadioGroup,
  TCheckboxGroup,
  TTable,
  TDatepicker,
  TToggle,
  TDialog,
} from 'vue-tailwind/dist/components';

const settings = {
  // Use the following syntax
  // {component-name}: {
  //   component: {importedComponentObject},
  //   props: {
  //     {propToOverride}: {newDefaultValue}
  //     {propToOverride2}: {newDefaultValue2}
  //   }
  // }
  't-input': {
    component: TInput,
    props: {
      classes: 'border-2 block w-full rounded text-gray-800'
      // ...More settings
    }
  },
  't-textarea': {
    component: TTextarea,
    props: {
      classes: 'border-2 block w-full rounded text-gray-800'
      // ...More settings
    }
  },
  // ...Rest of the components
}

Vue.use(VueTailwind, settings)
```

### 3.2 Alternatively, you can use the v1.0 syntax

```js
import Vue from 'vue'
// Notice that I am using a different path here:
import VueTailwind from 'vue-tailwind/dist/full'

const settings = {
  TInput: {
    classes: 'border-2 block w-full rounded text-gray-800',
    // ...More settings
  },
  TButton: {
    classes: 'rounded-lg border block inline-flex items-center justify-center',
    // ...More settings
  },
  // ...Rest of the components
}

Vue.use(VueTailwind, settings)
```

### 3.3 Or install only the components you need

```js
import Vue from 'vue'
import VueTailwind from 'vue-tailwind'

import TInput from 'vue-tailwind/dist/t-input'
import TButton from 'vue-tailwind/dist/t-button'

const settings = {
  't-input': {
    component: TInput,
    props: {
      classes: 'block w-full px-3 py-2 text-black placeholder-gray-400 transition duration-100 ease-in-out bg-white border border-gray-300 rounded shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed',
      // ...More settings
    }
  },
  't-button': {
    component: TButton,
    props: {
      classes: 'block px-4 py-2 text-white transition duration-100 ease-in-out bg-blue-500 border border-transparent rounded shadow-sm hover:bg-blue-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50  disabled:opacity-50 disabled:cursor-not-allowed',
      // ...More settings
    }
  },
}

Vue.use(VueTailwind, settings)
```

> *Note*: Using the syntax from point **3.3** is the best way to prevent a big bundle size but only if you import a couple of components. If the number of components you install increases, the recommended way to install them is to use the syntax from the points **3.1** or **3.2** to help the library reuse some code and keep the bundle size at a minimum.


[Read more →](https://www.vue-tailwind.com/docs/installation)

## Theming

To apply a custom theme you should play with the `classes`, `fixedClasses`, and `variants` props.

The `classes` and `fixedClasses` props usually expects an `string` with a CSS class for single-tag components (inputs, button, etc.) and an `object` for more complex components (modals, datepicker, etc) (see component docs for details).

The `variants` props expects an object where every key represents the variant name and every value the classes that will be used when that variant is applied.

#### Example for a single-tag component: 

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
        // A red variant of the button (applied when `<t-button variant="error" />`)
        error: 'text-white bg-red-600 hover:bg-red-500 focus:border-red-700 active:bg-red-700 text-sm font-medium border border-transparent px-3 py-2 rounded-md',
        // A green variant of the button (applied when `<t-button variant="success" />`)
        success: 'text-white bg-green-600 hover:bg-green-500 focus:border-green-700 active:bg-green-700 text-sm font-medium border border-transparent px-3 py-2 rounded-md',
        // ...unlimited variants
      }
      // ...More settings
    }
  },
}

Vue.use(VueTailwind, settings)
```

#### Example for a complex component: 

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
          // Notice that I am not defining the `closeIcon` class since we only
          // need to write the classes we want to override
        },
      }
    }
  },
}

Vue.use(VueTailwind, settings)
```

[Read more →](https://www.vue-tailwind.com/docs/theming)

## Override settings

All the components on this library have default settings added as component props according to how we understand those settings are most commonly used.

I am aware that in many cases is useful to change the default value, so you don't need to add the prop over and over when needed.

```js
import Vue from 'vue'
import VueTailwind from 'vue-tailwind'

import TDatepicker from 'vue-tailwind/dist/t-datepicker'
import TButton from 'vue-tailwind/dist/t-button'
import TModal from 'vue-tailwind/dist/t-modal'

// Locale to eventually replace the default Datepicker locale
import Spanish from 'vue-tailwind/dist/l10n/es'

const settings = {
  't-button': {
    component: TButton,
    props: {
      // classes: '...',
      // variants: '...',
      // ...
      // Originally it defaults to `undefined` that means is considered a submit
      // button if the button is inside a form.
      type: 'button',
    }
  },
  't-datepicker': {
    component: TDatepicker,
    props: {
      // classes: '...',
      // variants: '...',
      // ...
      // Originally a locale object with English values
      locale: Spanish,
    }
  },
  't-modal': {
    component: TModal,
    props: {
      // classes: '...',
      // variants: '...',
      // ...
      // Originally `true`
      escToClose: false,
    }
  },
}

Vue.use(VueTailwind, settings)
```

You can also use this feature to create different versions of the same component.

```js
import Vue from 'vue'
import VueTailwind from 'vue-tailwind'

import TButton from 'vue-tailwind/dist/t-button'
import TTag from 'vue-tailwind/dist/t-tag'

const settings = {
  // What about one <t-button /> for normal button and a `<t-submit />` for a submit button
  't-button': {
    component: TButton,
    props: {
      type: 'button',
    }
  },
  't-submit': {
    component: TButton,
    props: {
      type: 'submit',
    }
  },
  // I love this use case for the TTag component and will let you guess what
  // is doing: 👇
  'blog-title': { // Used like <blog-title>Title of a blog post</blog-title>
    component: TTag,
    props: {
      tag: 'h1',
      classes: 'font-semibold text-xl leading-6',
    }
  },
  'blog-subtitle': { // Used like <blog-title>subtitle of a blog post</blog-title>
    component: TTag,
    props: {
      tag: 'h2',
      classes: 'font-semibold text-xl leading-6',
    }
  },
  't-link': { // Used like <t-link href="">Open site</t-link>
    component: TTag,
    props: {
      tag: 'a',
      classes: 'text-blue-500 underline hover:text-blue-600',
    }
  }
}

Vue.use(VueTailwind, settings)
```

[Read more →](https://www.vue-tailwind.com/docs/settings)

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

[Read more →](https://www.vue-tailwind.com/docs/workflow)

## What's new in version 2.x

- Install only the components you need for smaller bundle size
- Custom name for components
- The ability to install the same component multiple times with different default settings and name
- New default theme

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
