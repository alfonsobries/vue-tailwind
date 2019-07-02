---
title: File Input
lang: en-US
---

# File input

## Playground

<file-input />

## Basic example

```html
<t-file-input v-model="model" name="my-input" />
```

## Events

| Event   | Arguments                   | Description   |
|---    |---                      |---      |
| input   | FileList | Emitted every time the value of the `v-model` change. [more details](https://developer.mozilla.org/fr/docs/Web/HTML/Element/Input/file#files) |
| error   | Array | Emitted every time the value has error |

## Props

| Property    | Type        | Default value | Accepted values |
|---          |---          |---      |--- |
| id          | String      | null      | _Any valid type_ |
| disabled    | Boolean     | false     | _Any valid type_ |
| multiple    | Boolean     | false     | _Any valid type_ |
| accept    | String     | null     | [see valid values](https://developer.mozilla.org/fr/docs/Web/HTML/Element/Input/file#accept) |
| max       | String / Number | 10      | _Any valid type_ |
| maxSize       | String / Number | 2MB      | _Any valid type_ |
| name        | String      | null      | _Any valid type_ |
| tabindex    | String / Number | null      | _Any valid type_ |
| value       | String / Number | null      | _Any valid type_ |
| variant        | String      | undefined      | 'primary', 'secondary', 'tertiary', 'danger', 'warning', 'success' |
| size        | String      | undefined      | 'sm', 'lg' |

## Classes related props

| Property          | Description                       |
|---                |---                            |
| baseClass         | Base input class (never changes)                      |
| defaultClass      | Classes for the default input variant   |
| primaryClass      | Classes for the primary input variant   |
| secondaryClass    | Classes for the secondary input variant   |
| tertiaryClass     | Classes for the tertiary input variant   |
| successClass      | Classes for the success input variant   |
| dangerClass       | Classes for the danger input variant   |
| warningClass      | Classes for the warning input variant   |
| disabledClass     | Classes for the disabled input variant (Added to the variant) |
| defaultSizeClass  | Classes for the default size input (Added to the variant) |
| largeSizeClass    | Classes for the large size input (Added to the variant) |
| smallSizeClass    | Classes for the small size input (Added to the variant) |


## Default theme settings

<<< @/src/themes/default/TFileInput.js

* Remember that in order to change the default settings you can [change default theme](/#_2-2-or-better-yet-create-your-own-theme) or use the props: 

<<< @/docs/.vuepress/components/FileInputCustom.vue

### The result:

<t-card class="mt-2 bg-white">
<file-input-custom />
</t-card>


