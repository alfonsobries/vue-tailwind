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

## What's new in version 1.x

- Rebuilt from scratch in Typescript
- Small bundle size and less dependencies
- A better way to import only selected components
- Unlimited variants and an easy way to configure them

## What's next?

- I'm working in a time picker feature for the Datepicker component
- Toast notifications, autocomplete, and more...

#### Plans for the upcoming v2.x

- Install only the components you need for smaller bundle size
- Custom name for components
- And my favorite so far: the ability to install the same component multiple times with different default settings and name
 
Example of the coming up config file _(the syntax probably will change for the final version)_:

```js
{
  //...
  't-title': {
    component: TTag,
     props: {
       tagName: 'h1',
       classes: 'font-5xl font-semibold'
     }
   },
  't-subtitle': {
    component: TTag,
    props: {
      tagName: 'h2',
      classes: 'font-3xl font-semibold'
    }
  },
  't-timepicker': {
    component: TDatepicker,
    props: {
      time: true,
      format: 'H:i:S',
      userFormat: 'H:i:S',
    }
  },
  //...
}
```
   
Use your custom tag:

```html
<!-- After: <t-tag tagName="h1">Title</t-h1> -->
<t-title>Title</t-title>

<!-- After: <t-tag tagName="h2">Subtitle</t-h1> -->
<t-subtitle>Subtitle</t-subtitle>

<!-- After: <t-datepicker :time="true" format="H:i:S" userFormat="H:i:S" /> -->
<t-timepicker  />
```

[Read more →](https://www.vue-tailwind.com/docs/upcoming-changes#plans-for-the-upcoming-v2x)

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
