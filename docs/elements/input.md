---
title: Text Input
lang: en-US
---

# Text input

<text-input />

### Attributes / Props

| Property		| Type 				| Default value | Accepted values |
|---			|---				|---			|---				|
| id			| String			| null			| _Any valid type_ |
| autocomplete	| String			| null			| _Any valid type_ |
| autofocus		| Boolean			| false			| _Any valid type_ |
| disabled		| Boolean			| false			| _Any valid type_ |
| max			| String / Number	| null			| _Any valid type_ |
| maxlength		| String / Number	| null			| _Any valid type_ |
| min			| String / Number	| null			| _Any valid type_ |
| minlength		| String / Number	| null			| _Any valid type_ |
| multiple		| Boolean			| false			| _Any valid type_ |
| name			| String			| null			| _Any valid type_ |
| pattern		| String			| null			| _Any valid type_ |
| placeholder	| String			| null			| _Any valid type_ |
| readonly		| Boolean			| undefined		| _Any valid type_ |
| required		| Boolean			| false			| _Any valid type_ |
| tabindex		| String / Number	| null			| _Any valid type_ |
| type			| String 			| 'text'		| _Any valid type_ |
| status        | String / Boolean  | null     		| true, false, 'success', 'error', 'warning' |
| size       	| String      		| null      	| 'sm', 'lg' |

### Classes related attributes / props

| Property				| Description												|
|---					|---														|
| defaultClass			| Default input class (never changes) 						|
| defaultStatusClass	| Classes when input doesnt has status and is not disabled	|
| errorStatusClass		| Classes when input has status of `false` or `"error"`		|
| successStatusClass	| Classes when input has status of `true` or `"success"` 	|
| warningStatusClass	| Classes when input has status of `"warning"`			 	|
| disabledClass			| Classes when the input is disabled						|
| defaultSizeClass		| Classes when the input has no defined size 				|
| largeSizeClass		| Classes when the input has the size defined as large (`lg`) |
| smallSizeClass		| Classes when the input has the size defined as small (`sm`) |

### Events

| Event		| Arguments 								| Description 	|
|---		|---										|---			|
| input		| String (The current value of the input)	| Emitted every time the value of the `v-model` change |
| change	| String (The current value of the input)	| Emitted when the input is blurred and the value was changed since it was focused |
| focus		| FocusEvent								| Emitted when the input is focused	|
| blur		| FocusEvent								| Emitted when the input is blurred	|
| keyup		| KeyboardEvent								| Emitted when on the input keyup event	|
| keydown	| KeyboardEvent								| Emitted when on the input keydown event	|