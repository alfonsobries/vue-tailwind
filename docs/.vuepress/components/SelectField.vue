<template>
  <input-demo>
    <t-select
      v-model="model"
      :disabled="disabled"
      :multiple="multiple"
      :id="id"
      :name="name"
      :options="options"
    />

    <template slot="controls">
      <p>
        <label class="flex items-center">
          <input 
            v-model="disabled" 
            type="checkbox">
          <span class="ml-2">
            {{ disabled ? 'Disabled' : 'Enabled' }}
          </span>
        </label>
      </p>
      <p class="mt-2">
        <label class="flex items-center">
          <input 
            v-model="multiple" 
            type="checkbox">
          <span class="ml-2">
            Multiple
          </span>
        </label>
      </p>
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
import Vue from 'vue'

export default {
  name: 'SelectField',

  data () {
    return {
      model: 'Option 1',
      disabled: false,
      id: 'text-field',
      name: 'text-field',
      multiple: false,
      options: [
        { value: 'Option 1', text: 'Option 1' },
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
      ],
      newOption: '',
    }
  },

  watch: {
    multiple(multiple) {
      if (multiple) {
        this.model = [this.model]
      } else {
        this.model = this.model[0] || 'Option 1'
      }
    }
  },

  methods: {
    addNewOption() {
      if (!this.newOption) {
        return
      }
      const option = { value: this.newOption, text: this.newOption }
      this.options.push(option)

      if (this.multiple) {
        this.model.push(option.value)
      } else {
        this.model = option.value
      }
    }
  }
}
</script>
