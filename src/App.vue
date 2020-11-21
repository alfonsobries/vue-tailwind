/* eslint-disable max-len */
<template>
  <div class="max-w-md mx-auto my-10">
    <div class="grid grid-cols-1 gap-6">
      <label class="block">
        <span class="text-gray-700">TInput</span>
        <t-input placeholder="My placeholder" />
      </label>
      <label class="block">
        <span class="text-gray-700">TTextarea</span>
        <t-textarea placeholder="My placeholder" />
      </label>
      <label class="block">
        <span class="text-gray-700">TSelect</span>
        <t-select :options="options" />
      </label>
      <div class="block">
        <span class="text-gray-700">TCheckbox</span>
        <div class="mt-2">
          <div>
            <label class="inline-flex items-center">
              <t-checkbox checked />

              <span class="ml-2">Check me</span>
            </label>
          </div>
        </div>
      </div>
      <div class="block">
        <span class="text-gray-700">TRadio</span>
        <div class="mt-2">
          <div>
            <label class="inline-flex items-center">
              <t-radio
                name="radio"
                checked
              />

              <span class="ml-2">Select this</span>
            </label>
          </div>
          <div>
            <label class="inline-flex items-center">
              <t-radio name="radio" />

              <span class="ml-2">Or select this</span>
            </label>
          </div>
        </div>
      </div>
      <label class="block">
        <span class="text-gray-700">TButton</span>
        <div>
          <t-button>My button</t-button>
        </div>
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import '../css/tailwind.css';

import Vue from 'vue';
import VueTailwind from './index';
import TInput from './t-input';
import TTextarea from './t-textarea';
import TButton from './t-button';
import TSelect from './t-select';
import TCheckbox from './t-checkbox';
import TRadio from './t-radio';

Vue.use(VueTailwind, {
  't-input': TInput,
  't-textarea': TTextarea,
  't-button': TButton,
  't-select': TSelect,
  't-checkbox': TCheckbox,
  't-radio': TRadio,
});

export default Vue.extend({
  data() {
    return {
      options: [
        'Option A',
        'Option B',
        'Option C',
      ],
    };
  },
});
</script>
