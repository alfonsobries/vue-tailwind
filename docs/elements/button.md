---
title: Button
lang: en-US
---

# Button

## Playground

<button-field />

## Basic example

```html
<t-button variant="primary">Primary button</t-button>
<t-button variant="secondary">Secondary button</t-button>
<t-button size="lg">Large button</t-button>
```

## Props

| Property    | Type        | Default value | Accepted values |
|---          |---          |---      |--- |
| id          | String      | null      | _Any valid type_ |
| autofocus   | Boolean     | false     | _Any valid type_ |
| disabled    | Boolean     | false     | _Any valid type_ |
| name        | String      | null      | _Any valid type_ |
| tabindex    | String / Number | null      | _Any valid type_ |
| value       | String / Number | null      | _Any valid type_ |
| type        | String      | 'button'      | _Any valid type_ |
| variant        | String      | undefined      | 'primary', 'secondary', 'tertiary', 'danger', 'warning', 'success' |
| size        | String      | undefined      | 'sm', 'lg' |
| href        | String      | null      | _Any valid type_ |
| tagName+        | String      | 'button'      | 'button', 'a' |

*Note:* when the `href` is set it changes the tagname to `a`

## Classes related props

| Property          | Description                       |
|---                |---                            |
| baseClass         | Base button class (never changes)                      |
| defaultClass      | Classes for the default button variant   |
| primaryClass      | Classes for the primary button variant   |
| secondaryClass    | Classes for the secondary button variant   |
| tertiaryClass     | Classes for the tertiary button variant   |
| successClass      | Classes for the success button variant   |
| dangerClass       | Classes for the danger button variant   |
| warningClass      | Classes for the warning button variant   |
| disabledClass     | Classes for the disabled button variant (Added to the variant) |
| defaultSizeClass  | Classes for the default size button (Added to the variant) |
| largeSizeClass    | Classes for the large size button (Added to the variant) |
| smallSizeClass    | Classes for the small size button (Added to the variant) |

## Events

| Event   | Arguments                   | Description   |
|---    |---                      |---      |
| focus   | FocusEvent                  | Emitted when the button is focused  |
| blur    | FocusEvent                  | Emitted when the button is blurred  |
| click   | MouseEvent                  | Emitted when the button is clicked  |
