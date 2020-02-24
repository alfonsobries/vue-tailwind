---
title: Modal
lang: en-US
---

# Modal

## Playground

<datepicker-playground />

## Props

| Property         | Type    | Default value | Accepted values                                             | 
| ---------------- | ------- | ------------- | ----------------------------------------------------------- | 
| transition          | String  | null          | Transition for open the modal  | 
| value (v-model)          | Boolean  | false           | Will show the modal according the the value |
| header          | String  | null           |  The content of the header	|
| clickToClose          | Boolean  | true           |  If set the modal will close when user click outside	|
| escToClose          | Boolean  | true           |  If set the modal will close when user press the `esc` button	|
| width          | Number  | [String, Number]            |  The width of the modal	|
| height          | Number  | [String, Number]            |  The height of the modal	|
| pivotY          | Number  | 0.1            |  Vertical position in %, default is 0.1 (meaning that modal box will be in the middle (50% from top) of the window	|
| hideCloseButton          | Boolean  | false           |  If set will hidde the close button |

__Note:__ To show & hide the modal you can also call directly the `show()` and `hide()` methods. Example:

```
<t-modal ref="modal">hello world</t-modal>

<button @click="$refs.modal.show()">Show modal</button>
``` 


## Classes related props

| Property         | Description                           |
| ---------------- | ------------------------------------- |
| baseClass        | Main wrapper class      |
| overlayClass     | Overlay classes |
| containerClass     | Modal container class |
| closeIconClass      | Close icon classes |
| wrapperClass     | Modal content wrapper class |
| headerClass | Header container class          |
| bodyClass | Body container class         |
| footerClass   | Footer container class       |
__Note:__ Some of the classes defined for `baseClass`, `overlayClass` and `containerClass` are necessary for this component to work correctly.

## Events

### Events

| Name         | Description |
| ---          | --- |
| before-open  | Emits while modal is still invisible, but was added to the DOM |
| opened       | Emits after modal became visible or started transition |
| before-close | Emits before modal is going to be closed. Can be stopped from the event listener calling `event.stop()` (example: you are creating a text editor, and want to stop closing and ask the user to correct mistakes if the text is not valid)
| closed       | Emits right before modal is destroyed |
| input       | Emits when the v-model value change |

## Slots

| Slot   | description
|---    |---                      |
| default   |  Content of the modal | 
| header   |  Content of the header | 
| footer   |  Content of the footer | 
| close   |  Content of the close button | 

## Default theme settings

<<< @/src/themes/default/TModal.js

- Remember that in order to change the default settings you can [change default theme](/#_2-2-or-better-yet-create-your-own-theme) or use the props: 

```vue
<t-modal
  wrapper-class="bg-red-100 border-red-400 text-red-700 rounded shadow-xl flex flex-col"
  overlay-class="z-40 overflow-auto left-0 top-0 bottom-0 right-0 w-full h-full fixed bg-red-900 opacity-75"
  body-class="text-xl flex flex-col items-center justify-center p-6 flex-grow"
  footerClass="bg-red-400 p-3 flex justify-between"
  show
  ref="modal"
>
  <h1 class="text-xl">Warning</h1>
  <p>This section is super secret.</p>
  <template v-slot:footer>
  	<t-button
  	  variant="tertiary"
      tertiary-class="border block text-white border-transparent hover:text-gray-300"
      @click="$refs.modal.hide()"
  	>
	  Or not
  	</t-button>	
  	<t-button @click="$refs.modal.hide()" variant="danger">
  	  Understood
  	</t-button>	
  </template>
</t-modal>
```

### The result:

<t-card class="mt-2 bg-gray-100">
<t-modal
  wrapper-class="bg-red-100 border-red-400 text-red-700 rounded shadow-xl flex flex-col"
  overlay-class="z-40 overflow-auto left-0 top-0 bottom-0 right-0 w-full h-full fixed bg-red-900 opacity-75"
  body-class="text-xl flex flex-col items-center justify-center p-6 flex-grow"
  footerClass="bg-red-400 p-3 flex justify-between"
  show
  ref="modal"
>
  <h1 class="text-xl">Warning</h1>
  <p>This section is super secret.</p>
  <template v-slot:footer>
  	<t-button
  	  variant="tertiary"
      tertiary-class="border block text-white border-transparent hover:text-gray-300"
      @click="$refs.modal.hide()"
  	>
	  Or not
  	</t-button>	
  	<t-button @click="$refs.modal.hide()" variant="danger">
  	  Understood
  	</t-button>	
  </template>
</t-modal>
<p><t-button @click="$refs.modal.show()">Show the modal</t-button></p>
</t-card>