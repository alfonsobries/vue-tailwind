---
title: Pagination
lang: en-US
---

# Pagination

<pagination-playground />

### Simple usage

```html
<t-pagination
  :total-items="totalRows"
  :per-page="perPage"
  :limit="limit"
  :disabled="disabled"
  v-model="currentPage"
/>
```

## Props

| Property   | Type  | Default value |  Description                                                  |
| ---------- | ----- | ------------- |  ------------------------------------------------------------ |
| value       | Number | null           |  The currentpage number (`v-model`) of the component |
| tagName    | String | 'ul'            |  The tag name that will wrapper the component |
| elementTagName | String | 'li'           |  The tag name that will wrapper every button in the pagination |
| disabled | Boolean | false           |  If set the pagination button will be disabled |
| perPage | Number | 20           |  Number of items that every page represents |
| limit | Number | 5           |  How many buttons (including the ellipsis if shown) should be rendered |
| prevLabel | String | \&lsaquo; (&lsaquo;) |  Prev button label |
| nextLabel | String | \&rsaquo; (&lsaquo;) |  Next button label |
| firstLabel | String | \&laquo; (&lsaquo;) |  First button label |
| lastLabel | String | \&raquo; (&lsaquo;) |  Last button label |
| ellipsisLabel | String | \&hellip; (&hellip;) |  Ellipsis control label |
| hideFirstLastControls | Boolean | false | If set will hide the first and last controls  |
| hidePrevNextControls | Boolean | false | If set will hide the prev and next controls  |
| hideEllipsis | Boolean | false | If set will hide ellipsis control  |

## Classes related props



| Property         | Description                                          |
| ---------------- | ---------------------------------------------------- |
| wrapperClass       | Pagination wrapper class |
| itemClass       | Pagination item class |
| pageClass       | Page wrapper class |
| buttonClass       | Pagination button class |
| inactiveButtonClass       | Inactive button class (added to the `buttonClass`) |
| activeButtonClass       | Active button class (added to the `buttonClass`)|
| disabledButtonClass       | Disabled button class (added to the `buttonClass`)|
| controlClass       | Class for the "prev", "next", "first" and "last" button wrapper |
| disabledControlClass       | (added to the `controlClass`) when disabled  |
| controlButtonClass       | Class for the "prev", "next", "first" and "last" button) |
| disabledControlButtonClass       | (added to the `controlButtonClass`) when disabled |
| ellipsisClass       | Ellipsis button wrapper class |
| ellipsisButtonClass       | Ellipsis button class |

## Default theme settings

<<< @/src/themes/default/TPagination.js

- Remember that in order to change the default settings you can [change default theme](/#_2-2-or-better-yet-create-your-own-theme) or use the props: 

```vue
<t-pagination
  prev-label="Previous"
  next-label="Next"
  first-label="First"
  last-label="Last"
  :total-items="100"
  :per-page="4"
  :limit="5"
  :value="3"
  :hide-ellipsis="true"
  :hide-first-last-controls="true"
  wrapper-class="flex w-full justify-between"
  item-class="h-12"
  page-class="w-12"
  control-class=""
  disabled-control-class="opacity-50"
  ellipsis-class=""
  button-class="p-2 text-blue-500 hover:text-blue-700 w-full"
  control-button-class="text-blue-500 hover:text-blue-700"
  ellipsis-button-class="text-gray-600"
  active-button-class="font-bold underline"
/>
```

### The result:

<t-card class="mt-2 bg-gray-100">
<t-pagination
  prev-label="Previous"
  next-label="Next"
  first-label="First"
  last-label="Last"
  :total-items="100"
  :per-page="4"
  :limit="5"
  :value="3"
  :hide-ellipsis="true"
  :hide-first-last-controls="true"
  wrapper-class="flex w-full justify-between"
  item-class="h-12"
  page-class="w-12"
  control-class=""
  disabled-control-class="opacity-50"
  ellipsis-class=""
  button-class="p-2 text-blue-500 hover:text-blue-700 w-full"
  control-button-class="text-blue-500 hover:text-blue-700"
  ellipsis-button-class="text-gray-600"
  active-button-class="font-bold underline"
/>
</t-card>