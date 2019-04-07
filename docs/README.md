# Text input

<text-field />

### Attributes

| Property		| Type 				| Default value |
|---			|---				|---			|
| id			| String			| null			|
| autocomplete	| String			| null			|
| autofocus		| Boolean			| false			|
| disabled		| Boolean			| false			|
| max			| String / Number	| null			|
| maxlength		| String / Number	| null			|
| min			| String / Number	| null			|
| minlength		| String / Number	| null			|
| multiple		| Boolean			| false			|
| name			| String			| null			|
| pattern		| String			| null			|
| placeholder	| String			| null			|
| readonly		| Boolean			| undefined		|
| required		| Boolean			| false			|
| size			| String / Number	| NaN			|
| tabindex		| String / Number	| null			|
| type			| String 			| 'text'		|

### Events

| Event		| Arguments 								| Description 	|
|---		|---										|---			|
| input		| String (The current value of the input)	| Emitted every time the value of the `v-model` change |
| change	| String (The current value of the input)	| Emitted when the input is blurred and the value was changed since it was focused |
| focus		| FocusEvent								| Emitted when the input is focused	|
| blur		| FocusEvent								| Emitted when the input is blurred	|
| keyup		| KeyboardEvent								| Emitted when on the input keyup event	|
| keydown	| KeyboardEvent								| Emitted when on the input keydown event	|

# Textarea

<text-area-field />

### Attributes


| Property		| Type 				| Default value |
|---			|---				|---			|
| id			| String			| null			|
| autofocus		| Boolean			| false			|
| disabled		| Boolean			| false			|
| name			| String			| null			|
| readonly		| Boolean			| undefined		|
| required		| Boolean			| false			|
| tabindex		| String / Number	| null			|
| placeholder	| String			| null			|
| rows			| String  / Number	| null			|
| maxlength		| String / Number	| null			|

### Events

| Event		| Arguments 									| Description 	|
|---		|---											|---			|
| input		| String (The current value of the textarea)	| Emitted every time the value of the `v-model` change |
| change	| String (The current value of the textarea)	| Emitted when the textarea is blurred and the value was changed since it was focused |
| focus		| FocusEvent									| Emitted when the textarea is focused	|
| blur		| FocusEvent									| Emitted when the textarea is blurred	|
| keyup		| KeyboardEvent									| Emitted when on the textarea keyup event	|
| keydown	| KeyboardEvent									| Emitted when on the textarea keydown event	|

# Select

<select-field />

### Attributes

| Property		| Type 				| Default value |
|---			|---				|---			|
| id			| String			| null			|
| autofocus		| Boolean			| false			|
| disabled		| Boolean			| false			|
| name			| String			| null			|
| readonly		| Boolean			| undefined		|
| required		| Boolean			| false			|
| tabindex		| String / Number	| null			|
| multiple		| Boolean			| false			|
| size			| String / Number	| null			|
| options		| Array / Object	| []			|

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

| Event		| Arguments 									| Description 	|
|---		|---											|---			|
| input		| String (The current value of the select)	| Emitted every time the value of the `v-model` change |
| change	| String (The current value of the select)	| Emitted when the select is blurred and the value was changed since it was focused |
| focus		| FocusEvent									| Emitted when the select is focused	|
| blur		| FocusEvent									| Emitted when the select is blurred	|

