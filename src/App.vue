<template>
  <div
    id="app"
    class="flex flex-col max-w-lg mx-auto p-5"
  >
    <t-select
      v-model="variant"
      :options="variants"
      :variant="variant"
    />

    <t-input
      v-model="model"
      :variant="variant"
    />

    <t-textarea
      v-model="model"
      :variant="variant"
    />

    <div
      v-for="variantValue in variants"
      :key="variantValue"
      class="flex items-center"
    >
      <t-radio
        v-model="variant"
        :value="variantValue"
        name="variant"
      />

      <span class="ml-2 text-sm">
        {{ variantValue }}
      </span>
    </div>

    <link
      href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css"
      rel="stylesheet"
    >
  </div>
</template>

<script lang="ts">
/* eslint-disable max-len */

import Vue from 'vue';
import VueTailwind from './index';

// import TInput from './t-input';
// import TTextarea from './t-textarea';
// import TSelect from './t-select';
// import TRadio from './t-radio';

// Vue.use((TInput as any), {
//   classes: 'border block rounded bg-white p-3',
//   theme: {
//     default: 'border block rounded bg-white p-3',
//     error: 'border block rounded bg-red-500 text-white p-3',
//     asarray: ['border', 'block', 'rounded', 'bg-blue-500', 'text-white', 'p-3'],
//     asobject: {
//       border: true,
//       block: 'yes',
//       'rounded bg-yellow-300 text-red-500 p-3': 'yes',
//     },
//   },
// });

Vue.use(VueTailwind, {
  TSelect: {
    classes: {
      wrapper: 'relative',
      input: 'block appearance-none w-full border bg-white rounded p-3 border-2',
      arrow: 'fill-current h-4 w-4',
      arrowWrapper: 'pointer-events-none absolute inset-y-0 right-0 flex items-center px-1',
    },
    theme: {
      default: {
        wrapper: 'relative',
        input: 'block appearance-none w-full border pr-8 rounded leading-tight bg-white p-3',
        arrowWrapper: 'pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700',
        arrow: 'fill-current h-4 w-4',
      },
      error: {
        wrapper: 'relative',
        input: 'block appearance-none w-full border pr-8 rounded leading-tight bg-red-500 text-white   p-3',
        arrowWrapper: 'pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700',
        arrow: 'fill-current h-4 w-4',
      },
    },
  },
  TInput: {
    classes: 'border block rounded bg-white p-3',
    theme: {
      default: 'border block rounded bg-white p-3',
      error: 'border block rounded bg-red-500 text-white p-3',
      asarray: ['border', 'block', 'rounded', 'bg-blue-500', 'text-white', 'p-3'],
      asobject: {
        border: true,
        block: 'yes',
        'rounded bg-yellow-300 text-red-500 p-3': 'yes',
      },
    },
  },
  TTextarea: {
    classes: 'border block rounded bg-white p-3',
    theme: {
      default: 'border block rounded bg-white p-3',
      error: 'border block rounded bg-red-500 text-white p-3',
    },
  },
});

export default {
  components: {
    // TInput,
    // TSelect,
    // TTextarea,
    // TRadio,
  },
  data() {
    return {
      model: '',
      variant: undefined,
      variants: ['default', 'error', 'notdefined', 'asarray', 'asobject'],
    };
  },
};
</script>
