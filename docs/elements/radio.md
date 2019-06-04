---
title: Radio
lang: en-US
---

# Radio

## Playground

<radio-field />

## Basic example

```html
<label
  v-for="(option, index) in options"
  :for="`${id}-${index}`"
  class="flex py-1"
>
  <t-radio
    :key="option.value"
    :id="`${id}-${index}`"
    v-model="model"
    :name="name"
    :value="option.value"
  />
  <span class="ml-3">{{ option.text }}</span>
</label>
```

## Props

| Property    | Type        | Default value | Accepted values |
|---      |---        |---      |---      |
| id      | String      | null      | _Any valid type_ |
| autofocus   | Boolean     | false     | _Any valid type_ |
| disabled    | Boolean     | false     | _Any valid type_ |
| name      | String      | null      | _Any valid type_ |
| tabindex    | String / Number | null      | _Any valid type_ |
| readonly    | Boolean     | undefined   | _Any valid type_ |
| required    | Boolean     | false     | _Any valid type_ |
| model (v-model)    | String / Object / Number / Boolean   | null   | _Any valid type_ |
| value (input value)    | String / Object / Number / Boolean   | 'on'   | _Any valid type_ |
| checked    | Boolean / String    | false   | true, false, 'checked' |

## Classes related props

The radio buttons doesnt accept a lot of styles so you can only define the baseClass.

| Property        | Description                                                         |
|---                    |---                                                            |
| baseClass             | Base radio button class                                       |

## Events

| Event   | Arguments                   | Description   |
|---      |---                          |---      |
| input   | String (The current value of the radio)  | Emitted every time the value of the `v-model` change |
| change  | String (The current value of the radio)  | Emitted when the radio is blurred and the value was changed since it was focused |
| focus   | FocusEvent                  | Emitted when the radio is focused  |
| blur    | FocusEvent                  | Emitted when the radio is blurred  |

## Custom styles

What if you need some custom radio buttons? Of course we can do it but for now we will need to define some CSS, check at this example:

<custom-radio-field />

```css
/** <t-radio class="custom-radio" /> */
input.custom-radio:checked,
input.custom-radio:not(:checked) {
  @apply absolute;
  left: -9999px;
}
input.custom-radio:checked + label,
input.custom-radio:not(:checked) + label
{
  @apply relative pl-8 cursor-pointer leading-normal inline-block;
}
input.custom-radio:checked + label:before,
input.custom-radio:not(:checked) + label:before {
  @apply rounded-full absolute border border-gray-400 top-0 left-0 w-6 h-6 bg-white;
  content: '';
}
input.custom-radio:checked + label:after,
input.custom-radio:not(:checked) + label:after {
  @apply w-4 h-4 top-0 left-0 m-1 bg-blue-500 absolute rounded-full;
  content: '';
  transition: all 0.2s ease;
}

input.custom-radio:not(:checked) + label:after {
  @apply opacity-0;
  transform: scale(0);
}
input.custom-radio:checked + label:after {
  @apply opacity-100;
  transform: scale(1);
}

input.custom-radio.t-radio-disabled + label:after {
  @apply opacity-50;
}

/** By status */
input.custom-radio.t-radio-status-error:checked + label:after,
input.custom-radio.t-radio-status-error:not(:checked) + label:after {
  @apply bg-red-500
}
input.custom-radio.t-radio-status-success:checked + label:after,
input.custom-radio.t-radio-status-success:not(:checked) + label:after {
   @apply bg-green-500
}
input.custom-radio.t-radio-status-warning:checked + label:after,
input.custom-radio.t-radio-status-warning:not(:checked) + label:after {
  @apply bg-yellow-500
}
```       
