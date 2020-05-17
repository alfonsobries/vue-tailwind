<template>
  <div
    id="app"
    class="flex flex-col max-w-lg mx-auto p-5"
  >
    <t-select
      v-model="variant"
      :variant="variant"
      :options="variants"
    />

    <t-input
      v-model="model"
      :variant="variant"
    />

    <t-textarea
      v-model="model"
      :variant="variant"
    />

    <link
      href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css"
      rel="stylesheet"
    >
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import VueTailwind from './index';

import TInput from './components/TInput.vue';
import TTextarea from './components/TTextarea.vue';
import TSelect from './components/TSelect.vue';

Vue.use(VueTailwind, {
  theme: {
    TInput: {
      default: 'border block rounded bg-white p-3',
      error: 'border block rounded bg-red-500 text-white p-3',
    },
    TSelect: {
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
    TTextarea: {
      default: 'border block rounded bg-white p-3',
      error: 'border block rounded bg-red-500 text-white p-3',
    },
  },
});

export default {
  components: {
    TInput,
    TSelect,
    TTextarea,
  },
  data() {
    return {
      model: '',
      variant: 'default',
      variants: ['default', 'error'],
    };
  },
};


</script>
