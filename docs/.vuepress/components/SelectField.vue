<template>
  <input-demo>
    <t-select
      ref="input"
      v-model="model"
      :disabled="disabled"
      :multiple="multiple"
      :id="id"
      :name="name"
      :options="options"
      :status="status"
      :size="size"
    />

    <template slot="controls">
      
      <disabled-control v-model="disabled" />

      <label class="flex items-center mt-2">
        <input 
          v-model="multiple" 
          type="checkbox"
        >
        <span class="ml-2 text-xs uppercase font-bold text-gray-600">
          Multiple
        </span>
      </label>

      <status-control class="mt-2" v-model="status" />

      <size-control class="mt-2" v-model="size" />

      <p class="flex items-center mt-2">
        <label 
          for="rows" 
          class="mr-2 text-xs uppercase font-bold text-gray-600">
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

    <template slot="classes">
      <p>Rendered class: 
        <pre class="text-white">{{ renderedClass }}</pre>
      </p>
    </template>
  </input-demo>
</template>

<script>
import getRenderedClass from '../mixins/getRenderedClass'

export default {
  name: 'SelectField',

  mixins: [getRenderedClass],

  data () {
    return {
      model: 'Option 1',
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

      this.updateRenderedClass();
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

      this.newOption = ''
    },
  }
}
</script>
