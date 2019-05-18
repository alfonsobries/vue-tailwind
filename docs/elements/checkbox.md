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
| model (v-model)    | String / Object / Number / Boolean   | null   | _Any valid type_ |
| value (input value)    | String / Object / Number / Boolean   | 'on'   | _Any valid type_ |
| checked    | Boolean / String    | false   | true, false, 'checked' |

### Events

| Event   | Arguments                   | Description   |
|---      |---                          |---      |
| input   | String (The current value of the select)  | Emitted every time the value of the `v-model` change |
| change  | String (The current value of the select)  | Emitted when the select is blurred and the value was changed since it was focused |
| focus   | FocusEvent                  | Emitted when the select is focused  |
| blur    | FocusEvent                  | Emitted when the select is blurred  |

### Custom styles

¿What if you need some custom radio buttons? Of course you can do it, but you will need to define some styles, check at this example:

<custom-radio-field />

```css
/** <t-radio class="rich-radio" /> */
.rich-radio input[type=radio]:checked,
.rich-radio input[type=radio]:not(:checked) {
    position: absolute;
    left: -9999px;
}
.rich-radio input[type=radio]:checked + label,
.rich-radio input[type=radio]:not(:checked) + label
{
    position: relative;
    padding-left: 30px;
    cursor: pointer;
    line-height: 26px;
    display: inline-block;
}
.rich-radio input[type=radio]:checked + label:before,
.rich-radio input[type=radio]:not(:checked) + label:before {
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
.rich-radio input[type=radio]:checked + label:after,
.rich-radio input[type=radio]:not(:checked) + label:after {
    content: '';
    width: 18px;
    height: 18px;
    background: #3490dc;
    position: absolute;
    top: 4px;
    left: 4px;
    border-radius: 100%;
    -webkit-transition: all 0.2s ease;
    transition: all 0.2s ease;
}

.rich-radio input[type=radio]:not(:checked) + label:after {
    opacity: 0;
    -webkit-transform: scale(0);
    transform: scale(0);
}
.rich-radio input[type=radio]:checked + label:after {
    opacity: 1;
    -webkit-transform: scale(1);
    transform: scale(1);
}

/** By status */
.rich-radio.t-radio-status-error input[type=radio]:checked + label:after,
.rich-radio.t-radio-status-error input[type=radio]:not(:checked) + label:after {
  background: #e3342f;
}
.rich-radio.t-radio-status-success input[type=radio]:checked + label:after,
.rich-radio.t-radio-status-success input[type=radio]:not(:checked) + label:after {
  background: #38c172;
}
.rich-radio.t-radio-status-warning input[type=radio]:checked + label:after,
.rich-radio.t-radio-status-warning input[type=radio]:not(:checked) + label:after {
  background: #f2d024;
}
```       
