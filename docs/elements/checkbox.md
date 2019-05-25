---
title: Checkbox
lang: en-US
---

# Checkbox

<checkbox-field />

### Attributes / props

| Property    | Type        | Default value | Accepted values |
|---      |---        |---      |---      |
| id      | String      | null      | _Any valid type_ |
| autofocus   | Boolean     | false     | _Any valid type_ |
| disabled    | Boolean     | false     | _Any valid type_ |
| name      | String      | null      | _Any valid type_ |
| tabindex    | String / Number | null      | _Any valid type_ |
| readonly    | Boolean     | undefined   | _Any valid type_ |
| required    | Boolean     | false     | _Any valid type_ |
| model (v-model)    | String / Object / Number / Boolean / Array   | null   | _Any valid type_ |
| value (input value)    | String / Object / Number / Boolean / Array   | true   | _Any valid type_ |
| uncheckedValue (input value)    | String / Object / Number / Boolean / Array   | false   | _Any valid type_ |
| checked    | Boolean | false   | true, false |
| indeterminate    | Boolean | false   | true, false |

### Events

| Event   | Arguments                   | Description   |
|---      |---                          |---      |
| input   | String (The current value of the checkbox)  | Emitted every time the value of the `v-model` change |
| change  | String (The current value of the checkbox)  | Emitted when the checkbox is blurred and the value was changed since it was focused |
| focus   | FocusEvent                  | Emitted when the checkbox is focused  |
| blur    | FocusEvent                  | Emitted when the checkbox is blurred  |

### Custom styles

¿What if you need some custom checkbox? You can do it, but you will need to define some styles, check at this example:

<custom-checkbox-field />

```css
/** <t-checkbox class="custom-checkbox" /> */
input.custom-checkbox:checked,
input.custom-checkbox:not(:checked) {
  @apply absolute;
  left: -9999px;
}
input.custom-checkbox:checked + label,
input.custom-checkbox:not(:checked) + label
{
  @apply relative pl-8 cursor-pointer leading-normal inline-block;
}
input.custom-checkbox:checked + label:before,
input.custom-checkbox:not(:checked) + label:before {
  @apply absolute border border-gray-400 top-0 left-0 w-6 h-6 bg-white;
  content: '';
}
input.custom-checkbox:checked + label:after,
input.custom-checkbox:not(:checked) + label:after {
  @apply top-0 left-0 absolute flex items-center justify-center w-6 h-6 text-blue-500 font-bold text-xl;
  content: '\2713\0020';
  transition: all 0.2s ease;
}

input.custom-checkbox:not(:checked) + label:after {
  @apply opacity-0;
  transform: scale(0);
}
input.custom-checkbox:checked + label:after {
  @apply opacity-100;
  transform: scale(1);
}

input.custom-checkbox.t-checkbox-disabled + label:after {
  @apply opacity-50;
}

/** By status */
input.custom-checkbox.t-checkbox-status-error:checked + label:after,
input.custom-checkbox.t-checkbox-status-error:not(:checked) + label:after {
  @apply text-red-500
}
input.custom-checkbox.t-checkbox-status-success:checked + label:after,
input.custom-checkbox.t-checkbox-status-success:not(:checked) + label:after {
   @apply text-green-500
}
input.custom-checkbox.t-checkbox-status-warning:checked + label:after,
input.custom-checkbox.t-checkbox-status-warning:not(:checked) + label:after {
  @apply text-yellow-500
}
```       
