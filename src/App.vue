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

    <label
      v-for="variantValue in variants"
      :key="variantValue"
      class="flex items-center"
      for="variant"
    >
      <t-radio
        v-model="variant"
        :value="variantValue"
        name="variant"
      />

      <span class="ml-2 text-sm">
        {{ variantValue }}
      </span>
    </label>

    <label
      class="flex items-center"
      for="checked"
    >
      <t-checkbox
        v-model="checked"
        name="checked"
        value="Checked"
        unchecked-value="Unchecked"
        :indeterminate.sync="indeterminate"
      />
      <span class="ml-2 text-sm">
        {{ checked }}
      </span>
    </label>

    <label
      class="flex items-center"
      for="checked"
    >
      <t-checkbox
        v-model="indeterminate"
        name="indeterminate"
      />
      <span class="ml-2 text-sm">
        indeterminate: {{ indeterminate }}
      </span>
    </label>

    <t-select
      v-model="multipleVariants"
      :options="variants"
      multiple
    />

    <label
      v-for="variantValue in variants"
      :key="`check-${variantValue}`"
      class="flex items-center"
      for="variant"
    >
      <t-checkbox
        v-model="multipleVariants"
        :value="variantValue"
        name="variant"
      />

      <span class="ml-2 text-sm">
        {{ variantValue }}
      </span>
    </label>
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
    classes: 'form-select',
    // classes: {
    //   wrapper: 'relative',
    //   input: 'block appearance-none w-full border bg-white rounded p-3 border-2',
    //   arrow: 'fill-current h-4 w-4',
    //   arrowWrapper: 'pointer-events-none absolute inset-y-0 right-0 flex items-center px-1',
    // },
    // theme: {
    //   default: {
    //     wrapper: 'relative',
    //     input: 'block appearance-none w-full border pr-8 rounded leading-tight bg-white p-3',
    //     arrowWrapper: 'pointer-events-none absolute inset-y-0 right-0 flex items-center px-2',
    //     arrow: 'fill-current h-4 w-4',
    //   },
    //   error: {
    //     wrapper: 'relative text-white',
    //     input: 'block appearance-none w-full border pr-8 rounded leading-tight bg-red-500 p-3',
    //     arrowWrapper: 'pointer-events-none absolute inset-y-0 right-0 flex items-center px-2',
    //     arrow: 'fill-current h-4 w-4',
    //   },
    // },
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
    classes: 'form-textarea',
    theme: {
      default: 'border block rounded bg-white p-3',
      error: 'border block rounded bg-red-500 text-white p-3',
    },
  },
  TRadio: {
    classes: 'form-radio text-indigo-600',
    theme: {
      default: 'border block rounded bg-white p-3',
      error: 'border block rounded bg-red-500 text-white p-3',
    },
  },
  TCheckbox: {
    classes: 'form-checkbox text-green-500',
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
      indeterminate: false,
      checked: 'Checked',
      model: '',
      multipleVariants: ['error', 'asarray'],
      variant: undefined,
      variants: ['default', 'error', 'notdefined', 'asarray', 'asobject'],
    };
  },
};
</script>
