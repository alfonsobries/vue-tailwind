---
title: Input Group
lang: en-US
---

# Input Group

## Playground

<input-group-playground />

## Basic example

```html
<t-input-group
  label="Password"
  feedback="Password must be at least 6 characters long"
>
  <t-input
    value="password"
    type="password"
  />
</t-input-group>
```

## Props

| Property        | Type             | Default value                                   | Accepted values                                              |
| --------------- | ---------------- | ----------------------------------------------- | ------------------------------------------------------------ |
| label           | String           | null                                            | _Any valid type_                                             |
| description     | String           | null                                            | _Any valid type_                                             |
| feedback        | String           | null                                            | _Any valid type_                                             |
| orderedElements | Array            | ['label', 'default', 'feedback', 'description'] | The same array in the order you want to the elements to be render |
| status          | String / Boolean | null                                            | true, false, 'success', 'error', 'warning'                   |

## Classes related props

| Property                             | Description                                                  |
| ------------------------------------ | ------------------------------------------------------------ |
| baseClass                            | Base input group wrapper class                               |
| statusClass                          | An {Object} with the classes according to the different status: |
| statusClass.{statusName}.label       | Label classes                                                |
| statusClass.{statusName}.body        | Body classes                                                 |
| statusClass.{statusName}.feedback    | Feedback message classes                                     |
| statusClass.{statusName}.description | Description  classes                                         |

## Default theme settings

<<< @/src/themes/default/TInputGroup.js

* Remember that in order to change the default settings you can [change default theme](/#_2-2-or-better-yet-create-your-own-theme) or use the props: 
```vue
<t-input-group label="Your full name" :status-class="{
  default: {
    label: 'block font-bold text-sm text-purple-700',
  }
}">
  <t-input />
</t-input-group>
```

### The result:

<t-card class="mt-2 bg-gray-100">
<t-input-group label="Your full name" :status-class="{
  default: {
    label: 'block font-bold text-sm text-purple-700',
  }
}">
  <t-input></t-input>
</t-input-group>
</t-card>

