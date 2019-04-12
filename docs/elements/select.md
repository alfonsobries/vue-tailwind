---
title: Select
lang: en-US
---

# Select

<select-field />

### Attributes / props

| Property    | Type        | Default value | Accepted values |
|---      |---        |---      |---      |
| id      | String      | null      | _Any valid type_ |
| autofocus   | Boolean     | false     | _Any valid type_ |
| disabled    | Boolean     | false     | _Any valid type_ |
| name      | String      | null      | _Any valid type_ |
| readonly    | Boolean     | undefined   | _Any valid type_ |
| required    | Boolean     | false     | _Any valid type_ |
| tabindex    | String / Number | null      | _Any valid type_ |
| multiple    | Boolean     | false     | _Any valid type_ |
| options   | Array / Object  | []      | _Any valid type_ |
| status        | String / Boolean     | undefined      | true, false, 'success', 'error' |
| size        | String      | undefined      | 'sm', 'lg' |

### Classes related attributes / props

| Property        | Description                                                         |
|---                    |---                                                            |
| defaultClass          | Default select box class (never changes)                      |
| defaultClassMultiple  | Default select box class when is multiple (never changes)     |
| defaultStatusClass    | Classes when select box doesnt has status and is not disabled |
| errorStatusClass      | Classes when select box has status of `false` or `"error"`    |
| successStatusClass    | Classes when select box has status of `true` or `"success"`   |
| disabledClass         | Classes when the select box is disabled                       |
| defaultSizeClass      | Classes when the select box has no defined size               |
| largeSizeClass        | Classes when the select box has the size defined as large (`lg`)  |
| smallSizeClass        | Classes when the select box has the size defined as small (`sm`)  |
| wrapperClass          | Classes for the select box wrapper                            |
| arrowWrapperClass     | Classes for the select box arrow wrapper                      |
| arrowClass            | Classes for the select box arrow                              |

### Options format

The component accepts the options in different formats:

#### Array of objects

```html
<!-- Value, text attributes (preferred default) -->
<t-select :options="[{ value: 1, text: 'Option 1' }, { value: 2, text: 'Option 2' }]" />
<!-- id instead of value as attribute -->
<t-select :options="[{ id: 1, text: 'Option 1' }, { id: 2, text: 'Option 2' }]" />
<!-- label instead of text as attribute -->
<t-select :options="[{ value: 1, label: 'Option 1' }, { value: 2, label: 'Option 2' }]" />

<!-- All the examples above will render: -->
<select>
  <option value="1">Option 1</option>
  <option value="2">Option 2</option>
</select>
```

#### Object with value:text pairs
```html
<t-select :options="{ A: 'Option A', B: 'Option B', C: 'Option C' }" />

<!-- Will Render: -->
<select>
  <option value="A">Option A</option>
  <option value="B">Option B</option>
  <option value="C">Option C</option>
</select>
```

#### Array of strings
```html
<t-select :options="['Red', 'Blue', 'Yellow']" />

<!-- Will Render: -->
<select>
  <option value="Red">Red</option>
  <option value="Blue">Blue</option>
  <option value="Yellow">Yellow</option>
</select>
```
#### Array of numbers
```html
<t-select :options="[18, 19, 20]" />

<!-- Will Render: -->
<select>
  <option value="18">18</option>
  <option value="19">19</option>
  <option value="20">20</option>
</select>
```

### Events

| Event   | Arguments                   | Description   |
|---    |---                      |---      |
| input   | String (The current value of the select)  | Emitted every time the value of the `v-model` change |
| change  | String (The current value of the select)  | Emitted when the select is blurred and the value was changed since it was focused |
| focus   | FocusEvent                  | Emitted when the select is focused  |
| blur    | FocusEvent                  | Emitted when the select is blurred  |
