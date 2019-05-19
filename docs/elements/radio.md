---
title: Radio
lang: en-US
---

# Radio

<radio-field />

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
| model (v-model)    | String / Object / Number / Boolean   | null   | _Any valid type_ |
| value (input value)    | String / Object / Number / Boolean   | 'on'   | _Any valid type_ |
| checked    | Boolean / String    | false   | true, false, 'checked' |

### Classes related attributes / props

The radio buttons doesnt accept a lot of styles so you can only define the baseClass.

| Property        | Description                                                         |
|---                    |---                                                            |
| baseClass             | Base radio button class                                       |

### Events

| Event   | Arguments                   | Description   |
|---      |---                          |---      |
| input   | String (The current value of the select)  | Emitted every time the value of the `v-model` change |
| change  | String (The current value of the select)  | Emitted when the select is blurred and the value was changed since it was focused |
| focus   | FocusEvent                  | Emitted when the select is focused  |
| blur    | FocusEvent                  | Emitted when the select is blurred  |

### Custom styles

What if you need some custom radio buttons? Of course you can do it, you can use the status classes in the input to define some styles, check at this example:

<custom-radio-field />

```css
/** <t-radio class="rich-radio" /> */
input.custom-radio:checked,
input.custom-radio:not(:checked) {
  position: absolute;
  left: -9999px;
}
input.custom-radio:checked + label,
input.custom-radio:not(:checked) + label
{
  position: relative;
  padding-left: 30px;
  cursor: pointer;
  line-height: 26px;
  display: inline-block;
}
input.custom-radio:checked + label:before,
input.custom-radio:not(:checked) + label:before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 26px;
  height: 26px;
  border: 1px solid #dae1e7;
  border-radius: 100%;
  background: #fff;
}
input.custom-radio:checked + label:after,
input.custom-radio:not(:checked) + label:after {
  content: '';
  width: 18px;
  height: 18px;
  background: #4299e1;
  position: absolute;
  top: 4px;
  left: 4px;
  border-radius: 100%;
  -webkit-transition: all 0.2s ease;
  transition: all 0.2s ease;
}

input.custom-radio:not(:checked) + label:after {
  opacity: 0;
  -webkit-transform: scale(0);
  transform: scale(0);
}
input.custom-radio:checked + label:after {
  opacity: 1;
  -webkit-transform: scale(1);
  transform: scale(1);
}

input.custom-radio.t-radio-disabled + label:after {
  opacity: 0.5;
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
