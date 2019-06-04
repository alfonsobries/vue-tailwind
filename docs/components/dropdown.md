---
title: DropDown
lang: en-US
---

# DropDown

<dropdown-component />

### Examples

#### Simple Example

```html
<t-dropdown text="Im a happy button">
  <ul>
    <li>
      <a 
        href="#" 
        class="block no-underline px-4 py-2 hover:bg-blue-500 hover:text-white"
      >My orders</a>
    </li>
    <li>
      <a 
        href="#" 
        class="block no-underline px-4 py-2 hover:bg-blue-500 hover:text-white"
      >Account settings</a>
    </li>
    <li class="border-b"></li>
    <li>
      <a 
        href="#" 
        class="block no-underline px-4 py-2 hover:bg-blue-500 hover:text-white"
      >Sign out</a>
    </li>
  </ul>
</t-dropdown>
```

#### Update child TButton classes (or any TButton prop)

```html
<t-dropdown :button-props="{ baseClass: 'shadow-md block rounded' }">
  <ul>
    <li>
      <a 
        href="#" 
        class="block no-underline px-4 py-2 hover:bg-blue-500 hover:text-white"
      >My orders</a>
    </li>
    ...
  </ul>
</t-dropdown>
```

#### Add HTML label

```html
<t-dropdown>
 <template v-slot:button-content>
    <span>Hello <strong>Alfonso</strong>!</span>
  </template>
  <ul>
    <li>
      <a 
        href="#" 
        class="block no-underline px-4 py-2 hover:bg-blue-500 hover:text-white"
      >My orders</a>
    </li>
    ...
  </ul>
</t-dropdown>
```

#### Update child TButton classes (or any TButton prop)

```html
<t-dropdown :button-props="{ baseClass: 'shadow-md block rounded' }">
  <ul>
    <li>
      <a 
        href="#" 
        class="block no-underline px-4 py-2 hover:bg-blue-500 hover:text-white"
      >My orders</a>
    </li>
    ...
  </ul>
</t-dropdown>
```

### Attributes / props

| Property      | Type    | Default value | Accepted values                                              | Description                                                  |
| ------------- | ------- | ------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| variant       | String  | undefined     | 'primary', 'secondary', 'tertiary', 'danger', 'warning', 'success' |                                                              |
| size          | String  | undefined     | 'sm', 'lg'                                                   |                                                              |
| tagName       | String  | 'div'         | Any valid HTML tag                                           | The component wrapper tag                                    |
| buttonTagName | String  | 'button'      | 'button', 'a'                                                | The button Tag                                               |
| disabled      | Boolean | false         | true, false                                                  |                                                              |
| placement      | String | 'auto'         | 'auto', 'top', 'right', 'bottom', 'left' *and adding the suffix '-start' or '-end', example: 'top-start'...* |                                                              |
| buttonProps   | Object  | {}            |                                                              | All the attributes in the object will be used as props in the child TButton on this component |

### Inherited vue-popper props [see vue-popper docs](https://github.com/RobinCK/vue-popper#readme)

| Props               | Type    | Default | Description                                                  |
| ------------------- | :------ | ------- | ------------------------------------------------------------ |
| delay-on-mouse-over | Number  | 10      | Delay in ms before showing popper during a mouse over        |
| delay-on-mouse-out  | Number  | 10      | Delay in ms before hiding popper during a mouse out          |
| append-to-body      | Boolean | false   |                                                              |
| visible-arrow       | Boolean | true    |                                                              |
| force-show          | Boolean | false   |                                                              |
| trigger             | String  | hover   | Optional value: hover or click                               |
| enter-active-class  | String  | null    |                                                              |
| leave-active-class  | String  | null    |                                                              |
| transition          | String  | empty   |                                                              |
| options             | Object  | {}      | [popper.js](https://popper.js.org/popper-documentation.html) options |
| stop-propagation    | Boolean | false   |                                                              |
| prevent-default     | Boolean | false   |                                                              |

### Classes related attributes / props

| Property      | Description                 |
| ------------- | --------------------------- |
| baseClass     | Base dropdown wrapper class |
| dropdownClass | Dropdown class              |
| disabledClass | Disabled wrapper class      |

### Events

| Event | Arguments  | Description                        |
| ----- | ---------- | ---------------------------------- |
| focus | FocusEvent | Emitted when the button is focused |
| blur  | FocusEvent | Emitted when the button is blurred |
| click | MouseEvent | Emitted when the button is clicked |

### Inherited vue-popper events [see vue-popper docs](https://github.com/RobinCK/vue-popper#readme)

| Event          | Arguments       | Description              |
| -------------- | --------------- | ------------------------ |
| created        | context[Object] | Created popper component |
| show           | context[Object] | Show popover             |
| hide           | context[Object] | Hide popover             |
| document-click | context[Object] |                          |

