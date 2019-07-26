---
title: Checkbox Group
lang: en-US
---

# Checkbox Group

## Playground

<checkbox-group-field />

## Basic example

```html
<t-checkbox-group
  v-model="model"
  name="checkbox-group"
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
| valueAttribute   | String  | undefined      | _Any valid type_ |
| textAttribute   | String  | undefined      | _Any valid type_ |
| status        | String / Boolean  | null        | true, false, 'success', 'error', 'warning' |
| size        | String          | null        | 'sm', 'lg' |
| selectAll | Boolean          | false        | true, false |
| selectAllLabel | String          | 'Select All'        | _Any valid type_ |

## Classes related props

| Property        | Description                                                         |
|---                    |---                                                            |
| baseClass             | Base checkbox class (never changes)                      |
| defaultStatusClass    | Classes when checkbox doesnt has status and is not disabled |
| errorStatusClass      | Classes when checkbox has status of `false` or `"error"`    |
| successStatusClass    | Classes when checkbox has status of `true` or `"success"`   |
| warningStatusClass    | Classes when checkbox has status of `"warning"`                 |
| disabledClass         | Classes when the checkbox is disabled                       |
| defaultSizeClass      | Classes when the checkbox has no defined size               |
| largeSizeClass        | Classes when the checkbox has the size defined as large (`lg`)  |
| smallSizeClass        | Classes when the checkbox has the size defined as small (`sm`)  |
| selectAllClass        | Classes when the checkbox has the size defined as small (`sm`)  |

## Options format

The component accepts the options in different formats:

### Array of objects

```html
<!-- Value, text attributes (preferred default) -->
<t-checkbox-group :options="[{ value: 1, text: 'Option 1' }, { value: 2, text: 'Option 2' }]" />
<!-- id instead of value as attribute -->
<t-checkbox-group :options="[{ id: 1, text: 'Option 1' }, { id: 2, text: 'Option 2' }]" />
<!-- label instead of text as attribute -->
<t-checkbox-group :options="[{ value: 1, label: 'Option 1' }, { value: 2, label: 'Option 2' }]" />

<!-- All the examples above will render: -->
<div>
  <div>
    <input id="checkbox-field-0" name="checkbox-field" type="checkbox" value="1">
    <label for="checkbox-field-0">Option 1</label>
  </div>
  <div>
    <input id="checkbox-field-1" name="checkbox-field" type="checkbox" value="2">
    <label for="checkbox-field-1">Option 2</label>
  </div>
</div>
```

### Object with value:text pairs
```html
<t-checkbox-group :options="{ A: 'Option A', B: 'Option B', C: 'Option C' }" />

<!-- Will Render: -->
<div>
  <div>
    <input id="checkbox-field-0" name="checkbox-field" type="checkbox" value="A">
    <label for="checkbox-field-0">Option A</label>
  </div>
  <div>
    <input id="checkbox-field-1" name="checkbox-field" type="checkbox" value="B">
    <label for="checkbox-field-1">Option B</label>
  </div>
  <div>
    <input id="checkbox-field-2" name="checkbox-field" type="checkbox" value="C">
    <label for="checkbox-field-2">Option C</label>
  </div>
</div>
```

### Array of strings
```html
<t-checkbox-group :options="['Red', 'Blue', 'Yellow']" />

<!-- Will Render: -->
<div>
  <div>
    <input id="checkbox-field-0" name="checkbox-field" type="checkbox" value="Red">
    <label for="checkbox-field-0">Red</label>
  </div>
  <div>
    <input id="checkbox-field-1" name="checkbox-field" type="checkbox" value="Blue">
    <label for="checkbox-field-1">Blue</label>
  </div>
  <div>
    <input id="checkbox-field-2" name="checkbox-field" type="checkbox" value="Yellow">
    <label for="checkbox-field-2">Yellow</label>
  </div>
</div>
```
### Array of numbers
```html
<t-checkbox-group :options="[18, 19, 20]" />

<!-- Will Render: -->
<div>
  <div>
    <input id="checkbox-field-0" name="checkbox-field" type="checkbox" value="18">
    <label for="checkbox-field-0">18</label>
  </div>
  <div>
    <input id="checkbox-field-1" name="checkbox-field" type="checkbox" value="19">
    <label for="checkbox-field-1">19</label>
  </div>
  <div>
    <input id="checkbox-field-2" name="checkbox-field" type="checkbox" value="20">
    <label for="checkbox-field-2">20</label>
  </div>
</div>
```

### Define the value/text attributes
```html
<t-checkbox-group
  :options="[
    { key: 'A', description: 'One option' },
    { key: 'B', description: 'Another option' },
    { key: 'C', description: 'One more' },
  ]"
  value-attribute="key"
  text-attribute="description"
/>

<!-- Will Render: -->
<div>
  <div>
    <input id="checkbox-field-0" name="checkbox-field" type="checkbox" value="A">
    <label for="checkbox-field-0">One option</label>
  </div>
  <div>
    <input id="checkbox-field-1" name="checkbox-field" type="checkbox" value="B">
    <label for="checkbox-field-1">Another option</label>
  </div>
  <div>
    <input id="checkbox-field-2" name="checkbox-field" type="checkbox" value="C">
    <label for="checkbox-field-2">One more</label>
  </div>
</div>
```

## Events

| Event   | Arguments                   | Description   |
|---    |---                      |---      |
| input   | String (The current value of the checkbox group)  | Emitted every time the value of the `v-model` change |
| change  | String (The current value of the checkbox group)  | Emitted every time the value of the `v-model` change |
| focus   | FocusEvent                  | Emitted when the any of the options are focused  |
| blur    | FocusEvent                  | Emitted when the any of the options are blurred  |