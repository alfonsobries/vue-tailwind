---
title: Text Input
lang: en-US
---

# Text input

<text-input />

### Attributes / Props

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

### Classes related attributes / props

| Property				| Description												|
|---					|---														|
| defaultClass			| Default input class (never changes) 						|
| defaultStatusClass	| Classes when input doesnt has status and is not disabled	|
| errorStatusClass		| Classes when input has status of `false` or `"error"`		|
| successStatusClass	| Classes when input has status of `true` or `"success"` 	|
| disabledClass			| Classes when the input is disabled						|
| defaultSizeClass		| Classes when the inputs has no defined size 				|
| largeSizeClass		| Classes when the inputs has the size defined as large (`lg`) |
| smallSizeClass		| Classes when the inputs has the size defined as small (`sm`) |

### Events

| Event		| Arguments 								| Description 	|
|---		|---										|---			|
| input		| String (The current value of the input)	| Emitted every time the value of the `v-model` change |
| change	| String (The current value of the input)	| Emitted when the input is blurred and the value was changed since it was focused |
| focus		| FocusEvent								| Emitted when the input is focused	|
| blur		| FocusEvent								| Emitted when the input is blurred	|
| keyup		| KeyboardEvent								| Emitted when on the input keyup event	|
| keydown	| KeyboardEvent								| Emitted when on the input keydown event	|