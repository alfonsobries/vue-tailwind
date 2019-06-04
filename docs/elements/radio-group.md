---
title: Radio Group
lang: en-US
---

# Radio Group

## Playground

<radio-group-field />

## Basic example

```html
<t-radio-group
  v-model="model"
  name="radio-group"
  :options="[
    { value: 1, text: 'Option 1' },
    { value: 2, text: 'Option 2' }
  ]"
/>
```

## Props

| Property    | Type        | Default value | Accepted values |
|---      |---        |---      |---      |
| id      | String      | null      | _Any valid type_ |
| disabled    | Boolean     | false     | _Any valid type_ |
| name      | String      | null      | _Any valid type_ |
| required    | Boolean     | false     | _Any valid type_ |
| options   | Array / Object  | []      | _Any valid type_ |
| status        | String / Boolean  | null        | true, false, 'success', 'error', 'warning' |
| size        | String          | null        | 'sm', 'lg' |

## Classes related props

| Property        | Description                                                         |
|---                    |---                                                            |
| baseClass             | Base select box class (never changes)                      |
| defaultStatusClass    | Classes when select box doesnt has status and is not disabled |
| errorStatusClass      | Classes when select box has status of `false` or `"error"`    |
| successStatusClass    | Classes when select box has status of `true` or `"success"`   |
| warningStatusClass    | Classes when select has status of `"warning"`                 |
| disabledClass         | Classes when the select box is disabled                       |
| defaultSizeClass      | Classes when the select box has no defined size               |
| largeSizeClass        | Classes when the select box has the size defined as large (`lg`)  |
| smallSizeClass        | Classes when the select box has the size defined as small (`sm`)  |

## Options format

The component accepts the options in different formats:

### Array of objects

```html
<!-- Value, text attributes (preferred default) -->
<t-radio-group :options="[{ value: 1, text: 'Option 1' }, { value: 2, text: 'Option 2' }]" />
<!-- id instead of value as attribute -->
<t-radio-group :options="[{ id: 1, text: 'Option 1' }, { id: 2, text: 'Option 2' }]" />
<!-- label instead of text as attribute -->
<t-radio-group :options="[{ value: 1, label: 'Option 1' }, { value: 2, label: 'Option 2' }]" />

<!-- All the examples above will render: -->
<div>
  <div>
    <input id="radio-field-0" name="radio-field" type="radio" value="1">
    <label for="radio-field-0">Option 1</label>
  </div>
  <div>
    <input id="radio-field-1" name="radio-field" type="radio" value="2">
    <label for="radio-field-1">Option 2</label>
  </div>
</div>
```

### Object with value:text pairs
```html
<t-radio-group :options="{ A: 'Option A', B: 'Option B', C: 'Option C' }" />

<!-- Will Render: -->
<div>
  <div>
    <input id="radio-field-0" name="radio-field" type="radio" value="A">
    <label for="radio-field-0">Option A</label>
  </div>
  <div>
    <input id="radio-field-1" name="radio-field" type="radio" value="B">
    <label for="radio-field-1">Option B</label>
  </div>
  <div>
    <input id="radio-field-2" name="radio-field" type="radio" value="C">
    <label for="radio-field-2">Option C</label>
  </div>
</div>
```

### Array of strings
```html
<t-radio-group :options="['Red', 'Blue', 'Yellow']" />

<!-- Will Render: -->
<div>
  <div>
    <input id="radio-field-0" name="radio-field" type="radio" value="Red">
    <label for="radio-field-0">Red</label>
  </div>
  <div>
    <input id="radio-field-1" name="radio-field" type="radio" value="Blue">
    <label for="radio-field-1">Blue</label>
  </div>
  <div>
    <input id="radio-field-2" name="radio-field" type="radio" value="Yellow">
    <label for="radio-field-2">Yellow</label>
  </div>
</div>
```
### Array of numbers
```html
<t-radio-group :options="[18, 19, 20]" />

<!-- Will Render: -->
<div>
  <div>
    <input id="radio-field-0" name="radio-field" type="radio" value="18">
    <label for="radio-field-0">18</label>
  </div>
  <div>
    <input id="radio-field-1" name="radio-field" type="radio" value="19">
    <label for="radio-field-1">19</label>
  </div>
  <div>
    <input id="radio-field-2" name="radio-field" type="radio" value="20">
    <label for="radio-field-2">20</label>
  </div>
</div>
```

## Events

| Event   | Arguments                   | Description   |
|---    |---                      |---      |
| input   | String (The current value of the radio group)  | Emitted every time the value of the `v-model` change |
| change  | String (The current value of the radio group)  | Emitted every time the value of the `v-model` change |
| focus   | FocusEvent                  | Emitted when the any of the options are focused  |
| blur    | FocusEvent                  | Emitted when the any of the options are blurred  |