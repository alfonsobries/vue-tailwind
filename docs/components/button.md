---
title: Button
lang: en-US
---

# Button

<button-field />

### Attributes / props

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

### Classes related attributes / props

| Property          | Description                       |
|---                |---                            |
| defaultClass      | Default classes for the button   |
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

### Events

| Event   | Arguments                   | Description   |
|---    |---                      |---      |
| focus   | FocusEvent                  | Emitted when the select is focused  |
| blur    | FocusEvent                  | Emitted when the select is blurred  |
