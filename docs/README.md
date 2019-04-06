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

