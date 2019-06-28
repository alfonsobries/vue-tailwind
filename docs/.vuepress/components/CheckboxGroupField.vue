<template>
  <input-demo>
    <t-checkbox-group
      ref="input"
      v-model="model"
      :disabled="disabled"
      :id="id"
      :name="name"
      :options="options"
      :status="status"
      :size="size"
      :select-all="selectAll"
      :select-all-label="selectAllLabel"
    />

    <template slot="controls">
      <disabled-control v-model="disabled" />

      <label class="flex items-center mt-2">
        <input 
          v-model="selectAll" 
          type="checkbox"
        >
        <span class="ml-2 text-xs uppercase font-bold text-gray-600">
          Select All option
        </span>
      </label>


       <div>
        <span class="text-xs uppercase font-bold text-gray-600">
          Select All Label:
        </span>
        <t-input
          id="selectAllLabel"
          v-model="selectAllLabel"
          name="selectAllLabel"
          default-class="p-1 border text-sm"
          :disabled="!selectAll"
        />
      </div>

      <status-control class="mt-2" v-model="status" />

      <size-control class="mt-2" v-model="size" />

      <div>
        <span
          for="rows"
          class="text-xs uppercase font-bold text-gray-600">
          Add option:
        </span>
        <t-input
          id="newOption"
          v-model.number="newOption"
          name="newOption"
          default-class="p-1 border text-sm"
          @keyup.enter="addNewOption"
        />
      </div>
    </template>

    <template slot="value">
      <p>Current value: <pre class="text-white">{{ model }}</pre></p>
    </template>

    <template slot="classes">
      <p>
        Rendered class: 
        <pre class="text-white">{{ renderedClass }}</pre>
      </p>
    </template>
  </input-demo>
</template>

<script>
import getRenderedClass from '../mixins/getRenderedClass'

export default {
  name: 'CheckboxGroupField',

  mixins: [getRenderedClass],

  data () {
    return {
      model: ['Option 2'],
      id: 'checkbox-field',
      name: 'checkbox-field',
      selectAll: false,
      selectAllLabel: 'Select All',
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
    },
  }
}
</script>
