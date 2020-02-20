---
title: Table
lang: en-US
---

# Table

<t-table
  :headers="['Name', 'Email', 'Age', 'Sales']"
  :data="[
    ['Alfonso Bribiesca', 'alfonso@vexilo.com', '31', '$9,999.00'],
    ['Saida Redondo', 'saida@gmail.com', 27, '$124.00'],
    ['Regina Bribiesca', 'regina@gmail.com', 1, '$0.00']
  ]"
/>

### Simple usage

```html
<t-table
  :headers="['Name', 'Email', 'Age', 'Sales']"
  :data="[
    ['Alfonso Bribiesca', 'alfonso@vexilo.com', '31', '$9,999.00'],
    ['Saida Redondo', 'saida@gmail.com', 27, '$124.00'],
    ['Regina Bribiesca', 'regina@gmail.com', 1, '$0.00']
  ]"
/>
```

## Props

| Property   | Type  | Default value |  Description                                                  |
| ---------- | ----- | ------------- |  ------------------------------------------------------------ |
| data       | Array | []            |  A multidimensional array with rows and columns or an array of objects |
| headers    | Array | []            |  An array of strings that will be added as columns in the header or an array of objects with different attributes (explained above) |
| footerData | Array | []            |  An array of strings that will be added as columns in the footer or an array of objects with different attributes (explained above) |
| responsive _(experimental)_ | Boolean | false            |  When set the header will be hidden and the rest of the slots will have a `renderResponsive` prop variable with the value of `true` when the screen is smaller than the `responsiveBreakpoint` option, that variable is useful to define a custom layout in smaller screens. [Check the example below](#responsive-table-experimental) |
| responsiveBreakpoint _(experimental)_ | Number | 768            |  When the screen is smaller yo the value the `responsiveBreakpoint` slot prop will set to true |

## Classes related props

| Property         | Description                                          |
| ---------------- | ---------------------------------------------------- |
| tableClass       | The `<table>` class                                  |
| theadClass       | An {Object} with the classes for the child elements: |
| theadClass.thead | `thead` classes                                      |
| theadClass.tr    | `thead > tr` classes                                 |
| theadClass.th    | `thead > th` elements classes                        |
| tbodyClass       | An {Object} with the classes for the child elements: |
| tbodyClass.thead | `tbody` classes                                      |
| tbodyClass.tr    | `tbody > tr` classes                                 |
| tbodyClass.th    | `tbody > td` elements classes                        |
| tfootClass       | An {Object} with the classes for the child elements: |
| tfootClass.thead | `tbody > tfoot` classes                              |
| tfootClass.tr    | `tbody > tr` classes                                 |
| tfootClass.th    | `tbody > td` elements classes                        |

## Headers data

### Array of strings

```html
<t-table :headers="['Name', 'Email', 'Sales']" />
```

```html
<table>
  <thead>
    <tr><th>Name</th></tr>
    <tr><th>Email</th></tr>
    <tr><th>Sales</th></tr>
  </thead>
  ...
</table>
```

### Array of objects

```html
<t-table :headers="[
    {
      id: 'name-id',
      value: 'name',
      text: 'The name',
      className: 'bg-red-200',
    },
    {
      id: 'email-id',
      value: 'email',
      text: 'E-mail',
      className: 'bg-blue-700',
    }
  ]"
/>
```

```html
<table>
  <thead>
    <tr><th id="name-id" class="bg-red-200">The name</th></tr>
    <tr><th id="email-id" class="bg-blue-700">E-mail</th></tr>
  </thead>
  ...
</table>
```

*Note: The `className` attribute will be concatenated to the theme `thead > th` className.*

## Table Data

### Multidimensional array of items

```html
<t-table :data="[
  ['Alfonso Bribiesca', 'alfonso@vexilo.com', '$9,999.00'],
  ['Saida Redondo', 'saida@gmail.com', '$124.00'],
  ['Regina Bribiesca', 'regina@gmail.com', '$0.00']
]" />
```

```html
<table>
  ...
  <tbody>
    <tr><td>Alfonso Bribiesca</td><td>alfonso@vexilo.com</td><td>$9,999.00</td></tr>
    <tr><td>Saida Redondo</td><td>saida@gmail.com</td><td>$124.00</td></tr>
    <tr><td>Regina Bribiesca</td><td>regina@gmail.com</td><td>$0.00</td></tr>
  </tbody>
  ...
</table>
```

### Array of objects

```html
<t-table :data="[
    {
      id: 1,
      name: 'Alfonso Bribiesca',
      email: 'alfonso@vexilo.com',
      sales: '$9,999.00',
    },
    {
      id: 2,
      name: 'Saida Redondo',
      email: 'saida@gmail.com',
      sales: '$124.00',
    },
  ]"
/>
```

```html
<table>
  ...
  <tbody>
    <tr><td>1</td><td>Alfonso Bribiesca</td><td>alfonso@vexilo.com</td><td>$9,999.00</td></tr>
    <tr><td>2</td><td>Saida Redondo</td><td>saida@gmail.com</td><td>$124.00</td></tr>
  </tbody>
  ...
</table>

```

## Headers `value` attribute

When you use the `value` attribute in the headers items together with `data` objects the datatable will render only the attributes that are in the headers.

### Example:

With `value` attribute:

```
<t-table
  :headers="[{value: 'name', text: 'Name'}, {value: 'email', text: 'E-mail'}]"
  :data="[
    {id: 1, name: 'Alfonso', email: 'alfonso@vexilo.com'},
    {id: 2, name: 'Saida', email: 'saida@gmail.com'},
  ]"
/>

```

<t-table
  :headers="[{value: 'name', text: 'Name'}, {value: 'email', text: 'E-mail'}]"
  :data="[
    {id: 1, name: 'Alfonso', email: 'alfonso@vexilo.com'},
    {id: 2, name: 'Saida', email: 'saida@gmail.com'},
  ]"
/>

Without `value` attribute:

```
<t-table
  :headers="['Name', 'E-mail']"
  :data="[
    {id: 1, name: 'Alfonso', email: 'alfonso@vexilo.com'},
    {id: 2, name: 'Saida', email: 'saida@gmail.com'},
  ]"

```

<t-table
  :headers="['Name', 'E-mail']"
  :data="[
    {id: 1, name: 'Alfonso', email: 'alfonso@vexilo.com'},
    {id: 2, name: 'Saida', email: 'saida@gmail.com'},
  ]"
/>

## Slot: `column` 

When rendering the table you can use the `column` scoped slot to render custom HTML per column, this is useful if you want to wrap the items in an HTML tag or you want to add a custom attribute to every cell.

Use:

```html
<t-table>
  <template v-slot:column="props">
    <td :class="props.tdClass">{{ props.text }}</td>
  </template>
</t-table>

```

The slot props contain the following data:

| Prop           | Description                                                  |
| -------------- | ------------------------------------------------------------ |
| props.text     | The text of the cell                                         |
| props.rowIndex | The current row index                                        |
| props.tdClass  | The `tbody > td` theme class so you can add the class again or merge it with your custom class |

### Example 

```html
<t-table
  :headers="['name', 'email']"
  :data="[
    {
      name: 'Alfonso Bribiesca',
      email: 'alfonso@vexilo.com',
    },
    {
      name: 'Saida Redondo',
      email: 'saida@gmail.com',
    },
]"
>
  <template v-slot:column="props">
    <td :class="[props.tdClass, 'bg-yellow-100 text-sm text-center']"><strong>{{ props.text }}</strong></td>
  </template>
</t-table>

```

<t-table
  :headers="['name', 'email']"
  :data="[
    {
      name: 'Alfonso Bribiesca',
      email: 'alfonso@vexilo.com',
    },
    {
      name: 'Saida Redondo',
      email: 'saida@gmail.com',
    },
]"
>
  <template v-slot:column="props">
    <td :class="[props.tdClass, 'bg-yellow-100 text-sm text-center']"><strong>{{ props.text }}</strong></td>
  </template>
</t-table>

## Slot: `row` 

When rendering the table you can use the `row` scoped slot to render custom HTML per row. This is useful if you want to control all the HTML inside every row, define your custom columns, add striped classes, etc.

Use:

```html
<t-table>
  <template v-slot:row="props">
    <tr :class="[props.trClass, props.rowIndex % 2 === 0 ? 'bg-gray-100' : '']">
      <td :class="props.tdClass">{{ props.row.name }}</td>
      <td :class="props.tdClass">{{ props.row.email }}</td>
      <td :class="props.tdClass">{{ props.row.etc }}</td>
    </tr>
  </template>
</t-table>
```

The slot props contain the following data:

| Prop           | Description                                                  |
| -------------- | ------------------------------------------------------------ |
| props.row      | The full row Object or Array                                 |
| props.rowIndex | The current row index                                        |
| props.trClass  | The `tbody > tr` theme class so you can add the class again or merge it with your custom class |
| props.tdClass  | The `tbody > td` theme class so you can add the class back to the columns or merge it with your custom class |

### Example 

```html
<t-table
  :headers="['Name', 'Email', 'Sales', 'Actions']"
  :data="[
    {
      name: 'Alfonso Bribiesca',
      email: 'alfonso@vexilo.com',
      sales: 9999,
    },
    {
      name: 'Saida Redondo',
      email: 'saida@gmail.com',
      sales: 1500
    },
    {
      name: 'Regina Bribiesca',
      email: 'regina@gmail.com',
      sales: -200.50
    },
    {
      name: 'Ricardo Martinez',
      email: 'rickyrickky@gmail.com',
      sales: 0.0
    },
]"
>
<template v-slot:row="props">
  <tr :class="[props.trClass, props.rowIndex % 2 === 0 ? 'bg-gray-100' : '']">
    <td :class="props.tdClass">
      {{ props.row.name }}
    </td>
    <td :class="props.tdClass">
      <a :href="`mailto: ${props.row.email}`">{{ props.row.email }}</a>
    </td>
    <td :class="props.tdClass">
      <span :class="{'text-green-500': props.row.sales >= 0, 'text-red-500': props.row.sales < 0 }">
      ${{ props.row.sales.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') }}
      </span>
    </td>
    <td :class="props.tdClass">
      <t-button size="sm" variant="secondary">Edit</t-button>
    </td>
  </tr>
</template>
</t-table>
```

<t-table
  :headers="['Name', 'Email', 'Sales', 'Actions']"
  :data="[
    {
      name: 'Alfonso Bribiesca',
      email: 'alfonso@vexilo.com',
      sales: 9999,
    },
    {
      name: 'Saida Redondo',
      email: 'saida@gmail.com',
      sales: 1500
    },
    {
      name: 'Regina Bribiesca',
      email: 'regina@gmail.com',
      sales: -200.50
    },
    {
      name: 'Ricardo Martinez',
      email: 'rickyrickky@gmail.com',
      sales: 0.0
    },
]"
>
<template v-slot:row="props">
  <tr :class="[props.trClass, props.rowIndex % 2 === 0 ? 'bg-gray-100' : '']">
    <td :class="props.tdClass">
      {{ props.row.name }}
    </td>
    <td :class="props.tdClass">
      <a :href="`mailto: ${props.row.email}`">{{ props.row.email }}</a>
    </td>
    <td :class="props.tdClass">
      <span :class="{'text-green-500': props.row.sales >= 0, 'text-red-500': props.row.sales < 0 }">
      ${{ props.row.sales.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') }}
      </span>
    </td>
    <td :class="props.tdClass">
      <t-button size="sm" variant="secondary">Edit</t-button>
    </td>
  </tr>
</template>
</t-table>

## Slot: `tbody` 

You can use the `tbody` scoped slot to override the default tbody element with your custom HTML. This is useful if you want to add a message when no data, a busy message when you are fetching the info, or simply you want to add any custom HTML.

Use:

```html
<t-table>
  <template v-slot:tbody="props">
    <tbody :class="props.tbodyClass">
      <tr :class="props.trClass">
        <td :class="props.tdClass" colspan="3">
          <p>My custom HTML</p>
        </td>
      </tr>
    </tbody>
  </template>
</t-table>
```

The slot props contain the following data:

| Prop             | Description                                                  |
| ---------------- | ------------------------------------------------------------ |
| props.data       | The data of the component (normalized)                       |
| props.headers    | The data of the headers                                      |
| props.tbodyClass | The `tbody` theme class so you can add the class back or merge it with your custom class |
| props.trClass    | The `tbody > tr` theme class so you can add the class back to the tr rows you add or merge it with your custom class |
| props.tdClass    | The `tbody > td` theme class so you can add the class again to the columns or merge it with your custom class |

### Example 

```html
<!-- In the practice `[]` could be a variable with your data -->
<t-table
  :headers="['Name', 'Email', 'Sales']"
  :data="[]"
>
  <template v-if="![].length" v-slot:tbody="props">
    <tbody :class="props.tbodyClass">
      <tr :class="[props.trClass, 'text-center']">
        <td :class="props.tdClass" colspan="3">
          <t-alert show :dismissible="false" variant="warning">No data was found!</t-alert>
          <p class="mt-1"><t-button size="sm" variant="tertiary">Create your first item</t-button></p>
        </td>
      </tr>
    </tbody>
  </template>
</t-table>

```

<t-table
  :headers="['Name', 'Email', 'Sales']"
  :data="[]"
>
  <template v-if="![].length" v-slot:tbody="props">
    <tbody :class="props.tbodyClass">
      <tr :class="[props.trClass, 'text-center']">
        <td :class="props.tdClass" colspan="3">
          <t-alert show :dismissible="false" variant="warning">No data was found!</t-alert>
          <p class="mt-1"><t-button size="sm" variant="tertiary">Create your first item</t-button></p>
        </td>
      </tr>
    </tbody>
  </template>
</t-table>

## Slot: `thead` 

You can use the `thead` scoped slot to override the default tbody element with your custom HTML.

Use:

```html
<t-table>
  <template v-slot:thead="props">
    <thead :class="props.theadClass">
      <tr :class="props.trClass">
        <th 
          v-for="(item, index) in props.data" 
          :class="props.thClass"
        >{{ item.text }}</th>
      </tr>
    </thead>
  </template>
</t-table>
```

The slot props contains the following data:

| Prop             | Description                                                  |
| ---------------- | ------------------------------------------------------------ |
| props.data       | The data of the headers                     |
| props.tbodyClass | The `thead` theme class so you can add the class again or merge it with your custom class |
| props.trClass    | The `thead > tr` theme class so you can add the class back to the tr rows you add or merge it with your custom class |
| props.thClass    | The `thead > td` theme class so you can add the class again to the columns or merge it with your custom class |

### Example 

```html
<t-table
  :headers="['Name', 'Email', 'Age', 'Sales']"
  :data="[
    ['Alfonso Bribiesca', 'alfonso@vexilo.com', '31', '$9,999.00'],
    ['Saida Redondo', 'saida@gmail.com', 27, '$124.00'],
  ]"
>
  <template v-slot:thead="props">
    <thead :class="props.theadClass">
      <tr :class="props.trClass">
        <th 
          v-for="(item, index) in props.data" 
          :class="[props.thClass, `bg-yellow-${index+1}00`]"
        >
          {{ item.text }}
        </th>
      </tr>
    </thead>
  </template>
</t-table>
```

<t-table
  :headers="['Name', 'Email', 'Age', 'Sales']"
  :data="[
    ['Alfonso Bribiesca', 'alfonso@vexilo.com', '31', '$9,999.00'],
    ['Saida Redondo', 'saida@gmail.com', 27, '$124.00'],
  ]"
>
  <template v-slot:thead="props">
    <thead :class="props.theadClass">
      <tr :class="props.trClass">
        <th 
          v-for="(item, index) in props.data" 
          :class="[props.thClass, `bg-yellow-${index+1}00`]"
        >
          {{ item.text }}
        </th>
      </tr>
    </thead>
  </template>
</t-table>

## Slot: `tfoot` 

You can use the `tfoot` scoped slot to override the default tbody element with your custom HTML.

Use:

```html
<t-table>
  <template v-slot:tfoot="props">
    <tfoot :class="props.tfootClass">
      <tr :class="props.trClass">
        <th 
          v-for="(item, index) in props.data" 
          :class="props.tdClass"
        >{{ item.text }}</th>
      </tr>
    </tfoot>
  </template>
</t-table>
```

The slot props contain the following data:

| Prop             | Description                                                  |
| ---------------- | ------------------------------------------------------------ |
| props.data       | The data of the footer                      |
| props.headers    | The data of the headers                                      |
| props.tbodyClass | The `tfoot` theme class so you can add the class again or merge it with your custom class |
| props.trClass    | The `tfoot > tr` theme class so you can add the class back to the tr rows you add or merge it with your custom class |
| props.tdClass    | The `tfoot > td` theme class so you can add the class again to the columns or merge it with your custom class |

### Example 

```html
<t-table
  :headers="['Name', 'Email', 'Age', 'Sales']"
  :footerData="['', '', 29, '$10,123']"
  :data="[
    ['Alfonso Bribiesca', 'alfonso@vexilo.com', '31', '$9,999.00'],
    ['Saida Redondo', 'saida@gmail.com', 27, '$124.00'],
  ]"
>
  <template v-slot:tfoot="props">
    <tfoot :class="props.tfootClass">
      <tr :class="[props.trClass, 'bg-gray-200']">
        <td colspan="3" :class="[props.tdClass, 'text-right']"> 
          <strong>Total:</strong>
        </td>
        <td>
          <strong class="text-lg">{{ props.data[3].text }}</strong>
        </td>
      </tr>
    </tfoot>
  </template>
</t-table>
```

<t-table
  :headers="['Name', 'Email', 'Age', 'Sales']"
  :footerData="['', '', 29, '$10,123']"
  :data="[
    ['Alfonso Bribiesca', 'alfonso@vexilo.com', '31', '$9,999.00'],
    ['Saida Redondo', 'saida@gmail.com', 27, '$124.00'],
  ]"
>
  <template v-slot:tfoot="props">
    <tfoot :class="props.tfootClass">
      <tr :class="[props.trClass, 'bg-gray-200']">
        <td colspan="3" :class="[props.tdClass, 'text-right']">
          <strong>Total:</strong>
        </td>
        <td>
          <strong class="text-lg">{{ props.data[3].text }}</strong>
        </td>
      </tr>
    </tfoot>
  </template>
</t-table>

## Responsive table (experimental)

When you set the `responsive` option and the screen is smaller than the `responsiveBreakpoint` option (default to 768) the header will be hidden and the rest of the slots will have a `renderResponsive` prop variable with the value of `true`.

You can use that variable to render custom layouts for mobile devices.

Check the following full working example (Resize your screen to see the responsive layout):

<t-table 
  :headers="['Name', 'E-mail', 'Status', '']" 
  :data="[
    {
      id: 1,
      name: 'Alfonso Bribiesca',
      email: 'alfonso@vexilo.com',
      is_approved: true,
    },
    {
      id: 2,
      name: 'Saida Redondo',
      email: 'saida@gmail.com',
      is_approved: false,
    },
  ]"
  :responsive="true"
  :responsive-breakpoint="1024"
  :tbody-class="{ tbody: 'border-t lg:border-0', tr: 'border-0 lg:border-t', td: 'p-3' }"
>
  <template v-slot:tbody="{ tbodyClass, trClass, tdClass, thClass, renderResponsive, data }">
    <template v-if="renderResponsive">
      <tbody 
        v-for="(row, rowIndex) in data"
        :key="rowIndex" 
        :class="[tbodyClass, rowIndex % 2 === 0 ? 'bg-gray-100' : '']">
        <tr :class="trClass">
          <th :class="thClass">Name</th>
          <td :class="[tdClass, 'relative']">
            <t-dropdown 
              :visible-arrow="false"
              placement="left-start"
              variant="tertiary"
              class="absolute right-0 top-0"
            >
              <template v-slot:button-content>
                <svg version="1.1" viewBox="0 0 16 16" class="fill-current text-gray-600 svg-icon svg-fill" heigth="20" style="width: 20px;"><path pid="0" d="M13 7a2 2 0 1 1 .001 3.999A2 2 0 0 1 13 7zM8 7a2 2 0 1 1 .001 3.999A2 2 0 0 1 8 7zM3 7a2 2 0 1 1 .001 3.999A2 2 0 0 1 3 7z"></path></svg>
              </template>
              <button
                class="block hover:text-white text-gray-800 px-4 py-2 hover:bg-blue-500 w-full text-left"
              >Edit</button>
              <button
                class="block hover:text-white text-gray-800 px-4 py-2 hover:bg-blue-500 w-full text-left"
              >Delete</button>
            </t-dropdown>
            {{ row.name }}
          </td>
        </tr>
        <tr :class="trClass">
          <th :class="thClass">Email</th>
          <td :class="[tdClass, 'td-overflow']">
            <a 
              :href="`mailto: ${row.email}`" 
              class="text-gray-600 hover:underline"
            >{{ row.email }}</a>
          </td>
        </tr>
        <tr :class="trClass">
          <th :class="thClass">Status</th>
          <td :class="[tdClass]">
            <span
              v-if="row.is_approved"
              class="d-flex py-1 px-5 bg-green-200 text-green-900 text-sm rounded-full font-bold"
            >
              Active
            </span>
            <span
              v-else
              class="d-flex py-1 px-5 bg-gray-200 text-gray-900 text-sm rounded-full font-bold"
            >
              Inactive
            </span>
          </td>
        </tr>
      </tbody>
    </template>
  </template>
  <template v-slot:row="{ trClass, tdClass, rowIndex, row }">
    <tr :class="[trClass, rowIndex % 2 === 0 ? 'bg-gray-100' : '']">
      <td :class="[tdClass, 'w-full']">
        {{ row.name }}
      </td>
      <td :class="tdClass">
        <a 
          :href="`mailto: ${row.email}`" 
          class="text-gray-600 hover:underline"
        >{{ row.email }}</a>
      </td>
      <td :class="[tdClass, 'text-center']">
        <span
          v-if="row.is_approved"
          class="d-flex py-2 px-5 bg-green-200 text-green-900 text-sm rounded-full font-bold"
        >
          Active
        </span>
        <span
          v-else
          class="d-flex py-2 px-5 bg-gray-200 text-gray-900 text-sm rounded-full font-bold"
        >
          Inactive
        </span>
      </td>
      <td :class="[tdClass, 'text-right']">
        <t-dropdown 
          :visible-arrow="false"
          placement="bottom-end"
          variant="tertiary"
        >
          <template v-slot:button-content>
            <svg version="1.1" viewBox="0 0 16 16" class="fill-current text-gray-600 svg-icon svg-fill" heigth="20" style="width: 20px;"><path pid="0" d="M13 7a2 2 0 1 1 .001 3.999A2 2 0 0 1 13 7zM8 7a2 2 0 1 1 .001 3.999A2 2 0 0 1 8 7zM3 7a2 2 0 1 1 .001 3.999A2 2 0 0 1 3 7z"></path></svg>
          </template>
          <button
            class="block hover:text-white text-gray-800 px-4 py-2 hover:bg-blue-500 w-full text-left"
          >Edit</button>
          <button
            :to="{ name: 'settings.profile' }"
            class="block hover:text-white text-gray-800 px-4 py-2 hover:bg-blue-500 w-full text-left"
          >Delete</button>
        </t-dropdown>
      </td>
    </tr>
  </template>
  <template v-slot:tfoot="{ tfootClass, trClass, tdClass, renderResponsive }">
    <tfoot :class="tfootClass">
      <tr :class="trClass">
        <td 
          :class="tdClass" 
          :colspan="renderResponsive ? 2 : 4"
        >
          <t-pagination
            :hide-prev-next-controls="renderResponsive"
            :total-items="100"
            :per-page="renderResponsive ? 3 : 5"
            :class="{'ml-auto': !renderResponsive, 'mx-auto': renderResponsive}"
          />
        </td>
      </tr>
    </tfoot>
  </template>
</t-table>

``` html  {17,18,22,128,131,133,134}
<t-table 
  :headers="['Name', 'E-mail', 'Status', '']" 
  :data="[
    {
      id: 1,
      name: 'Alfonso Bribiesca',
      email: 'alfonso@vexilo.com',
      is_approved: true,
    },
    {
      id: 2,
      name: 'Saida Redondo',
      email: 'saida@gmail.com',
      is_approved: false,
    },
  ]"
  :responsive="true"
  :responsive-breakpoint="1024"
  :tbody-class="{ tbody: 'border-t lg:border-0', tr: 'border-0 lg:border-t', td: 'p-3' }"
>
  <template v-slot:tbody="{ tbodyClass, trClass, tdClass, thClass, renderResponsive, data }">
    <template v-if="renderResponsive">
      <tbody 
        v-for="(row, rowIndex) in data"
        :key="rowIndex" 
        :class="[tbodyClass, rowIndex % 2 === 0 ? 'bg-gray-100' : '']">
        <tr :class="trClass">
          <th :class="thClass">Name</th>
          <td :class="[tdClass, 'relative']">
            <t-dropdown 
              :visible-arrow="false"
              placement="left-start"
              variant="tertiary"
              class="absolute right-0 top-0"
            >
              <template v-slot:button-content>
                <svg version="1.1" viewBox="0 0 16 16" class="fill-current text-gray-600 svg-icon svg-fill" heigth="20" style="width: 20px;"><path pid="0" d="M13 7a2 2 0 1 1 .001 3.999A2 2 0 0 1 13 7zM8 7a2 2 0 1 1 .001 3.999A2 2 0 0 1 8 7zM3 7a2 2 0 1 1 .001 3.999A2 2 0 0 1 3 7z"></path></svg>
              </template>
              <button
                class="block hover:text-white text-gray-800 px-4 py-2 hover:bg-blue-500 w-full text-left"
              >Edit</button>
              <button
                class="block hover:text-white text-gray-800 px-4 py-2 hover:bg-blue-500 w-full text-left"
              >Delete</button>
            </t-dropdown>
            {{ row.name }}
          </td>
        </tr>
        <tr :class="trClass">
          <th :class="thClass">Email</th>
          <td :class="[tdClass, 'td-overflow']">
            <a 
              :href="`mailto: ${row.email}`" 
              class="text-gray-600 hover:underline"
            >{{ row.email }}</a>
          </td>
        </tr>
        <tr :class="trClass">
          <th :class="thClass">Status</th>
          <td :class="[tdClass]">
            <span
              v-if="row.is_approved"
              class="d-flex py-1 px-5 bg-green-200 text-green-900 text-sm rounded-full font-bold"
            >
              Active
            </span>
            <span
              v-else
              class="d-flex py-1 px-5 bg-gray-200 text-gray-900 text-sm rounded-full font-bold"
            >
              Inactive
            </span>
          </td>
        </tr>
      </tbody>
    </template>
  </template>
  <template v-slot:row="{ trClass, tdClass, rowIndex, row }">
    <tr :class="[trClass, rowIndex % 2 === 0 ? 'bg-gray-100' : '']">
      <td :class="[tdClass, 'w-full']">
        {{ row.name }}
      </td>
      <td :class="tdClass">
        <a 
          :href="`mailto: ${row.email}`" 
          class="text-gray-600 hover:underline"
        >{{ row.email }}</a>
      </td>
      <td :class="[tdClass, 'text-center']">
        <span
          v-if="row.is_approved"
          class="d-flex py-2 px-5 bg-green-200 text-green-900 text-sm rounded-full font-bold"
        >
          Active
        </span>
        <span
          v-else
          class="d-flex py-2 px-5 bg-gray-200 text-gray-900 text-sm rounded-full font-bold"
        >
          Inactive
        </span>
      </td>
      <td :class="[tdClass, 'text-right']">
        <t-dropdown 
          :visible-arrow="false"
          placement="bottom-end"
          variant="tertiary"
        >
          <template v-slot:button-content>
            <svg version="1.1" viewBox="0 0 16 16" class="fill-current text-gray-600 svg-icon svg-fill" heigth="20" style="width: 20px;"><path pid="0" d="M13 7a2 2 0 1 1 .001 3.999A2 2 0 0 1 13 7zM8 7a2 2 0 1 1 .001 3.999A2 2 0 0 1 8 7zM3 7a2 2 0 1 1 .001 3.999A2 2 0 0 1 3 7z"></path></svg>
          </template>
          <button
            class="block hover:text-white text-gray-800 px-4 py-2 hover:bg-blue-500 w-full text-left"
          >Edit</button>
          <button
            :to="{ name: 'settings.profile' }"
            class="block hover:text-white text-gray-800 px-4 py-2 hover:bg-blue-500 w-full text-left"
          >Delete</button>
        </t-dropdown>
      </td>
    </tr>
  </template>
  <template v-slot:tfoot="{ tfootClass, trClass, tdClass, renderResponsive }">
    <tfoot :class="tfootClass">
      <tr :class="trClass">
        <td 
          :class="tdClass" 
          :colspan="renderResponsive ? 2 : 4"
        >
          <t-pagination
            :hide-prev-next-controls="renderResponsive"
            :total-items="100"
            :per-page="renderResponsive ? 3 : 5"
            :class="{'ml-auto': !renderResponsive, 'mx-auto': renderResponsive}"
          />
        </td>
      </tr>
    </tfoot>
  </template>
</t-table>
```

## Default theme settings

<<< @/src/themes/default/TTable.js

- Remember that in order to change the default settings you can [change default theme](/#_2-2-or-better-yet-create-your-own-theme) or use the props: 

```vue
<t-table
  table-class="w-full rounded-lg overflow-hidden table border-blue-700 border"
  :thead-class="{
    thead: '',
    tr: 'border-blue-700',
    th: 'uppercase font-bold p-2 bg-blue-500 text-blue-900 text-sm text-shadow',
  }"
  :tbody-class="{
    tbody: '',
    tr: 'border-t-0',
    td: 'p-2 text-sm text-center bg-blue-400 text-blue-900',
  }"
  :headers="['Name', 'Email', 'Age', 'Sales']"
  :data="[
    ['Alfonso Bribiesca', 'alfonso@vexilo.com', '31', '$9,999.00'],
    ['Saida Redondo', 'saida@gmail.com', 27, '$124.00'],
    ['Regina Bribiesca', 'regina@gmail.com', 1, '$0.00']
  ]"
/>
```

### The result:

<t-card class="mt-2 bg-gray-100">
<t-table
  table-class="w-full rounded-lg overflow-hidden table border-blue-700 border"
  :thead-class="{
    thead: '',
    tr: 'border-blue-700',
    th: 'uppercase font-bold p-2 bg-blue-500 text-blue-900 text-sm text-shadow',
  }"
  :tbody-class="{
    tbody: '',
    tr: 'border-t-0',
    td: 'p-2 text-sm text-center bg-blue-400 text-blue-900',
  }"
  :headers="['Name', 'Email', 'Age', 'Sales']"
  :data="[
    ['Alfonso Bribiesca', 'alfonso@vexilo.com', '31', '$9,999.00'],
    ['Saida Redondo', 'saida@gmail.com', 27, '$124.00'],
    ['Regina Bribiesca', 'regina@gmail.com', 1, '$0.00']
  ]"
/>
</t-card>