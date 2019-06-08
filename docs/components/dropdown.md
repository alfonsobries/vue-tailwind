---
title: DropDown
lang: en-US
---

# DropDown

## Playground

<dropdown-component />

## Examples

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

## Events

| Event                                                        | Arguments       | Description                        |
| ------------------------------------------------------------ | --------------- | ---------------------------------- |
| focus                                                        | FocusEvent      | Emitted when the button is focused |
| blur                                                         | FocusEvent      | Emitted when the button is blurred |
| click                                                        | MouseEvent      | Emitted when the button is clicked |
| created <span class="font-bold text-sm text-gray-500">1</span> | context[Object] | Created popper component           |
| show <span class="font-bold text-sm text-gray-500">1</span>  | context[Object] | Show popover                       |
| hide     <span class="font-bold text-sm text-gray-500">1</span> | context[Object] | Hide popover                       |
| document-click <span class="font-bold text-sm text-gray-500">1</span> | context[Object] |

## Props

| Property                                                     | Type    | Default value | Accepted values                                              | Description                                                  |
| ------------------------------------------------------------ | ------- | ------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| variant                                                      | String  | undefined     | 'primary', 'secondary', 'tertiary', 'danger', 'warning', 'success' |                                                              |
| size                                                         | String  | undefined     | 'sm', 'lg'                                                   |                                                              |
| tagName                                                      | String  | 'div'         | Any valid HTML tag                                           | The component wrapper tag                                    |
| buttonTagName                                                | String  | 'button'      | 'button', 'a'                                                | The button Tag                                               |
| disabled                                                     | Boolean | false         | true, false                                                  |                                                              |
| placement                                                    | String  | 'auto'        | 'auto', 'top', 'right', 'bottom', 'left' *and adding the suffix '-start' or '-end', example: 'top-start'...* |                                                              |
| buttonProps                                                  | Object  | {}            |                                                              | All the attributes in the object will be used as props in the child TButton on this component |
| delay-on-mouse-over <span class="font-bold text-sm text-gray-500">1</span> | Number  | 10            | Delay in ms before showing popper during a mouse over        |                                                              |
| delay-on-mouse-out  <span class="font-bold text-sm text-gray-500">1</span> | Number  | 10            | Delay in ms before hiding popper during a mouse out          |                                                              |
| append-to-body <span class="font-bold text-sm text-gray-500">1</span> | Boolean | false         |                                                              |                                                              |
| visible-arrow <span class="font-bold text-sm text-gray-500">1</span> | Boolean | true          |                                                              |                                                              |
| force-show <span class="font-bold text-sm text-gray-500">1</span> | Boolean | false         |                                                              |                                                              |
| trigger  <span class="font-bold text-sm text-gray-500">1</span> | String  | hover         | Optional value: hover or click                               |                                                              |
| enter-active-class <span class="font-bold text-sm text-gray-500">1</span> | String  | null          |                                                              |                                                              |
| leave-active-class <span class="font-bold text-sm text-gray-500">1</span> | String  | null          |                                                              |                                                              |
| transition  <span class="font-bold text-sm text-gray-500">1</span> | String  | empty         |                                                              |                                                              |
| options  <span class="font-bold text-sm text-gray-500">1</span> | Object  | {}            | [popper.js](https://popper.js.org/popper-documentation.html) options |                                                              |
| stop-propagation <span class="font-bold text-sm text-gray-500">1</span> | Boolean | false         |                                                              |                                                              |
| prevent-default   <span class="font-bold text-sm text-gray-500">1</span> | Boolean | false         |                                                              |                                                              |

<span class="font-bold text-sm text-gray-500">1</span> Props inherited from vue-popper dependency [see vue-popper docs](https://github.com/RobinCK/vue-popper#readme)

## Classes related props

| Property      | Description                 |
| ------------- | --------------------------- |
| baseClass     | Base dropdown wrapper class |
| dropdownClass | Dropdown class              |
| disabledClass | Disabled wrapper class      |                                    |

<span class="font-bold text-sm text-gray-500">1</span> Events inherited from vue-popper dependency [see vue-popper docs](https://github.com/RobinCK/vue-popper#readme)

## Default theme settings

<<< @/src/themes/default/TDropdown.js

* Remember that in order to change the default settings you can [change default theme](/#_2-2-or-better-yet-create-your-own-theme) or use the props: 
```vue
<t-dropdown
  dropdown-class="w-64 bg-blue-500 text-white border-blue-500 rounded-lg border shadow-md p-6 z-10"
  text="Super duper dropdown"
>
  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem possimus nihil minus rerum aperiam, quidem, reprehenderit! Atque, facere inventore nam suscipit, excepturi nesciunt incidunt, explicabo error molestiae iure optio enim.</p>
</t-dropdown>
```

### The result:

<t-card class="mt-2 bg-gray-100">
<t-dropdown text="Super duper dropdown" dropdown-class="w-64 bg-blue-500 text-white border-blue-500 rounded-lg border shadow-md p-6 z-10">
  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem possimus nihil minus rerum aperiam, quidem, reprehenderit! Atque, facere inventore nam suscipit, excepturi nesciunt incidunt, explicabo error molestiae iure optio enim.</p>
</t-dropdown>
</t-card>

