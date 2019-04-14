---
title: Textarea
lang: en-US
---

# Textarea

<text-area-field />

### Attributes


| Property		| Type 				| Default value | Accepted values |
|---			|---				|---			|---				|
| id			| String			| null			| _Any valid type_ |
| autofocus		| Boolean			| false			| _Any valid type_ |
| disabled		| Boolean			| false			| _Any valid type_ |
| name			| String			| null			| _Any valid type_ |
| readonly		| Boolean			| undefined		| _Any valid type_ |
| required		| Boolean			| false			| _Any valid type_ |
| tabindex		| String / Number	| null			| _Any valid type_ |
| placeholder	| String			| null			| _Any valid type_ |
| rows			| String  / Number	| null			| _Any valid type_ |
| maxlength		| String / Number	| null			| _Any valid type_ |
| status        | String / Boolean  | null     		| true, false, 'success', 'error', 'warning' |
| size       	| String      		| null      	| 'sm', 'lg' |

### Classes related attributes / props

| Property				| Description												|
|---					|---														|
| defaultClass			| Default textarea class (never changes) 						|
| defaultStatusClass	| Classes when textarea doesnt has status and is not disabled	|
| errorStatusClass		| Classes when textarea has status of `false` or `"error"`		|
| successStatusClass	| Classes when textarea has status of `true` or `"success"` 	|
| warningStatusClass	| Classes when textarea has status of `"warning"`			 	|
| disabledClass			| Classes when the textarea is disabled						|
| defaultSizeClass		| Classes when the textarea has no defined size 				|
| largeSizeClass		| Classes when the textarea has the size defined as large (`lg`) |
| smallSizeClass		| Classes when the textarea has the size defined as small (`sm`) |

### Events

| Event		| Arguments 									| Description 	|
|---		|---											|---			|
| input		| String (The current value of the textarea)	| Emitted every time the value of the `v-model` change |
| change	| String (The current value of the textarea)	| Emitted when the textarea is blurred and the value was changed since it was focused |
| focus		| FocusEvent									| Emitted when the textarea is focused	|
| blur		| FocusEvent									| Emitted when the textarea is blurred	|
| keyup		| KeyboardEvent									| Emitted when on the textarea keyup event	|
| keydown	| KeyboardEvent									| Emitted when on the textarea keydown event	|

