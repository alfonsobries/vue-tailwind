<template>
  <div
    id="app"
    class="flex flex-col max-w-lg mx-auto p-5"
  >
    <t-select
      v-model="variant"
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
      default: 'border block rounded bg-white p-3',
      error: 'border block rounded bg-red-500 text-white p-3',
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
