---
title: Modal
lang: en-US
---

# Modal

## Playground

<modal-playground />

## Props

| Property         | Type    | Default value | Accepted values                                             | Description                       |
| ---------------- | ------- | ------------- | ----------------------------------------------------------- | --------------------------------- |
| variant          | String  | null          | 'info', 'danger', 'warning', 'success'                              | Alert variant                     |
| tagName          | String  | div           | Any vaild HTML                                              | the tag used as wrapper           |
| dismissible      | Boolean | true          | true, false                                                 | If the alert is dismissible       |
| show             | Boolean | false         | true, false                                                 | If the alert should be shown      |
| timeout          | Number  | null          | Any number                                                  | Time in milliseconds before the alert should be auto hidden |                                   |
| closeButtonTitle | String  | 'Close'       | true, false                                                 | The title tag in the close button |

## Classes related props

| Property         | Description                           |
| ---------------- | ------------------------------------- |
| baseClass        | Base alert class (never changes)      |
| defaultClass     | Classes for the default alert variant |
| successClass     | Classes for the success alert variant |
| dangerClass      | Classes for the danger alert variant  |
| warningClass     | Classes for the warning alert variant |
| closeButtonClass | Classes for the close button          |
| closeIconClass   | Classes for the close SVG icon        |

## Events

| Event  | Arguments | Description                     |
| ------ | --------- | ------------------------------- |
| shown  | -         | Emitted when the alert is shown |
| hidden | -         | Emitted when alert is hidden    |

## Slots

| Slot   | description
|---    |---                      |
| default   |  Content of the alert| 
| close   |  Content of the dismissable button | 

## Default theme settings

<<< @/src/themes/default/TAlert.js

- Remember that in order to change the default settings you can [change default theme](/#_2-2-or-better-yet-create-your-own-theme) or use the props: 

```vue
<t-alert
  base-class="border px-4 py-3 rounded relative"
  danger-class="bg-red-100 border-red-400 text-red-700"
  variant="danger"
  show
>
<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem possimus nihil minus rerum aperiam, quidem, reprehenderit! Atque, facere inventore nam suscipit, excepturi nesciunt incidunt, explicabo error molestiae iure optio enim.</p>
</t-alert>
```

### The result:

<t-card class="mt-2 bg-gray-100">
<t-alert
  base-class="border px-4 py-3 rounded relative"
  danger-class="bg-red-100 border-red-400 text-red-700"
  variant="danger"
  show
>
<p><strong>Error:</strong> Are you sure do you want to keep using Bootstrap?</p>
</t-alert>
</t-card>