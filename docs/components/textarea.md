---
title: Textarea
lang: en-US
---

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

