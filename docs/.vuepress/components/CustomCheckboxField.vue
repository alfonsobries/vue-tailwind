<template>
  <input-demo>
    <div
      v-for="(option, index) in options"
      class="flex py-1"
    >
      <t-checkbox
        ref="input"
        :key="option.value"
        :id="`${id}-${index}`"
        v-model="model"
        :disabled="disabled"
        :name="name"
        :value="option.value"
        :status="status"
        class="custom-checkbox"
      />
      <label class="ml-3" :for="`${id}-${index}`">{{ option.text }}</label>
    </div>

    <template slot="controls">
      <disabled-control v-model="disabled" />

      <status-control v-model="status" />

      <p class="flex items-center mt-2">
        <label 
          for="rows" 
          class="mr-2">
          Add option:
        </label>
        <t-input
          id="newOption"
          v-model.number="newOption"
          name="newOption"
          default-class="p-1 border text-sm"
          @keyup.enter="addNewOption"
        />
      </p>
    </template>

    <template slot="value">
      <p>Current value: <pre class="text-white">{{ model }}</pre></p>
    </template>

  </input-demo>
</template>

<script>
import getRenderedClass from '../mixins/getRenderedClass'


export default {
  name: 'CustomCheckboxField',

  mixins: [getRenderedClass],

  data () {
    return {
      model: ['Option 1', 'Option 3'],
      id: 'custom-checkbox-field',
      name: 'custom-checkbox-field',
      options: [
        { value: 'Option 1', text: 'Option 1' },
        { value: 'Option 2', text: 'Option 2' },
        { value: 'Option 3', text: 'Option 3' },
        { value: 'Option 4', text: 'Option 4' },
        { value: 'Option 5', text: 'Option 5' },
      ],
      newOption: '',
    }
  },

  methods: {
    addNewOption() {
      if (!this.newOption) {
        return
      }
      const option = { value: this.newOption, text: this.newOption }
      this.options.push(option)
      this.model.push(option.value)
      this.newOption = ''
    },
  }
}
</script>

<style>
input.custom-checkbox:checked,
input.custom-checkbox:not(:checked) {
  @apply absolute;
  left: -9999px;
}
input.custom-checkbox:checked + label,
input.custom-checkbox:not(:checked) + label
{
  @apply relative pl-8 cursor-pointer leading-normal inline-block;
}
input.custom-checkbox:checked + label:before,
input.custom-checkbox:not(:checked) + label:before {
  @apply absolute border border-gray-400 top-0 left-0 w-6 h-6 bg-white;
  content: '';
}
input.custom-checkbox:checked + label:after,
input.custom-checkbox:not(:checked) + label:after {
  @apply top-0 left-0 absolute flex items-center justify-center w-6 h-6 text-blue-500 font-bold text-xl;
  content: '\2713\0020';
  transition: all 0.2s ease;
}

input.custom-checkbox:not(:checked) + label:after {
  @apply opacity-0;
  transform: scale(0);
}
input.custom-checkbox:checked + label:after {
  @apply opacity-100;
  transform: scale(1);
}

input.custom-checkbox.t-checkbox-disabled + label:after {
  @apply opacity-50;
}

/** By status */
input.custom-checkbox.t-checkbox-status-error:checked + label:after,
input.custom-checkbox.t-checkbox-status-error:not(:checked) + label:after {
  @apply text-red-500
}
input.custom-checkbox.t-checkbox-status-success:checked + label:after,
input.custom-checkbox.t-checkbox-status-success:not(:checked) + label:after {
   @apply text-green-500
}
input.custom-checkbox.t-checkbox-status-warning:checked + label:after,
input.custom-checkbox.t-checkbox-status-warning:not(:checked) + label:after {
  @apply text-yellow-500
}
</style>
