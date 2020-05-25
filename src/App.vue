<template>
  <div
    id="app"
    class="flex flex-col max-w-lg mx-auto p-5"
  >
    <t-input-group
      label="Select variant"
      description="Select a variant to apply to some of the components"
      feedback="Some feedback"
      :variant="variant === 'error' ? variant : undefined"
    >
      <t-select
        v-model="variant"
        :options="variants"
        :variant="variant"
      />
    </t-input-group>

    <t-input-group>
      <template v-slot:label>
        label from slot
      </template>
      <template v-slot:description>
        Description from slot
      </template>
      <template v-slot:feedback>
        Feedback from slot
      </template>
      <t-input
        v-model="model"
        :variant="variant"
      />
    </t-input-group>

    <t-input
      v-model="classes"
    />

    <t-input
      v-model="classes"
      :classes="classes"
    />

    <t-input
      v-model="classes"
      :classes="classes"
    />


    <label
      v-for="variantValue in variants"
      :key="variantValue"
      class="flex items-center"
      :for="`variant-${variantValue}`"
    >
      <t-radio
        :id="`variant-${variantValue}`"
        v-model="variant"
        :value="variantValue"
        name="variant"
      />

      <span class="ml-2 text-sm">
        {{ variantValue }}
      </span>
    </label>


    <t-textarea
      :variant="{
        'default': activeVariant,
        'error': !activeVariant,
      }"
      value="variants from object"
    />

    <t-checkbox
      v-model="activeVariant"
      name="activeVariant"
    />

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

    <t-button>Hello world</t-button>

    <t-select
      :options="[
        { value: 'With optgroup', text: 'With optgroup' },
        { value: 'Option 2', text: 'Option 2' },
        {
          text: 'Numbers',
          children: [
            { value: 1, text: 1 },
            { value: 2, text: 2 },
          ]
        },
        {
          text: 'Letters',
          children: [
            { value: 'A', text: 'A' },
            { value: 'B', text: 'B' },
            { value: 'C', text: 'C' },
          ]
        },
      ]"
      value="With optgroup"
    />


    <t-select
      :options="['A', 'No model selected', 'multiple']"
      :value="['No model selected', 'multiple']"
      multiple
    />

    <t-select
      :options="['A', 'No model selected', 'C']"
      value="No model selected"
    />

    <label
      class="flex items-center"
      for="checked"
    >
      <t-radio
        checked
      />

      <span class="ml-2 text-sm">
        no model selected
      </span>
    </label>

    <label
      class="flex items-center"
      for="checked"
    >
      <t-checkbox
        checked
      />

      <span class="ml-2 text-sm">
        no model checked
      </span>
    </label>


    <t-input
      value="no model value"
    />
    <t-textarea
      value="no model value"
    />

    <t-alert
      show
      dismissible
      :variant="variant"
    >
      Something goes wrong!
    </t-alert>
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
//   variants: {
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
  TAlert: {
    classes: {
      wrapper: 'rounded bg-blue-100 p-4 flex',
      body: 'flex-grow',
      close: 'whitespace-no-wrap font-medium text-blue-700 hover:text-blue-600',
      closeIcon: 'h-5 w-5 fill-current',
    },
    variants: {
      default: {
        wrapper: 'rounded bg-blue-100 p-4 flex',
        body: 'flex-grow',
        close: 'whitespace-no-wrap font-medium text-blue-700 hover:text-blue-600',
        closeIcon: 'h-5 w-5 fill-current',
      },
      error: {
        wrapper: 'rounded bg-red-100 p-4 flex',
        close: 'whitespace-no-wrap font-medium text-red-700 hover:text-red-600',
      },
    },
  },
  TInputGroup: {
    classes: {
      label: 'block uppercase tracking-wide text-xs font-bold mb-1',
      feedback: 'text-sm',
      description: 'text-sm',
      wrapper: 'mb-3',
      body: 'p-1',
    },
    variants: {
      error: {
        label: 'block uppercase tracking-wide text-xs font-bold mb-1 text-red-500',
        feedback: 'text-sm text-red-500',
        description: 'text-sm',
        wrapper: 'mb-3',
      },

    },
  },
  TButton: {
    classes: 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded',
  },
  TSelect: {
    classes: 'form-select',
    // classes: {
    //   wrapper: 'relative',
    //   input: 'block appearance-none w-full border bg-white rounded p-3 border-2',
    //   arrow: 'fill-current h-4 w-4',
    //   arrowWrapper: 'pointer-events-none absolute inset-y-0 right-0 flex items-center px-1',
    // },
    // variants: {
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
    variants: {
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
    variants: {
      default: 'border block rounded bg-blue-100 p-3',
      error: 'border block rounded bg-red-500 text-white p-3',
    },
  },
  TRadio: {
    classes: 'form-radio text-indigo-600',
    variants: {
      default: 'border block rounded bg-white p-3',
      error: 'border block rounded bg-red-500 text-white p-3',
    },
  },
  TCheckbox: {
    classes: 'form-checkbox text-green-500',
    variants: {
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
      classes: 'border-2 bg-yellow-100 p-2 shadow rounded',
      indeterminate: false,
      checked: 'Checked',
      model: '',
      multipleVariants: ['error', 'asarray'],
      variant: 'error',
      variants: ['default', 'error', 'notdefined', 'asarray', 'asobject'],
      activeVariant: false,
    };
  },
};
</script>
